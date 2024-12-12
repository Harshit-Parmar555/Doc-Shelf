import jwt from "jsonwebtoken";

const generatetoken = async (id) => {
  try {
    const token = await jwt.sign({ userid: id }, process.env.JWT_KEY);
    return token;
  } catch (error) {
    console.log(error);
  }
};

export { generatetoken };
