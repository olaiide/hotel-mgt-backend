const express = require("express");

const roomController = require("../controllers/rooms-controllers");

const router = express.Router();

router.post('/room', roomController.createRoom);
router.get('/rooms', roomController.getRooms);

module.exports = router