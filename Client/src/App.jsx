import { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./Context/AuthContext";
import DocumentConverter from "./components/DocumentConverter/DocumentConverter";
import DocCompressor from "./components/docCompress/DocCompressor";
import Home from "./components/Home/Home";
import Aihelp from "./components/aihelp/Aihelp";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Scribble from "./components/scribble/Scribble";
import Doc from "./components/Doc/Doc";
import Topbar from "./components/topbar/Topbar"; // Adjust the import path as necessary
import FileListPage from "./components/Doc/FileListPage";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


// Styled Component
const MyContainer = styled.div`
   background-color:beige;
  height: 100vh; 
  width:100vw;
`;

const ProtectedRoute = ({ element }) => {
  const { user } = useContext(AuthContext);
  return user ? element : <Navigate to="/login" />;
};

const App = () => {
  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <MyContainer>
        <Topbar username={user?.username} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
          <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
          {/* Protected routes */}
          <Route path="/document-converter" element={<ProtectedRoute element={<DocumentConverter />} />} />
          <Route path="/doc-compressor" element={<ProtectedRoute element={<DocCompressor />} />} />
          <Route path="/getalldocs" element={<ProtectedRoute element={<FileListPage />} />} />
          <Route path="/ai-help" element={<ProtectedRoute element={<Aihelp />} />} />
          <Route path="/scribble" element={<ProtectedRoute element={<Scribble />} />} />
          <Route path="/doc" element={<ProtectedRoute element={<Doc />} />} />
        </Routes>
      </MyContainer>
    </BrowserRouter>
  );
};

export default App;
