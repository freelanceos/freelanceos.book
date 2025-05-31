import React, { useState, useEffect } from 'react';

const Testimonials = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const totalSlides = 3;
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % totalSlides);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  const handleDotClick = (index: number) => {
    setActiveSlide(index);
  };

  return (
    <section className="testimonials-section">
      <h2 className="section-title">💬 آراء القراء</h2>
      <div className="testimonials-slider">
        <div className={`testimonial-card ${activeSlide === 0 ? 'active' : ''}`}>
          <div className="quote-icon"><i className="fas fa-quote-right"></i></div>
          <p className="testimonial-text">"فيديوهاتي بدأت تنتشر بعد أول تطبيق للاستراتيجيات! وصلت لأكثر من 500 ألف مشاهدة في أسبوع واحد فقط."</p>
          <div className="testimonial-author">
            <div className="author-avatar">خ</div>
            <div className="author-name">خالد محمد</div>
          </div>
        </div>
        <div className={`testimonial-card ${activeSlide === 1 ? 'active' : ''}`}>
          <div className="quote-icon"><i className="fas fa-quote-right"></i></div>
          <p className="testimonial-text">"الكتاب عملي جدًا ووفر علي شهور من التخبط. النتائج ظهرت من أول أسبوع وزاد عدد متابعيني بشكل مذهل!"</p>
          <div className="testimonial-author">
            <div className="author-avatar">ش</div>
            <div className="author-name">شهد أحمد</div>
          </div>
        </div>
        <div className={`testimonial-card ${activeSlide === 2 ? 'active' : ''}`}>
          <div className="quote-icon"><i className="fas fa-quote-right"></i></div>
          <p className="testimonial-text">"استثمار رائع! تعلمت كيف أصنع محتوى يجذب الجمهور المستهدف لمشروعي وتضاعفت مبيعاتي خلال شهر."</p>
          <div className="testimonial-author">
            <div className="author-avatar">م</div>
            <div className="author-name">مريم العلي</div>
          </div>
        </div>
      </div>
      <div className="slider-controls">
        {[...Array(totalSlides)].map((_, index) => (
          <span 
            key={index}
            className={`slider-dot ${activeSlide === index ? 'active' : ''}`} 
            onClick={() => handleDotClick(index)}
          ></span>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;