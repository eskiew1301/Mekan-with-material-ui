const { Router } = require("express");
const { addPdfDocument, deletePdfDocument, getAllPdfDocuments, getOnePdfDocument } = require("../controllers/pdfDocument.controller");
const { fileUpload } = require("../middlewares/fileUpload");

const router = Router();

router.get("/", getAllPdfDocuments);
router.get("/:id", getOnePdfDocument);
router.post("/new", fileUpload.single("file"), addPdfDocument);
router.delete("/:id", deletePdfDocument);

module.exports = router;
