import "dotenv/config";
import mongoose from "mongoose";
import env from "./util/envValidate";
import app from "./app";

//server config
const PORT = env.PORT || 9000;
mongoose
  .connect(env.URL)
  .then(() => {
    console.log("Mongoose Connected");
    app.listen(PORT, () => {
      console.log(`Sever is running on port ${PORT}`);
    });
  })
  .catch(console.error);
