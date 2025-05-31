import React from 'react';

const Benefits = () => {
  return (
    <section className="benefits-section">
      <h2 className="section-title">📘 ماذا ستتعلم؟</h2>
      <div className="benefits-grid">
        <div className="benefit-card" data-aos="fade-up">
          <div className="benefit-icon">
            <i className="fas fa-cogs"></i>
          </div>
          <h3>خوارزميات تيك توك</h3>
          <p>فهم عميق لكيفية عمل خوارزمية تيك توك وكيفية الاستفادة منها لزيادة الانتشار</p>
        </div>
        <div className="benefit-card" data-aos="fade-up" data-aos-delay="100">
          <div className="benefit-icon">
            <i className="fas fa-video"></i>
          </div>
          <h3>الفيديوهات الفيروسية</h3>
          <p>أسرار إنشاء محتوى فيروسي يجذب الملايين من المشاهدات بسرعة قياسية</p>
        </div>
        <div className="benefit-card" data-aos="fade-up" data-aos-delay="200">
          <div className="benefit-icon">
            <i className="fas fa-hashtag"></i>
          </div>
          <h3>استراتيجيات الترند</h3>
          <p>كيفية استغلال الترندات الحالية وإنشاء محتوى إبداعي يتصدر قوائم الاكتشاف</p>
        </div>
        <div className="benefit-card" data-aos="fade-up" data-aos-delay="300">
          <div className="benefit-icon">
            <i className="fas fa-chart-pie"></i>
          </div>
          <h3>تحليل الجمهور</h3>
          <p>أدوات وتقنيات لفهم جمهورك وبناء حساب أصيل يجذب المتابعين المهتمين</p>
        </div>
      </div>
    </section>
  );
};

export default Benefits;