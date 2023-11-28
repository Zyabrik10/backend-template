import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import crypto from "crypto";
import jsonwebtoken from "jsonwebtoken";

const userScheme = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: String,
  avatarURL: String,
  token: String,
});

userScheme.methods.setPassword = function (password) {
  this.password = bcryptjs.hashSync(password, bcryptjs.genSaltSync(6));
};

userScheme.methods.validPassword = function (password) {
  return bcryptjs.compareSync(password, this.password);
};

userScheme.methods.generateAvatar = function (email) {
  const emailHash = crypto
    .createHash("md5", email)
    .update("emailAdress")
    .digest("hex");

  this.avatarURL = `https://www.gravatar.com/avatar/${emailHash}?d=identicon`;
};

userScheme.methods.generateToken = function (id) {
  this.token = jsonwebtoken.sign({ id }, process.env.SECRET, {
    expiresIn: "1h",
  });
};

export const User = mongoose.model("users", userScheme);
