const express = require("express");
const app = express();
const path = require("path");
const cookieparser = require("cookie-parser");
app.use(cookieparser());
const { connect } = require("./Database/database");

const { userrouter } = require("./Routes/userroute");
const { filerouter } = require("./Routes/fileroute");

const dotenv = require("dotenv");
dotenv.config();

const cors = require("cors");

const _dirname = path.resolve();

app.use(express.json());
app.use(
  cors({
    origin: "https://doc-shelf.onrender.com",
    credentials: true,
  })
);

const PORT = process.env.PORT;

connect();

app.use("/api/v1/user", userrouter);
app.use("/api/v1/file", filerouter);

app.use(express.static(path.join(_dirname,"/frontend/dist")));
app.get("*",(req,res)=>{
  res.sendFile(path.resolve(_dirname,"frontend","dist","index.html"))
})

app.listen(PORT, (req, res) => {
  console.log(`Example port running on port ${PORT}`);
});
