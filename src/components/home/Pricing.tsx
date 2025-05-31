import React, { useEffect, useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';

const Pricing = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 8,
    minutes: 45,
    seconds: 30
  });
  
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds -= 1;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes -= 1;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours -= 1;
            } else {
              hours = 23;
              if (days > 0) {
                days -= 1;
              }
            }
          }
        }
        
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="pricing-section">
      <h2 className="section-title">💰 السعر</h2>
      <div className="pricing-card">
        <div className="pricing-badge">عرض محدود</div>
        <div className="pricing-header">
          <h3>كتاب رحلة الانتشار</h3>
          <p>دليلك الشامل للنجاح على تيك توك</p>
        </div>
        <div className="pricing-body">
          <div className="old-price">٥٠٠ جنيه </div>
          <div className="current-price">
            <span className="price-value">٢٠٠</span>
            <span className="price-currency">جنيه</span>
          </div>
          <div className="price-save">وفر 60%</div>
          <div className="countdown-timer">
            <p>ينتهي العرض خلال:</p>
            <div className="countdown">
              <div className="countdown-item">
                <span id="days">{timeLeft.days.toString().padStart(2, '0')}</span>
                <span className="countdown-label">يوم</span>
              </div>
              <div className="countdown-item">
                <span id="hours">{timeLeft.hours.toString().padStart(2, '0')}</span>
                <span className="countdown-label">ساعة</span>
              </div>
              <div className="countdown-item">
                <span id="minutes">{timeLeft.minutes.toString().padStart(2, '0')}</span>
                <span className="countdown-label">دقيقة</span>
              </div>
              <div className="countdown-item">
                <span id="seconds">{timeLeft.seconds.toString().padStart(2, '0')}</span>
                <span className="countdown-label">ثانية</span>
              </div>
            </div>
          </div>
          <ScrollLink 
            to="form" 
            smooth={true} 
            duration={800} 
            className="pricing-btn"
          >
            احصل على نسختك الآن
          </ScrollLink>
        </div>
      </div>
    </section>
  );
};

export default Pricing;