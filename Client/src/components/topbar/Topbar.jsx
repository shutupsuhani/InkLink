import { useState } from "react";
import { HamburgetMenuClose, HamburgetMenuOpen } from "../icon.jsx";
import "./topbar.css";

const Topbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  return (
    <>
      <div className={`topbar ${darkMode ? "dark-mode" : ""}`}>
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
            <button onClick={toggleDarkMode}>
              <span>{darkMode ? "🌞" : "🌙"}</span>
            </button>

            <div className="profile" onClick={toggleDropdown}>
              <img src="av2.png" alt="Profile" />
              {dropdownOpen && (
                <ul className="dropdown-content">
                  <li>Login</li>
                  <li>Register</li>
                  <li>Logout</li>
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
      </div>
      {/* Close dropdown when clicking outside of the profile */}
      {dropdownOpen && <div className="overlay" onClick={closeDropdown}></div>}
    </>
  );
};

export default Topbar;
