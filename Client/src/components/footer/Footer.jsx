
import './style.css'; // Import your CSS file for styling here

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
       
        <div className="footer-right">
          {/* Add content for the right side of the footer */}
          <h3>Contact Us</h3>
          <ul>
            <li>Email: info@example.com</li>
            <li>Phone: +1234567890</li>
            <li>Address: 123 Main Street, City, Country</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        {/* Add content for the bottom section of the footer */}
        <p>&copy; 2024 Your Website. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
