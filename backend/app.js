// const express = require('express')
import fs from "fs";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routes/user.routes.js";
import projectRouter from "./routes/projecct.routes.js";
import contactUsRouter from "./routes/contactUs.routes.js";
import imageRouter from "./routes/image.routes.js";
import documentRouter from "./routes/pdfDocument.routes.js";
import path from "path";

const app = express();
dotenv.config();

// middlewares
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Adjust for your frontend
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  ); // Include Authorization explicitly
  res.setHeader("Access-Control-Allow-Credentials", "true"); // Optional for cookies or credentials

  // Handle OPTIONS preflight request
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static("uploads"));
app.use("/uploads/pdfDocument", express.static(path.join("uploads", 'pdfDocument')));

app.use("/users", userRouter);
app.use("/projects", projectRouter);
app.use("/contact-us", contactUsRouter);
app.use("/image-gallery", imageRouter);
app.use("/document-gallery", documentRouter);

app.use((error, req, res, next) => {
  if (error.code === "LIMIT_UNEXPECTED_FILE") {
    return res
      .status(400)
      .json({
        message: "Too many files uploaded. Please check your file input.",
      });
  }

  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    });
  }
  if (res.headerSent) {
    return next(error);
  }
  res
    .status(error.code || 500)
    .json({ message: error.message || "An unknown error occurred" });
});

app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    });
  }
  if (res.headerSent) {
    return next(error);
  }
  res
    .status(error.code || 500)
    .json({ message: error.message || "An unknown error occurred" });
});

//connections
mongoose
  .connect(
    `mongodb+srv://elseskie:${process.env.MONGODB_PASSWORD}@cluster0.nig6b.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(
    app.listen(process.env.PORT || 5000, () =>
      console.log("Connection successful Listening to localhost Port 5000")
    )
  )
  .catch((err) => console.log(err));
