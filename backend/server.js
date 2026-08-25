import express from 'express' //es6 import equivalanet to const express = require('express')
import connectDB from './config/db.js';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
dotenv.config()
connectDB()
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import { notFound,errorHandler } from './middleware/errorMiddleware.js';
import uploadRoutes from './routes/uploadRoutes.js'
import path from 'path'
const port = process.env.PORT || 5000;
const app = express()




//THE BELOW SECTION ARE PRE-INCLUDED MIDDLEWARES - SAME FOR ALL PROJECTS
app.use(express.json()) //very important middle-ware for post requests
app.use(express.urlencoded({extended:true}))
//cookie parser middleware - allows to access req.cookie
app.use(cookieParser())
//THE ABOVE SECTION ARE PRE-INCLUDED MIDDLEWARES - SAME FOR ALL PROJECTS




app.use('/api/products',productRoutes)
app.use('/api/users',userRoutes)
app.use('/api/orders',orderRoutes)
app.get('/api/config/paypal',(request,response)=>response.send({clientId:process.env.PAYPAL_CLIENT_ID}))
app.use('/api/upload',uploadRoutes)

const __dirname = path.resolve() // set __dirname to current directory address
app.use('/uploads',express.static(path.join(__dirname,'/uploads')))


if (process.env.NODE_ENV === 'production')
{
    app.use(express.static(path.join(__dirname,'/frontend/build')))

    app.get('/{*splat}',(request,response)=>response.sendFile(path.resolve(__dirname,'frontend','index.html')))
}
else
{
    app.get('/',(request,response)=>{response.send('API is running...')})
}

//below all the routes
app.use(notFound)
app.use(errorHandler)

app.listen(port,()=>{console.log(`express backend running at port ${port} successfully`)})
