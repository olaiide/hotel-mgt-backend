
const Room = require("../models/rooms-model");

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
    // res.status(200).json({ room: createdRoom.toObject({ getters: true }) });
  } catch (error) {
    console.log(error);
  }
   res.status(200).json({ room: createdRoom.toObject({ getters: true }) });
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
exports.createRoom = createRoom;
exports.getRooms = getRooms;
