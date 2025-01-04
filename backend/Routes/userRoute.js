import express from "express";
import {
  checkAuth,
  login,
  logout,
  register,
  updateprofile,
} from "../Controller/userController.js";
import { protectedRoute } from "../Middlewares/protectedRoute.js";
import { upload } from "../Middlewares/multer.js";
const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/logout", logout);
userRouter.post(
  "/update-profile",
  protectedRoute,
  upload.single("profile"),
  updateprofile
);

userRouter.get("/checkAuth", protectedRoute, checkAuth);

export { userRouter };
