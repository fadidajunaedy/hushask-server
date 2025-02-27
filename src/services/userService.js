const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js");
const ResetPasswordToken = require("../models/resetPasswordTokenModel.js");
const generateToken = require("../utils/generateToken.js");
const generateEmail = require("../utils/generateEmail.js");
const passwordUtil = require("../utils/passwordUtil.js");
const ResponseError = require("../utils/responseError.js");

const register = async (request) => {
  const isEmailExist = await User.findOne({ email: request.email });
  if (isEmailExist) throw new ResponseError(400, "Email already exist");

  request.password = await passwordUtil.hashPassword(request.password);
  return await User.create(request);
};

const login = async (request) => {
  const user = await User.findOne({ email: request.email });
  if (!user) throw new ResponseError(400, "Email or Password are wrong");

  const isMatch = await passwordUtil.comparePassword(
    request.password,
    user.password
  );

  if (!isMatch) throw new ResponseError(400, "Email or Password are wrong");
  return await generateToken.accessToken(user);
};

const forgotPassword = async (request) => {
  const user = await User.findOne({ email: request.email });
  if (!user) throw new ResponseError(400, "Email is not found");

  const resetPasswordToken = await generateToken.resetPasswordToken(user);
  await ResetPasswordToken.create({
    userId: user._id,
    token: resetPasswordToken,
  });

  return await generateEmail.emailResetPassword(user, resetPasswordToken);
};

const resetPassword = async (token, request) => {
  const checkToken = await ResetPasswordToken.findOne({ token });
  if (!checkToken) throw new ResponseError(400, "Token not found");

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    if (!decodedToken._id) throw new ResponseError(400, "User ID not found");

    const user = await User.findOneAndUpdate(
      { _id: decodedToken._id },
      { password: await hashPassword(request.newPassword) },
      { new: true }
    );

    if (!user) throw new ResponseError(400, "User not found");

    return await ResetPasswordToken.deleteOne({ token });
  } catch (error) {
    await ResetPasswordToken.deleteOne({ token });

    if (error.name === "TokenExpiredError") {
      throw new ResponseError(400, "Token has expired");
    } else if (error.name === "JsonWebTokenError") {
      throw new ResponseError(400, "Token is invalid");
    } else {
      throw new ResponseError(500, "Error verifying token");
    }
  }
};

const changePassword = async (user, request) => {
  const isMatch = await comparePassword(request.currentPassword, user.password);
  if (!isMatch) throw new ResponseError(400, "Current password are wrong");

  const newPassword = await hashPassword(request.newPassword);
  return await User.updateOne({ _id: user._id }, { password: newPassword });
};

module.exports = {
  register,
  login,
  forgotPassword,
  resetPassword,
  changePassword,
};
