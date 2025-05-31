import React, { useState, FormEvent } from 'react';
import emailjs from '@emailjs/browser';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://onyhjavapeisjfmyqmlw.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ueWhqYXZhcGVpc2pmbXlxbWx3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgxNzE3ODAsImV4cCI6MjA2Mzc0Nzc4MH0.RGqft6a15h4k_mqG2LAfFxmTplo415ZGw2sSV5hRQHI'
);

interface FormData {
  name: string;
  email: string;
  phone: string;
  payment: string;
  timestamp: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  payment?: string;
}

const OrderForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    payment: '',
    timestamp: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [showPaymentInfo, setShowPaymentInfo] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const EMAILJS_SERVICE_ID = 'freelanceos';
  const EMAILJS_TEMPLATE_ID = 'template_zi4an9q';
  const EMAILJS_PUBLIC_KEY = '5CZndZtzpShCglU33';

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
    
    if (!formData.payment) {
      newErrors.payment = 'الرجاء اختيار طريقة الدفع';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    if (name === 'payment' && value) {
      setShowPaymentInfo(true);
    }
    
    if (errors[name as keyof FormErrors]) {
      setErrors({
        ...errors,
        [name]: undefined
      });
    }
  };

  const sendEmail = async () => {
    try {
      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          to_name: formData.name,
          to_email: formData.email,
          phone: formData.phone,
          payment_method: formData.payment,
          timestamp: formData.timestamp
        },
        EMAILJS_PUBLIC_KEY
      );
      
      return result;
    } catch (error) {
      console.error('EmailJS Error:', error);
      throw error;
    }
  };

  const saveToDatabase = async () => {
    try {
      const { error } = await supabase
        .from('orders')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            payment_method: formData.payment,
            timestamp: new Date().toISOString()
          }
        ]);

      if (error) throw error;
    } catch (error) {
      console.error('Supabase Error:', error);
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
          payment: '',
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
    <section className="order-section" id="form">
      <h2 className="section-title">📥 اطلب نسختك الآن</h2>
      <div className="order-container">
        <form id="order-form" className="order-form" onSubmit={handleSubmit}>
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
            <label htmlFor="payment">طريقة الدفع</label>
            <div className="input-with-icon">
              <i className="fas fa-credit-card"></i>
              <select 
                id="payment" 
                name="payment"
                value={formData.payment}
                onChange={handleChange}
                required
              >
                <option value="" disabled>اختر طريقة الدفع</option>
                <option value="bank">بطاقة بنكية</option>
                <option value="instapay">انستاباي</option>
                <option value="wallet">تحويل محفظة</option>
                <option value="paypal">بايبال</option>
              </select>
            </div>
            {errors.payment && <span className="error-message">{errors.payment}</span>}
            
            {showPaymentInfo && (
              <div className="payment-info" style={{
                marginTop: '10px',
                color: '#4CAF50',
                fontSize: '14px',
                backgroundColor: '#f8f8f8',
                padding: '10px',
                borderRadius: '5px',
                borderRight: '3px solid #4CAF50'
              }}>
                <i className="fas fa-info-circle"></i> سيتم إرسال تفاصيل الدفع بعد تأكيد الطلب
              </div>
            )}
          </div>

          <input type="hidden" id="timestamp" name="timestamp" value={formData.timestamp} />
          
          <button 
            type="submit" 
            className="submit-btn"
            disabled={isSubmitting}
          >
            <span className="btn-text">
              {isSubmitting ? 'جاري الإرسال...' : 'أرسل الطلب الآن'}
            </span>
            <span className="btn-icon">
              <i className="fas fa-arrow-left"></i>
            </span>
          </button>
        </form>
        
        <div className="order-security">
          <div className="security-item">
            <i className="fas fa-lock"></i>
            <span>دفع آمن 100%</span>
          </div>
          <div className="security-item">
            <i className="fas fa-shield-alt"></i>
            <span>تحديثات دائمة</span>
          </div>
          <div className="security-item">
            <i className="fas fa-headset"></i>
            <span>دعم فني</span>
          </div>
        </div>
      </div>
      
      {showSuccess && (
        <div className="success-popup" id="success-popup">
          <div className="popup-content">
            <div className="popup-icon">
              <i className="fas fa-check-circle"></i>
            </div>
            <h3>تم استلام طلبك بنجاح!</h3>
            <p>سيتم إرسال تفاصيل الدفع إلى بريدك الإلكتروني خلال دقائق.</p>
            <button className="close-popup" onClick={closePopup}>حسناً</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default OrderForm;