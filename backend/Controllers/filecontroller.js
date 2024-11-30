const fs = require("fs");
const { filemodel } = require("../Model/filemodel");
const { usermodel } = require("../Model/usermodel");
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
    const storageref = ref(storage, "files/" + file.filename);
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
    return res.status(404).send({
      success: false,
      message: "Error in get files controller",
    });
  }
};

