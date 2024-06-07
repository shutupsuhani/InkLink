const fs = require('fs');
const PDFDocument = require('pdfkit');
const imagesToPdf = require('images-to-pdf');
const mammoth = require('mammoth'); // For DOC to PDF conversion

// Function to convert an image to PDF
async function convertImageToPDF(imagePath, outputPath) {
  await imagesToPdf([imagePath], outputPath);
  console.log('Image converted to PDF successfully.');
}

// Function to convert a DOC file to PDF
async function convertDocToPDF(docPath, outputPath) {
  const result = await mammoth.convertToHtml({ path: docPath });
  const pdfDoc = new PDFDocument();
  pdfDoc.pipe(fs.createWriteStream(outputPath));
  pdfDoc.text(result.value);
  pdfDoc.end();
  console.log('DOC file converted to PDF successfully.');
}

// Export the functions
module.exports = {
  convertImageToPDF,
  convertDocToPDF
};
