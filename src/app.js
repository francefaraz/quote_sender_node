const express = require('express')
const app = express()
const port = process.env.BE_PORT || 5001
const cors = require('cors')

app.use(cors())
app.use(express.json())


app.get('/ping', (req, res) => res.send('SERVER IS WORKING FINE'))

const dbConnection=require('./configs/db')

const users=require("./routes/user")
const quote_routes=require('./routes/quote')
app.use('/api',users)

app.use('/api',quote_routes)






app.listen(port, () => console.log(`Example app listening on port ${port}!`))