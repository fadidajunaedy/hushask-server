const Question = require("../models/questionModel.js");
const Room = require("../models/roomModel.js");
const ResponseError = require("../utils/responseError.js");
const supabase = require("../utils/supabaseClient.js");

const get = async (questionId) => {
  const question = await Question.findById(questionId);
  if (!question) throw new ResponseError(404, "Question not found");
  return question;
};

const getAllByRoomId = async (roomId) => {
  const questions = await Question.find({ roomId });
  if (!questions) throw new ResponseError(404, "Questions not found");
  return questions;
};

const getAll = async () => {
  const questions = await Question.find({});
  if (!questions) throw new ResponseError(404, "Questions not found");
  return questions;
};

const create = async (request) => {
  const room = await Room.findById(request.roomId);
  if (!room) throw new ResponseError(404, "Room not found");

  return await Question.create(request);
};

const remove = async (questionId) => {
  const question = await Question.findById(questionId);
  if (!question) throw new ResponseError(404, "Question not found");

  return await question.deleteOne();
};

module.exports = {
  get,
  getAllByRoomId,
  getAll,
  create,
  remove,
};
