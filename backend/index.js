import express from "express";
import dotenv from "dotenv";
import { connect } from "./Database/Connect.js";
import cookieparser from "cookie-parser";
import cors from "cors";
import path from "path"
// Routes Import
import { Userrouter } from "./Route/Userroute.js";
import { Filerouter } from "./Route/Fileroute.js";

const _dirname = path.resolve()

dotenv.config();
const app = express();
const port = process.env.PORT;
app.use(express.json());
app.use(cookieparser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.static(path.join(_dirname,"/frontend/dist")))
app.get("*",(req,res)=>{
  res.sendFile(path.resolve(_dirname,"frontend","dist","index.html"))
})

// Database
connect();

// Routes
app.use("/api/v1/doc-shelf/user", Userrouter);
app.use("/api/v1/doc-shelf/file", Filerouter);

app.listen(port, () => {
  console.log(`Server Started on Port ${port}`);
});
