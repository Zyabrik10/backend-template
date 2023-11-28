// TODO: implement sign in logic here
// TODO: implement sign out logic here
import { User } from "../db-models/user-model.js";
import CreateError from "../handler/error.js";

export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.user;

    const createdUser = new User({
      username,
      email,
    });

    createdUser.setPassword(password);
    createdUser.generateAvatar(email);
    createdUser.generateToken(createdUser._id);

    await createdUser.save();

    const user = {
      id: createdUser._id,
      username: createdUser.username,
      email: createdUser.email,
      avatarURL: createdUser.avatarURL,
    };

    res.status(201).json({ user, token: createdUser.token });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.user;

    const user = await User.findOne({ email });

    if (!user) throw CreateError(400, "Wrong email or password");

    const validPassword = user.validPassword(password);

    if (!validPassword) throw CreateError(400, "Wrong email or password");

    user.generateToken();

    const validUser = {
      id: user._id,
      username: user.username,
      email: user.email,
      avatarURL: user.avatarURL,
    };

    res.status(200).json({ user: validUser, token: user.token });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

export const signout = (req, res) => {
  res.status(201).json({});
};
