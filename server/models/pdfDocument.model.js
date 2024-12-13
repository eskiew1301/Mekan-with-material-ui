const mongoose = require("mongoose");

const pdfDocumentSchema = new mongoose.Schema(
  {
    document: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("PdfDocument", pdfDocumentSchema);
