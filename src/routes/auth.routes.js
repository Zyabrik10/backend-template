import express from "express";
import { login, signup, logout } from "../controllers/auth.controller.js";
import {
  validateLogin,
  validateSignup,
  verifyToken,
} from "../middlewares/auth.middleware.js";

const authRouter = express.Router();

authRouter.post("/login", validateLogin, login);
authRouter.post("/signup", validateSignup, signup);
authRouter.post("/logout", verifyToken("token"), logout);

export default authRouter;
