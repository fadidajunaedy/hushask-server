const express = require("express");
const publicRouter = new express.Router();
const validate = require("../middlewares/validationMiddleware.js");

const userController = require("../controllers/userController.js");
publicRouter.post("/api/auth/register", userController.register);
publicRouter.post("/api/auth/login", userController.login);
publicRouter.post("/api/auth/forgot-password", userController.forgotPassword);
publicRouter.patch(
  "/api/auth/reset-password/:token",
  userController.resetPassword
);

const roomController = require("../controllers/roomController.js");
const roomValidation = require("../validations/roomValidation.js");
publicRouter.get(
  "/api/rooms/:roomId",
  validate(roomValidation.getRoom),
  roomController.get
);
publicRouter.get(
  "/api/rooms/access-code/:accessCode",
  validate(roomValidation.getRoomByAccessCode),
  roomController.getByAccessCode
);

const questionController = require("../controllers/questionController.js");
const questionValidation = require("../validations/questionValidation.js");
publicRouter.get(
  "/api/questions/:questionId",
  validate(questionValidation.getQuestion),
  questionController.get
);
publicRouter.get(
  "/api/questions/room-id/:roomId",
  questionController.getAllByRoomId
);

module.exports = publicRouter;
