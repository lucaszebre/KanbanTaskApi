const express = require('express');
const http = require('http')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const compression = require('compression')
const cors = require('cors')
const mongoose =require('mongoose')
const jwt = require("jsonwebtoken");
const app = express()
import * as dotenv from 'dotenv';

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
dotenv.config();

const { MONGODB } = process.env;

mongoose.Promise = Promise
mongoose.connect(MONGODB)
mongoose.connection.on('error', (error: Error) => console.log(error));


app.use('/',router())