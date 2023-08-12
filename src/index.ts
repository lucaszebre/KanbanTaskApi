const express = require('express');
const http = require('http')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const compression = require('compression')
const cors = require('cors')
const mongoose =require('mongoose')
const app = express()
require('dotenv').config()
import router from "./router";
app.use(cors({
    credentials:true
}))
app.use(compression())
app.use(cookieParser())
app.use(bodyParser())

const server = http.createServer(app)

server.listen(3000,()=>{
    console.log('Server running on localhost/3000')
})


mongoose.Promise = Promise
mongoose.connect(process.env.MONGODB)
mongoose.connection.on('error', (error: Error) => console.log(error));


app.use('/',router())