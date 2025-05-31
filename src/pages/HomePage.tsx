import React, { useEffect } from 'react';
import Header from '../components/layout/Header';
import Hero from '../components/home/Hero';
import Benefits from '../components/home/Benefits';
import Audience from '../components/home/Audience';
import Testimonials from '../components/home/Testimonials';
import Pricing from '../components/home/Pricing';
import Bonus from '../components/home/Bonus';
import FAQ from '../components/home/FAQ';
import OrderForm from '../components/home/OrderForm';
import FloatingCTA from '../components/home/FloatingCTA';
import Footer from '../components/layout/Footer';

const HomePage = () => {
  useEffect(() => {
    // Update page title
    document.title = 'رحلة الانتشار - دليل النجاح على تيك توك';
    
    // Add RTL direction to HTML element
    document.documentElement.setAttribute('dir', 'rtl');
    document.documentElement.setAttribute('lang', 'ar');
    
    return () => {
      // Cleanup if needed
    };
  }, []);

  return (
    <div className="home-page">
      <div className="hero-section">
        <div className="overlay"></div>
        <div className="container">
          <Header />
          <Hero />
        </div>
      </div>
      
      <div className="container main-content">
        <Benefits />
        <Audience />
        <Testimonials />
        <Pricing />
        <Bonus />
        <FAQ />
        <OrderForm />
      </div>
      
      <Footer />
      <FloatingCTA />
    </div>
  );
};

export default HomePage;