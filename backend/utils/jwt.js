import jwt from "jsonwebtoken";

export const generateToken = async (Id) => {
  try {
    const token = await jwt.sign({ Id: Id }, process.env.JWT_KEY);
    return token;
  } catch (error) {
    console.log(error);
  }
};
