const bcrypt = require('bcryptjs')
const JWT = require('jsonwebtoken')
const User = require('../Models/UserModel');
const createError = require('../Utils/AppError');

exports.signup = async (req,res,next)=>{
  try {
    const user = await User.findOne({email: req.body.email});

    if(user){
        return next(new createError("User Already Exists!",400))
    }
    const HashedPassword = await bcrypt.hash(req.body.password,12);

    const newUser = await User.create({
        ...req.body,
        password: HashedPassword,
    });

    //JWT
    const token = JWT.sign({_id : newUser._id},"secretKey123",{
        expiresIn:"90d",
    });

    res.status(200).json({
        status:"Success",
        message:"User Registered Successfully",
        token,
        user:{
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
        }
    })

  } catch (error) {
    next(error)
  }
}

exports.login = async (req,res,next)=>{
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if(!user) return next(new createError("User Not Found!",404));

    const isPasswordValid = await bcrypt.compare(password,user.password);

    if(!isPasswordValid){
      return next(new createError("Incorrect Email or Password",401));
    }

    //JWT
    const token = JWT.sign({_id : user._id},"secretKey123",{
      expiresIn:"90d",
    });

    res.status(200).json({
      status: "Success",
      token,
      message: "You are Logged In",
      user:{
        _id: user._id,
        name: user.name,
        email: user.email,
      }
    })

  } catch (error) {
    next(error)
  }
}

