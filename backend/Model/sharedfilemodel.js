import mongoose from "mongoose";

const sharedfileschema = new mongoose.Schema(
  {
    filename: {
      type: String,
      required: true,
    },
    filepath: {
      type: String,
      required: true,
    },
    sender: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: true,
    },
    receiver: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true }
);

const sharedfilemodel = mongoose.model("sharedfile", sharedfileschema);

export { sharedfilemodel };
