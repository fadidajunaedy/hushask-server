const roomService = require("../services/roomService.js");
const supabase = require("../utils/supabaseClient.js");

const get = async (req, res, next) => {
  try {
    const { roomId } = req.params;
    const result = await roomService.get(roomId);
    res.status(200).json({
      success: true,
      message: "Get room success",
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const getByAccessCode = async (req, res, next) => {
  try {
    const { accessCode } = req.params;
    const result = await roomService.getByAccessCode(accessCode);
    res.status(200).json({
      success: true,
      message: "Get room by access code success",
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const getAll = async (req, res, next) => {
  try {
    const user = req.user;
    const result = await roomService.getAll(user);
    res.status(200).json({
      success: true,
      message: "Get all room success",
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const create = async (req, res, next) => {
  try {
    const user = req.user;
    const request = req.body;
    const result = await roomService.create(user, request);
    res.status(200).json({
      success: true,
      message: "Create room success",
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    const { roomId } = req.params;
    const request = req.body;
    const result = await roomService.update(roomId, request);

    await supabase.channel(`room-${result._id}`).send({
      type: "broadcast",
      event: "roomUpdate",
      payload: result,
    });

    res.status(200).json({
      success: true,
      message: "Update room success",
    });
  } catch (e) {
    next(e);
  }
};

const remove = async (req, res, next) => {
  try {
    const roomId = req.params.roomId;
    await roomService.remove(roomId);
    res.status(200).json({
      success: true,
      message: "Delete task success",
    });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  get,
  getByAccessCode,
  getAll,
  create,
  update,
  remove,
};
