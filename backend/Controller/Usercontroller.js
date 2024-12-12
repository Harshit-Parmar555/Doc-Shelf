import { usermodel } from "../Model/usermodel.js";
import bcrypt from "bcrypt";
import { generatetoken } from "../Utils/jwttoken.js";

const Userregistercontroller = async (req, res) => {
  try {
    const { username, email, password, confirmpassword } = req.body;

    if (!username || !email || !password || !confirmpassword) {
      return res.status(400).send({
        success: false,
        message: "Please Fill All The Fields",
      });
    }
    if (password !== confirmpassword) {
      return res.status(404).send({
        success: false,
        message: "Confirm Password Not Matched",
      });
    }
    const isexist = await usermodel.findOne({ email });
    if (isexist) {
      return res.status(404).send({
        success: false,
        message: "User Already Exist",
      });
    }
    const randomAvatarURL = `https://robohash.org/${Math.random()
      .toString(36)
      .substring(7)}`;

    const hashedpassword = await bcrypt.hash(password, 10);

    const newuser = new usermodel({
      username: username,
      email: email,
      password: hashedpassword,
      avatar: randomAvatarURL,
    });
    await newuser.save();
    return res.status(202).send({
      success: true,
      message: "Registration Successfull",
      newuser,
    });
  } catch (error) {
    return res.status(504).send({
      success: false,
      message: "Error in Register Controller",
    });
  }
};

const Userlogincontroller = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Please Fill All The Fields",
      });
    }
    const user = await usermodel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    }
    const ismatch = await bcrypt.compare(password, user.password);
    if (!ismatch) {
      return res.status(404).send({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const token = await generatetoken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
    });
    return res.status(202).send({
      success: true,
      message: "Login Successfull",
    });
  } catch (error) {
    return res.status(504).send({
      success: false,
      message: "Error in Login Controller",
    });
  }
};

const Userlogoutcontroller = async (req, res) => {
  try {
    res.clearCookie("token", { httpOnly: true, secure: true });
    return res.status(202).send({
      success: true,
      message: "Logout successfull",
    });
  } catch (error) {
    return res.status(504).send({
      success: false,
      message: "Error in User Logout Controller",
    });
  }
};

const Userprofiledetails = async (req, res) => {
  try {
    const userid = req.userid;
    const user = await usermodel
      .findById(userid)
      .select("-password  -receivedfiles");
    return res.status(202).send({
      success: true,
      message: "User Found",
      user,
    });
  } catch (error) {
    return res.status(504).send({
      success: false,
      message: "Error In User Profile Detail Controller",
    });
  }
};

export {
  Userregistercontroller,
  Userlogincontroller,
  Userlogoutcontroller,
  Userprofiledetails,
};
