const express = require('express');
const router = express.Router();
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const { convertImageToPDF, convertDocToPDF } = require('../Utils/fs.js');

// Ensure the output directory exists
const outputDir = path.join(__dirname, '..', 'output');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}


// Set up multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Route for converting an image to PDF
router.post('/convert/image2pdf', upload.single('file'), async (req, res) => {
  const file = req.file;
  const outputPath = path.join(outputDir, `${Date.now()}_output.pdf`);

  if (!file) {
    return res.status(400).send('No file uploaded');
  }

  try {
    console.log(`Received file: ${file.originalname}`);

    // Convert image to PDF
    await convertImageToPDF(file.path, outputPath);

    console.log(`Converted file stored at: ${outputPath}`);

    // Send the converted PDF file path for download
    res.status(200).json({ downloadLink: `/api/fileConvert/download?file=${outputPath}` });
  } catch (error) {
    console.error('Image to PDF conversion error:', error);
    res.status(500).send('Image to PDF conversion failed');
  } finally {
    // Clean up uploaded file
    fs.unlinkSync(file.path);
  }
});

// Route for converting a DOC file to PDF
router.post('/convert/doc2pdf', upload.single('file'), async (req, res) => {
  const file = req.file;
  const outputPath = path.join(outputDir, `${Date.now()}_output.pdf`);

  if (!file) {
    return res.status(400).send('No file uploaded');
  }

  try {
    console.log(`Received file: ${file.originalname}`);

    // Convert DOC to PDF
    await convertDocToPDF(file.path, outputPath);

    console.log(`Converted file stored at: ${outputPath}`);

    // Send the converted PDF file path for download
    res.status(200).json({ downloadLink: `/api/fileConvert/download?file=${outputPath}` });
  } catch (error) {
    console.error('DOC to PDF conversion error:', error);
    res.status(500).send('DOC to PDF conversion failed');
  } finally {
    // Clean up uploaded file
    fs.unlinkSync(file.path);
  }
});

// Route for downloading a file
router.get('/download', (req, res) => {
  const { file } = req.query;

  // Check if file exists
  if (!fs.existsSync(file)) {
    return res.status(404).send('File not found');
  }

  // Send the file for download
  res.download(file, (err) => {
    if (err) {
      console.error('File download error:', err);
      res.status(500).send('File download failed');
    }
  });
});

module.exports = router;
