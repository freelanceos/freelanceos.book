import React, { useEffect, useRef } from 'react';
import { Link as ScrollLink } from 'react-scroll';

const Hero = () => {
  const countersRef = useRef<NodeListOf<Element> | null>(null);
  
  useEffect(() => {
    countersRef.current = document.querySelectorAll('.counter');
    
    const updateCount = (counter: Element) => {
      const target = Number(counter.getAttribute('data-target'));
      const count = Number(counter.textContent);
      const increment = target / 200;
      
      if (count < target) {
        counter.textContent = Math.ceil(count + increment).toString();
        setTimeout(() => updateCount(counter), 20);
      } else {
        counter.textContent = target.toLocaleString('ar-EG');
      }
    };
    
    const animateCounters = () => {
      countersRef.current?.forEach(counter => {
        updateCount(counter);
      });
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounters();
          observer.disconnect();
        }
      });
    }, { threshold: 0.5 });
    
    const tiktokVideo = document.querySelector('.tiktok-video');
    if (tiktokVideo) observer.observe(tiktokVideo);
    
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="hero-section">
      <div className="overlay"></div>
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="animated-title">اكتشف أسرار النجاح على تيك توك من أول فيديو!</h1>
            <h2>دليلك العملي للانتشار وبناء جمهور حقيقي</h2>
            <div className="hero-features">
              <div className="feature">
                <i className="fas fa-rocket"></i>
                <span>انتشار سريع</span>
              </div>
              <div className="feature">
                <i className="fas fa-users"></i>
                <span>جمهور حقيقي</span>
              </div>
              <div className="feature">
                <i className="fas fa-chart-line"></i>
                <span>نمو مستدام</span>
              </div>
            </div>
            <ScrollLink 
              to="form" 
              smooth={true} 
              duration={800} 
              className="cta-btn glow-btn"
            >
              احصل على نسختك الآن <i className="fas fa-arrow-left"></i>
            </ScrollLink>
          </div>
          <div className="hero-image">
            <div className="phone-mockup">
              <div className="phone-screen">
                <div className="tiktok-interface">
                  <div className="tiktok-header">
                    <img src="/images/tiktok-512.png" alt="تيك توك" className="tiktok-icon" />
                  </div>
                  <img src="/images/tiktok.png" alt="تيك توك" className="tiktok-icon" style={{ width: 'auto', height: 'auto' }} />
                  <div className="tiktok-content">
                    <div className="tiktok-video">
                      <div className="video-stats">
                        <div className="stat"><i className="fas fa-heart"></i> <span className="counter" data-target="1500000">0</span></div>
                        <div className="stat"><i className="fas fa-comment"></i> <span className="counter" data-target="45000">0</span></div>
                        <div className="stat"><i className="fas fa-share"></i> <span className="counter" data-target="250000">0</span></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;