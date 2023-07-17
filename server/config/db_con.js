import mongoose from "mongoose";

export const connect = async () => {
  return (
    mongoose
      .connect(
        "mongodb+srv://hasaranga:hasaranga123678@cluster0.1m70tj1.mongodb.net/"
      )
      .then(() => console.log(`Database has been connected...`))
      //error occurs while connecting to the database,catch it here.
      .catch((err) => console.log(err))
  );
};
