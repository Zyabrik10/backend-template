import jsonwebtoken from "jsonwebtoken";
import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: String,
  token: {
    type: String,
    default: "",
  },
  verifyToken: {
    type: String,
    default: "",
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  avatar: {
    type: String,
    default: "",
  },
  role: {
    type: String,
    enum: ["admin", "moderator", "user"],
    default: "user",
    required: true,
  },
});

UserSchema.methods.generateToken = function (id, expiresIn = "1d") {
  this.token = jsonwebtoken.sign({ id }, process.env.SECRET_KEY, {
    expiresIn,
  });
};

UserSchema.methods.generateVerifyToken = function (id, expiresIn = "5m") {
  this.verifyToken = jsonwebtoken.sign({ id }, process.env.SECRET_KEY, {
    expiresIn,
  });
};

UserSchema.methods.setPassword = function (password) {
  this.password = bcryptjs.hashSync(password, bcryptjs.genSaltSync(6));
};

UserSchema.methods.validPassword = function (password) {
  return bcryptjs.compareSync(password, this.password);
};

/*
userScheme.methods.generateAvatar = function (email) {
  const emailHash = crypto
    .createHash("md5", email)
    .update("emailAdress")
    .digest("hex");

  this.avatarURL = `https://www.gravatar.com/avatar/${emailHash}?d=identicon`;
};
*/

const User = mongoose.model("user", UserSchema);
export default User;
