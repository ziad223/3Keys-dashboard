'use client'

import { ChevronDown } from 'lucide-react'
import Image from 'next/image'
import React, { useState, useRef, useEffect } from 'react'

const HomeHeader = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState('الشهر الحالي')
  const dropdownRef = useRef<HTMLDivElement>(null)

  const options = [
    { label: 'اليوم', value: 'اليوم' },
    { label: 'الاسبوع الحالي', value: 'الاسبوع الحالي' },
    { label: 'الشهر الحالي', value: 'الشهر الحالي' },
  ]

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <h1 className="text-[20px] lg:text-[24px] text-[#00614E] font-medium">نظرة عامة على المنصة</h1>
            
            <div className="relative" ref={dropdownRef}>
              <div 
                onClick={() => setIsOpen(!isOpen)}
                className="h-[27px] bg-[#E8E7E3] rounded-[50px] flex items-center justify-center gap-2 cursor-pointer select-none transition-all hover:bg-[#dfdeda] px-3 lg:px-4"
              >
                <span className="text-[#00614E] text-[10px] font-medium leading-none whitespace-nowrap">{selected}</span>
                <ChevronDown className={`w-3 h-3 text-[#00614E] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
              </div>

              {isOpen && (
                <div className="absolute top-[35px] right-0 w-[140px] bg-white rounded-[16px] shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-[#E8E7E3]/60 p-1.5 z-50 animate-in fade-in zoom-in-95 duration-200 origin-top">
                  <div className="flex flex-col gap-0.5">
                    {options.map((option) => (
                      <div
                        key={option.value}
                        onClick={() => {
                          setSelected(option.value)
                          setIsOpen(false)
                        }}
                        className={`h-[36px] px-3 text-[12px] cursor-pointer transition-all duration-200 rounded-[10px] flex items-center justify-center font-medium
                          ${selected === option.value 
                            ? 'bg-[#00614E] text-white' 
                            : 'text-[#909090] hover:bg-[#F8F8F7]'
                          }`}
                      >
                        {option.label}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          <span className="text-xs lg:text-sm font-medium text-[#4E525D]">لمحة شاملة عن أداء منصة ديار العقارية اليوم</span>
        </div>

        <button className="flex items-center justify-center cursor-pointer gap-2 h-[40px] lg:h-[44px] w-full sm:w-[146px] bg-[#E8E7E3] rounded-[10px] lg:rounded-[12px] transition-all hover:bg-[#dfdeda] px-4">
          <Image src="/images/home/download.svg" alt="download" width={14} height={14} />
          <span className="text-[#00614E] text-xs lg:text-sm font-medium">تصدير التقرير</span>
        </button>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 lg:gap-4">
         {[
           { label: 'إجمالي الوحدات', value: '12,487', change: '+8.2%', icon: 'card-1.svg', color: '#00614E', bg: '#00614E' },
           { label: 'المكاتب العقارية', value: '842', change: '+3.4%', icon: 'card-2.svg', color: '#00614E', bg: '#00614E' },
           { label: 'الوسطاء العقاريون', value: '3,215', change: '+12.1%', icon: 'card-3.svg', color: '#00614E', bg: '#00614E' },
           { label: 'الاشتراكات النشطة', value: '612', change: '+6.7%', icon: 'card-4.svg', color: '#00614E', bg: '#00614E' },
           { label: 'إيرادات الشهر', value: '847,200 ر.س', change: '+6.7%', icon: 'card-4.svg', color: '#E6B536', bg: '#E6B536', iconColor: 'arrow-up-2.svg' }
         ].map((stat, idx) => (
           <div key={idx} className='rounded-[16px] bg-[#E8E7E3] p-4 lg:p-5 flex flex-col justify-between transition-transform hover:scale-[1.02] cursor-default'> 
             <div className='flex items-center justify-between w-full'>
               <div className='w-9 h-9 lg:w-10 lg:h-10 rounded-[10px] lg:rounded-[12px] flex items-center justify-center' style={{ backgroundColor: stat.bg }}>
                 <Image src={`/images/home/${stat.icon}`} alt={stat.label} width={18} height={18} />
               </div>
               <span className='flex items-center gap-1'>
                 <Image src={`/images/home/${stat.iconColor || 'arrow-up.svg'}`} alt="up" width={16} height={16} />
                 <p className='text-[12px] lg:text-[14px] font-bold' style={{ color: stat.color }}>{stat.change}</p>
               </span> 
             </div>
             <div className="mt-4">
               <h2 className='text-[20px] lg:text-[22px] font-bold text-left' style={{ color: stat.color }}>{stat.value}</h2>
               <h4 className='text-xs lg:text-sm font-medium text-[#30343F] mt-1'>{stat.label}</h4>
             </div>
           </div>
         ))}
      </div>
    </div>
  )
}

export default HomeHeader