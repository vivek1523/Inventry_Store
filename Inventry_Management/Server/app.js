const express = require('express')
const app = express();
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config();
const authRouter = require('./Routes/AuthRoutes')
//require('./Connection/Mongo')
const PORT = process.env.PORT || 4000;
const ProductRoute = require('./Routes/ProductRoute');
const { authMiddleware } = require('./Controllers/AuthController');
//const MongooseConnect = require('./Connection/Mongo');


//Middlewares
app.use(express.json());
app.use(cors());

// app.use(cors({
//   origin: 'https://inventry-store-client.onrender.com', 
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   credentials: true, 
// }));

//Routes
app.use('/api/auth',authRouter);
app.use("/api/auth",authMiddleware,ProductRoute);

// Mongo Connection for Authentication DB
//MongooseConnect();
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Database connected'))
  .catch((error) => {
    console.error('Database connection error:', error);
    process.exit(1); 
  });

//Global Errors
app.use((err, req, res, next) => {
  console.error(err.stack);  
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack 
  });
})

//Server
app.listen(PORT,()=>{
    console.log("Server Started Running");
})
