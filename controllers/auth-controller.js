import {
  signupValidator,
  signinValidator,
} from "../validators/auth-validators.js";

export const signupController = async (req, _, next) => {
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

export const signinController = async (req, _, next) => {
  try {
    const { email, password } = req.body;

    const user = { email, password };

    const validatedUser = await signinValidator.validate(user);

    req.user = validatedUser;

    next();
  } catch (error) {
    next(error);
  }
};
