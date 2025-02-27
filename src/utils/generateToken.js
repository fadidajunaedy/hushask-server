const jwt = require("jsonwebtoken");

const accessToken = async (user) => {
  const payload = { _id: user._id };
  return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "480m" });
};

const resetPasswordToken = async (user) => {
  const payload = { _id: user._id };
  return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "30m" });
};

module.exports = { accessToken, resetPasswordToken };
