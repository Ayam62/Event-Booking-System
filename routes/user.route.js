import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { getUserProfile, updateUserProfile } from "../controller/user.controller.js";

const userRouter = express.Router();

userRouter.get("/profile", protect, getUserProfile);
userRouter.put("/profile", protect, updateUserProfile);

export default userRouter;