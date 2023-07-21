import { InferSchemaType, model, Schema } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    max: 50,
    unique: true,
    required: [true, "email is required"],
  },

  password: {
    type: String,
    required: [true, "password is required"],
    select: false,
  },
});
type Note = InferSchemaType<typeof UserSchema>;

//Creating a model
const User = model<Note>("User", UserSchema);

export default User;
