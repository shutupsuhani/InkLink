import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Slider } from '@mui/material';

const DocCompressor = () => {
  // State for uploaded file and compression settings
  const [file, setFile] = useState(null);
  const [compressionLevel, setCompressionLevel] = useState(50); // Default compression level
  const [sizeReductionKB, setSizeReductionKB] = useState(5000); // Default size reduction in KB (5MB)
  const [sizeReductionPercentage, setSizeReductionPercentage] = useState(50); // Default size reduction percentage

  // Function to handle file upload
  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);
  };

  // Function to handle compression level change
  const handleCompressionChange = (event, value) => {
    setCompressionLevel(value);
  };

  // Function to handle size reduction in KB change
  const handleSizeReductionKBChange = (event) => {
    const sizeInKB = parseInt(event.target.value);
    setSizeReductionKB(sizeInKB);
    // Convert size reduction in KB to percentage
    const percentage = (sizeInKB / 5000) * 100; // Assuming 5000 KB as the original size
    setSizeReductionPercentage(percentage);
  };

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Logic to send file, compression level, and size reduction to the server for processing
    console.log("File:", file);
    console.log("Compression Level:", compressionLevel);
    console.log("Size Reduction (KB):", sizeReductionKB);
    console.log("Size Reduction (Percentage):", sizeReductionPercentage);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        DocCompressor
      </Typography>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <TextField
          type="file"
          onChange={handleFileUpload}
          label="Select a file"
          style={{ marginBottom: 16, width: '100%' }}
          InputLabelProps={{
            shrink: true,
          }}
          required
        />
        <Typography id="compression-slider" gutterBottom style={{ marginBottom: 16 }}>
          Compression Level: {compressionLevel}%
        </Typography>
        <Slider
          value={compressionLevel}
          onChange={handleCompressionChange}
          aria-labelledby="compression-slider"
          style={{ width: '100%', marginBottom: 16 }}
          valueLabelDisplay="auto"
          step={1}
          marks
          min={0}
          max={100}
        />
        <TextField
          type="number"
          label="Size Reduction (KB)"
          value={sizeReductionKB}
          onChange={handleSizeReductionKBChange}
          InputProps={{ inputProps: { min: 0 } }}
          style={{ marginBottom: 16, width: '100%' }}
          InputLabelProps={{
            shrink: true,
          }}
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Compress
        </Button>
      </form>
    </Container>
  );
};

export default DocCompressor;
