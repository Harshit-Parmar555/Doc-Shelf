const mongoose = require("mongoose");

const userschema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilepicture: {
    type: String,
    required: true,
  },
  files: [
    {
      type: mongoose.Types.ObjectId,
      ref: "file",
    },
  ],
  sharefile: [
    {
      type: mongoose.Types.ObjectId,
      ref: "sharefile",
    },
  ],
});

const usermodel = mongoose.model("user", userschema);

module.exports = { usermodel };
