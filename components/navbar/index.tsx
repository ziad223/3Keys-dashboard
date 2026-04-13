// navbar.tsx
'use client'

import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import LanguageSelector from './LanguageSelector'
import { useTranslations } from 'next-intl'
import Sidebar from '../sidebar'

const Navbar = () => {
  const t = useTranslations('Navbar');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  
  // للشاشات الصغيرة: toggle الـ mobile sidebar
  useEffect(() => {
    const handleToggleSidebar = () => setIsSidebarOpen(prev => !prev);
    window.addEventListener('toggleSidebar', handleToggleSidebar);
    return () => window.removeEventListener('toggleSidebar', handleToggleSidebar);
  }, []);

  // منع التمرير عند فتح الموبايل سايدبار
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isSidebarOpen]);

  const handleMenuClick = () => {
    // التحقق من حجم الشاشة
    if (window.innerWidth >= 1024) { // lg breakpoint
      // على الشاشات الكبيرة: toggle تصغير/تكبير السايدبار
      setIsSidebarCollapsed(!isSidebarCollapsed);
      // إرسال حدث للتغيير
      window.dispatchEvent(new CustomEvent('toggleSidebarCollapse', { detail: !isSidebarCollapsed }));
    } else {
      // على الشاشات الصغيرة: فتح الموبايل سايدبار
      setIsSidebarOpen(true);
    }
  };

  return (
    <>
      <div className='h-[80px] bg-[#111111] flex items-center justify-between w-full px-4 lg:px-8'>
        <div className='flex items-center gap-2'>
          <Menu 
            className='min-w-[20px] min-h-[20px] text-white cursor-pointer' 
            onClick={handleMenuClick}
          />
          <Image src="/images/logo.svg" alt="Logo" width={116} height={24} className='lg:w-[114px] w-[60px]' />
        </div>
        <div className='flex items-center gap-7'>
          <Link href='/' className='hidden lg:block'>{t('backToSite')}</Link>
          <LanguageSelector/>  
          <div className='flex items-center gap-2'>
              <div className='w-8 h-8 rounded-[10px] bg-[#D6533D] flex items-center justify-center'>
                  <span className='text-[14px] font-medium text-white'>وخ</span>
              </div>
              <div className='flex-col items-center hidden md:flex'>
                  <h2 className='text-[16px] font-medium text-[#B3B3B3]'>{t('companyName')}</h2>
                  <div className='flex items-center gap-2'>
                      <Image src="/images/verified.svg" alt="Logo" width={10} height={16} />
                      <span className='text-[14px] font-medium text-[#B3B3B3]'>{t('verifiedBroker')}</span>
                  </div>
              </div>
          </div>     
        </div>
      </div>

      {/* Mobile Sidebar Overlay - فقط للشاشات الصغيرة */}
      <div 
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 lg:hidden ${
          isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsSidebarOpen(false)}
      />
      
      {/* Mobile Sidebar - فقط للشاشات الصغيرة */}
      <div 
        className={`fixed top-0 right-0 h-full z-50 transition-transform duration-300 ease-in-out lg:hidden ${
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ width: '280px' }}
      >
        <div className="relative h-full">
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="absolute top-4 left-4 z-10 p-1 rounded-full bg-[#1A1A1A] text-white"
          >
            <X size={20} />
          </button>
          <Sidebar isCollapsed={false} onMobile={true} />
        </div>
      </div>
    </>
  )
}

export default Navbar