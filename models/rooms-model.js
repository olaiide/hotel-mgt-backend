const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const roomSchema = new Schema({
  price: {
    type: Number,
    required: true,
  },
  available: {
    type: Boolean,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  description : {
      type : String,
      required : true,
  }
});

module.exports = mongoose.model('Rooms', roomSchema)

