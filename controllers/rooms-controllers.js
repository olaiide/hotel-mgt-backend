const { validationResult } = require("express-validator");
const Room = require("../models/rooms-model");
const HttpError = require("../models/https-error");

const createRoom = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });
  const { price, available, type, description } = req.body;

  try {
    const createdRoom = new Room({
      price,
      available,
      type,
      description,
    });
    await createdRoom.save();
    res.status(200).json({ room: createdRoom.toObject({ getters: true }) });
  } catch (err) {
    const error = new HttpError("Something went wrong, try again later.");
    return next(error);
  }
};

const getRooms = async (req, res, next) => {
  let rooms;
  try {
    rooms = await Room.find();
  } catch (err) {
    console.log(err);
  }
  res.status(200).json({ rooms });
};

const getRoomsByPrice = async (req, res) => {
  let rooms;
  const roomPriceId = req.params.id;
  try {
    rooms = await Room.find({ price: roomPriceId });
    res.status(200).json(rooms);
  } catch (error) {
    console.log(error);
  }
};

const getRoomById = async (req, res, next) => {
  const roomId = req.params.id;

  let room;
  try {
    room = await Room.findById(roomId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a place.",
      500
    );
    return next(error);
  }

  if (!room) {
    const error = new HttpError(
      "Could not find a room for the provided id.",
      500
    );
    return next(error);
  }
};
exports.createRoom = createRoom;
exports.getRooms = getRooms;
exports.getRoomsByPrice = getRoomsByPrice;
exports.getRoomById = getRoomById;
