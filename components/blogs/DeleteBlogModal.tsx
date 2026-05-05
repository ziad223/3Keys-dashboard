'use client'

import React from 'react'
import { Trash2 } from 'lucide-react'

interface DeleteBlogModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title?: string
}

const DeleteBlogModal = ({ isOpen, onClose, onConfirm, title }: DeleteBlogModalProps) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" dir="rtl">
      <div className="bg-[#F4F3EF] w-full max-w-[660px] rounded-[24px] shadow-2xl p-8 flex flex-col items-center text-center">
        {/* Icon */}
        <div className="w-16 h-16 rounded-full bg-[#E03D401A] flex items-center justify-center mb-4">
          <div className="w-12 h-12 rounded-full bg-[#E03D4033] flex items-center justify-center">
            <Trash2 className="text-[#E03D40]" size={24} />
          </div>
        </div>

        {/* Text */}
        <h2 className="text-[20px] font-bold text-[#E03D40] mb-2">حذف المقال؟</h2>
        <p className="text-[14px] text-[#4E525D] mb-8 leading-relaxed">
          هل أنت متأكد من حذف هذا المقال؟
          {title && <span className="block font-bold mt-1 text-[#30343F]">"{title}"</span>}
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
          <button 
            onClick={onConfirm}
            className="w-full cursor-pointer h-[48px] bg-[#E03D40] text-white rounded-[12px] font-bold text-[14px] flex items-center justify-center gap-2 hover:bg-[#c03538] transition-colors order-2 sm:order-1"
          >
            <Trash2 size={18} />
            <span>حذف المقال</span>
          </button>
          <button 
            onClick={onClose}
            className="w-full cursor-pointer h-[48px] bg-white text-[#4E525D] border border-[#D9D8D4] rounded-[12px] font-bold text-[14px] hover:bg-gray-50 transition-colors order-1 sm:order-2"
          >
            إلغاء
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteBlogModal
