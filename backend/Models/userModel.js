import mongoose from "mongoose";
import { type } from "os";

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
    profile: {
      type: String,
      default: "",
    },
    documents: [
      {
        type: mongoose.Types.ObjectId,
        ref: "document",
      },
    ],
  },
  { timestamps: true }
);

export const userModel = mongoose.model("user", userschema);
