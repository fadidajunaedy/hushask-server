const Room = require("../models/roomModel.js");
const ResponseError = require("../utils/responseError.js");
const { v4: uuidv4 } = require("uuid");

const get = async (roomId) => {
  const room = await Room.findById(roomId);
  if (!room) throw new ResponseError(404, "Room not found");
  return room;
};

const getByAccessCode = async (accessCode) => {
  const room = await Room.findOne({ accessCode: accessCode });
  if (!room) throw new ResponseError(404, "Room not found");
  return room;
};

const getAll = async (user) => {
  const rooms = await Room.find({ userId: user._id });
  if (!rooms) throw new ResponseError(404, "Rooms not found");
  return rooms;
};

const create = async (user, request) => {
  request.userId = user._id;
  const accessCode = uuidv4().substring(0, 6);
  request.accessCode = accessCode;

  return await Room.create(request);
};

const update = async (roomId, request) => {
  const room = await Room.findById(roomId);
  if (!room) throw new ResponseError(404, "Room not found");
  return await room.updateOne(request);
};

const remove = async (roomId) => {
  const room = await Room.findById(roomId);
  if (!room) throw new ResponseError(404, "Room not found");

  return await room.deleteOne();
};

module.exports = {
  get,
  getByAccessCode,
  getAll,
  create,
  update,
  remove,
};
