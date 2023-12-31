import express from "express";
import * as PostsController from "../controllers/posts"; //import all functions exported

const router = express.Router();

router.get("/", PostsController.getPosts);
router.get("/getapprovedposts", PostsController.getAllApprovedPosts);
router.get("/gettobeapprovedposts", PostsController.getToBeAllApprovedPosts);
router.get("/:postId", PostsController.getPost);//after colon data read by express and put to req object
router.post("/", PostsController.createPosts);
router.patch("/:postId", PostsController.updatePost);
router.patch("/updatePostAdmin/:postId", PostsController.updatePostAdmin);
router.delete("/:postId", PostsController.deletePost);  

export default router;
