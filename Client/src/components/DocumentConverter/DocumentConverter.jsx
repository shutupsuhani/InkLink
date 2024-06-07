import React, { useState } from 'react';
import {
  Paper,
  Box,
  Button,
  Typography,
  CircularProgress,
  TextField,
} from "@mui/material";

const DocCompressor = () => {
  // State for uploaded file and compression settings
  const [file, setFile] = useState(null);
  const [sizeReductionKB, setSizeReductionKB] = useState(""); // Default size reduction in KB (empty)

  // Function to handle file upload
  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);
  };

  // Function to handle size reduction in KB change
  const handleSizeReductionKBChange = (event) => {
    setSizeReductionKB(event.target.value);
  };

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Logic to send file and size reduction to the server for processing
    console.log("File:", file);
    console.log("Size Reduction (KB):", sizeReductionKB);
  };

  return (
    <Paper elevation={3} component={Box} p={3} maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        DocCompressor
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
          <input type="file" onChange={handleFileUpload} required />
        </Box>
        <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
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
        </Box>
        <Box display="flex" justifyContent="center">
          <Button type="submit" variant="contained" color="primary">
            Compress
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default DocCompressor;
