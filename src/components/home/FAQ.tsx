import React, { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqItems: FAQItem[] = [
    {
      question: 'هل يناسبني هذا الكتاب إن لم أبدأ على تيك توك بعد؟',
      answer: 'نعم، الكتاب مصمم ليناسب المبتدئين تماماً. يحتوي على إرشادات خطوة بخطوة من إنشاء الحساب وحتى نشر المحتوى الفيروسي الأول.'
    },
    {
      question: 'هل أحتاج معدات خاصة لتطبيق ما في الكتاب؟',
      answer: 'لا، يكفي هاتفك الذكي فقط. الكتاب يركز على الاستراتيجيات والمحتوى أكثر من المعدات، ويقدم نصائح لتحسين جودة الفيديو باستخدام الهاتف فقط.'
    },
    {
      question: 'كيف أستلم الكتاب بعد الشراء؟',
      answer: 'سيتم إرسال الكتاب الإلكتروني مع الهدايا المجانية إلى بريدك الإلكتروني مباشرة بعد تأكيد عملية الدفع.'
    },
    {
      question: 'هل المحتوى محدث مع آخر تحديثات تيك توك؟',
      answer: 'نعم، نقوم بتحديث الكتاب بشكل دوري ليواكب آخر تغييرات الخوارزمية والميزات الجديدة، وستحصل على التحديثات مجاناً.'
    }
  ];

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faq-section">
      <h2 className="section-title">❓ الأسئلة الشائعة</h2>
      <div className="faq-container">
        {faqItems.map((item, index) => (
          <div key={index} className="faq-item">
            <div 
              className="faq-question" 
              onClick={() => toggleFAQ(index)}
            >
              <h3>{item.question}</h3>
              <span className="faq-toggle">
                <i className={`fas ${activeIndex === index ? 'fa-minus' : 'fa-plus'}`}></i>
              </span>
            </div>
            <div 
              className={`faq-answer ${activeIndex === index ? 'active' : ''}`}
              style={{ 
                maxHeight: activeIndex === index ? '1000px' : '0',
                opacity: activeIndex === index ? 1 : 0
              }}
            >
              <p>{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;