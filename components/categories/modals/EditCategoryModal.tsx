'use client'

import React, { useEffect, useState } from 'react'
import { X, Check, Eye, EyeOff } from 'lucide-react'

type Category = {
  id: string
  name: string
  description: string
  articleCount: number
  status: 'active' | 'inactive'
  color: string
}

type EditCategoryModalProps = {
  isOpen: boolean
  onClose: () => void
  category: Category | null
  className?: string
}

const EditCategoryModal = ({ isOpen, onClose, category, className }: EditCategoryModalProps) => {
  const [selectedColor, setSelectedColor] = useState('#00614E')
  const [status, setStatus] = useState<'active' | 'inactive'>('active')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const colors = [
    '#E0D4C8', // Example alternative color
    '#C4D7D1', // Example alternative color
    '#E0E0E0', // Example alternative color
    '#F2E2C4', // Example alternative color
    '#00614E', // Dark Green
  ]

  // Actual colors from design:
  const actualColors = [
    '#F2E5D5', // Light Beige
    '#C7DBD4', // Light Teal
    '#E3E1DE', // Light Grey
    '#F5E8CB', // Light Yellow
    '#00614E', // Dark Green
  ]

  useEffect(() => {
    if (category) {
      setName(category.name)
      setDescription(category.description)
      setSelectedColor(category.color)
      setStatus(category.status)
    }
  }, [category])

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

  if (!isOpen || !category) return null

  // Ensure the selected color is always in the list for editing
  const displayColors = [...actualColors]
  if (!displayColors.includes(category.color)) {
    displayColors[displayColors.length - 1] = category.color
  }

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
          <h2 className="text-[18px] lg:text-[20px] font-medium text-[#00614E]">تعديل تصنيف</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 transition-all cursor-pointer"
          >
            <X size={18} className="text-[#4E525D]" />
          </button>
        </div>

        {/* Form Body */}
        <div className="px-5 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-5 lg:gap-6 ">

            {/* Category Name */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[#4E525D]">اسم التصنيف <span className="text-red-500">*</span></label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#F4F3EF] h-[48px] rounded-[12px] px-4 outline-none text-[#4E525D] focus:ring-1 focus:ring-[#00614E] transition-all"
              />
            </div>

            {/* Description */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[#4E525D]">الوصف (اختياري)</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-[#F4F3EF] h-[48px] rounded-[12px] px-4 outline-none text-[#4E525D] focus:ring-1 focus:ring-[#00614E] transition-all"
              />
            </div>

            {/* Color */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[#4E525D]">اللون المميز</label>
              <div className="flex items-center gap-2 h-[48px]">
                {displayColors.map((color, index) => (
                  <button
                    key={index}
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

            {/* Article Count */}
            <div className="bg-[#F4F3EF] rounded-[12px] h-[48px] px-4 flex items-center justify-between">
               <span className="text-sm font-medium text-[#4E525D]">عدد المقالات</span>
               <span className="text-[16px] font-bold text-[#00614E]">{category.articleCount}</span>
            </div>

          </div>
        </div>

        {/* Footer Buttons */}
        <div className="grid grid-cols-1 lg:grid-cols-3 py-4 px-5 sm:px-6 lg:px-8 gap-3 shrink-0 pb-6 lg:pb-8">
         
          <button
            className="lg:col-span-2 col-span-1 w-full h-[48px] rounded-[12px] bg-[#00614E] text-white font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#005240] transition-all cursor-pointer"
          >
            <Check size={20} />
            <span>حفظ التغييرات</span>
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

export default EditCategoryModal
