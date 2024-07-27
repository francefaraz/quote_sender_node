const express = require('express')
const app = express()
const port = process.env.BE_PORT || 5001
const cors = require('cors')

app.use(cors())
app.use(express.json())

app.get('/',(req,res)=>res.send("HELLO WELCOME THIS APP IS MADED BY FAR (MYSELF ANDROID)"))
app.get('/ping', (req, res) => res.send('SERVER IS WORKING FINE'))

const dbConnection=require('./configs/db')

const users=require("./routes/user")
const quote_routes=require('./routes/quote')
app.use('/api',users)

app.use('/api',quote_routes)



app.post('/testing_hook',(req,res)=>{
    console.log("HELLO BRO ")
    console.log(req.body,"req body is")
    res.status(200).json({
        success: true,
        message: "Request body received successfully",
        data: req.body
    });
})

// Route to handle webhook POST requests from Instamojo
app.post('/instamojo-webhook', (req, res) => {
    // Extract data from the webhook payload
    const { amount, buyer, buyer_name, buyer_phone, currency, fees, longurl, mac, payment_id, payment_request_id, purpose, shorturl, status } = req.body;

    // Logging all received parameters
    console.log('Received webhook data:');
    console.log('Amount:', amount);
    console.log('Buyer:', buyer);
    console.log('Buyer Name:', buyer_name);
    console.log('Buyer Phone:', buyer_phone);
    console.log('Currency:', currency);
    console.log('Fees:', fees);
    console.log('Long URL:', longurl);
    console.log('MAC:', mac);
    console.log('Payment ID:', payment_id);
    console.log('Payment Request ID:', payment_request_id);
    console.log('Purpose:', purpose);
    console.log('Short URL:', shorturl);
    console.log('Status:', status);

    // Respond to Instamojo to acknowledge receipt
    res.status(200).json({
        success: true,
        message: 'Webhook received and processed successfully',
        data: req.body // Sending back the entire received body as part of the response
    });
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`))