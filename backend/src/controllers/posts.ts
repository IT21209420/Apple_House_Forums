import { RequestHandler } from "express";
import PostModel from "../models/Post"
export const getPosts:RequestHandler = async (req, res,next) => {//Give varible type instead giving idividual types for parameters
    try {
      const posts = await PostModel.find().exec(); //exec return promise
      res.status(200).json(posts);
    } catch (error) {
      next(error);//call error handler
    }
  }