const mongoose = require('mongoose');
const MongoURI = "mongodb://127.0.0.1:27017/Inventry_Authentication" 

const MongooseConnect = async()=>{
   try {
    let Connect = await mongoose.connect(MongoURI)
    return Connect
   } catch (error) {
    console.log(error);
   }
}

module.exports = MongooseConnect