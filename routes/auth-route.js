import express from "express";
import { signup, signin, signout } from "../models/auth-model.js";
import {
  signupController,
  signinController,
} from "../controllers/auth-controller.js";
import { auth, catchError } from "../middleware/index.js";
import passport from "passport";

export const authRouter = new express.Router();
/*
    @signup
    body: {
        username,
        email,
        password
    }
 */
authRouter.post("/signup", signupController, catchError, signup);

/*
    @signin
    body: {
        email,
        password
    }
 */
authRouter.post("/signin", signinController, catchError, signin);

/*
    @signout
    header{
        token
    }
 */
authRouter.post(
  "/signout",
  passport.authenticate("jwt", { session: false }),
  catchError,
  signout
);
