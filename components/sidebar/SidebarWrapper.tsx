'use client'

import React, { useState, useEffect } from 'react';
import Sidebar from '.';

const SidebarWrapper = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const handleToggle = () => {
      setIsSidebarOpen(prev => !prev);
    };

    window.addEventListener('toggleSidebar', handleToggle);
    return () => window.removeEventListener('toggleSidebar', handleToggle);
  }, []);

  return (
    <div className="flex flex-1 overflow-hidden relative">
      {/* Sidebar with responsive classes - نفس التصميم بالضبط */}
      <div className={`
        fixed lg:relative z-50
        transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <Sidebar />
      </div>
      
      {/* Overlay for mobile only */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      
      {/* Content */}
      <div className="flex-1 flex flex-col overflow-hidden w-full">
        {children}
      </div>
    </div>
  );
};

export default SidebarWrapper;