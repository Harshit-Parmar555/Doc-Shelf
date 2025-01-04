import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
  {
    filename: {
      type: String,
      required: true,
    },
    filepath: {
      type: String,
      required: true,
    },
    downloadurl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const documentModel = mongoose.model("document", documentSchema);
