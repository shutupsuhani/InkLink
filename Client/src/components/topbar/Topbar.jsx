import { useState } from "react";
import { HamburgetMenuClose, HamburgetMenuOpen } from "../icon.jsx";
import "./topbar.css";
import axios from "axios";

const Topbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3000/api/auth/logout");
      console.log("Logged out successfully");
    } catch (error) {
      console.error("Logout failed:", error.response.data.message);
    }
  };

  return (
    <div className="topbar">
      <div className="nav-container">
        <div className="logo">
          <h2>InkLink</h2>
        </div>

        <div className="elements">
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li>Home</li>
            <li>Upload Documents</li>
            <li>Scribble</li>
            <li>Converter</li>
            <li>AI Help</li>
          </ul>
        </div>

        <div className="btn">
          <div className="profile" onClick={toggleDropdown}>
            <img
              src="av2.png"
              alt="Profile"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            />
            {dropdownOpen && (
              <ul className="dropdown-content">
                <li>Login</li>
                <li>Register</li>
                <li onClick={handleLogout}>Logout</li>
              </ul>
            )}
          </div>
        </div>

        <div className="nav-icon" onClick={handleClick}>
          {click ? (
            <span className="icon">
              <HamburgetMenuClose />
            </span>
          ) : (
            <span className="icon">
              <HamburgetMenuOpen />
            </span>
          )}
        </div>
      </div>
      {/* Close dropdown when clicking outside of the profile */}
      {dropdownOpen && <div className="overlay" onClick={closeDropdown}></div>}
    </div>
  );
};

export default Topbar;
