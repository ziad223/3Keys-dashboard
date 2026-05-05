'use client'

import React, { useState, useEffect } from 'react'
import { X, Upload, ChevronDown, Eye } from 'lucide-react'
import RichTextEditor from '../common/RichTextEditor'
import Image from 'next/image'

interface EditBlogModalProps {
  isOpen: boolean
  onClose: () => void
  blog: {
    id: string
    title: string
    image: string
    category: string
    description?: string
  } | null
}

const EditBlogModal = ({ isOpen, onClose, blog }: EditBlogModalProps) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')

  useEffect(() => {
    if (blog) {
      setTitle(blog.title)
      setDescription(blog.description || 'دليلك الشامل للاستثمار العقاري في السعودية')
      setCategory(blog.category)
    }
  }, [blog])

  if (!isOpen || !blog) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/40 backdrop-blur-sm overflow-y-auto" dir="rtl">
      <div className="bg-[#E8E7E3] w-full max-w-[688px] rounded-[20px] sm:rounded-[24px] shadow-2xl overflow-hidden flex flex-col my-4 sm:my-0 max-h-[95vh] sm:max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5">
          <h2 className="text-[16px] sm:text-[18px] font-bold text-[#00614E]">تعديل المقال</h2>
          <button 
            onClick={onClose}
            className="w-7 h-7 sm:w-8 sm:h-8 flex cursor-pointer items-center justify-center rounded-full bg-[#F4F3EF] text-[#999894] hover:bg-[#E8E7E3] transition-colors"
          >
            <X size={14}  />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-6 overflow-y-auto custom-scrollbar flex flex-col gap-4 sm:gap-5">
          {/* Title */}
          <div>
            <label className="block text-[12px] sm:text-[13px] font-medium text-[#30343F] mb-2">عنوان المقال</label>
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="مثال: دليلك الشامل للاستثمار العقاري في السعودية"
              className="w-full h-[44px] sm:h-[48px] bg-[#F4F3EF] rounded-[10px] px-3 sm:px-4 text-[12px] sm:text-[13px] text-[#30343F] placeholder:text-[#999894] outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-[12px] sm:text-[13px] font-medium text-[#30343F] mb-2">الوصف</label>
            <input 
              type="text" 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="مثال: دليلك الشامل للاستثمار العقاري في السعودية"
              className="w-full h-[44px] sm:h-[48px] bg-[#F4F3EF] rounded-[10px] px-3 sm:px-4 text-[12px] sm:text-[13px] text-[#30343F] placeholder:text-[#999894] outline-none"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-[12px] sm:text-[13px] font-medium text-[#30343F] mb-2">التصنيف</label>
            <div className="relative">
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full h-[44px] sm:h-[48px] bg-[#F4F3EF] rounded-[10px] px-3 sm:px-4 text-[12px] sm:text-[13px] text-[#30343F] outline-none appearance-none cursor-pointer"
              >
                <option value="إيجار">إيجار</option>
                <option value="بيع">بيع</option>
                <option value="شراء">شراء</option>
                <option value="إيجار يومي">إيجار يومي</option>
                <option value="استثمار">استثمار</option>
              </select>
              <ChevronDown className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-[#999894] pointer-events-none" size={14}  />
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-[12px] sm:text-[13px] font-medium text-[#30343F] mb-2">الصورة الرئيسية</label>
            <div className="w-full h-[200px] sm:h-[280px] lg:h-[321px] rounded-[12px] border-2 border-dashed border-[#999894] bg-transparent flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-[#F4F3EF] transition-colors overflow-hidden relative">
              {blog.image ? (
                <Image
                  src={blog.image} 
                  alt="Current" 
                  fill 
                  className="object-cover"
                />
              ) : (
                <>
                  <Upload className="text-[#999894]" size={20} />
                  <div className="text-center px-4">
                    <p className="text-[12px] sm:text-[13px] font-medium text-[#4E525D]">انقر لرفع صورة</p>
                    <p className="text-[10px] sm:text-[11px] text-[#999894] mt-1">حتى 10MB PNG, JPG, GIF</p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Content */}
          <div>
            <label className="block text-[12px] sm:text-[13px] font-medium text-[#30343F] mb-2">محتوى المقال</label>
            <RichTextEditor />
          </div>
          
          {/* View Article Button */}
          <button className='bg-[#E6B536] gap-2 rounded-[12px] cursor-pointer w-full sm:w-max px-4 sm:px-5 py-2.5 sm:py-3 text-center flex items-center justify-center text-[12px] sm:text-[13px] font-medium text-white hover:bg-[#d4a631] transition-colors'>
            <Eye size={18} />
            <span>عرض المقال</span>
          </button>
        </div>

        {/* Footer */}
        <div className="px-4 sm:px-6 py-4 sm:py-5 flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
          <button 
            onClick={onClose}
            className="w-full sm:w-auto lg:w-[40%] h-[42px] px-4 sm:px-6 rounded-[10px] text-[12px] sm:text-[13px] font-medium text-white bg-[#00614E] hover:bg-[#005240] transition-colors flex items-center justify-center gap-2"
          >
            <span>حفظ التغييرات</span>
          </button>
          <button 
            className="w-full sm:w-auto lg:w-[40%] h-[42px] px-4 sm:px-6 rounded-[10px] text-[12px] sm:text-[13px] font-medium text-white bg-[#999894] hover:bg-[#858481] transition-colors"
          >
            نقل إلى المسودة
          </button>
          <button 
            onClick={onClose}
            className="w-full sm:w-auto lg:w-[20%] h-[42px] px-4 sm:px-6 rounded-[10px] text-[12px] sm:text-[13px] font-medium text-[#4E525D] bg-white border border-[#D9D8D4] hover:bg-gray-50 transition-colors"
          >
            إلغاء
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditBlogModal