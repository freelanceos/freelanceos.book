import React, { useState, useEffect } from 'react';
import { Link as ScrollLink } from 'react-scroll';

const FloatingCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Show floating CTA after scrolling down 600px
      setIsVisible(scrollY > 600);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`floating-cta ${isVisible ? 'visible' : ''}`}>
      <ScrollLink 
        to="form" 
        smooth={true} 
        duration={800} 
        className="floating-btn"
      >
        <span>احصل على نسختك</span>
        <i className="fas fa-arrow-left"></i>
      </ScrollLink>
    </div>
  );
};

export default FloatingCTA;