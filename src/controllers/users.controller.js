import { emailUser } from "../config/email.config.js";
import { User } from "../models/index.js";
import { sendMail } from "../services/email.service.js";
import { forgotPasswordHTML, userVerifyHTML } from "../utils/js-html.js";

export async function getAllUsers(req, res) {
  const { username, email, isVerified, role } = req.query;

  const limit = Math.max(1, Math.min(Number(req.query.limit) || 10, 100));
  const page = Math.max(1, Number(req.query.page) || 1);

  const query = {};

  if (role && role !== "user") query.role = role;
  if (isVerified) query.isVerified = isVerified;
  if (username) query.username = username;
  if (email) query.email = email;

  const users = await User.find(query)
    .limit(limit)
    .skip(limit * Math.max(0, page - 1));

  const sanitizedUsers = users.map(
    ({
      _id,
      username,
      email,
      avatar,
      isVerified,
      role,
      token,
      verifyToken,
    }) => ({
      id: _id,
      username,
      email,
      avatar,
      isVerified,
      role,
      token,
      verifyToken,
    })
  );

  res.status(200).json(sanitizedUsers);
}

export async function getUserById(req, res) {
  const { _id, username, email, avatar, isVerified, role, token, verifyToken } =
    req.foundUser;

  const user = {
    id: _id,
    username,
    email,
    avatar,
    isVerified,
    role,
    token,
    verifyToken,
  };
  res.status(200).json(user);
}

export async function getMe(req, res) {
  const { _id, username, email, avatar, isVerified, role } = req.user;

  const user = {
    id: _id,
    username,
    email,
    avatar,
    isVerified,
    role,
  };

  res.status(201).json(user);
}

export async function updateMe(req, res) {
  for (let key in req.validatedUpdateMe) {
    if (req.validatedUpdateMe[key]) req.user[key] = req.validatedUpdateMe[key];
  }
  
  await req.user.save();

  const { _id, isVerified, role, username, email, avatar } =
    req.user;

  const user = {
    id: _id,
    username,
    email,
    avatar,
    isVerified,
    role,
  };

  res.status(200).json(user);
}

export async function update(req, res) {
  console.log(req.validatedUpdate);
  for (let key in req.validatedUpdate) {
    if (req.validatedUpdate[key]) req.foundUser[key] = req.validatedUpdate[key];
  }

  await req.foundUser.save();

    const { _id, isVerified, role, username, email, avatar } = req.foundUser;

  const user = {
    id: _id,
    username,
    email,
    avatar,
    isVerified,
    role,
  };

  res.status(200).json(user);
}

export async function sendUserVerification(req, res) {
  if (req.user.isVerified && !req.user.verifyToken) {
    res.status(200).json({
      message: "User is verified",
    });
    return;
  }

  req.user.generateVerifyToken(req.user.id);
  await req.user.save();

  sendMail({
    from: emailUser,
    to: emailUser,
    subject: "Company verification",
    html: userVerifyHTML(req.user.verifyToken),
  });

  res.status(200).json({ message: "User verification sent" });
}

export async function verifyUser(req, res) {
  req.user.verifyToken = null;
  req.user.isVerified = true;

  await req.user.save();

  res.status(200).json({ message: "Verified" });
}

export async function sendForgotPasswordForm(req, res) {
  req.user.generateVerifyToken(req.user.id);
  await req.user.save();

  sendMail({
    from: emailUser,
    to: emailUser,
    subject: "Forgot password",
    html: forgotPasswordHTML(req.user.verifyToken),
  });

  res.status(200).json({ message: "Passport recovery sent" });
}

export async function updatePassword(req, res) {
  await req.user.setPassword(req.body.password);
  req.user.verifyToken = null;
  await req.user.save();

  res.status(200).json({ message: "Passport changed" });
}

export async function sentChangePasswordForm(req, res) {
  res.status(200).render("passport-change-form", {
    token: req.user.verifyToken,
  });
}

export async function deleteUser(req, res) {
  await User.findOneAndDelete({ _id: req.foundUser.id });

  res.status(200).json({
    message: "User removed",
  });
}
