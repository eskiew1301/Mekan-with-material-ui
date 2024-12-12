import PdfDocument from "../models/pdfDocument.model.js";
import fs from 'fs'
import path from 'path'

// Add new PDF document
export const addPdfDocument = async (req, res, next) => {

  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  try {
    // Save the file record in the database
    const newPdfDocument = new PdfDocument({
      document: req.file.filename,
    });

    await newPdfDocument.save();

    res.status(201).json({
      message: "Document uploaded successfully",
      documentUrl: `${req.protocol}://${req.get("host")}/uploads/pdfDocument/${
        req.file.filename
      }`,
    });
  } catch (err) {
    console.error("Error saving document:", err);

    if (err.name === "ValidationError") {
      res.status(400).json({ message: "Validation error", errors: err.errors });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

export const getAllPdfDocuments = async (req, res) => {
  try {
    const document = await PdfDocument.find({});
    res.send({ status: "ok", data: document });
  } catch (err) {
    const error = new HttpError(
      "Fetching document failed, please try again later.",
      500
    );
    return next(error);
  }
};

export const getOnePdfDocument = async (req, res, next) => {
  const id = req.params.id;
  let pdfDocument;
  try {
    pdfDocument = await PdfDocument.findById(id);
  } catch (err) {
    console.log(err);
  }
  if (!pdfDocument) {
    return res.status(404).json({ message: "No Document Found" });
  }

  return res.status(200).json({ pdfDocument });
};

export const deletePdfDocument = async (req, res) => {
    const { id } = req.params;
  
    try {
      // Find the document by ID
      const document = await PdfDocument.findById(id);
      if (!document) {
        return res.status(404).json({ message: "Document not found" });
      }
  
      // File path
      const filePath = path.join("uploads", "pdfDocument", document.document);
  
      // Delete the file from the file system
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error("Error deleting file:", err);
          return res
            .status(500)
            .json({ message: "Failed to delete the file from the server" });
        }
      });
  
      // Remove the document from the database
      await PdfDocument.findByIdAndDelete(id);
  
      res.status(200).json({ message: "Document deleted successfully" });
    } catch (error) {
      console.error("Error deleting document:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  