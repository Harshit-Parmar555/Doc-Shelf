import express from "express";
import {
  Userregistercontroller,
  Userlogincontroller,
  Userlogoutcontroller,
  Userprofiledetails
} from "../Controller/Usercontroller.js";
import { checkauth } from "../Middleware/Auth.js"

const Userrouter = express.Router();

Userrouter.post("/register", Userregistercontroller);
Userrouter.post("/login", Userlogincontroller);
Userrouter.post("/logout", Userlogoutcontroller);
Userrouter.get("/profiledetails",checkauth,Userprofiledetails);

export { Userrouter };
