const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

exports.fileUpload = multer({
  limits: { fileSize: 1024 * 1024 * 10 },
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join("uploads", "images"));
    },
    filename: (req, file, cb) => {
      const ext = MIME_TYPE_MAP[file.mimetype];
      if (ext) {
        cb(null, uuidv4() + "." + ext);
      } else {
        cb(new Error("Invalid file type"), null);
      }
    },
  }),
  fileFilter: (req, file, cb) => {
    const isValid = !!MIME_TYPE_MAP[file.mimetype];
    cb(null, isValid);
  },
});

exports.normalizePath = (filePath) => filePath.replace(/\\/g, "/");
