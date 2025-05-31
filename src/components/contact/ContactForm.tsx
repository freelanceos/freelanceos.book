import React, { useState, FormEvent } from 'react';
import { supabase } from '../../lib/supabase';
import { sendContactEmail } from '../../lib/resend';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  timestamp: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

const ContactForm = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
    timestamp: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'الرجاء إدخال الاسم';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'الرجاء إدخال البريد الإلكتروني';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'البريد الإلكتروني غير صحيح';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'الرجاء إدخال رقم الهاتف';
    } else if (!/^\d{10,15}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'رقم الهاتف غير صحيح';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'الرجاء إدخال رسالتك';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (errors[name as keyof FormErrors]) {
      setErrors({
        ...errors,
        [name]: undefined
      });
    }
  };

  const sendEmail = async () => {
    try {
      const result = await sendContactEmail({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        timestamp: formData.timestamp
      });

      return result;
    } catch (error) {
      console.error('Email Error:', error);
      throw error;
    }
  };

  const saveToDatabase = async () => {
    try {
      const { error } = await supabase
        .from('contactus')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            message: formData.message,
            timestamp: new Date().toISOString()
          }
        ]);

      if (error) throw error;
    } catch (error) {
      console.error('Database Error:', error);
      throw error;
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    formData.timestamp = new Date().toISOString();

    if (validate()) {
      setIsSubmitting(true);

      try {
        await Promise.all([
          sendEmail(),
          saveToDatabase()
        ]);

        setShowSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
          timestamp: ''
        });
      } catch (error) {
        console.error('Submission Error:', error);
        alert('حدث خطأ أثناء إرسال النموذج. الرجاء المحاولة مرة أخرى.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const closePopup = () => {
    setShowSuccess(false);
  };

  return (
    <div className="contact-container">
      <div className="contact-info">
        <h2>معلومات التواصل</h2>
        <div className="info-item">
          <div className="info-icon">
            <i className="fas fa-envelope"></i>
          </div>
          <div className="info-text">
            <h3>البريد الإلكتروني</h3>
            <p>freelanceos2025@gmail.com</p>
          </div>
        </div>
        <div className="info-item">
          <div className="info-icon">
            <i className="fas fa-phone-alt"></i>
          </div>
          <div className="info-text">
            <h3>رقم الهاتف</h3>
            <p></p>
          </div>
        </div>
        <div className="info-item">
          <div className="info-icon">
            <i className="fas fa-map-marker-alt"></i>
          </div>
          <div className="info-text">
            <h3>العنوان</h3>
            <p>الشيخ زايد - مصر</p>
          </div>
        </div>
        <div className="social-links">
          <a href="https://www.facebook.com/profile.php?id=61575939053961" className="social-link" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#" className="social-link">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://www.instagram.com/freelance.os" className="social-link" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#" className="social-link">
            <i className="fab fa-tiktok"></i>
          </a>
        </div>
      </div>

      <div className="contact-form-container">
        <h2>أرسل رسالتك</h2>
        <form id="contactForm" className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">الاسم الكامل</label>
            <div className="input-with-icon">
              <i className="fas fa-user"></i>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="أدخل اسمك الكامل"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">البريد الإلكتروني</label>
            <div className="input-with-icon">
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="أدخل بريدك الإلكتروني"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="phone">رقم الهاتف</label>
            <div className="input-with-icon">
              <i className="fas fa-phone"></i>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="أدخل رقم هاتفك"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            {errors.phone && <span className="error-message">{errors.phone}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="message">الرسالة</label>
            <div className="input-with-icon textarea-container">
              <i className="fas fa-comment"></i>
              <textarea
                id="message"
                name="message"
                placeholder="اكتب رسالتك هنا..."
                rows={5}
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            {errors.message && <span className="error-message">{errors.message}</span>}
          </div>

          <input type="hidden" id="timestamp" name="timestamp" value={formData.timestamp} />

          <button
            type="submit"
            className="submit-btn"
            disabled={isSubmitting}
          >
            <span className="btn-text">
              {isSubmitting ? 'جاري الإرسال...' : 'إرسال الرسالة'}
            </span>
            <span className="btn-icon">
              <i className="fas fa-paper-plane"></i>
            </span>
          </button>
        </form>
      </div>

      {showSuccess && (
        <div className="success-popup" id="success-popup">
          <div className="popup-content">
            <div className="popup-icon">
              <i className="fas fa-check-circle"></i>
            </div>
            <h3>تم إرسال رسالتك بنجاح!</h3>
            <p>سنقوم بالرد عليك في أقرب وقت ممكن.</p>
            <button className="close-popup" onClick={closePopup}>حسناً</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactForm;