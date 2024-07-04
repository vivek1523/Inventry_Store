const express = require('express');
const authController = require('../Controllers/AuthController');
//const User = require('../Models/UserModel');
const router = express.Router();
//const JWT = require('jsonwebtoken')

router.post('/signup',authController.signup);
router.post('/login',authController.login);


module.exports = router;