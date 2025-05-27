import { protect } from '../middleware/auth.middleware.js';
import { isAdmin } from '../middleware/isAdmin.js';
import { deleteUserById, findByIdAndUpdate, getAllUsers, getUserById, makeAdminById } from '../controller/admin.controller.js';
import User from '../models/user.model.js';
import express from 'express';

const adminRouter = express.Router();

adminRouter.post('/promote/:userId', isAdmin, protect,makeAdminById);
adminRouter.get("/users",isAdmin,protect,getAllUsers)
adminRouter.get("users/:id",isAdmin,protect,getUserById)
adminRouter.put("/users/:id",isAdmin,protect,findByIdAndUpdate)
adminRouter.delete("/users/:id",isAdmin,protect,deleteUserById)

export default adminRouter;

