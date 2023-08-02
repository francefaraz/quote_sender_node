const { Router }= require('express');
const jwt=require('jsonwebtoken')



const {validateEmail,
    validateUsername,
    validatePassword}=require('../middlewares/register.validation')
// import all controllers
// import SessionController from './app/controllers/SessionController';

const routes = new Router();

// Add routes
// routes.get('/', SessionController.store);
// routes.post('/', SessionController.store);
// routes.put('/', SessionController.store);
// routes.delete('/', SessionController.store);
const {User}=require('../models/user.model')

const {sendOtp}=require('../services/email.send')
routes.post('/register',validateEmail,validateUsername,validatePassword,async(req,res)=>{
    console.log(User)
   const {username,email,password}=req.body
   const user_register_obj={username:username,email:email,password:password}
   console.log(user_register_obj)
   try{
       let max=99999
       let min=10000
       getOtpNumber=Math.floor( Math.random() * (max - min + 1) ) + min;
       console.log(`otp is ${getOtpNumber}`)
       console.log(sendOtp)
       isEmailSend=await sendOtp(getOtpNumber,email,username)
       console.log("EMAIL sent is ",isEmailSend)
       if (await isEmailSend){
       const register=User({email,username,password,otp:getOtpNumber})
      register_data=await register.save()
      res.status(201).json(register_data); 
    }
  } catch (error) {
    console.error(error)
    if (error.code === 11000) {
      // Duplicate key error
      return res.status(400).json({success:false, error: 'User already exists' });
    }
    res.status(500).json({success:false, error: 'Failed to create user' });
  }
   
})

routes.put('/verify',validateEmail,async(req,res)=>{
    const {email,otp}=req.body
    console.log(email,otp)
    try{
    const userUpdated=await User.findOneAndUpdate({email:email,otp:otp},[{"$set":{isEmailVerified:true}},{"$unset":"otp"}],{new:true})
    if(!userUpdated){
            console.log('updated',userUpdated)
            return res.status(404).json({ error: 'User not found or Invalid OTP' });
    }
        res.json(userUpdated)
        
        }
        catch(error){
            console.log("error is",error)
            res.status(500).json({success:false, error: 'Failed to update user' });

        }


})


routes.post('/login',validateEmail,async(req,res)=>{
    const { email , password} = req.body

    console.log(email)
    console.log(password)
    
    try{

        var user=await User.findOne({email})

        console.log("USER IS",user)
        if(!user)
         res.status(404).json({success:false,error:"User not found"})

         if(user.password==password){
            let token= jwt.sign({email:email},process.env.QUOTE_SECRET_KEY,{expiresIn:"1h"})
            // user['token']=token
            // user={...user,token}
            console.log("token is ",token,"user is ",user)
            // res.status(200).json(user)
            res.status(200).json({success:true,token:token,message:"SUCCESSFULLY LOGGED IN"})

         }

    }
    catch(error){
        console.log("error is",error)
        res.status(500).json({success:false, error: 'Failed to login' });
    }
    
})




module.exports = routes;
