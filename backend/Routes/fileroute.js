const express = require("express");
const filerouter = express.Router();

const { upload } = require("../Middlewares/multer");
const {
  uploadfilecontroller,
  deletefilecontroller,
  getallfiles
} = require("../Controllers/filecontroller");
const { testauth } = require("../Middlewares/auth");

filerouter.post(
  "/uploadfile",
  testauth,
  upload.single("file"),
  uploadfilecontroller
);
filerouter.delete("/deletefile/:id", testauth, deletefilecontroller);
filerouter.get("/allfiles", testauth, getallfiles);


module.exports = { filerouter };
