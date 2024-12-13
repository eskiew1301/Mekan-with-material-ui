// const express = require('express')
const fs = require("fs");
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const userRouter = require("./routes/user.routes");
const projectRouter = require("./routes/project.routes");
const contactUsRouter = require("./routes/contactUs.routes");
const imageRouter = require("./routes/image.routes");
const documentRouter = require("./routes/pdfDocument.routes");
const path = require("path");

const app = express();
dotenv.config();

// middlewares
app.use(cors());
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
    app.listen(5000, () =>
      console.log("Connection successful Listening to localhost Port 5000")
    )
  )
  .catch((err) => console.log(err));
