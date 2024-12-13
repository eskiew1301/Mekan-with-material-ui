const mongoose = require("mongoose");
const Image = require("../models/image.model");
const fs = require("fs");
const path = require("path");

// Add images to the gallery
exports.addImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    const imagePaths = req.files.map((file) => ({
      url: `/uploads/images/${file.filename}`,
      _id: new mongoose.Types.ObjectId(),
    }));

    const newImages = new Image({ images: imagePaths });
    await newImages.save();
    res.status(201).json({
      message: "Images uploaded successfully",
      images: imagePaths,
    });
  } catch (error) {
    console.error("Error adding images:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all images from the gallery
exports.getAllImages = async (req, res) => {
  try {
    const images = await Image.find();

    const imageUrls = images.flatMap((image) =>
      image.images.map((img) => ({
        url: `${req.protocol}://${req.get("host")}/uploads/images/${path.basename(img.url)}`,
        _id: img._id, // Include _id
      }))
    );

    res.status(200).json({ images: imageUrls });
  } catch (err) {
    console.error("Error fetching images:", err);
    res.status(500).json({ message: "Failed to fetch images." });
  }
};

// Delete an image
exports.deleteImage = async (req, res) => {
  const { _id } = req.body;

  if (!_id) {
    return res.status(400).json({ message: "Image ID is required" });
  }

  try {
    const imageDocument = await Image.findOne({ "images._id": _id });
    if (!imageDocument) {
      return res.status(404).json({ message: "Image not found" });
    }

    const imageToDelete = imageDocument.images.find(
      (img) => img._id.toString() === _id
    );
    const filePath = `.${imageToDelete.url}`;
    await fs.promises.unlink(filePath); // Delete the file from the server

    imageDocument.images = imageDocument.images.filter(
      (img) => img._id.toString() !== _id
    );
    await imageDocument.save();

    res.status(200).json({ message: "Image deleted successfully." });
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({ message: "Failed to delete image." });
  }
};
