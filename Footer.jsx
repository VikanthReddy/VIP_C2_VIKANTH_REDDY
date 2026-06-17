import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-brand">
          <h2>SHOP<span>EZ</span></h2>
          <p className="text-muted mt-2">
            Your one-stop destination for premium products. We deliver quality directly to your doorstep.
          </p>
        </div>
        
        <div className="footer-links-group">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/cart">Cart</Link></li>
            <li><Link to="/orders">My Orders</Link></li>
          </ul>
        </div>
        
        <div className="footer-contact">
          <h3>Contact Us</h3>
          <p className="text-muted">Have a question? Reach out to us!</p>
          <ul className="contact-details mt-2">
            <li><strong>Email:</strong> vikanthnallabolu@gmail.com</li>
            <li><strong>Phone:</strong> 8919145318</li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p className="text-muted">&copy; {new Date().getFullYear()} SHOPEZ. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
