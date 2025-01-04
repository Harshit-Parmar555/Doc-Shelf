import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { app } from "../utils/firebaseconfig.js";
import fs from "fs";
import { userModel } from "../Models/userModel.js";
import { documentModel } from "../Models/documentModel.js";
import mongoose from "mongoose";

export const add = async (req, res) => {
  try {
    const { filename } = req.body;
    const file = req.file;
    if (!filename || !file) {
      return res.status(400).send({
        success: false,
        message: "Please fill all the fields",
      });
    }
    const filepath = file.filename;
    const storage = getStorage(app);
    const storageref = ref(storage, "DocShelf_Storage/" + file.filename);
    const filebuffer = fs.readFileSync(file.path);
    await uploadBytes(storageref, filebuffer, { contentType: file.mimetype });
    const url = await getDownloadURL(storageref);
    fs.unlinkSync(file.path);

    const user = await userModel.findById(req.user._id);
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "Something went wrong",
      });
    }

    const newfile = new documentModel({
      filename: filename,
      filepath: filepath,
      downloadurl: url,
    });

    const session = await mongoose.startSession();
    session.startTransaction();
    await newfile.save({ session });
    user.documents.push(newfile);
    await user.save({ session });
    await session.commitTransaction();

    await newfile.save();

    return res.status(200).send({
      success: true,
      message: "File Uploaded",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in file add controller",
    });
  }
};

export const deletefile = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).send({
        success: false,
        message: "Something went wrong",
      });
    }
    const file = await documentModel.findById(id);
    if (!file) {
      return res.status(400).send({
        success: false,
        message: "File not found in database",
      });
    }
    const user = await userModel.findById(req.user._id);
    await user.documents.pull(file);
    await user.save();

    const storage = getStorage(app);
    const storageref = ref(storage, "DocShelf_Storage/" + file.filepath);
    await deleteObject(storageref);

    const deleteddocument = await documentModel.findByIdAndDelete(id);
    return res.status(200).send({
      success: true,
      message: "File deleted successfully",
      deleted : deleteddocument
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in delete file controller",
    });
  }
};

export const fetchfile = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id).populate("documents");
    return res.status(200).send({
      success: true,
      message: "File fetched",
      documents: user.documents,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in fetch file controller",
    });
  }
};


