import passport from "passport";
import createStatusError from "../help/create-status-error.js";

export default function (req, res, next) {
  passport.authenticate("jwt", (err, user) => {
    try {
      console.log(err);
      if (err) {
        throw createStatusError(401, "Unauthorized");
      }

      req.user = user;
      next();
    } catch (error) {
      console.log(error);
      next(error);
    }
  })(req, res, next);
}
