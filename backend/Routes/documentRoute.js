import express from "express";
import { protectedRoute } from "../Middlewares/protectedRoute.js";
import { upload } from "../Middlewares/multer.js";
import {
  add,
  deletefile,
  fetchfile,
} from "../Controller/documentController.js";
const documentRouter = express.Router();

documentRouter.post("/add", protectedRoute, upload.single("file"), add);
documentRouter.post("/delete/:id", protectedRoute, deletefile);
documentRouter.get("/fetch", protectedRoute, fetchfile);

export { documentRouter };
