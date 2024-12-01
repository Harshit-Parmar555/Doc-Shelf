const { usermodel } = require("../Model/usermodel");
const bcrypt = require("bcrypt");
const { generatetoken } = require("../Utils/tokengenerate");
const { upload } = require("../Middlewares/multer");
const fs = require("fs");

const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} = require("firebase/storage");
const { app } = require("../Utils/firebaseconfig");

exports.registercontroller = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(404).send({
        success: false,
        message: "Please fill all the fields",
      });
    }
    const isexist = await usermodel.findOne({ email });
    if (isexist) {
      return res.status(404).send({
        success: false,
        message: "user already exist",
      });
    }
    const file = req.file;
    if (!file) {
      return res.status(404).send({
        success: false,
        message: "Error in File Uploading",
      });
    }
    const storage = getStorage(app);
    const storageref = ref(storage, "Docshelf-ProfilePictures/" + file.filename);
    const filebuffer = fs.readFileSync(file.path);
    await uploadBytes(storageref, filebuffer, { contentType: file.mimetype });
    const url = await getDownloadURL(storageref);
    fs.unlinkSync(file.path);
    const hashedpassword = await bcrypt.hash(password, 10);
    const newuser = new usermodel({
      username,
      email,
      password: hashedpassword,
      profilepicture: url,
    });
    await newuser.save();
    return res.status(202).send({
      success: true,
      message: "user created successfully",
      newuser,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).send({
      success: false,
      message: "Error in user register controller",
    });
  }
};

exports.logincontroller = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Please fill all the fields",
      });
    }
    const isexist = await usermodel.findOne({ email });
    if (!isexist) {
      return res.status(404).send({
        success: false,
        message: "user not found",
      });
    }
    const ismatched = await bcrypt.compare(password, isexist.password);
    if (!ismatched) {
      return res.status(404).send({
        success: false,
        message: "Password not matched",
      });
    }

    const user = await usermodel.findOne({ email });

    const token = await generatetoken(user);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
    });

    return res.status(202).send({
      success: true,
      message: "Login successfull",
    });
  } catch (error) {
    return res.status(404).send({
      success: false,
      message: "Error in login controller",
    });
  }
};

exports.logoutcontroller = (req, res) => {
  try {
    res.clearCookie("token", { httpOnly: true, secure: true });
    return res.status(202).send({
      success: true,
      message: "Logout successfull",
    });
  } catch (error) {
    return res.status(404).send({
      success: false,
      message: "Error in Logout controller",
    });
  }
};

exports.userdetails = async (req, res) => {
  try {
    const userid = req.user;
    const user = await usermodel.findById(userid);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    return res.status(202).send({
      success: true,
      message: "User details fetched",
      user,
    });
  } catch (error) {
    return res.status(404).send({
      success: false,
      message: "Error in user detail controller",
    });
  }
};
