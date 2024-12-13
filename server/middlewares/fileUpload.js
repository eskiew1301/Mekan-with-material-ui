const multer = require("multer");
const path = require("path");

// MIME type mapping for PDF files
const MIME_TYPE_MAP = {
  "application/pdf": "pdf",
};

// Multer configuration
exports.fileUpload = multer({
  limits: { fileSize: 1024 * 1024 * 10 }, // 10 MB max file size
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join("uploads", "pdfDocument")); // Upload folder
    },
    filename: (req, file, cb) => {
      const ext = MIME_TYPE_MAP[file.mimetype];
      if (ext) {
        cb(null, `${file.originalname}`); // Unique filename with timestamp
      } else {
        cb(new Error("Invalid file type"), null);
      }
    },
  }),
  fileFilter: (req, file, cb) => {
    const isValid = !!MIME_TYPE_MAP[file.mimetype];
    cb(null, isValid); // Accept or reject file
  },
});
