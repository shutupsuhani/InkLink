// compressRoutes.js

const express = require("express");
const router = express.Router();
const fs = require("fs");
const { compressImage, compressPDF } = require("../Utils/compression.js");

// Route for compressing images
router.post("/compress/image", async (req, res) => {
  const inputBuffer = req.body.image; // Assuming the image file is sent as a buffer in the request body
  const { targetSizeKB } = req.body; // Target size from request body

  try {
    // Compress image
    const outputPath = 'compressed_image.jpg'; // Output path for compressed image
    await compressImage(inputBuffer, outputPath, targetSizeKB);

    // Send the compressed image file for download
    res.download(outputPath, (err) => {
      if (err) {
        console.error("Image download error:", err);
        res.status(500).send("Image download failed");
      } else {
        // Delete the compressed image file after download
        fs.unlinkSync(outputPath);
      }
    });
  } catch (error) {
    console.error("Image compression error:", error);
    res.status(500).send("Image compression failed");
  }
});

// Route for compressing PDFs
router.post("/compress/pdf", async (req, res) => {
  const inputBuffer = req.body.pdf; // Assuming the PDF file is sent as a buffer in the request body
  const { targetSizeKB } = req.body; // Target size from request body

  try {
    // Compress PDF
    const outputPath = 'compressed_pdf.pdf'; // Output path for compressed PDF
    await compressPDF(inputBuffer, outputPath, targetSizeKB);

    // Send the compressed PDF file for download
    res.download(outputPath, (err) => {
      if (err) {
        console.error("PDF download error:", err);
        res.status(500).send("PDF download failed");
      } else {
        // Delete the compressed PDF file after download
        fs.unlinkSync(outputPath);
      }
    });
  } catch (error) {
    console.error("PDF compression error:", error);
    res.status(500).send("PDF compression failed");
  }
});

module.exports = router;
