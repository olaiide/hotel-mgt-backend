
const Room = require("../models/rooms-model");
const mongoose = require('mongoose')
const createRoom = async (req, res, next) => {
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
  } catch (error) {
    console.log(error);
  }
  // res.status(200).json({ room: createdRoom.toObject({ getters: true }) });
};

const getRooms = async (req, res, next) => {
    let rooms;
    try {
        rooms = await Room.find();
    }catch (err){
        console.log(err)
    }
    res.status(200).json({ rooms})
}

const getRoomsByPrice = async (req, res) => {
    let rooms;
    const roomPriceId = req.params.id
    try {
        rooms = await Room.find({price : roomPriceId})
        res.status(200).json(rooms)
    }catch(error){
     console.log(error)
    }
}

const getRoomById = async (req, res) => {
  
  const roomId = req.params.id;
  
  let room;
  try {
    room = await Room.findById(roomId)
    res.status(200).json({ room : room.toObject({ getters: true })});
  } catch(error){
    console.log(error)
  }

  // const roomId = req.params.id;
 
}
exports.createRoom = createRoom;
exports.getRooms = getRooms;
exports.getRoomsByPrice = getRoomsByPrice;
exports.getRoomById = getRoomById
