// sidebar.tsx - النسخة المحدثة مع دعم التصغير
'use client' 
import React, { useState, useEffect } from 'react'
import { 
  House, 
  LayoutDashboard, 
  Building, 
  PlusCircle, 
  Users, 
  PieChart, 
  Settings, 
  Bell, 
  LogOut,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import Image from 'next/image'
import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Sidebar = ({ isCollapsed = false, onMobile = false }: { isCollapsed?: boolean; onMobile?: boolean }) => {
  const t = useTranslations('Sidebar');
  const nt = useTranslations('Navbar');
  const pathname = usePathname();
  const locale = useLocale();
  const [collapsed, setCollapsed] = useState(isCollapsed);

  // استماع لحدث التصغير من النافبار
  useEffect(() => {
    const handleCollapseToggle = (event: CustomEvent) => {
      setCollapsed(event.detail);
    };
    
    window.addEventListener('toggleSidebarCollapse', handleCollapseToggle as EventListener);
    return () => window.removeEventListener('toggleSidebarCollapse', handleCollapseToggle as EventListener);
  }, []);

  // تحديث الحالة عندما يتغير prop isCollapsed
  useEffect(() => {
    setCollapsed(isCollapsed);
  }, [isCollapsed]);

  const counts = {
    properties: 45,   
    team: 5,          
  };

  const navItems = [
    { id: 'home', icon: LayoutDashboard, label: t('home'), href: `/${locale}`, showCount: false, isCustomIcon: false },
    { id: 'properties', icon: Building, label: t('brokerProperties'), href: `/${locale}/properties`, showCount: true, count: counts.properties, isCustomIcon: false },
    { id: 'add', icon: PlusCircle, label: t('addProperty'), href: `/${locale}/add`, showCount: false, isCustomIcon: false },
    { id: 'leads', icon: '/images/leeds.svg', label: t('leads'), href: `/${locale}/leads`, showCount: false, isCustomIcon: true },
    { id: 'team', icon: Users, label: t('teamMembers'), href: `/${locale}/team`, showCount: true, count: counts.team, isCustomIcon: false },
    { id: 'stats', icon: '/images/char-icon.svg', label: t('brokerStats'), href: `/${locale}/stats`, showCount: false, isCustomIcon: true },
    { id: 'settings', icon: Settings, label: t('settings'), href: `/${locale}/settings`, showCount: false, isCustomIcon: false },
    { id: 'notifications', icon: Bell, label: t('notifications'), href: `/${locale}/notifications`, showCount: false, isCustomIcon: false },
  ];

  const isActive = (href: string) => {
    if (href === `/${locale}` || href === `/${locale}/`) {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  const renderIcon = (item: any, isActiveItem: boolean) => {
    if (item.isCustomIcon) {
      return (
        <Image 
          src={item.icon} 
          alt={item.label} 
          width={22} 
          height={22}
          className={isActiveItem ? 'brightness-0 invert' : 'opacity-70'}
        />
      );
    }
    const IconComponent = item.icon;
    return <IconComponent size={22} className={isActiveItem ? 'text-white' : 'text-[#B3B3B3]'} />;
  };

  // إذا كان السايدبار مصغر على الشاشات الكبيرة
  if (collapsed && !onMobile) {
    return (
      <div className='w-[80px] bg-[#111111] h-full flex flex-col p-2 border-l border-[#222] overflow-y-auto sidebar-scroll'>
        {/* Profile Icon - مصغر */}
        <div className='bg-[#1A1A1A] rounded-[20px] p-3 mb-8 flex flex-col items-center'>
          <div className='w-12 h-12 rounded-[20px] bg-[#D6533D] flex items-center justify-center'>
            <span className='text-[20px] font-bold text-white'>وخ</span>
          </div>
        </div>

        {/* Navigation Links - أيقونات فقط */}
        <nav className='flex-1 flex flex-col gap-2'>
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`flex items-center justify-center gap-3 px-2 py-3 rounded-[12px] transition-all ${
                isActive(item.href)
                  ? 'bg-[#D6533D] text-white'
                  : 'text-[#B3B3B3] hover:bg-[#1A1A1A] hover:text-white'
              }`}
              title={item.label}
            >
              {renderIcon(item, isActive(item.href))}
              {item.showCount && (
                <span className={`absolute top-0 right-0 text-[10px] font-medium px-1 rounded-full ${
                  isActive(item.href)
                    ? 'bg-white/20 text-white'
                    : 'bg-[#D6533D] text-white'
                }`}>
                  {item.count}
                </span>
              )}
            </Link>
          ))}
          <div className='border-t border-[#4A4A4A] my-2'></div>
        </nav>

        {/* Logout - أيقونة فقط */}
        <button className='mt-auto flex items-center justify-center gap-3 px-2 py-3 text-[#D6533D] hover:bg-[#1A1A1A] rounded-[12px] transition-all'>
          <LogOut size={22} />
        </button>
      </div>
    );
  }

  // الوضع الطبيعي (مفرد أو على الموبايل)
  return (
    <div className='w-[280px] bg-[#111111] h-full flex flex-col p-4 border-l border-[#222] overflow-y-auto sidebar-scroll'>
      {/* Profile Card */}
      <div className='bg-[#1A1A1A] rounded-[20px] p-5 mb-8 flex flex-col items-center text-center'>
        <div className='w-16 h-16 rounded-[20px] bg-[#D6533D] flex items-center justify-center mb-3'>
          <span className='text-[24px] font-bold text-white'>وخ</span>
        </div>
        <h2 className='text-[18px] font-bold text-white mb-1'>{nt('companyName')}</h2>
        <div className='flex items-center gap-2 mb-1'>
          <Image src="/images/verified.svg" alt="Verified" width={14} height={14} />
          <span className='text-[14px] text-[#22C55E]'>{nt('verifiedBroker')}</span>
        </div>
        <p className='text-[12px] text-[#B3B3B3] font-mono mt-1'>{t('cr')}</p>
      </div>

      {/* Navigation Links */}
      <nav className='flex-1 flex flex-col gap-2'>
        {navItems.map((item, index) => (
          <React.Fragment key={item.id}>
            <Link
              href={item.href}
              className={`flex items-center justify-between gap-3 px-4 py-3 rounded-[12px] transition-all ${
                isActive(item.href)
                  ? 'bg-[#D6533D] text-white'
                  : 'text-[#B3B3B3] hover:bg-[#1A1A1A] hover:text-white'
              }`}
            >
              <div className='flex items-center gap-3'>
                {renderIcon(item, isActive(item.href))}
                <span className='text-[15px] font-medium'>{item.label}</span>
              </div>
              {item.showCount && (
                <span className={`text-[12px] font-medium px-2 py-0.5 rounded-full transition-all ${
                  isActive(item.href)
                    ? 'bg-white/20 text-white'
                    : 'bg-[#D6533D]/20 text-[#D6533D]'
                }`}>
                  {item.count}
                </span>
              )}
            </Link>
            {item.id === 'stats' && (
              <div className='border-t border-[#4A4A4A]'></div>
            )}
          </React.Fragment>
        ))}
      </nav>

      {/* Logout */}
      <button className='mt-auto flex items-center gap-3 px-4 py-3 text-[#D6533D] hover:bg-[#1A1A1A] rounded-[12px] transition-all font-medium'>
        <LogOut size={22} />
        <span>{t('logout')}</span>
      </button>

      <style jsx>{`
        .sidebar-scroll::-webkit-scrollbar {
          width: 4px;
        }
        .sidebar-scroll::-webkit-scrollbar-track {
          background: #1A1A1A;
          border-radius: 10px;
        }
        .sidebar-scroll::-webkit-scrollbar-thumb {
          background: #D6533D;
          border-radius: 10px;
        }
        .sidebar-scroll::-webkit-scrollbar-thumb:hover {
          background: #b84734;
        }
        .sidebar-scroll {
          scrollbar-width: thin;
          scrollbar-color: #D6533D #1A1A1A;
        }
      `}</style>
    </div>
  )
}

export default Sidebar