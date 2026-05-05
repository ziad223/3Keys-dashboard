'use client'

import React, { useEffect } from 'react'
import { X, Trash2 } from 'lucide-react'

type Category = {
  id: string
  name: string
}

type DeleteCategoryModalProps = {
  isOpen: boolean
  onClose: () => void
  category: Category | null
  className?: string
}

const DeleteCategoryModal = ({ isOpen, onClose, category, className }: DeleteCategoryModalProps) => {
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" dir="rtl">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div 
        className={`relative bg-[#E8E7E3] w-[400px] sm:w-[450px] rounded-[20px] shadow-2xl z-10 flex flex-col ${className || ''}`}
      >
        {/* Header */}
        <div className="p-5 flex items-center justify-between shrink-0">
          <h2 className="text-[18px] font-bold text-[#FF4D4F]">حذف التصنيف</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 transition-all cursor-pointer"
          >
            <X size={18} className="text-[#4E525D]" />
          </button>
        </div>

        {/* Form Body */}
        <div className="px-5 pb-2">
          <div className="flex flex-col items-center justify-center gap-4 py-4">
            <div className="w-16 h-16 rounded-full bg-[#FFF0F0] flex items-center justify-center text-[#FF4D4F]">
              <Trash2 size={32} />
            </div>
            <div className="text-center flex flex-col gap-2">
              <h3 className="text-[16px] font-bold text-[#4E525D]">هل أنت متأكد من حذف هذا التصنيف؟</h3>
              <p className="text-[14px] text-[#999894]">
                سيتم حذف تصنيف <span className="font-bold text-[#4E525D]">"{category.name}"</span> بشكل نهائي. لا يمكنك التراجع عن هذا الإجراء.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="grid grid-cols-2 p-5 gap-3 shrink-0">
          <button
            className="w-full h-[48px] rounded-[12px] bg-[#FF4D4F] text-white font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#E64545] transition-all cursor-pointer"
          >
            <Trash2 size={18} />
            <span>نعم</span>
          </button>

          <button
            onClick={onClose}
            className="w-full h-[48px] rounded-[12px] bg-white text-[#4E525D] font-bold text-sm border border-[#E8E7E3] hover:bg-gray-50 transition-all cursor-pointer"
          >
            إلغاء
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteCategoryModal
