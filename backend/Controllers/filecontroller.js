const fs = require("fs");
const { filemodel } = require("../Model/filemodel");
const { usermodel } = require("../Model/usermodel");
const { sharefilemodel } = require("../Model/sharefile");
const mongoose = require("mongoose");

const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} = require("firebase/storage");
const { app } = require("../Utils/firebaseconfig");

exports.uploadfilecontroller = async (req, res) => {
  try {
    const file = req.file;
    const { filename } = req.body;
    const user = req.user;
    if (!file || !filename || !user) {
      return res.status(404).send({
        success: false,
        message: "Please fill all the fields",
      });
    }
    const storage = getStorage(app);
    const storageref = ref(storage, "Doc-Shlelf-Files/" + file.filename);
    const filebuffer = fs.readFileSync(file.path);
    await uploadBytes(storageref, filebuffer, { contentType: file.mimetype });
    const url = await getDownloadURL(storageref);
    fs.unlinkSync(file.path);

    const newuser = await usermodel.findById(user);
    const newfile = new filemodel({
      filename: filename,
      filepath: url,
      user: newuser,
    });

    const session = await mongoose.startSession();
    session.startTransaction();
    await newfile.save({ session });
    newuser.files.push(newfile);
    await newuser.save({ session });
    await session.commitTransaction();
    await newfile.save();

    return res.status(202).send({
      success: true,
      message: "File Uploaded",
      url,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).send({
      success: false,
      message: "Error in upload file controller",
    });
  }
};

exports.deletefilecontroller = async (req, res) => {
  try {
    const file = await filemodel.findById(req.params.id).populate("user");
    file.user.files.pull(file);
    file.user.save();
    const deletedfile = await filemodel.findByIdAndDelete(req.params.id);
    return res.status(202).send({
      success: true,
      message: "file deleted",
    });
  } catch (error) {
    console.log(error);
    return res.status(404).send({
      success: false,
      message: "Error in delete file controller",
    });
  }
};

exports.getallfiles = async (req, res) => {
  try {
    const userid = req.user;
    if (!userid) {
      return res.status(404).send({
        success: false,
        message: "something wrong",
      });
    }
    const user = await usermodel.findById(req.user).populate("files");
    const userfiles = user.files;
    return res.status(202).send({
      success: true,
      message: "files found",
      userfiles,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).send({
      success: false,
      message: "Error in get files controller",
    });
  }
};

// share file

exports.sharefile = async (req, res) => {
  try {
    const { email, filename, filepath } = req.body;
    if (!email || !filename || !filepath) {
      return res.status(404).send({
        success: false,
        message: "Please fill all the fields",
      });
    }
    const senderid = req.user;
    const sender = await usermodel.findById(senderid);
    const senderemail = sender.email;
    if (senderemail === email) {
      return res.status(404).send({
        success: false,
        message: "Please Enter Others email",
      });
    }
    if (!sender) {
      return res.status(404).send({
        success: false,
        message: "Something went wrong",
      });
    }
    const receiver = await usermodel.findOne({
      email,
    });
    if (!receiver) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    const newfileshare = new sharefilemodel({
      filename: filename,
      filepath: filepath,
      sender: senderemail,
    });
    newfileshare.save();
    receiver.sharefile.push(newfileshare);
    await receiver.save();
    return res.status(202).send({
      success: true,
      message: "File shared successfully",
    });
  } catch (error) {
    return res.status(404).send({
      success: false,
      message: "Error in share file controller",
    });
  }
};

exports.getallsharefile = async (req, res) => {
  try {
    const userid = req.user;
    if (!userid) {
      return res.status(404).send({
        success: false,
        message: "something went wrong",
      });
    }
    const userobject = await usermodel.findById(userid).populate("sharefile");
    if (!userobject) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    const sharedfiles = userobject.sharefile;
    return res.status(202).send({
      success: true,
      message: "Shared file fetched",
      sharedfiles,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).send({
      success: false,
      message: "Error in get all share file controller",
    });
  }
};
