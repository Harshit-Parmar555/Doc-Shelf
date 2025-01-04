import mongoose from "mongoose";

export const connect = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Connection successfull with database");
  } catch (error) {
    console.log("Error in connecting with database", error);
  }
};
