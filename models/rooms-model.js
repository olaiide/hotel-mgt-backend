const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator')
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
  },

});

roomSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Room', roomSchema)

