import express from "express";
import Post from "../models/Post.js"; 
import authenticateToken from "../middlewares/auth.js";

const router = express.Router();

router.post("/createPost",authenticateToken, async (req, res) => {
  const { content } = req.body;
  try {
    const newPost = new Post({
      content,
      isApproved:false,
      feedback:null,
      comments:null,
      postedBy: req.user._id,
    });
    const result = await newPost.save();

    return res.status(201).json({ ...result._doc });

  } catch (err) {
    console.log(err);
  }
});
router.get("/createPost",authenticateToken, async (req, res) => {
    const { content } = req.body;
    try {
      const newPost = new Post({
        content,
        isApproved:false,
        feedback:null,
        comments:null,
        postedBy: req.user._id,
      });
      const result = await newPost.save();
  
      return res.status(201).json({ ...result._doc });
  
    } catch (err) {
      console.log(err);
    }
  });

export default router;
