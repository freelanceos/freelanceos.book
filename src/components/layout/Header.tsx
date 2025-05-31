import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="logo">
        <Link to="/">
          <img src="/images/logo.png" alt="FreelanceOS" className="logo-img" style={{ width: '200px', height: 'auto' }} />
        </Link>
      </div>
      <div className="nav-links">
        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
          الرئيسية
        </Link>
        <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>
          اتصل بنا
        </Link>
      </div>
    </nav>
  );
};

export default Header;