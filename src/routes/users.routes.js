import express from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import {
  hasRole,
  doesUserExist,
  validateUpdateMe,
  validateUpdate,
  isUserVerified,
} from "../middlewares/users.middleware.js";
import {
  getAllUsers,
  getMe,
  getUserById,
  updateMe,
  update,
  sendUserVerification,
  verifyUser,
  sendForgotPasswordForm,
  updatePassword,
  sentChangePasswordForm,
  deleteUser,
} from "../controllers/users.controller.js";
import { verifyId } from "../middlewares/db.middleware.js";

const userRouter = express.Router();

userRouter.post(
  "/",
  verifyToken("token"),
  isUserVerified,
  hasRole("admin", "moderator"),
  getAllUsers
);
userRouter.get("/me", verifyToken("token"), getMe);
userRouter.patch(
  "/update-me",
  validateUpdateMe,
  verifyToken("token"),
  isUserVerified,
  updateMe
);
userRouter.patch(
  "/update/:id",
  validateUpdate,
  verifyToken("token"),
  isUserVerified,
  hasRole("admin"),
  verifyId,
  doesUserExist,
  update
);
userRouter.post(
  "/:id",
  verifyToken("token"),
  isUserVerified,
  hasRole("admin", "moderator"),
  verifyId,
  doesUserExist,
  getUserById
);
userRouter.delete(
  "/:id",
  verifyToken("token"),
  isUserVerified,
  hasRole("admin"),
  verifyId,
  doesUserExist,
  deleteUser
);
userRouter.post(
  "/send-user-verification",
  verifyToken("token"),
  sendUserVerification
);
userRouter.get("/verification/:token", verifyToken("verifyToken"), verifyUser);
userRouter.post(
  "/send-forgot-password-form",
  verifyToken("token"),
  isUserVerified,
  sendForgotPasswordForm
);
userRouter.patch(
  "/update-password",
  verifyToken("verifyToken"),
  isUserVerified,
  updatePassword
);
userRouter.get(
  "/change-password-form/:token",
  verifyToken("verifyToken"),
  isUserVerified,
  sentChangePasswordForm
);

export default userRouter;
