const { Router } = require("express");

const axios = require('axios');

const routes=new Router()


const quotes=require('../models/quote.model')
const {isAuthorized} =require('../middlewares/auth')
var notify_data = {
    "to": "/topics/far",
    "notification": {
      "body": "The only way to do great work is to love what you do. 💼💛",
      "title": "Today's Quote"
    }
  }
routes.post('/sendcutomnotify',isAuthorized,(req,res)=>{
    const {quote,title}=req.body
    
    notify_data['notification']['body']=quote
    notify_data['notification']['title']=title
    console.log("NOTIFICATION DATA IS",notify_data)
    request_body=JSON.stringify(notify_data)
    console.log(process.env.QUOTE_SERVER_KEY,"key")
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://fcm.googleapis.com/fcm/send',
      headers: { 
        'Authorization': `key=${process.env.QUOTE_SERVER_KEY}`, 
        'Content-Type': 'application/json'
      },
      data : notify_data
    };

    console.log(config,"config os")
    

    // const data=await axios.post(url)

    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));

      res.status(200).json({success:true,message:"Notification Successfully Sent"})

    })
    .catch((error) => {
      console.log("\n error message",error);
      res.status(500).json({success:false,error:"Unable to send notification"})

    });




})



routes.get('/getallquotes',isAuthorized,async(req,res)=>{
  console.log("in get all quotes route")
  try{
    res.status(200).json(await quotes.find())

  }
  catch(error){
    console.log(error.message)
    res.status(500).json({success:false,error:"Unable to get quotes data"})
  }
})



// pagination

routes.get('/pagequote',isAuthorized, async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Get the page number from the query parameter (default to 1)
  const limit = parseInt(req.query.limit) || 10; // Get the number of items per page from the query parameter (default to 10)

  try {
    console.log("hello")
    console.log("quotes are",await quotes)
    const totalQuotes = await quotes.countDocuments({});

    console.log(totalQuotes)
    const totalPages = Math.ceil(totalQuotes / limit);
    console.log('total pages',totalPages)
    var quotes1 = await quotes.find({})
      .skip((page - 1) * limit)
      .limit(limit);
    var quotes_data= quotes1 != [] ? "noquotes":quotes1
    res.json({  
      page,
      totalPages,
      quotes_data,
    });
  } catch (error) {
    console.log("error is ",error)
    res.status(500).json({ message: 'Error fetching quotes', error: error.message });
  }
});

var sendNotification=require('../services/notification')
routes.get('/getrandomquote',isAuthorized,async(req,res)=>{
   try{
    let randomQuoteData=await quotes.aggregate([{$sample:{size:1}}])

    console.log(randomQuoteData,"data is ",randomQuoteData[0].quote)
    is_notification_sent=sendNotification(randomQuoteData[0]['quote'],randomQuoteData[0]['quoteTitle'])
    res.status(200).json(randomQuoteData)
   }
   catch(error){
    console.log("error is ",error)
    res.status(500).json({ message: 'Error fetching quotes', error: error.message });
   }
})






module.exports=routes