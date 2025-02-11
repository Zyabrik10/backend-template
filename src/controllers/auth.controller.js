import { emailUser } from "../config/email.config.js";
import { User } from "../models/index.js";
import { sendMail } from "../services/email.service.js";
import { userVerifyHTML } from "../utils/js-html.js";

export async function login(req, res) {
  const { _id, username, email, avatar, isVerified, role } =
    req.user;

  req.user.generateToken(req.user.id);

  await req.user.save();

  const user = {
    id: _id,
    username,
    email,
    avatar,
    isVerified,
    role,
    token: req.user.token,
  };

  res.status(200).json(user);
}

export async function signup(req, res) {
  const { username, password, email } = req.newUser;

  const newUser = new User({
    username,
    email,
  });

  newUser.generateToken(newUser._id);
  newUser.generateVerifyToken(newUser._id);
  newUser.setPassword(password);

  await newUser.save();

  sendMail({
    from: emailUser,
    to: emailUser,
    subject: "Company verification",
    html: userVerifyHTML(newUser.verifyToken),
  });

  const user = {
    id: newUser._id,
    username: newUser.username,
    email: newUser.email,
    avatar: newUser.avatar,
    isVerified: newUser.isVerified,
    role: newUser.role,
    token: newUser.token,
  };

  res.status(201).json(user);
}

export async function logout(req, res) {
  req.user.token = null;
  await req.user.save();

  res.status(200).json({ message: "Signed out" });
}

