const express = require("express");

const roomController = require("../controllers/rooms-controllers");

const router = express.Router();

router.post('/room', roomController.createRoom);
router.get('/rooms', roomController.getRooms);
router.get('/room/:id', roomController.getRoomById)
router.get('/rooms/price/:id', roomController.getRoomsByPrice)

module.exports = router