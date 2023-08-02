const validateEmail = (req, res, next) => {
    const email = req.body.email;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }
    next();
  };
  
  // Middleware to validate username
  const validateUsername = (req, res, next) => {
    const username = req.body.username;
    if (!username || username.length < 3) {
      return res.status(400).json({ error: 'Username must be at least 3 characters long' });
    }
    next();
  };
  
  // Middleware to validate password and confirm password
  const validatePassword = (req, res, next) => {
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    if (!password || password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long' });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }
    next();
  };

  const User=require('../models/user.model')
  // const isUserExistAndValidOtp = (req,res,next)=>{
  //   console.log("is user exist")


  // }
  
  module.exports = {
    validateEmail,
    validateUsername,
    validatePassword
  };