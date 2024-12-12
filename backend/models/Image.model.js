import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
  {
    images: [
      {
        url: { type: String, required: true },
        _id: { type: mongoose.Schema.Types.ObjectId, required: true },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Image", imageSchema);
