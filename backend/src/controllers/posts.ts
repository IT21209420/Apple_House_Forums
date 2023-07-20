import { RequestHandler } from "express";
import PostModel from "../models/Post";
import createHttpError from "http-errors";
import mongoose from "mongoose";

//getallposts
export const getPosts: RequestHandler = async (req, res, next) => {
  //RequestHandler Give varible type instead giving idividual types for parameters
  try {
    const posts = await PostModel.find().exec(); //exec return promise
    res.status(200).json(posts); //200 equest was successful
  } catch (error) {
    next(error); //call error handler
  }
};

//get specific post
export const getPost: RequestHandler = async (req, res, next) => {
  const postId = req.params.postId;

  try {
    if (!mongoose.isValidObjectId(postId)) {
      throw createHttpError(400, "Invalid Post ID");
    }

    const post = await PostModel.findById(postId).exec();
    if (!post) {
      throw createHttpError(404, "Post not found");
    }
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};
interface CreatePostBody {
  title?: string;
  text?: string;
}

//create a post
export const createPosts: RequestHandler<
  unknown,
  unknown,
  CreatePostBody,
  unknown
> = async (req, res, next) => {
  const title = req.body.title;
  const text = req.body.text;

  try {
    if (!title) {
      throw createHttpError(400, "Post must have a title"); //400 bad request
    }
    if (!text) {
      throw createHttpError(400, "Post must have a content ");
    }

    const newPost = await PostModel.create({
      title: title,
      text: text,
    });
    res.status(201).json(newPost); //201 request was successful and a resource was created as a result
  } catch (error) {
    next(error); //call error handler
  }
};
interface UpdatePostParams {
  postId: string;
}
interface UpdatePostBody {
  title?: string;
  text?: string;
}

export const updatePost: RequestHandler<
  UpdatePostParams,
  unknown,
  UpdatePostBody,
  unknown
> = async (req, res, next) => {
  const postId = req.params.postId;
  const title = req.body.title;
  const text = req.body.text;

  try {
    if (!mongoose.isValidObjectId(postId)) {
      throw createHttpError(400, "Invalid Post ID");
    }
    if (!title) {
      throw createHttpError(400, "Post must have a title"); //400 bad request
    }
    if (!text) {
      throw createHttpError(400, "Post must have a content ");
    }
    const post = await PostModel.findById(postId).exec();

    if (!post) {
      throw createHttpError(404, "Post not found");
    }

    post.title = title;
    post.text = text;

    const updatedPost = await post.save();

    res.status(200).json(updatedPost);
  } catch (error) {
    next(error);
  }
};

export const deletePost: RequestHandler = async (req, res, next) => {
  const postId = req.params.postId;

  try {
    if (!mongoose.isValidObjectId(postId)) {
      throw createHttpError(400, "Invalid Post ID");
    }
    const post = await PostModel.findById(postId).exec();

    if (!post) {
      throw createHttpError(404, "Post not found");
    }
    // PostModel.findByIdAndRemove(postId);
    await PostModel.findByIdAndDelete(postId);
    res.sendStatus(204); //status dont send response it self json resoponsible for it in this case we use sendStatus for that
  } catch (error) {
    next(error);
  }
};
