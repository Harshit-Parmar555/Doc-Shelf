const mongoose = require("mongoose");

const sharefileschema = new mongoose.Schema({
  filename: {
    type: String,
    required: true,
  },
  filepath: {
    type: String,
    required: true,
  },
  sender: {
    type: String,
    required: true,
    ref: "user",
  },
});

const sharefilemodel = mongoose.model("sharefile", sharefileschema);

module.exports = { sharefilemodel };
