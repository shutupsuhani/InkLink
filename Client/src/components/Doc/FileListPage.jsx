import  { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import {format} from "timeago.js"
const FileListPage = () => {
  const [files, setFiles] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/file/getallfiles/${user._id}`
        );
        setFiles(response.data);
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };

    fetchFiles();
  }, [user._id]);

  const handleDownload = (fileId) => {
    const downloadUrl = `http://localhost:3000/api/file/download/${fileId}`;
    window.open(downloadUrl, '_blank'); 
  };

  return (
    <div>
      <h2>Uploaded Files</h2>
      <ul>
        {files.map((file) => (
          <li style={{display:"grid"}} key={file._id}>
            <strong>{file.title}</strong> - {file.description}
            <span className="postDate">{format(file.createdAt)}</span>
            <button onClick={() => handleDownload(file._id)}>Download</button>
            
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileListPage;
