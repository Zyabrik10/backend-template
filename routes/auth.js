import express from "express";
export const authRouter = new express.Router();

import { signup, signin, signout } from "../models/authModel.js";
import {
  validateSignup,
  validateSignin,
  validateSignout,
} from "../controllers/authController.js";
import catchError from "../errors/catch-error.js";

/*
    @signup
    body: {
        username,
        email,
        password
    }
 */
authRouter.post("/signup", validateSignup, catchError, signup);

/*
    @signin
    body: {
        email,
        password
    }
 */
authRouter.post("/signin", validateSignin, catchError, signin);

/*
    @signout
    header{
        token
    }
 */
authRouter.post("/signout", validateSignout, catchError, signout);
