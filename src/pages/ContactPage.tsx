import React, { useEffect } from 'react';
import Header from '../components/layout/Header';
import ContactHero from '../components/contact/ContactHero';
import ContactForm from '../components/contact/ContactForm';
import Footer from '../components/layout/Footer';

const ContactPage = () => {
  useEffect(() => {
    // Update page title
    document.title = 'اتصل بنا - FreelanceOS';
    
    // Add RTL direction to HTML element
    document.documentElement.setAttribute('dir', 'rtl');
    document.documentElement.setAttribute('lang', 'ar');
    
    return () => {
      // Cleanup if needed
    };
  }, []);

  return (
    <div className="contact-page">
      <div className="hero-section">
        <div className="overlay"></div>
        <div className="container">
          <Header />
          <ContactHero />
        </div>
      </div>
      
      <div className="container main-content">
        <ContactForm />
      </div>
      
      <Footer />
    </div>
  );
};

export default ContactPage;