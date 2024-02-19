const jwt = require('jsonwebtoken');
const { User } = require('../models/user.model');
const { sendOtp } = require('../services/email.send');

// Register a new user
const registerUser = async (req, res) => {


  const { username, email, password } = req.body;
  const user_register_obj={username:username,email:email,password:password}
     console.log(user_register_obj)
  try{
  const max = 99999;
  const min = 10000;
  const getOtpNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  console.log(`otp is ${getOtpNumber}`);

  const isEmailSend = await sendOtp(getOtpNumber, email, username);

  if (isEmailSend) {
    const register = User({ email, username, password, otp: getOtpNumber });
    const registerData = await register.save();
    res.status(201).json(registerData);
  }
} catch (error) {
  console.error(error);
  if (error.code === 11000) {
    // Duplicate key error
    return res.status(400).json({ success: false, error: 'User already exists' });
  }
  res.status(500).json({ success: false, error: 'Failed to create user' });
}
};

// Verify user's email
const verifyEmail = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const user =await User.findOne({email})
    // user['success']=true
    // console.log("updated ",user)
    if(user){
        if (user.otp!=otp) {
            return res.status(400).json({success:false, error: 'Invalid OTP' });
          }
    const userUpdated = await User.findOneAndUpdate(
      { email: email, otp: otp },
      [{ $set: { isEmailVerified: true } }, { $unset: 'otp' }],
      { new: true }
    ).lean();

    
    userUpdated['success']=true
    res.json(userUpdated);
   }
   else{
    return res.status(404).json({ error: 'User not found or Invalid OTP' });
   }
  } catch (error) {
    console.log('error is', error);
    res.status(500).json({ success: false, error: 'Failed to update user' });
  }
};

// User login
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
     console.log(process.env.QUOTE_SECRET_KEY,"quote secret",user.password)
    if (user.password === password) {
        console.log("HELLO")
      const token = jwt.sign({ email: email }, process.env.QUOTE_SECRET_KEY, {
        expiresIn: '10h',
      });

      res.status(200).json({ success: true, token: token, message: 'SUCCESSFULLY LOGGED IN' });
    }
    res.status(301).json({ success: false, error: 'Invalid password' })
  } catch (error) {
    console.log('error is', error);
    res.status(500).json({ success: false, error: 'Failed to login' });
  }
};

module.exports = {
  registerUser,
  verifyEmail,
  loginUser,
};
