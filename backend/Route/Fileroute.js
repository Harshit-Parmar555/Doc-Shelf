import express from "express";
import { checkauth } from "../Middleware/Auth.js";
import { upload } from "../Middleware/Multer.js";
import {
  uploadfilecontroller,
  deletefilecontroller,
  filesharecontroller,
  fetchfilecontroller,
  fetchsharedfilecontroller
} from "../Controller/Filecontroller.js";
const Filerouter = express.Router();

Filerouter.post(
  "/uploadfile",
  checkauth,
  upload.single("file"),
  uploadfilecontroller
);
Filerouter.delete("/deletefile/:id", checkauth, deletefilecontroller);
Filerouter.post("/sharefile", checkauth, filesharecontroller);
Filerouter.get("/fetchfile",checkauth,fetchfilecontroller);
Filerouter.get("/fetchsharedfile",checkauth,fetchsharedfilecontroller);

export { Filerouter };
