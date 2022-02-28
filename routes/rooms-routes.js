const express = require("express");
const { check } = require("express-validator/check");
const roomController = require("../controllers/rooms-controllers");

const router = express.Router();

router.post(
  "/room",
  [
    check("price", "Price is required").isNumeric(),
    check("available", "Availability is required").isBoolean(),
    check('description', 'Description is required').not().isEmpty(),
    check('type', 'Type is required').not().isEmpty()
  ],
  roomController.createRoom
);
router.get("/rooms", roomController.getRooms);
router.get("/room/:id", roomController.getRoomById);
router.get("/rooms/price/:id", roomController.getRoomsByPrice);

module.exports = router;
