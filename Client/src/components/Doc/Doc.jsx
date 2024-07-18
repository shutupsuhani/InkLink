import Topbar from "../topbar/Topbar";
import axios from 'axios';
import { useState, useContext, useCallback } from "react";
import { AuthContext } from '../../Context/AuthContext';
import "./style.css";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { CloudUpload } from "@mui/icons-material";
import { useDropzone } from 'react-dropzone';


const Doc = () => {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState('');
  const { user } = useContext(AuthContext); // Assuming user has userId
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    setFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, maxSize: 10485760 }); // 10MB max size

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleUpload = async (e) => {
    e.preventDefault(); // Prevent form submission

    if (!file) {
      alert('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('description', description); // Append description if needed
    formData.append('userId', user._id);
    
    try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/file/upload/${user._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: progressEvent => {
          setUploadProgress(Math.round((progressEvent.loaded * 100) / progressEvent.total));
        }
      });

      console.log('File uploaded successfully:', response.data);
      // Handle success
      setUploadedFiles([...uploadedFiles, file.name]);
      setFile(null);
      setDescription('');
      setUploadProgress(0);
      alert('File uploaded successfully!');
    } catch (error) {
      console.error('Error uploading file:', error.response ? error.response.data : error.message);
      // Handle error
      alert('Error uploading file.');
    }
  };

  return (
    <>
      <Topbar />
      <div className="wrapper">
        <div className="document-upload-form">
          <Link to="/getalldocs"><Button>Get all Docs</Button></Link>
         
          <form onSubmit={handleUpload}>
            <div className="form-group">
              <div {...getRootProps()} className="dropzone">
                <input {...getInputProps()} />
                {isDragActive ? (
                  <h5>Drop the files here ...</h5>
                ) : (
                  <h5>Drag & drop some files here, or click to select files</h5>
                )}
                <span style={{color:"white"}} ><CloudUpload /></span>
                <h5>(Max File Size: 10MB)</h5>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <textarea id="description" className="desc"  value={description} onChange={handleDescriptionChange} />
            </div>
            {file && (
              <div className="upload-progress">
                <div className="upload-progress-bar" style={{ width: `${uploadProgress}%` }}></div>
              </div>
            )}
            <button type="submit">Upload</button>
          </form>
          <div className="uploaded-files">
            {uploadedFiles.map((fileName, index) => (
              <div key={index} className="uploaded-file">{fileName}</div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Doc;
