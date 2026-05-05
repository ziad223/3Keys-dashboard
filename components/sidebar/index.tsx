'use client' 
import React, { useState, useEffect } from 'react'
import { 
  ChevronLeft,
  Receipt,
  Tags           // بس الأيقونة الجديدة للتصنيفات
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavItem {
  id: string;
  icon: string | React.ReactNode;
  label: string;
  href: string;
  showCount: boolean;
  count?: number;
}

interface SidebarProps {
  isCollapsed?: boolean;
  onMobile?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed = false, onMobile = false }) => {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState<boolean>(isCollapsed);

  useEffect(() => {
    const handleCollapseToggle = (event: CustomEvent<boolean>) => {
      setCollapsed(event.detail);
    };
    
    window.addEventListener('toggleSidebarCollapse', handleCollapseToggle as EventListener);
    return () => window.removeEventListener('toggleSidebarCollapse', handleCollapseToggle as EventListener);
  }, []);

  useEffect(() => {
    setCollapsed(isCollapsed);
  }, [isCollapsed]);

  const counts = {
    properties: 12487,   
    agencies: 842,
    agents: 3215,          
  };

  const navItems: NavItem[] = [
    { id: 'home', icon: '/images/sidebar/sidebar-icon-1.svg', label: 'نظرة عامة', href: '/', showCount: false },
    { id: 'properties', icon: '/images/sidebar/sidebar-icon-2.svg', label: 'الوحدات العقارية', href: '/real-estate-units', showCount: true, count: counts.properties },
    { id: 'agencies', icon: '/images/sidebar/sidebar-icon-3.svg', label: 'المكاتب العقارية', href: '/real-estate-offices', showCount: true, count: counts.agencies },
    { id: 'ads', icon: '/images/sidebar/sidebar-icon-5.svg', label: 'إدارة الاشتراكات ', href: '/subscribes', showCount: false },
    { id: 'payments', icon: <Receipt size={22}/>, label: 'المدفوعات والفواتير', href: '/payments-and-invoices', showCount: false },
    { id: 'packages', icon: '/images/sidebar/sidebar-icon-9.svg', label: 'إدارة الباقات', href: '/packages', showCount: false },
    { id: 'categories', icon: <Tags size={22}/>, label: 'إدارة التصنيفات', href: '/categories', showCount: false },  // ←改了 هنا بس
    { id: 'blog', icon: '/images/sidebar/sidebar-icon-6.svg', label: 'إدارة المدونة', href: '/blogs', showCount: false },
  ];

  const isActive = (href: string): boolean => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  const handleCollapse = (): void => {
    const newCollapsedState = !collapsed;
    setCollapsed(newCollapsedState);
    window.dispatchEvent(new CustomEvent('toggleSidebarCollapse', { detail: newCollapsedState }));
  };

const renderIcon = (item: NavItem, isActiveItem: boolean): React.ReactNode => {
  if (typeof item.icon !== 'string') {
    return (
      <div className={`transition-all duration-200 ${isActiveItem ? 'text-[#00614E]' : 'text-white'}`}>
        {item.icon}
      </div>
    );
  }
  
  return (
    <Image 
      src={item.icon} 
      alt={item.label} 
      width={22} 
      height={22}
      className={`transition-all duration-200`}
      style={{
        filter: isActiveItem 
          ? 'brightness(0) saturate(100%) invert(29%) sepia(89%) saturate(1234%) hue-rotate(148deg) brightness(95%) contrast(101%)'
          : 'brightness(0) invert(1)'
      }}
    />
  );
};

const renderIconCollapsed = (item: NavItem, isActiveItem: boolean): React.ReactNode => {
  if (typeof item.icon !== 'string') {
    return (
      <div className={`transition-all duration-200 ${isActiveItem ? 'text-[#00614E]' : 'text-white'}`}>
        {item.icon}
      </div>
    );
  }
  
  return (
    <Image 
      src={item.icon} 
      alt={item.label} 
      width={24} 
      height={24}
      className={`transition-all duration-200`}
      style={{
        filter: isActiveItem 
          ? 'brightness(0) saturate(100%) invert(29%) sepia(89%) saturate(1234%) hue-rotate(148deg) brightness(95%) contrast(101%)'
          : 'brightness(0) invert(1)'
      }}
    />
  );
};

  // الوضع المصغر
  if (collapsed && !onMobile) {
    return (
      <div className='w-[80px] bg-[#00614E] h-full flex flex-col py-4 overflow-y-auto sidebar-scroll'>
        <button 
          onClick={handleCollapse}
          className='flex items-center justify-center mb-8 mt-2 cursor-pointer hover:opacity-80 transition-opacity mx-auto'
        >
          <div className='w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center'>
            <Image src="/images/logo.svg" alt="Diyar" width={24} height={24} className="brightness-0 invert" />
          </div>
        </button>

        <div className='w-full h-px bg-gray-400'></div>

        <nav className='flex-1 flex flex-col  items-center mt-3 gap-2 px-2'>
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`group flex items-center justify-center w-[42px] h-[50px] rounded-[10px] transition-all relative ${
                isActive(item.href) ? 'bg-white text-[#00614E] shadow-lg' : 'hover:bg-white/10'
              }`}
              title={item.label}
            >
              {renderIconCollapsed(item, isActive(item.href))}
              {/* {item.showCount && (
                <span className={`absolute -top-1 -right-1 text-[10px] font-bold min-w-[18px] h-[18px] flex items-center justify-center px-1 rounded-full ${
                  isActive(item.href) ? 'bg-[#00614E] text-white' : 'bg-[#D6533D] text-white'
                }`}>
                  {item.count && item.count > 999 ? `${Math.floor(item.count / 1000)}k` : item.count}
                </span>
              )} */}
            </Link>
          ))}
        </nav>

      
      </div>
    );
  }

  return (
    <div className='w-[280px] bg-[#00614E] h-full flex flex-col overflow-y-auto sidebar-scroll'>
      {/* Logo Section */}
      <div className='p-4 pb-2'>
        <button 
          onClick={handleCollapse}
          className='flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity px-2 mb-6 mt-2'
        >
          <Image src="/images/logo.svg" alt="Diyar" width={24} height={24} className="brightness-0 invert" />
          <h1 className='text-[20px] font-medium text-white'>ديار</h1>
        </button>
        <div className='bg-white/20 w-full h-px'></div>
      </div>

      {/* Navigation Links */}
      <nav className='flex-1 flex flex-col gap-3 px-3 py-2'>
        {navItems.map((item, index) => {
          const isFirstItem = index === 0;
          
          return (
            <Link
              key={item.id}
              href={item.href}
              className={`group flex items-center justify-between gap-3 px-3 py-3 rounded-[12px] transition-all ${
                isActive(item.href) ? 'bg-white text-[#00614E] font-medium text-sm shadow-md' : 'hover:bg-white/10'
              }`}
            >
              <div className='flex items-center gap-3'>
                <div className="w-[18px] h-[18px]">
                  {renderIcon(item, isActive(item.href))}
                </div>
                <span className={`text-[15px] font-medium ${
                  isActive(item.href) ? 'text-[#00614E]' : 'text-white/80 group-hover:text-white'
                }`}>
                  {item.label}
                </span>
              </div>
              <div className='flex items-center gap-2'>
                {item.showCount && (
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full transition-all ${
                    isActive(item.href) ? 'bg-[#00614E] text-white' : 'bg-white text-[#00614E] group-hover:bg-white/30'
                  }`}>
                    {item.count?.toLocaleString()}
                  </span>
                )}

{isFirstItem && (
  <button 
    onClick={(e) => {
      e.preventDefault();
      handleCollapse();
    }}
    className={`p-1 rounded-md hover:bg-black/10 transition-all`}
  >
    <ChevronLeft 
      size={18} 
      className={`font-bold transition-colors ${
        isActive(item.href) 
          ? 'text-[#00614E]' 
          : 'text-white'       
      }`}
    />
  </button>
)}
              </div>
            </Link>
          );
        })}
      </nav>

  
    </div>
  )
}

export default Sidebar