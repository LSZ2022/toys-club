import React, { useState } from 'react';
import Footer from '../components/layouts/Footer';
import Header from '../components/layouts/Header';
import { useToast } from '../contexts/ToastContext';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const { showToast } = useToast(); // 现在处于 ToastProvider 范围内，可正常使用

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Your message has been sent!', 'success');
    setFormData({ name: '', email: '', message: '' });
  };

  // 组件其余部分不变...
  return (
    <div>
      <Header />
      {/* 原有内容... */}
      <Footer />
    </div>
  );
};

export default Contact;