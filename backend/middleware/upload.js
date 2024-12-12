import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import path from "path";

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

export const fileUpload = multer({
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

export const normalizePath = (filePath) => filePath.replace(/\\/g, "/");
