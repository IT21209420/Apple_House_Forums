import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import postsRoutes from "./routes/posts"
import createHttpError ,{isHttpError} from "http-errors";

const app = express();

//middlewares
app.use(express.json()); //Send respones in json fomrat to server
app.use(morgan("dev")); //log requests
app.use(cors());

//routes
app.use("/api/posts" , postsRoutes)

//handle unknown end point
app.use((req, res, next)=>{
  next(createHttpError(404 , "No End Point Found"))//forward to error handler // 404 resource not found
})


//handle errors of all routes
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  //use next function to identfy express this method as a error handler
  console.error(error);
  let errorMessage = "An unknown error occurred";
  let statusCode = 500;//500 internal server error
  if (isHttpError(error)) {
    errorMessage = error.message;
    statusCode = error.status;
  }
  res.status(statusCode).json({ error: errorMessage });
});

export default app;
