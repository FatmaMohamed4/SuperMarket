
import express from 'express'
import dotenv from 'dotenv'
import connectDB from './connectDB.js';
import app from './app.js';
dotenv.config({path:'./config.env'})

const port=process.env.PORT||5000
app.listen(port,()=>{
    console.log(`server is Running in port ${port}`)
})



connectDB();

