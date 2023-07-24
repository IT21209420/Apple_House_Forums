import { RequestHandler } from "express";
import PostModel from "../models/Post";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import { assertIsDefined } from "../util/assertisDefined";
import UserModel from "../models/User";
//getallposts
export const getPosts: RequestHandler = async (req, res, next) => {
  const authuser = req.session.userId;

  //RequestHandler Give varible type instead giving idividual types for parameters
  try {
    assertIsDefined(authuser);
    const posts = await PostModel.find({ userId: authuser }).exec(); //exec return promise
    res.status(200).json(posts); //200 equest was successful
  } catch (error) {
    next(error); //call error handler
  }
};

export const getAllApprovedPosts: RequestHandler = async (req, res, next) => {
  const authuser = req.session.userId;

  //RequestHandler Give varible type instead giving idividual types for parameters
  try {
    assertIsDefined(authuser);
    const posts = await PostModel.find({ approved: true }).exec(); //exec return promise
    res.status(200).json(posts); //200 equest was successful
  } catch (error) {
    next(error); //call error handler
  }
};
export const getToBeAllApprovedPosts: RequestHandler = async (
  req,
  res,
  next
) => {
  const authuser = req.session.userId;

  //RequestHandler Give varible type instead giving idividual types for parameters
  try {
    assertIsDefined(authuser);
    const posts = await PostModel.find({ approved: null }).exec(); //exec return promise
    res.status(200).json(posts); //200 equest was successful
  } catch (error) {
    next(error); //call error handler
  }
};
//get specific post
export const getPost: RequestHandler = async (req, res, next) => {
  const postId = req.params.postId;
  const authuser = req.session.userId;

  try {
    assertIsDefined(authuser);
    if (!mongoose.isValidObjectId(postId)) {
      throw createHttpError(400, "Invalid Post ID");
    }

    const post = await PostModel.findById(postId).exec();
    if (!post) {
      throw createHttpError(404, "Post not found");
    }

    if (!post.userId.equals(authuser)) {
      throw createHttpError(401, "Cannot acces this post");
    }
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};
interface CreatePostBody {
  title?: string;
  text?: string;
    approved?: boolean;
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
  const approved = req.body.approved;

  const authuser = req.session.userId;

  try {
    assertIsDefined(authuser);
    if (!title) {
      throw createHttpError(400, "Post must have a title"); //400 bad request
    }
    if (!text) {
      throw createHttpError(400, "Post must have a content ");
    }
    console.log(approved)

    const newPost = await PostModel.create({
      userId: authuser,
      title: title,
      text: text,
      approved : approved
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
  approved?: boolean;
  feedback?: string;
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
  const approved = req.body.approved;
  const feedback = req.body.feedback;
  const authuser = req.session.userId;

  try {
    // assertIsDefined(authuser);
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
    const user = await UserModel.findOne({ _id: authuser })
    .select("+password")
    .exec();
  if (user?.roles == "User") {
    if(authuser)
    if (!post.userId.equals(authuser)) {
      throw createHttpError(401, "Cannot acces this post");
    }
  }
    

    post.title = title;
    post.text = text;
 

    if(approved === true || approved === false ){
      post.approved = approved
    }
    feedback &&(post.feedback  = feedback)
    post.comments.push("test")
    

    const updatedPost = await post.save();

    res.status(200).json(updatedPost);
  } catch (error) {
    next(error);
  }
};


export const deletePost: RequestHandler = async (req, res, next) => {
  const postId = req.params.postId;
  const authuser = req.session.userId;

  try {
    assertIsDefined(authuser);

    if (!mongoose.isValidObjectId(postId)) {
      throw createHttpError(400, "Invalid Post ID");
    }
    const post = await PostModel.findById(postId).exec();

    if (!post) {
      throw createHttpError(404, "Post not found");
    }
    // PostModel.findByIdAndRemove(postId);
    if (!post.userId.equals(authuser)) {
      throw createHttpError(401, "Cannot acces this post");
    }
    await PostModel.findByIdAndDelete(postId);
    res.sendStatus(204); //status dont send response it self json resoponsible for it in this case we use sendStatus for that
  } catch (error) {
    next(error);
  }
};
