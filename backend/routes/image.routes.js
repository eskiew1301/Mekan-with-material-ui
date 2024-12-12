import { Router } from "express";
import {
  addImages,
  getAllImages,
  deleteImage,
} from "../controllers/image.controller.js";
import { fileUpload } from "../middleware/upload.js";

const router = Router();

router.get("/", getAllImages);
router.post("/new", fileUpload.array("images", 10), addImages);
router.post("/deleteImages", deleteImage);

export default router;
