import { Schema, InferSchemaType, model } from "mongoose";

const PostSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    title: {
      type: String,
      required: [true, "Content is required"],
    },
    text: {
      type: String,
      required: true,
    },
    // feedback: {
    //   type: String,
    // },
    // comments: {
    //   type: [Types.ObjectId],
    //   ref: "Comments",
    // },
    // postedBy: {
    //   type: Types.ObjectId,
    //   ref: "User",
    // },
  },

  { timestamps: true }
);

//Creating a model
type Post = InferSchemaType<typeof PostSchema>;

export default model<Post>("Post", PostSchema);
