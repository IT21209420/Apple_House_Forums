import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import { connect } from "./config/db_con.js";
import authRouter from "./routes/auth.js";
import postRouter from "./routes/post.js";
import dotenv from "dotenv";
import auth from "./middlewares/auth.js";
dotenv.config({ path: "./config/config.env" });
import cors from "cors";

const app = express();

//middlewares
app.use(express.json()); //Send respones in json fomrat
app.use(morgan("tiny")); //log requests
app.use(cors());
//routes

app.use("/api", authRouter);
app.use("/api", postRouter);

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
