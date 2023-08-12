import express from 'express'
import http from "http"
import bodyParser from "bodyParser"
import cookieParser from "cookieParser"
import compression from "compression"
import cors from "cors"

const app = express()

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