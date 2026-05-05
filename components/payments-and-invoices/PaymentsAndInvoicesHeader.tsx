'use client'
import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { ChevronDown } from 'lucide-react'

const PaymentsAndInvoicesHeader = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState('الشهر الحالي')
  const dropdownRef = useRef<HTMLDivElement>(null)

  const options = [
    { label: 'اليوم', value: 'اليوم' },
    { label: 'الاسبوع الحالي', value: 'الاسبوع الحالي' },
    { label: 'الشهر الحالي', value: 'الشهر الحالي' },
  ]

  // Close dropdown when clicking outside
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
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <div className='flex gap-3 items-center'>
            <h1 className="text-[20px] lg:text-[24px] font-medium text-[#00614E]">المدفوعات والفواتير</h1>
            <div className="relative" ref={dropdownRef}>
              <div 
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 h-[27px] px-2.5 py-1.5 cursor-pointer text-[#00614E] bg-[#E8E7E3]  rounded-[8px] text-[12px] font-medium transition-all "
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
          <p className="text-[14px] text-[#4E525D] mt-3">سجل كامل لمعاملات الاشتراكات</p>
        </div>

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 h-[40px] px-4 rounded-[10px] bg-[#E8E7E3] cursor-pointer text-[#00614E] text-[13px] font-medium hover:bg-[#00614E]/5 transition-all">
            <Image src="/images/home/download.svg" alt="export" width={16} height={16} />
            <span>تصدير التقرير</span>
          </button>
        </div>
      </div>
    </>
  )
}

export default PaymentsAndInvoicesHeader