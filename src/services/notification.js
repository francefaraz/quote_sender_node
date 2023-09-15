const axios=require('axios')

var notify_data = {
    "to": "/topics/far",
    "notification": {
      "body": "The only way to do great work is to love what you do. 💼💛",
      "title": "Today's Quote"
    }
  }


  const sendNotification=async(quote,title)=>{
    notify_data['notification']['title']=title
    notify_data['notification']['body']=quote
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

    await axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));

        return true

    })
    .catch((error) => {
      console.log("\n error message",error);
      return false
    });
    return false
  }


  module.exports=sendNotification