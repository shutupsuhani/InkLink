import  { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "./sidebar.css";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const handleToggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={collapsed ? "sidebar collapsed" : "sidebar"}>
      <button className="toggle-btn" onClick={handleToggleSidebar}>
        {collapsed ? "☰" : "✖"}
      </button>
      <Menu>
        <MenuItem>
          <h2>Doc Section</h2>
        </MenuItem>
        <MenuItem>
          <Link to="/doc">Upload Document</Link>
        </MenuItem>
        <SubMenu label="Converter">
          <MenuItem>
            <Link to="/document-converter">to PDF Converter</Link>
          </MenuItem>
          <MenuItem>
            <Link to="/doc-compressor">Size Compresser</Link>
          </MenuItem>
        </SubMenu>
        <SubMenu label="Settings">
          <MenuItem>Account</MenuItem>
        </SubMenu>
      </Menu>
    </div>
  );
};

export default Sidebar;
