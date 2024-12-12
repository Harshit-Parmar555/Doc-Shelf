import jwt from "jsonwebtoken"

const checkauth = (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res.status(404).send({
        success: false,
        message: "Not Authorized",
      });
    }
    try {
      const decoded = jwt.decode(token, process.env.JWT_KEY);
      req.userid = decoded.userid;
      next();
    } catch (error) {
      return res.status(404).send({
        success: false,
        message: "Not Authorized",
      });
    }
  } catch (error) {
    return req.status(404).send("Error in auth controller");
  }
};

export {checkauth}