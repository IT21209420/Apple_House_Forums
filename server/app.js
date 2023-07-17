import express from 'express'
import mongoose from 'mongoose'

const app = express();


//middlewares

//routes

//server config
const PORT = process.env.PORT || 9000;
app.listen(PORT,()=>{
    console.log(`Sever is running on port ${PORT}`);
})
