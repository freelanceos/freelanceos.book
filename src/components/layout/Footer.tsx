import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <img src="/images/logo.png" alt="FreelanceOS" className="footer-logo-img" />
            <span>freelanceos</span>
          </div>
          <div className="footer-links">
            <Link to="/">الرئيسية</Link>
            <Link to="/contact">اتصل بنا</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <p>جميع الحقوق محفوظة &copy; 2025 freelanceos</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;