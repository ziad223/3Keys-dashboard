'use client'

import React from 'react'
import { X, Upload, ChevronDown, Eye } from 'lucide-react'
import RichTextEditor from '../common/RichTextEditor'

interface AddBlogModalProps {
  isOpen: boolean
  onClose: () => void
}

const AddBlogModal = ({ isOpen, onClose }: AddBlogModalProps) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" dir="rtl">
      <div className="bg-[#E8E7E3] w-full lg:w-[688px] rounded-[24px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5">
          <h2 className="text-[18px] font-bold text-[#00614E]">إضافة مقال جديد</h2>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex cursor-pointer items-center justify-center rounded-full bg-[#F4F3EF] text-[#999894] hover:bg-[#E8E7E3] transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto custom-scrollbar flex flex-col gap-5">
          {/* Title */}
          <div>
            <label className="block text-[13px] font-medium text-[#30343F] mb-2">عنوان المقال</label>
            <input 
              type="text" 
              placeholder="مثال: دليلك الشامل للاستثمار العقاري في السعودية"
              className="w-full h-[48px] bg-[#F4F3EF] rounded-[10px] px-4 text-[13px] text-[#30343F] placeholder:text-[#999894] outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-[13px] font-medium text-[#30343F] mb-2">الوصف</label>
            <input 
              type="text" 
              placeholder="مثال: دليلك الشامل للاستثمار العقاري في السعودية"
              className="w-full h-[48px] bg-[#F4F3EF] rounded-[10px] px-4 text-[13px] text-[#30343F] placeholder:text-[#999894] outline-none"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-[13px] font-medium text-[#30343F] mb-2">التصنيف</label>
            <div className="relative">
              <select className="w-full h-[48px] bg-[#F4F3EF] rounded-[10px] px-4 text-[13px] text-[#30343F] outline-none appearance-none cursor-pointer">
                <option value="إيجار">إيجار</option>
                <option value="بيع">بيع</option>
                <option value="شراء">شراء</option>
                <option value="إيجار يومي">إيجار يومي</option>
                <option value="استثمار">استثمار</option>
              </select>
              <ChevronDown className="absolute left-4 top-1/2 -translate-y-1/2 text-[#999894] pointer-events-none" size={16} />
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-[13px] font-medium text-[#30343F] mb-2">الصورة الرئيسية</label>
            <div className="w-full h-[321px] rounded-[12px] border-2 border-dashed border-[#999894] bg-transparent flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-[#F4F3EF] transition-colors">
              <Upload className="text-[#999894]" size={24} />
              <div className="text-center">
                <p className="text-[13px] font-medium text-[#4E525D]">انقر لرفع صورة</p>
                <p className="text-[11px] text-[#999894] mt-1">حتى 10MB PNG, JPG, GIF</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <label className="block text-[13px] font-medium text-[#30343F] mb-2">محتوى المقال</label>
            <RichTextEditor />
          </div>
          <button className='bg-[#E6B536] gap-2 rounded-[12px] cursor-pointer w-max px-5 py-3 text-center flex items-center justify-center text-[13px] font-medium text-white '>
           <Eye size={20}/>
            <span>  عرض المقال</span>
            
          </button>
        </div>

        {/* Footer */}
        <div className="px-6 py-5   flex items-center  gap-3 ">
         <button 
            className="h-[42px] lg:w-[40%]  justify-center text-center mx-auto px-6 rounded-[10px] text-[13px] font-medium text-white bg-[#00614E] hover:bg-[#005240] transition-colors flex items-center gap-2"
          >
            <span>نشر المقال</span>
          </button>
          <button 
            className="h-[42px] lg:w-[40%] text-center mx-auto px-6 rounded-[10px] text-[13px] font-medium text-white bg-[#999894] hover:bg-[#858481] transition-colors"
          >
            حفظ كمسودة
          </button>
          
           <button 
            onClick={onClose}
            className="h-[42px] lg:w-[20%] text-center mx-auto px-6 rounded-[10px] text-[13px] font-medium text-[#4E525D] bg-white border border-[#D9D8D4] hover:bg-gray-50 transition-colors"
          >
            إلغاء
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddBlogModal
