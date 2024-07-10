const express = require("express");
const multer = require("multer");
const router = express.Router();
const Document = require("../Model/Document.js");
const mongoose = require("mongoose");

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// Multer file size limit (10MB)
const maxSize = 10 * 1024 * 1024;

// Multer instance for file upload
const upload = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).single("file");

// POST endpoint for uploading a file with userId
router.post("/upload/:userId", function (req, res, next) {
  const userId = req.params.userId; // Extract userId from URL params

  // Handle file upload using multer
  upload(req, res, async function (err) {
    if (err) {
      console.error(err);
      return res.status(500).send(err.message); // Send error message in response
    }

    try {
      // Create a new document instance
      const newDocument = new Document({
        title: req.file.originalname,
        description: req.body.description,
        fileUrl: req.file.path,
        fileType: req.file.mimetype,
        fileSize: req.file.size,
        userId: new mongoose.Types.ObjectId(userId), // Convert userId to ObjectId
      });

      // Save the document to the database
      await newDocument.save();
      console.log("File Uploaded Successfully");
      res.status(200).send("Success, File uploaded and saved to database!");
    } catch (error) {
      console.error("Error saving file to database:", error);
      res.status(500).send("Error saving file to database");
    }
  });
});

router.get("/getallfiles/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const files = await Document.find({ userId });
    console.log(files)
    res.json(files);
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", message: "failed to get all scribbles" });
  }
});

router.get('/download/:fileId', async (req, res) => {
  try {
    const fileId = req.params.fileId;
    const document = await Document.findById(fileId);

    if (!document) {
      return res.status(404).json({ error: 'File not found' });
    }

    const filePath = document.fileUrl; // Assuming fileUrl is the path to the uploaded file

    // Check if the file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'File not found on server' });
    }

    // Stream the file back to the client
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  } catch (error) {
    console.error('Error downloading file:', error);
    res.status(500).json({ error: 'Failed to download file' });
  }
});

module.exports = router;
