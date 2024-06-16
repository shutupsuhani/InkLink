import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./Context/AuthContext";
import DocumentConverter from "./components/DocumentConverter/DocumentConverter";
import DocCompressor from "./components/docCompress/DocCompressor";
import Home from "./components/Home/Home";
import Aihelp from "./components/aihelp/Aihelp";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Scribble from "./components/scribble/Scribble";
import Doc from "./components/Doc/Doc";

const App = () => {
  const { user } = useContext(AuthContext);

  const ProtectedRoute = ({ element }) => {
    return user ? element : <Navigate to="/login" />;
  };

  return (
    <BrowserRouter>
     
      
        
      
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* Protected routes */}
            <Route
              path="/document-converter"
              element={<ProtectedRoute element={<DocumentConverter />} />}
            />
            <Route
              path="/doc-compressor"
              element={<ProtectedRoute element={<DocCompressor />} />}
            />
            <Route path="/ai-help" element={<ProtectedRoute element={<Aihelp />} />} />
            <Route path="/scribble" element={<ProtectedRoute element={<Scribble />} />} />
            <Route path="/doc" element={<ProtectedRoute element={<Doc />} />} />
            
            {/* Redirect authenticated users from login page */}
            <Route
              path="/login"
              element={user ? <Navigate to="/" /> : <Login />}
            />
          </Routes>
       
    </BrowserRouter>
  );
};

export default App;
