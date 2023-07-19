import mongoose from "mongoose";
import CommentSchema from "./Comment.js";

const PostSchema = new mongoose.Schema(
  { 
    content: {
      type: String,
      required: [true, "Content is required"],
    },
    isApproved: {
      type: Boolean,
      required: true,
    },
    feedback: {
      type: String,
      
    },
    comments: [CommentSchema],

    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },

  { timestamps: true }
);

//Creating a model
const Post = new mongoose.model("Post", PostSchema);

export default Post; 
