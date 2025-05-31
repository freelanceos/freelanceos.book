import React from 'react';

const Bonus = () => {
  return (
    <section className="bonus-section">
      <h2 className="section-title">🎁 هدايا مجانية</h2>
      <div className="bonus-cards">
        <div className="bonus-card">
          <div className="bonus-icon"><i className="fas fa-lightbulb"></i></div>
          <h3>10 أفكار فيديو جاهزة</h3>
          <p>أفكار مضمونة الانتشار يمكنك تطبيقها فوراً لتحقيق نتائج سريعة</p>
        </div>
        <div className="bonus-card">
          <div className="bonus-icon"><i className="fab fa-telegram"></i></div>
          <h3>مجموعة تيليجرام حصرية</h3>
          <p>انضم لمجتمع من صناع المحتوى الناجحين للتعلم وتبادل الخبرات</p>
        </div>
      </div>
    </section>
  );
};

export default Bonus;