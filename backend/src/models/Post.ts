import { Schema, InferSchemaType, model, Types } from "mongoose";


const PostSchema = new Schema(
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
    comments: {
      type: [Types.ObjectId],
      ref: "Comments",
    },
    postedBy: {
      type: Types.ObjectId,
      ref: "User",
    },
  },

  { timestamps: true }
);

//Creating a model
type Post = InferSchemaType<typeof PostSchema>;

export default model<Post>("Post", PostSchema);
