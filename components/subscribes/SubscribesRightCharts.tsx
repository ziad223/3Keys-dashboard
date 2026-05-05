'use client'

import React, { useState, useRef, useEffect } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { ChevronDown } from 'lucide-react'

const data = [
  { name: 'أكتوبر', revenue: 300000, subscriptions: 800000 },
  { name: 'سبتمبر', revenue: 350000, subscriptions: 850000 },
  { name: 'أغسطس', revenue: 400000, subscriptions: 800000 },
  { name: 'يوليو', revenue: 450000, subscriptions: 750000 },
  { name: 'يونيو', revenue: 500000, subscriptions: 700000 },
  { name: 'مايو', revenue: 550000, subscriptions: 650000 },
  { name: 'أبريل', revenue: 600000, subscriptions: 600000 },
  { name: 'مارس', revenue: 650000, subscriptions: 550000 },
  { name: 'فبراير', revenue: 700000, subscriptions: 500000 },
  { name: 'يناير', revenue: 750000, subscriptions: 400000 },
];

const SubscribesRightCharts = () => {
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
    <div className="bg-[#E8E7E3] rounded-[12px] p-6 shadow-sm border border-gray-100 h-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div className="flex items-center gap-2">
          <h3 className="text-[18px] font-bold text-[#00614E]">تحليل الإيرادات والاشتراكات</h3>
          <div className="relative" ref={dropdownRef}>
            <div 
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-2 h-[27px] px-2.5 py-1.5 cursor-pointer text-[#00614E] bg-[#F9FAFB] border border-[#E5E7EB] rounded-[8px] text-[13px] font-medium transition-all hover:bg-[#f3f4f6]"
            >
              <span className="leading-none whitespace-nowrap">{selected}</span>
              <ChevronDown className={`w-4 h-4 text-[#00614E] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
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
        
        <div className="flex items-center gap-6 mt-4 sm:mt-0">
          <div className="flex items-center gap-4 text-sm">
             <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F2B222]"></span>
              <span className="text-[#F2B222] text-[13px] font-medium">الإيرادات</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00614E]"></span>
              <span className="text-[#00614E] text-[13px] font-medium">الاشتراكات</span>
            </div>
          </div>
        
        </div>
      </div>

      <div className="h-[340px] w-full mt-4" dir="ltr">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: 10, bottom: 25 }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F2B222" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#F2B222" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorSubs" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00614E" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#00614E" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#E5E7EB" strokeOpacity={0.5} />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#8F95B2', fontSize: 13, fontWeight: 500, fontFamily: 'var(--font-readex-regular)' }} 
              dy={15}
            />
            <YAxis 
              orientation="right"
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#8F95B2', fontSize: 12, fontWeight: 500, fontFamily: 'var(--font-readex-regular)' }} 
              dx={15}
              width={70}
              domain={[0, 1000000]}
              ticks={[0, 250000, 500000, 750000, 1000000]}
              tickFormatter={(value) => value.toLocaleString()}
            />
            <Tooltip 
              contentStyle={{ 
                borderRadius: '12px', 
                border: 'none', 
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)', 
                textAlign: 'right', 
                direction: 'rtl',
                padding: '12px 16px',
                backgroundColor: 'rgba(255, 255, 255, 0.95)'
              }}
              itemStyle={{ fontSize: '14px', fontWeight: 600, padding: '4px 0' }}
              labelStyle={{ color: '#8F95B2', marginBottom: '8px', fontSize: '12px' }}
            />
            <Area 
              type="monotone" 
              dataKey="subscriptions" 
              name="الاشتراكات"
              stroke="#00614E" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorSubs)" 
              activeDot={{ r: 6, strokeWidth: 0, fill: '#00614E' }}
            />
            <Area 
              type="monotone" 
              dataKey="revenue" 
              name="الإيرادات"
              stroke="#F2B222" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorRevenue)" 
              activeDot={{ r: 6, strokeWidth: 0, fill: '#F2B222' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default SubscribesRightCharts