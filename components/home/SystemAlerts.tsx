'use client'

import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { ChevronDown } from 'lucide-react'

type Alert = {
  icon: string
  iconBg: string
  text: string
  borderColor: string
  bgColor: string
  textColor: string
}

const alerts: Alert[] = [
  {
    icon: '/images/home/activity-2.svg',
    iconBg: '#EDFAF7',
    text: '4 مكاتب عقارية في انتظار التوثيق',
    borderColor: '#309382',
    bgColor: '#00614E1A',
    textColor: '#00614E',
  },
  {
    icon: '/images/home/activity-1.svg',
    iconBg: '#FFF8E7',
    text: '4 اشتراكات ستنتهي خلال 3 أيام',
    borderColor: '#E6B536',
    bgColor: '#E07E3D1A',
    textColor: '#E07E3D',
  },
  {
    icon: '/images/home/activity-3.svg',
    iconBg: '#FFF0F0',
    text: 'يوجد 15 عملية دفع فاشلة تحتاج اهتمامك',
    borderColor: '#E03D40',
    bgColor: '#E03D401A',
    textColor: '#E03D40',
  },
]

const SystemAlerts = () => {
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
    <div className='flex flex-col gap-3'>
      {/* System Alerts Card */}
      <div className="bg-[#E8E7E3] rounded-[12px] p-6 shadow-sm border border-gray-100 flex flex-col">
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-[18px] font-bold text-[#00614E]">
            تنبيهات النظام
          </h3>
        </div>

        <div className="flex flex-col gap-3">
          {alerts.map((alert, idx) => (
            <div
              key={idx}
              className="flex items-center px-3 py-3 rounded-[10px]"
              style={{
                backgroundColor: alert.bgColor,
              }}
            >
              <div
                className="w-8 h-8 rounded-[7px] flex items-center justify-center flex-shrink-0"
              >
                <Image
                  src={alert.icon}
                  alt="alert icon"
                  width={16}
                  height={16}
                />
              </div>

              <p
                className="text-[13px] font-medium"
                style={{ color: alert.textColor }}
              >
                {alert.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Financial Summary Card */}
      <div className="bg-[#E8E7E3] rounded-[12px] p-6 shadow-sm border border-gray-100 flex flex-col">
        <div className="flex gap-2 items-center mb-6">
          <h3 className="text-[18px] font-medium text-[#00614E]">الملخص المالي</h3>
          
          <div className="relative" ref={dropdownRef}>
            <div 
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-2 h-[27px] px-2.5 py-1.5 cursor-pointer text-[#00614E] bg-[#F9FAFB] border border-[#E5E7EB] rounded-[8px] text-[12px] font-medium transition-all hover:bg-[#f3f4f6]"
            >
              <span className="leading-none whitespace-nowrap">{selected}</span>
              <ChevronDown className={`w-3.5 h-3.5 text-[#00614E] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </div>

            {isOpen && (
              <div className="absolute top-[35px] left-0 w-[140px] bg-white rounded-[16px] shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-[#E8E7E3]/60 p-1.5 z-50 animate-in fade-in zoom-in-95 duration-200 origin-top">
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

        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <span className="text-[14px] text-[#4E525D]">إيرادات الشهر</span>
            <span className="text-[14px]  text-[#00614E]">28,450 ر.س</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[14px] text-[#4E525D]">مبالغ معلقة</span>
            <span className="text-[14px]  text-[#E6B536]">5,980 ر.س</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[14px] text-[#4E525D]">استردادات</span>
            <span className="text-[14px]  text-[#E03D40]">1,200 ر.س</span>
          </div>
          
          <div className="h-[1px] bg-gray-200/50 my-1" />

          <div className="flex justify-between items-center">
            <span className="text-[14px] font-bold text-[#30343F]">صافي الشهر</span>
            <span className="text-[16px] font-bold text-[#00614E]">21,270 ر.س</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SystemAlerts