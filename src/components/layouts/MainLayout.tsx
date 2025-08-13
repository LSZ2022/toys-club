import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@/components/layouts/Header';
import Footer from '@/components/layouts/Footer';

const MainLayout: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  // 监听滚动事件，用于导航栏样式变化
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header scrolled={scrolled} />
      <main className="flex-grow">
        <Outlet /> {/* 渲染子路由内容 */}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
