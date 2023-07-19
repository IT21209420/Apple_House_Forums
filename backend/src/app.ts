import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import postsRoutes from "./routes/posts"

const app = express();

//middlewares
app.use(express.json()); //Send respones in json fomrat
app.use(morgan("tiny")); //log requests
app.use(cors());

//routes
app.use("/api/postes" , postsRoutes)

//handle unknown end point
app.use((req, res, next)=>{
  next(Error("No End Point Found"))//forward to error handler
})


//handle errors of all routes
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  //use next function to identfy express this method as a error handler
  console.error(error);
  let errorMessage = "An unknown error occurred";
  const statusCode = 500;
  if (error instanceof Error) {
    errorMessage = error.message;
  }
  res.status(statusCode).json({ error: errorMessage });
});

export default app;
