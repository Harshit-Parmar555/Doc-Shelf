import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieparser from "cookie-parser";
import { connect } from "./Database/connect.js";
import path from "path";

// Routes
import { userRouter } from "./Routes/userRoute.js";
import { documentRouter } from "./Routes/documentRoute.js";

const app = express();
const _dirname = path.resolve();
// Middlewares
app.use(
  cors({
    origin: "https://doc-shelf.onrender.com",
    credentials: true,
  })
);
app.use(express.json());
dotenv.config();
app.use(cookieparser());

const port = process.env.PORT;

// Database
connect();

app.use("/api/v1/user", userRouter);
app.use("/api/v1/document", documentRouter);

app.use(express.static(path.join(_dirname, "/frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
});

app.listen(port, () => {
  console.log(`Port started on ${port}`);
});
