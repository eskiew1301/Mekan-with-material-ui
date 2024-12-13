const { Router } = require("express");
const {
  addImages,
  getAllImages,
  deleteImage,
} = require("../controllers/image.controller");
const { fileUpload } = require("../middlewares/upload");

const router = Router();

router.get("/", getAllImages);
router.post("/new", fileUpload.array("images", 10), addImages);
router.post("/deleteImages", deleteImage);

module.exports = router;
