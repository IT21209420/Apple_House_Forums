import express from "express";
import * as UsersController from "../controllers/users"; //import all functions exported

const router = express.Router();

router.post("/register" , UsersController.register) 
router.post("/login" , UsersController.login) 
router.get("/" , UsersController.getAuth) 
router.post("/logout" , UsersController.logout) 
export default router;