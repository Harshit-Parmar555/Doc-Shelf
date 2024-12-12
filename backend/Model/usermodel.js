import mongoose from "mongoose";

const userschema = new mongoose.Schema(
  {
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
    avatar: {
      type: String,
      default: "",
    },
    files: [
      {
        type: mongoose.Types.ObjectId,
        ref: "file",
      },
    ],
    receivedfiles: [
      {
        type: mongoose.Types.ObjectId,
        ref: "sharedfile",
      },
    ],
  },
  { timestamps: true }
);

const usermodel = mongoose.model("user", userschema);

export {usermodel}