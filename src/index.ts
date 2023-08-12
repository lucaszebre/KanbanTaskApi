const express = require('express');
const http = require('http')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const compression = require('compression')
const cors = require('cors')
const mongoose =require('mongoose')
const app = express()
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
mongoose.connect('mongodb+srv://lucaszebre1:zhoHBh2zl9ESCqI9@cluster0.kdkxwkt.mongodb.net/?retryWrites=true&w=majority')
mongoose.connection.on('error', (error: Error) => console.log(error));


app.use('/',router())