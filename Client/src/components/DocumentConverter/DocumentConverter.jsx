import  { useState } from 'react';
import Topbar from '../topbar/Topbar';

const DocumentConverter = () => {
  const [file, setFile] = useState(null);
  const [conversionType, setConversionType] = useState('pdf');
  const [convertedFileUrl, setConvertedFileUrl] = useState('');
  const [tab, setTab] = useState('document'); // 'document' or 'image'

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleConvert = () => {
    if (!file) {
      alert('Please select a file to convert.');
      return;
    }

    // Simulate conversion (replace with actual conversion logic)
    setTimeout(() => {
      const convertedFileName = `converted_file.${conversionType}`;
      // Simulate downloading the converted file
      const downloadUrl = URL.createObjectURL(new Blob([], { type: 'application/octet-stream' }));
      setConvertedFileUrl(downloadUrl);
    }, 2000); // Simulate conversion delay (2 seconds)
  };

  const handleTabChange = (selectedTab) => {
    setTab(selectedTab);
    setFile(null); // Clear file selection when switching tabs
    setConvertedFileUrl(''); // Clear converted file URL
  };

  return (
    <>
    <Topbar/>
    <div className="converter-container">
      <h1>This is the right place to work with your Documents</h1>
       <h3 className='tit'>Every tool you need to use PDFs, at your fingertips. All are 100% FREE and easy to use! Merge, split, compress, convert, rotate, unlock and watermark PDFs with just a few clicks.</h3>
      <div className="tab-buttons">
        <button onClick={() => handleTabChange('document')} className={tab === 'document' ? 'active' : ''}>
          Document Converter
        </button>
        <button onClick={() => handleTabChange('image')} className={tab === 'image' ? 'active' : ''}>
          Image Size Converter
        </button>
      </div>
      {tab === 'document' ? (
        <div>
          <div className="upload-section">
            <input type="file" onChange={handleFileChange} accept=".docx, .pdf, .txt" />
          </div>
          <div className="options-section">
            <label htmlFor="conversionType">Select Conversion Type:</label>
            <select
              id="conversionType"
              value={conversionType}
              onChange={(e) => setConversionType(e.target.value)}
            >
              <option value="pdf">PDF</option>
              <option value="txt">Text (TXT)</option>
              <option value="docx">Word (DOCX)</option>
            </select>
            <button onClick={handleConvert}>Convert</button>
          </div>
        </div>
      ) : (
        <div>
          <p>Image Size Converter content goes here...</p>
          {/* Implement image size converter functionality */}
        </div>
      )}
      {convertedFileUrl && (
        <div className="output-section">
          <h2>Converted File:</h2>
          <a href={convertedFileUrl} download="converted_file" className="download-link">
            Download Converted File
          </a>
        </div>
      )}
    </div>

    </>
  );
};

export default DocumentConverter;
