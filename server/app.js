import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import { connect } from "./config/db_con.js";
import router from "./routes/auth.js";
import dotenv from "dotenv";
dotenv.config({ path: "./config/config.env" });

const app = express();

//middlewares
app.use(express.json()); //Send respones in json fomrat
app.use(morgan('tiny')); //log requests
app.use("/api", router);
//routes

//server config
const PORT = process.env.PORT || 9000;
app.listen(PORT, async () => {
  try {
    await connect();
    console.log(`Sever is running on port ${PORT}`);
  } catch (error) {
    console.log(err);
  }
});
