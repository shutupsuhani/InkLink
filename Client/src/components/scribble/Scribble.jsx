import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import IconButton from "@mui/material/IconButton";
import BroomIcon from "@mui/icons-material/Clear";
import GetAppIcon from "@mui/icons-material/GetApp";
import PaletteIcon from "@mui/icons-material/Palette";
import EraserIcon from "@mui/icons-material/HighlightOff";
import MarkerIcon from "@mui/icons-material/Create"; // Import marker icon
import "./style.css";
import Topbar from "../topbar/Topbar";

function Scribble() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [color, setColor] = useState("#000000");
  const [isErasing, setIsErasing] = useState(false);
  const [markerSize, setMarkerSize] = useState(5); // State to track marker size

  const appContainerStyle = {
    background:'url(/banner2.jpg)' ,
    backgroundSize: 'cover',
    width: '100%',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  };

  const contentContainerStyle = {
    position: 'relative',
    zIndex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Optional: Adds a slight background to content for readability
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'auto'
  };


  const handleStartDrawing = (e) => {
    setIsDrawing(true);
    draw(e);
  };

  const handleStopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.beginPath();
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const colorPalette = (
    <div className="color-palette-container">
      <div className="color-palette">
        <div className="color-option" style={{ backgroundColor: "#000000" }} onClick={() => handleChangeColor("#000000")}></div>
        <div className="color-option" style={{ backgroundColor: "#FF0000" }} onClick={() => handleChangeColor("#FF0000")}></div>
        <div className="color-option" style={{ backgroundColor: "#00FF00" }} onClick={() => handleChangeColor("#00FF00")}></div>
        <div className="color-option" style={{ backgroundColor: "#0000FF" }} onClick={() => handleChangeColor("#0000FF")}></div>
        
      </div>
    </div>
  );

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  const draw = (e) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    let x, y;

    if (
      e.type === "touchmove" ||
      e.type === "touchstart" ||
      e.type === "touchend"
    ) {
      const touch = e.touches[0] || e.changedTouches[0];
      x = touch.clientX - canvas.getBoundingClientRect().left;
      y = touch.clientY - canvas.getBoundingClientRect().top;
    } else {
      x = e.clientX - canvas.getBoundingClientRect().left;
      y = e.clientY - canvas.getBoundingClientRect().top;
    }

    context.lineWidth = markerSize; // Use selected marker size
    context.lineCap = "round";
    if (isErasing) {
      context.strokeStyle = "#FFFFFF";
    } else {
      context.strokeStyle = color;
    }

    context.lineTo(x, y);
    context.stroke();
    context.beginPath();
    context.moveTo(x, y);
  };

  const handleChangeColor = (newColor) => {
    setColor(newColor);
    setIsErasing(false);
    closeDropdown(); 
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  const downloadPDF = () => {
    html2canvas(canvasRef.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      const pdf = new jsPDF("p", "mm", [canvas.width, canvas.height]);
      pdf.addImage(imgData, "JPEG", 0, 0);
      pdf.save("canvas_drawing.pdf");
    });
  };

  const toggleEraser = () => {
    setIsErasing(!isErasing);
  };

  const changeMarkerSize = (size) => {
    setMarkerSize(size);
  };

  return (
    <>
    <Topbar/>
    <div style={appContainerStyle}>
    <div style={contentContainerStyle}>
    <div className="scribble-container">
      <div className="asset">
        <IconButton style={{color:"lightblue"}} onClick={toggleDropdown} aria-label="Select Color">
          <PaletteIcon />
        </IconButton>
        {dropdownOpen && colorPalette}
        <IconButton style={{color:"lightcoral"}} onClick={clearCanvas} aria-label="Clear Canvas">
          <BroomIcon/>
        </IconButton>
        <IconButton style={{color:"lightsalmon"}} onClick={downloadPDF} aria-label="Download as PDF">
          <GetAppIcon />
        </IconButton>
        <IconButton style={{color:"lightgray"}} onClick={toggleEraser} aria-label="Toggle Eraser">
          <EraserIcon />
        </IconButton>
        {/* Add marker size buttons */}
        <IconButton onClick={() => changeMarkerSize(3)} aria-label="Small Marker">
          <MarkerIcon style={{ fontSize: 16 }} />
        </IconButton>
        <IconButton onClick={() => changeMarkerSize(5)} aria-label="Medium Marker">
          <MarkerIcon style={{ fontSize: 24 }} />
        </IconButton>
        <IconButton onClick={() => changeMarkerSize(8)} aria-label="Large Marker">
          <MarkerIcon style={{ fontSize: 32 }} />
        </IconButton>
      </div>
      <canvas
        ref={canvasRef}
        width={window.innerWidth * 0.8}
        height={window.innerHeight * 0.8}
        onMouseDown={handleStartDrawing}
        onMouseUp={handleStopDrawing}
        onMouseMove={draw}
        onTouchStart={handleStartDrawing}
        onTouchEnd={handleStopDrawing}
        onTouchMove={draw}
        className="canvas"
        style={{ cursor: isDrawing ? 'url("/pen1.png")' : "auto" }}
      ></canvas>
    </div>
    </div>
    </div>

    </>
  );
}

export default Scribble;