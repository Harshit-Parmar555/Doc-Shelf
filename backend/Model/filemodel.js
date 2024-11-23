const mongoose = require("mongoose");

const fileschema = new mongoose.Schema({
  filename: {
    type: String,
    required: true,
  },
  filepath: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
});

const filemodel = mongoose.model("file", fileschema);

module.exports = { filemodel };
