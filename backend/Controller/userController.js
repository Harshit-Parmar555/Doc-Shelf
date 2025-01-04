import bcrypt from "bcrypt";
import { userModel } from "../Models/userModel.js";
import { generateToken } from "../utils/jwt.js";

import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { app } from "../utils/firebaseconfig.js";
import fs from "fs";

export const register = async (req, res) => {
  try {
    const { username, email, password, confirmpassword } = req.body;
    if (!username || !email || !password || !confirmpassword) {
      return res.status(400).send({
        success: false,
        message: "Please fill all the fields",
      });
    }
    if (password !== confirmpassword) {
      return res.status(400).send({
        success: false,
        message: "Passwords not matched",
      });
    }
    const userexist = await userModel.findOne({ email });
    if (userexist) {
      return res.status(400).send({
        success: false,
        message: "User already exist",
      });
    }
    const hashedpassword = await bcrypt.hash(password, 10);
    const newuser = new userModel({
      username: username,
      email: email,
      password: hashedpassword,
    });
    await newuser.save();
    return res.status(200).send({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    return res.status(504).send({
      success: false,
      message: "Error in register controller",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Please fill all the fields",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "USer not found",
      });
    }
    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      return res.status(400).send({
        success: false,
        message: "Invalid credentials",
      });
    }
    const token = await generateToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
    });
    const senduser = await userModel.findOne({ email }).select("-password");
    return res.status(200).send({
      success: true,
      message: "Login Successfull",
      user: senduser,
    });
  } catch (error) {

    return res.status(500).send({
      success: false,
      message: "Error in login controller",
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", { httpOnly: true, secure: true });
    return res.status(200).send({
      success: true,
      message: "Logout successfull",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in User Logout Controller",
    });
  }
};

export const checkAuth = (req, res) => {
  try {
    res.status(202).json(req.user);
  } catch (error) {
    return res.status(504).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const updateprofile = async (req, res) => {
  try {
    const profile = req.file;
    if (!profile) {
      return res.status(400).send({
        success: false,
        message: "Something went wrong",
      });
    }
    const storage = getStorage(app);
    const storageref = ref(
      storage,
      "DocShelf_Storage_Profiles/" + profile.filename
    );
    const filebuffer = fs.readFileSync(profile.path);
    await uploadBytes(storageref, filebuffer, {
      contentType: profile.mimetype,
    });
    const url = await getDownloadURL(storageref);
    fs.unlinkSync(profile.path);

    const user = await userModel.findByIdAndUpdate(
      req.user._id,
      { profile: url },
      { new: true }
    ).select("-password");

    return res.status(200).send({
      success: true,
      message: "Profile Updated Successfully",
      user:user
    });
  } catch (error) {

    return res.status(500).send({
      success: false,
      message: "Error in update profile controller",
    });
  }
};
