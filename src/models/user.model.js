const { Schema, default: mongoose } = require("mongoose");

var userSchema=Schema({
    email:{type:String,required:true,unique: true},
    username:{type:String,required:true,unique: true},
    password:{type:String,required:true},
    otp:{type:String,default:".%%.."},
    isEmailVerified:{type:Boolean,default:false},
    date: { type: Date, default: Date.now },

})

const User=mongoose.model('RegisteredUsers',userSchema)
module.exports={User}


