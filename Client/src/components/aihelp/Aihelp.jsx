import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { getBase64 } from './helpers/imageHelper.js';
import { GEMINI_API_KEY } from './core/config';
import Topbar from '../topbar/Topbar';
import './style.css';

const Aihelp = () => {
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

    const [image, setImage] = useState('');
    const [imageInlineData, setImageInlineData] = useState('');
    const [aiResponse, setAiResponse] = useState('');
    const [loading, setLoading] = useState(false);

    // Function to handle AI image processing
    async function processImage() {
        setLoading(true);
        setAiResponse('');

        try {
            const model = genAI.getGenerativeModel({ model: 'gemini-pro-vision' });
            const result = await model.generateContent(["What's in this photo?", imageInlineData]);

            if (result && result.response) {
                const responseText = await result.response.text();
                setAiResponse(responseText);
            }
        } catch (error) {
            console.error('Error processing image:', error);
        } finally {
            setLoading(false);
        }
    }

    // Function to handle file upload and image preview
    const handleImageChange = async (e) => {
        const file = e.target.files[0];

        // Get base64 data for image preview
        try {
            const base64Image = await getBase64(file);
            setImage(base64Image);
        } catch (error) {
            console.error('Error converting image to base64:', error);
        }

        // Prepare image data for AI processing
        try {
            const imageData = await fileToGenerativePart(file);
            setImageInlineData(imageData);
        } catch (error) {
            console.error('Error preparing image data:', error);
        }
    };

    // Convert a File object to a GoogleGenerativeAI.Part object
    const fileToGenerativePart = async (file) => {
        const base64EncodedData = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result.split(',')[1]);
            reader.readAsDataURL(file);
        });

        return {
            inlineData: { data: base64EncodedData, mimeType: file.type },
        };
    };

    // Handle button click to process image
    const handleProcessButtonClick = () => {
        processImage();
    };

    return (
        <>
            <Topbar />
            <div className="container">
                <h2>AI Image Recognition</h2>
                <div className="ai-help">
                    <div style={{ marginBottom: 20 }}>
                        {loading ? (
                            <img src="load2.gif" alt="Loading" style={{ width: 40, height: 40 }} />
                        ) : (
                            <div>
                                {aiResponse && (
                                    <div className="response-container">
                                        <h3 className="h3">AI Response:</h3>
                                        <p>{aiResponse}</p>
                                    </div>
                                )}
                                <div className="upload-container">
                                    <label htmlFor="fileinput">
                                        <img src="img.png" alt="Upload" />
                                    </label>
                                    <input
                                        className="fileinput"
                                        id="fileinput"
                                        type="file"
                                        style={{ display: 'none' }}
                                        onChange={(e) => handleImageChange(e)}
                                        accept="image/*"
                                    />
                                    <button className="button" onClick={handleProcessButtonClick}>
                                        Process Image
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                    {image && (
                        <div style={{ marginBottom: 20 }}>
                            <img src={image} alt="Uploaded" style={{ maxWidth: '100%', maxHeight: 300 }} />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Aihelp;
