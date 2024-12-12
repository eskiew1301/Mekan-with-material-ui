import mongoose from "mongoose";

const pdfDocumentSchema = new mongoose.Schema(
  {
    document: {type: String, required:true}
  },
  { timestamps: true }
);

export default mongoose.model("PdfDocument", pdfDocumentSchema);
