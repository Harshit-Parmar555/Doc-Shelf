const mongoose = require("mongoose");

const connect = async () => {
  try {
    await mongoose.connect(process.env.DATABASE);
    console.log("Connection with database successfull");
  } catch (error) {
    console.log("Error in connecting with database", error);
  }
};

module.exports = { connect };
