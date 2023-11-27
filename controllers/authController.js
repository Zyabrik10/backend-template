import CreateError from "../handler/error.js";
import { signupValidator } from "../validators/authValidators.js";

export const validateSignup = async (req, _, next) => {
  try {
    const { username, email, password } = req.body;

    const user = { username, email, password };

    const validatedUser = await signupValidator.validate(user);

    req.user = validatedUser;

    next();
  } catch (error) {
    next({ ...error, ...error.messages[0] });
  }
};

export const validateSignin = (req, _, next) => {
  try {
    const { email, password } = req.body;

    if (!(email || password)) throw CreateError(400, "Worng validation");

    next();
  } catch (error) {
    next(error);
  }
};

export const validateSignout = (req, res, next) => {
  try {
    next();
  } catch (error) {
    next(error);
  }
};
