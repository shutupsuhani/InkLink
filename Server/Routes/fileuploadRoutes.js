const express = require("express");
const multer = require("multer");
const router = express.Router();
const path = require("path");
const Document = require("../Model/Document.js");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const maxSize = 10 * 1024 * 1024; // 10 MB (increased from 1 MB)

const upload = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).single("file");

router.post("/upload/:userId", function (req, res, next) {
  const userId = req.params.userId;
  upload(req, res, function (err) {
    if (err) {
      console.error(err);
      return res.status(500).send(err.message); // Send error message in response
    }

    try {
      
      const newDocument = new Document({
        title: req.file.originalname, // You can adjust this as per your requirements
        description: req.body.description, // Assuming you have a description field in your request body
        fileUrl: req.file.path, // Path to the uploaded file
        fileType: req.file.mimetype, // Mime type of the uploaded file
        fileSize: req.file.size, // Size of the uploaded file
        userId: req.body.userId, // Assuming you pass userId in the request body
      });

      newDocument.save();

      res.status(200).send("Success, File uploaded and saved to database!");
    } catch (error) {
      console.error("Error saving file to database:", error);
      res.status(500).send("Error saving file to database");
    }
  });
});

module.exports = router;
