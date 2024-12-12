import { Router } from "express";
import { addPdfDocument, deletePdfDocument, getAllPdfDocuments, getOnePdfDocument } from "../controllers/pdfDocument.controller.js";
import { fileUpload } from "../middleware/fileUpload.js";

const router = Router();

router.get("/", getAllPdfDocuments);
router.get("/:id", getOnePdfDocument);
router.post("/new", fileUpload.single("file"), addPdfDocument);
router.delete("/:id", deletePdfDocument);

export default router;
