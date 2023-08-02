const mongoose= require('mongoose')
var db=mongoose
console.log("HELLO")
async function connect(){
    try{
    var mongodb_url=process.env.MONGODB_URL
    await mongoose.connect(mongodb_url,{useNewUrlParser:true,useUnifiedTopology:true})
    db=mongoose.connection;

    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    console.log("db connected successfully")
  
}
catch(error){

    console.log("connection error: " + error.message);

}}

connect()

module.exports=db