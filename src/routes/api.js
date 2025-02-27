const express = require("express");
const privateRouter = new express.Router();
const authMiddleware = require("../middlewares/authMiddleware.js");
const ipMiddleware = require("../middlewares/ipMiddleware.js");
const validate = require("../middlewares/validationMiddleware.js");

privateRouter.use(authMiddleware);

const userController = require("../controllers/userController.js");
privateRouter.get("/api/users", userController.get);

const roomController = require("../controllers/roomController.js");
const roomValidation = require("../validations/roomValidation.js");
privateRouter.get("/api/rooms", roomController.getAll);
privateRouter.post(
  "/api/rooms",
  validate(roomValidation.createRoom),
  roomController.create
);
privateRouter.patch(
  "/api/rooms/:roomId",
  validate(roomValidation.updateRoom),
  roomController.update
);
privateRouter.delete(
  "/api/rooms/:roomId",
  validate(roomValidation.getRoom),
  roomController.remove
);

const questionController = require("../controllers/questionController.js");
const questionValidation = require("../validations/questionValidation.js");
privateRouter.get("/api/questions", questionController.getAll);
privateRouter.post(
  "/api/questions",
  validate(questionValidation.createQuestion),
  ipMiddleware.captureIp,
  questionController.create
);
privateRouter.delete(
  "/api/questions/:questionId",
  validate(questionValidation.deleteQuestion),
  ipMiddleware.verifyIp,
  questionController.remove
);

module.exports = privateRouter;
