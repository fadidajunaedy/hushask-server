const userService = require("../services/userService.js");

const register = async (req, res, next) => {
  try {
    const request = req.body;
    const result = await userService.register(request);
    res.status(200).json({
      success: true,
      message: "Register success",
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const login = async (req, res, next) => {
  try {
    const request = req.body;
    const result = await userService.login(request);
    res.status(200).json({
      success: true,
      message: "Login success",
      token: result,
    });
  } catch (e) {
    next(e);
  }
};

const get = async (req, res, next) => {
  try {
    const user = req.user;
    res.status(200).json({
      success: true,
      message: "Get user success",
      data: user,
    });
  } catch (e) {
    next(e);
  }
};

const forgotPassword = async (req, res, next) => {
  try {
    const request = req.body;
    await userService.forgotPassword(request);
    res.status(200).json({
      success: true,
      message: "Password reset link has been sent to your email.",
    });
  } catch (e) {
    next(e);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const token = req.params.token;
    const request = req.body;
    await userService.resetPassword(token, request);
    res.status(200).json({
      success: true,
      message: "Password Reset Success.",
    });
  } catch (e) {
    next(e);
  }
};

const changePassword = async (req, res, next) => {
  try {
    const user = req.user;
    const request = req.body;
    await userService.changePassword(user, request);
    res.status(200).json({
      success: true,
      message: "Change password success",
    });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  register,
  login,
  get,
  forgotPassword,
  resetPassword,
  changePassword,
};
