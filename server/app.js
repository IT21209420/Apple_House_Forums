import express from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan';
import {connect} from './config/db_con.js'
const app = express();


//middlewares
app.use(express.json());;//Send respones in json fomrat
app.use(morgan);//log requests

//routes

//server config
const PORT = process.env.PORT || 9000;
app.listen(PORT,async()=>{
    try {
        await connect();
        console.log(`Sever is running on port ${PORT}`);
    } catch (error) {
        console.log(err)
    }
       
})
