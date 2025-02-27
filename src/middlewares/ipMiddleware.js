module.exports = {
  captureIp: (req, res, next) => {
    req.ipAddress = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    next();
  },

  verifyIp: (req, res, next) => {
    req.ipAddress = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    next();
  },
};
