const express = require("express");
const {
  registercontroller,
  logincontroller,
  logoutcontroller,
  userdetails
} = require("../Controllers/usercontroller");
const userrouter = express.Router();
const { testauth } = require("../Middlewares/auth");

userrouter.post("/register", registercontroller);
userrouter.post("/login", logincontroller);
userrouter.get("/logout", testauth, logoutcontroller);
userrouter.get("/details", testauth, userdetails);

module.exports = { userrouter };
