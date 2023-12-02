import passport from "passport";
import { ExtractJwt, Strategy as _Strategy } from "passport-jwt";
import { User } from "../db-schemas/user-schema.js";
import dotenv from "dotenv";
import createStatusError from "../help/create-status-error.js";

dotenv.config();

const secret = process.env.SECRET;

const ExtractJWT = ExtractJwt;
const Strategy = _Strategy;
const params = {
  secretOrKey: secret,
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
};

// JWT Strategy
passport.use(
  new Strategy(params, async function (payload, next) {
    try {
      const user = await User.findOne({ _id: payload.id });

      if (!user || user.token === "") {
        throw createStatusError(401, "Unauthorized");
      }

      return next(null, user);
    } catch (error) {
      next(error);
    }
  })
);
