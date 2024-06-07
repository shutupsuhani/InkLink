// conversion.js

const sharp = require('sharp');
const { PDFDocument } = require('pdf-lib');
const fs = require('fs');

// Function to compress an image
async function compressImage(inputBuffer, outputPath, targetSizeKB) {
  let outputBuffer = inputBuffer;
  let compressionLevel = 1; // Initial compression level

  // Iterate until the output size is less than or equal to the target size
  while (outputBuffer.length > targetSizeKB * 1024) {
    // Decrease the compression level (adjust compression parameters)
    compressionLevel -= 0.1;
    
    // Compress the image with the adjusted compression level
    outputBuffer = await sharp(inputBuffer)
      .jpeg({ quality: compressionLevel }) // Adjust compression quality for JPEG
      .toBuffer();

    console.log(`Compressed size: ${outputBuffer.length} bytes (target: ${targetSizeKB} KB)`);

    // You can add additional logic here to break the loop if the compression level reaches a minimum threshold
    // For example, if (compressionLevel <= 0.1) break;
  }

  // Write the compressed image to the output file
  fs.writeFileSync(outputPath, outputBuffer);
}

// Function to compress a PDF
async function compressPDF(inputBuffer, outputPath, targetSizeKB) {
  const pdfDoc = await PDFDocument.load(inputBuffer);
  const pdfBytes = await pdfDoc.save({ useObjectStreams: false });
  
  let compressedPDFBytes = pdfBytes;
  
  // Iterate until the output size is less than or equal to the target size
  while (compressedPDFBytes.length > targetSizeKB * 1024) {
    // Decrease compression level or apply optimization techniques as needed
  
    // For example, remove unused objects (this may reduce file size but can also break links or bookmarks)
    pdfDoc.removeObjects();
  
    // Save the optimized PDF bytes
    compressedPDFBytes = await pdfDoc.save({ useObjectStreams: false });
  
    console.log(`Compressed size: ${compressedPDFBytes.length} bytes (target: ${targetSizeKB} KB)`);
    
    // You can add additional logic here to break the loop if the compression level reaches a minimum threshold
    // For example, if (someCondition) break;
  }
  
  // Write the compressed PDF to the output file
  fs.writeFileSync(outputPath, compressedPDFBytes);
}

// Export the functions
module.exports = {
  compressImage,
  compressPDF
};
