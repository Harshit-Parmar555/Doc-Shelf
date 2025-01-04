import jwt from "jsonwebtoken";
import { userModel } from "../Models/userModel.js";

export const protectedRoute = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res.status(400).send({
        success: false,
        message: "Not Authorized",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    if (!decoded) {
      return res.status(400).send({
        success: false,
        message: "Invalid Token Provided",
      });
    }
    const user = await userModel.findById(decoded.Id).select("-password");
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "User Not Found In Database",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};
