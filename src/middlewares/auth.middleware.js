import jsonwebtoken from "jsonwebtoken";
import User from "../models/User.js";
import { catchError, createStatusError, getToken } from "../utils/helperFunctions.js";
import {
  loginValidator,
  signupValidator,
} from "../validators/auth.validator.js";

export const validateLogin = catchError(async (req, _) => {
  const { password, email } = await loginValidator.validate(req.body);

  const user = await User.findOne({ email });

  if (!user?.validPassword(password)) throw new Error("Invalid email or password");
  
  req.user = user;

});

export const validateSignup = catchError(async (req, _) => {
  const { username, password, email } = await signupValidator.validate(
    req.body
  );

  if (await User.exists({ email })) throw createStatusError("", 409);

  req.newUser = {
    username,
    password,
    email,
  };
});

export const verifyToken = function (tokenProperty) {
  return catchError(async (req, _) => {
    const token = getToken(req);
  
    if (!token) throw createStatusError("jwt must be provided", 401);

    const verify = jsonwebtoken.verify(token, process.env.SECRET_KEY);

    const { id } = verify;

    const user = await User.findOne({ _id: id });

    if (!user) {
      throw createStatusError("User not found", 404);
    }

    if (token !== user[tokenProperty]) {
      throw createStatusError("Unauthorized", 401);
    }

    req.user = user;
  });
}
