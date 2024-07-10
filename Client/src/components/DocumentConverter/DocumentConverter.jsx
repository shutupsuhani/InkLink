import { useState } from "react";
import axios from "axios";
import {
  Paper,
  Box,
  Button,
  Typography,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { CloudUpload, GetApp } from "@mui/icons-material";
import "./document.css";
import Topbar from "../topbar/Topbar";

const DocumentConverter = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [format, setFormat] = useState("images");
  const [downloadLink, setDownloadLink] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFormatChange = (e) => {
    setFormat(e.target.value);
  };

  const handleFileUpload = async () => {
    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      let endpoint = "";

      if (format === "images") {
        endpoint = "http://localhost:3000/api/fileConvert/convert/image2pdf";
      } else if (format === "docx") {
        endpoint = "http://localhost:3000/api/fileConvert/convert/doc2pdf";
      } else {
        throw new Error("Unsupported format selected");
      }

      const response = await axios.post(endpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setDownloadLink(response.data.downloadLink);
    } catch (error) {
      console.error("File upload error:", error);
      setError("File upload failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    window.location.href = `http://localhost:3000${downloadLink}`;
  };

  return (
    <>
    <Topbar/>
    <Box className="container">
      <Paper elevation={3} className="paper">
        <Typography variant="h4" gutterBottom>
          Document Converter
        </Typography>
        <FormControl fullWidth margin="normal">
          <InputLabel>Format</InputLabel>
          <Select value={format} onChange={handleFormatChange}>
            <MenuItem value="images">Image to PDF</MenuItem>
            <MenuItem value="docx">DOCX to PDF</MenuItem>
          </Select>
        </FormControl>
        <input
          accept=".jpg,.jpeg,.png,.docx"
          id="contained-button-file"
          multiple
          type="file"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <label htmlFor="contained-button-file">
          <Button
            className="button"
            variant="contained"
            component="span"
            startIcon={<CloudUpload />}
          >
            <span><CloudUpload/></span>
          </Button>
        </label>

        <Button
          variant="contained"
          color="primary"
          onClick={handleFileUpload}
          disabled={loading || !file}
          sx={{ margin: "1rem 1rem 1rem 1rem" }}
        >
          {loading ? <CircularProgress size={24} /> : "Upload"}
        </Button>

        {downloadLink && (
          <Button
            variant="contained"
            color="success"
            onClick={handleDownload}
            startIcon={<GetApp />}
            sx={{ margin: "0 1rem 1rem 0" }}
          >
            Download Converted File
          </Button>
        )}

        {error && (
          <Typography
            color="error"
            variant="body2"
            style={{ marginTop: "10px" }}
          >
            {error}
          </Typography>
        )}
      </Paper>
    </Box>
   
    </>
  );
};

export default DocumentConverter;
