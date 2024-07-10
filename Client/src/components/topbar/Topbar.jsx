import { useState, useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext'; // Adjust the import path as necessary
import { HamburgetMenuClose, HamburgetMenuOpen } from '../icon.jsx';
import './topbar.css';
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom';

const Topbar = () => {
  const { user, dispatch: authDispatch } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [click, setClick] = useState(false);
  const navigate=useNavigate
  const handleClick = () => setClick(!click);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:3000/api/auth/logout');
      document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      console.log('Logged out successfully');
      localStorage.removeItem('token');
      authDispatch({ type: 'LOGOUT' });
      navigate('/login')
    } catch (error) {
      console.error('Logout failed:', error.response ? error.response.data.message : error.message);
    }
  };
  
  

  return (
    <div className="topbar">
      <div className="nav-container">
        <div className="logo">
          <h2>InkLink</h2>
        </div>
        <div className="elements">
          <ul  className={click ? 'nav-menu active' : 'nav-menu'}>
            <Link to="/"><li>Home</li></Link>
            <Link to="/doc"><li>Upload</li></Link>
            <Link to="/scribble"><li>Scribble</li></Link>
            <Link to="/document-converter"><li>Converter</li></Link>
            <Link to="/ai-help"><li>AI Help</li></Link>
          </ul>
        </div>
        <div className="btn">
          <div
            className="profile"
            onClick={toggleDropdown}
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <img src="av2.png" alt="Profile" />
            {dropdownOpen && (
              <ul  className="dropdown-content">
                {user ? (
                  <>
                    <li style={{color:"slateblue"}}>Hi,{user.username}</li>
                    <li style={{color:"red"}} onClick={handleLogout}>Logout</li>
                  </>
                ) : (
                  <>
                    <Link style={{color:"green"}} to="/login"><li>Login</li></Link>
                    <Link style={{color:"blue"}} to="/register"><li>Register</li></Link>
                  </>
                )}
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
      {dropdownOpen && <div className="overlay" onClick={closeDropdown}></div>}
    </div>
  );
};

export default Topbar;
