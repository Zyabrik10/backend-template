import { User } from "../db-schemas/user-schema.js";

export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.user;

    const doesUserExist = await User.findOne({ email });

    if (doesUserExist) throw new Error();

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
  } catch (error) {
    res.status(400).json({ message: "Something is wrong" });
  }
};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.user;

    const user = await User.findOne({ email });

    if (!user) throw new Error();

    const validPassword = user.validPassword(password);

    if (!validPassword) throw new Error();

    user.generateToken(user._id);

    await user.save();

    const validUser = {
      id: user._id,
      username: user.username,
      email: user.email,
      avatarURL: user.avatarURL,
    };

    res.status(200).json({ user: validUser, token: user.token });
  } catch (error) {
    res.status(400).json({ message: "Wrong email or password" });
  }
};

export const signout = async (req, res) => {
  try {
    const { _id } = req.user;

    await User.findOneAndUpdate({ _id }, { token: "" });

    res.status(204).json();
  } catch (error) {
    res.status(400).json({ message: "Something is wrong" });
  }
};
