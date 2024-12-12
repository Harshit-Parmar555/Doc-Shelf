import mongoose from "mongoose";

export const connect = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Successfully Connected with Database");
  } catch (error) {
    console.log("Error in Connecting with Database", error);
  }
};
