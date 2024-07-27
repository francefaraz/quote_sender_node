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
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))