import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { app } from "../Utils/firebaseconfig.js";
import fs from "fs";
import { filemodel} from "../Model/filemodel.js";
import {usermodel} from "../Model/usermodel.js";
import mongoose from "mongoose";
import { sharedfilemodel } from "../Model/sharedfilemodel.js";

const uploadfilecontroller = async (req, res) => {
  try {
    const { filename } = req.body;
    const file = req.file;
    const userid = req.userid;
    if (!file) {
      return res.status(404).send({
        success: false,
        message: "File Not Found",
      });
    }
    if (!filename || !userid) {
      return res.status(404).send({
        success: false,
        message: "Please Fill All The Fields",
      });
    }

    const filepath = file.filename;
    const storage = getStorage(app);
    const storageref = ref(storage, "Doc_Shelf-UserFiles/" + file.filename);
    const filebuffer = fs.readFileSync(file.path);
    await uploadBytes(storageref, filebuffer, { contentType: file.mimetype });
    const url = await getDownloadURL(storageref);
    fs.unlinkSync(file.path);

    const user = await usermodel.findById(userid);
    const newfile = new filemodel({
      filename: filename,
      filepath: filepath,
      downloadurl: url,
      owner: user,
    });

    const session = await mongoose.startSession();
    session.startTransaction();
    await newfile.save({ session });
    user.files.push(newfile);
    await user.save({ session });
    await session.commitTransaction();

    await newfile.save();

    return res.status(202).send({
      success: true,
      message: "File Uploaded",
    });
  } catch (error) {
    console.log(error);
    return res.status(504).send({
      success: false,
      message: "Error in Upload File Controller",
    });
  }
};

const deletefilecontroller = async (req, res) => {
  try {
    const { id } = req.params;
    const userid = req.userid;
    if (!id) {
      return res.status(404).send({
        success: false,
        message: "Id Not Found",
      });
    }
    const file = await filemodel.findById(id);
    if (!file) {
      return res.status(404).send({
        success: false,
        message: "File Not Found In Database",
      });
    }
    const user = await usermodel.findById(userid);
    await user.files.pull(file);
    await user.save();

    const storage = getStorage(app);
    const storageref = ref(storage, "Doc_Shelf-UserFiles/" + file.filepath);
    await deleteObject(storageref);

    const deletefile = await filemodel.findByIdAndDelete(id);
    return res.status(202).send({
      success: true,
      message: "File Deleted",
    });
  } catch (error) {
    console.log(error);
    return res.status(504).send({
      success: false,
      message: "Error In Delete File Controller",
    });
  }
};

const fetchfilecontroller=async(req,res)=>{
  try {
    const userid = req.userid;
    const user = await usermodel.findById(userid).populate("files");
    const files = user.files;
    return res.status(202).send({
      success : true,
      message : "Files Fetched",
      files
    })
  } catch (error) {
    return res.status(504).send({
      success : false,
      message : "Error in Fetch File Controller"
    })
  }
}

const filesharecontroller = async (req, res) => {
  try {
    const { filename, filepath, email } = req.body;
    const userid = req.userid;
    if (!filename || !filepath || !email) {
      return res.status(404).send({
        success: false,
        message: "Please Fill All The Fields",
      });
    }
    const receiver = await usermodel.findOne({ email });
    if (!receiver) {
      return res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    }
    const sender = await usermodel.findById(userid);
    if (receiver.email === sender.email) {
      return res.status(404).send({
        success: false,
        message: "Please Enter Other's Email",
      });
    }
    const newsharedfile = new sharedfilemodel({
      filename: filename,
      filepath: filepath,
      receiver: receiver,
      sender: sender,
    });

    await receiver.receivedfiles.push(newsharedfile);
    await receiver.save();
    await newsharedfile.save();

    return res.status(202).send({
      success: true,
      message: "File Shared SuccessFully",
    });
  } catch (error) {
    return res.status(504).send({
      success: false,
      message: "Error In File Share Controller",
    });
  }
};

const fetchsharedfilecontroller=async(req,res)=>{
  try {
    const userid = req.userid;
    const user = await usermodel.findById(userid).populate({
      path: 'receivedfiles',
      populate: {
        path: 'sender',
        select:"email"
      },
    });
    const receivedfiles = user.receivedfiles
    return res.status(202).send({
      success : true,
      message : "Shared File Found",
      receivedfiles
    })

  } catch (error) {
    return res.status(504).send({

      success : false,
      message : "Error in Fetch Shared File Controller"
    })
  }
}

export { uploadfilecontroller, deletefilecontroller, filesharecontroller, fetchfilecontroller, fetchsharedfilecontroller };
