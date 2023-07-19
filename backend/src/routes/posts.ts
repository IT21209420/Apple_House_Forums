import express from "express";
import * as PostsController from "../controllers/posts"; //import all functions exported

const router = express.Router();

router.get("/", PostsController.getPosts);

export default router;
