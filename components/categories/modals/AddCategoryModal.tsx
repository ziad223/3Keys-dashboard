'use client'

import React, { useEffect, useState } from 'react'
import { X, Plus, Check, Eye, EyeOff, EyeOffIcon } from 'lucide-react'

type AddCategoryModalProps = {
  isOpen: boolean
  onClose: () => void
  className?: string
}

const AddCategoryModal = ({ isOpen, onClose, className }: AddCategoryModalProps) => {
  const [selectedColor, setSelectedColor] = useState('#00614E')
  const [status, setStatus] = useState<'active' | 'inactive'>('active')

  const colors = [
    '#00614E', // Dark Green
    '#E6B536', // Yellow
    '#999894', // Grey
    '#309382', // Teal
    '#E07E3D', // Orange
  ]

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" dir="rtl">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div 
        className={`relative bg-[#E8E7E3] w-[665px]  rounded-[20px] lg:rounded-[32px] max-h-[95vh] shadow-2xl z-10 flex flex-col overflow-y-auto ${className || ''}`}
      >

        {/* Header */}
        <div className=" sm:p-6 p-5  lg:p-5 lg:pb-4 pb-4  px-5 sm:px-6 lg:px-8 flex items-center justify-between shrink-0">
          <h2 className="text-[18px] lg:text-[20px] font-medium text-[#00614E]">إضافة تصنيف جديدة</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 transition-all cursor-pointer"
          >
            <X size={18} className="text-[#4E525D]" />
          </button>
        </div>

        {/* Form Body */}
        <div className="px-5 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-5 lg:gap-6 py-4">

            {/* Category Name */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[#4E525D]">اسم التصنيف <span className="text-red-500">*</span></label>
              <input
                type="text"
                placeholder="مثال: إيجار، بيع وشراء..."
                className="w-full bg-[#F4F3EF] h-[48px] rounded-[12px] px-4 outline-none text-[#4E525D] focus:ring-1 focus:ring-[#00614E] transition-all"
              />
            </div>

            {/* Description */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[#4E525D]">الوصف (اختياري)</label>
              <input
                type="text"
                placeholder="وصف مختصر للتصنيف..."
                className="w-full bg-[#F4F3EF] h-[48px] rounded-[12px] px-4 outline-none text-[#4E525D] focus:ring-1 focus:ring-[#00614E] transition-all"
              />
            </div>

            {/* Color */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[#4E525D]">اللون المميز</label>
              <div className="flex items-center gap-2 h-[48px]">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`flex-1 h-full cursor-pointer rounded-[12px] transition-all ${selectedColor === color ? 'ring-2 ring-offset-2 ring-[#00614E]' : ''}`}
                    style={{ backgroundColor: color }}
                    type="button"
                  />
                ))}
              </div>
            </div>

            {/* Status */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[#4E525D]">حالة التصنيف</label>
              <div className="flex items-center gap-2 h-[48px]">
                <button
                  type="button"
                  onClick={() => setStatus('active')}
                  className={`flex-1 h-full rounded-[12px] flex items-center justify-center gap-1 sm:gap-2 text-[12px] sm:text-[13px] font-bold transition-all cursor-pointer ${
                    status === 'active'
                      ? 'bg-white text-[#00614E] border border-[#00614E]'
                      : 'bg-[#F4F3EF] text-[#999894]'
                  }`}
                >
                  <Eye size={16} className="w-4 h-4 sm:w-5 sm:h-5" />
                  نشط
                </button>
                <button
                  type="button"
                  onClick={() => setStatus('inactive')}
                  className={`flex-1 h-full rounded-[12px] flex items-center justify-center gap-1 sm:gap-2 text-[12px] sm:text-[13px] font-bold transition-all cursor-pointer ${
                    status === 'inactive'
                      ? 'bg-[#999894] text-white'
                      : 'bg-[#F4F3EF] text-[#999894]'
                  }`}
                >
                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye-off-icon lucide-eye-off w-4 h-4 sm:w-5 sm:h-5"><path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"/><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"/><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"/><path d="m2 2 20 20"/></svg>
                 مخفي
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Footer Buttons */}
        <div className="grid grid-cols-1 lg:grid-cols-3 py-4 px-5 sm:px-6 lg:px-8 gap-3 shrink-0 pb-6 lg:pb-8">
         
          <button
            className="lg:col-span-2 col-span-1 w-full h-[48px] rounded-[12px] bg-[#00614E] text-white font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#005240] transition-all cursor-pointer"
          >
            <Plus size={20} />
            <span>إضافة التصنيف</span>
          </button>

           <button
            onClick={onClose}
            className="lg:col-span-1 w-full h-[48px] rounded-[12px] bg-white text-[#4E525D] font-bold text-sm border border-[#E8E7E3] hover:bg-gray-50 transition-all cursor-pointer"
          >
            إلغاء
          </button>
        </div>

      </div>
    </div>
  )
}

export default AddCategoryModal
