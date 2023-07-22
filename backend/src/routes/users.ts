import express from "express";
import * as UsersController from "../controllers/users"; //import all functions exported
import { requiresAuth } from "../middleware/auth";

const router = express.Router();
router.get("/", requiresAuth, UsersController.getAuth);
router.post("/register", UsersController.register);
router.post("/login", UsersController.login);

router.post("/logout", UsersController.logout);
export default router;
