import React from 'react';

const Audience = () => {
  return (
    <section className="audience-section">
      <h2 className="section-title">🎯 لمن هذا الكتاب؟</h2>
      <div className="audience-cards">
        <div className="audience-card">
          <div className="audience-icon"><i className="fas fa-user-plus"></i></div>
          <h3>المبتدئين</h3>
          <p>الذين يرغبون في بدء رحلتهم على تيك توك بخطوات مدروسة</p>
        </div>
        <div className="audience-card">
          <div className="audience-icon"><i className="fas fa-camera"></i></div>
          <h3>صناع المحتوى</h3>
          <p>الذين يسعون لتطوير مهاراتهم وزيادة انتشار محتواهم</p>
        </div>
        <div className="audience-card">
          <div className="audience-icon"><i className="fas fa-bullhorn"></i></div>
          <h3>المسوقين</h3>
          <p>الذين يبحثون عن طرق فعالة للوصول إلى جمهور أكبر</p>
        </div>
        <div className="audience-card">
          <div className="audience-icon"><i className="fas fa-store"></i></div>
          <h3>أصحاب المشاريع</h3>
          <p>الذين يرغبون في الترويج لمشاريعهم عبر منصة تيك توك</p>
        </div>
      </div>
    </section>
  );
};

export default Audience;