import './style.css'
import axios from 'axios'
import { useState } from 'react';


const Doc = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [userId, setUserId] = useState(''); // Assuming userId is stored in state
    
    const handleFileChange = (event) => {
      setSelectedFile(event.target.files[0]);
    };
  
    const handleUpload = async () => {
      try { 
        const formData = new FormData();
        formData.append('file', selectedFile);
        const url=`http://localhost:3000/api/file/upload/${userId}`
        const response = await axios.post(url, formData, {
          onUploadProgress: (progressEvent) => {
            const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
            setUploadProgress(progress);
          }
        });
  
        console.log('Upload successful:', response.data);
        // Reset selected file and progress after successful upload
        setSelectedFile(null);
        setUploadProgress(0);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    };
  
    return (
      <div>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload} disabled={!selectedFile}>
          Upload
        </button>
        {uploadProgress > 0 && (
          <progress value={uploadProgress} max="100">
            {uploadProgress}%
          </progress>
        )}
      </div>
    );
}

export default Doc