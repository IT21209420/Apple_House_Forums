import {Schema} from "mongoose";
const CommentSchema = new Schema(
  {
    content: {  
      type: String,
      required: [true, "Comment content is required"],
    },
    postedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
//Creating a model


export default CommentSchema; 


