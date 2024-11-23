const jwt = require("jsonwebtoken");

exports.generatetoken = async (user) => {
  try {
    const token = await jwt.sign({ id: user._id }, process.env.JWT_KEY);
    return token;
  } catch (error) {
    console.log("Error in token generate function", error);
  }
};
