const questionService = require("../services/questionService.js");
const supabase = require("../utils/supabaseClient.js");

const get = async (req, res, next) => {
  try {
    const { questionId } = req.params;
    const result = await questionService.get(questionId);
    res.status(200).json({
      success: true,
      message: "Get question success",
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const getAllByRoomId = async (req, res, next) => {
  try {
    const { roomId } = req.params;
    const result = await questionService.getAllByRoomId(roomId);
    res.status(200).json({
      success: true,
      message: "Get all question by roomId success",
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const getAll = async (req, res, next) => {
  try {
    const result = await questionService.getAll();
    res.status(200).json({
      success: true,
      message: "Get all question by roomId success",
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const create = async (req, res, next) => {
  try {
    const request = req.body;
    request.ipAddress = req.ipAddress;
    const result = await questionService.create(request);

    await supabase.channel(`room-${result.roomId}`).send({
      type: "broadcast",
      event: "questionUpdate",
      payload: result,
    });

    res.status(200).json({
      success: true,
      message: "Create Task Success",
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const remove = async (req, res, next) => {
  try {
    const { questionId } = req.params;
    await questionService.remove(questionId);
    res.status(200).json({
      success: true,
      message: "Delete question success",
    });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  get,
  getAllByRoomId,
  getAll,
  create,
  remove,
};
