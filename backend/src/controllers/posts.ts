import { RequestHandler } from "express";
import PostModel from "../models/Post";


//getallposts
export const getPosts: RequestHandler = async (req, res, next) => {
  //RequestHandler Give varible type instead giving idividual types for parameters
  try {
    const posts = await PostModel.find().exec(); //exec return promise
    res.status(200).json(posts);//200 equest was successful
  } catch (error) {
    next(error); //call error handler
  }
};

//get specific post
export const getPost: RequestHandler = async (req, res, next) => {
  const postId = req.params.postId;

  try {
    const post = await PostModel.findById(postId).exec();
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

//create a post
export const createPosts: RequestHandler = async (req, res, next) => {
  const title = req.body.title;
  const text = req.body.text;

  try {
    const newPost = await PostModel.create({
      title: title,
      text: text,
    });
    res.status(201).json(newPost);//201 request was successful and a resource was created as a result
  } catch (error) {
    next(error); //call error handler
  }
};
