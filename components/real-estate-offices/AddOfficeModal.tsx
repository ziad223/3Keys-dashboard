'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { X, ChevronDown, ChevronUp, Building2, User, Phone, Mail, MapPin, CheckCircle2 } from 'lucide-react'

type AddOfficeModalProps = {
  isOpen: boolean
  onClose: () => void
}

const AddOfficeModal = ({ isOpen, onClose }: AddOfficeModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    manager: '',
    phone: '',
    email: '',
    city: '',
    package: 'المجانية',
    subscription: 'سنوي',
  })

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[150] flex justify-end items-start">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-[#F4F3EF] h-full shadow-2xl overflow-y-auto w-full md:w-[600px] flex flex-col animate-in slide-in-from-left duration-300">
        <div className="sticky top-0 z-30 bg-[#F4F3EF] pt-4 pb-3 px-8 shadow-sm border-b border-[#E8E7E3] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={onClose} className="w-8 h-8 bg-[#E8E7E3] rounded-full flex items-center justify-center hover:bg-gray-200 transition-all cursor-pointer">
              <X size={18} className="text-[#4E525D]" />
            </button>
            <h2 className="text-[20px] font-bold text-[#00614E]">إضافة مكتب عقاري جديد</h2>
          </div>
          <button className="h-[48px] px-5 bg-[#00614E] text-white rounded-[12px] text-[14px] font-bold hover:bg-[#005240] transition-all cursor-pointer flex items-center gap-2">
            <span>حفظ البيانات</span>
          </button>
        </div>

        <div className="p-8 space-y-6">
          {/* Basic Info */}
          <div className="bg-[#E8E7E3] p-6 rounded-xl space-y-4">
            <h3 className="text-[18px] font-bold text-[#4E525D] flex items-center gap-2 mb-4">
              <Building2 size={20} />
              بيانات المكتب الأساسية
            </h3>
            
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-[#4E525D]">اسم المكتب</label>
                <input
                  className="bg-[#F4F3EF] h-12 px-4 rounded-xl outline-none text-sm"
                  placeholder="مثال: مكتب الرياض للعقارات"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-[#4E525D]">المدينة</label>
                  <input
                    className="bg-[#F4F3EF] h-12 px-4 rounded-xl outline-none text-sm"
                    placeholder="الرياض"
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-[#4E525D]">الباقة</label>
                  <select 
                    className="bg-[#F4F3EF] h-12 px-4 rounded-xl outline-none text-sm appearance-none"
                    value={formData.package}
                    onChange={(e) => setFormData({...formData, package: e.target.value})}
                  >
                    <option>المجانية</option>
                    <option>الذهبية</option>
                    <option>الماسية</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-[#E8E7E3] p-6 rounded-xl space-y-4">
            <h3 className="text-[18px] font-bold text-[#4E525D] flex items-center gap-2 mb-4">
              <User size={20} />
              معلومات التواصل
            </h3>
            
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-[#4E525D]">المدير المسؤول</label>
                <input
                  className="bg-[#F4F3EF] h-12 px-4 rounded-xl outline-none text-sm"
                  placeholder="اسم الشخص المسؤول"
                  value={formData.manager}
                  onChange={(e) => setFormData({...formData, manager: e.target.value})}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-[#4E525D]">رقم الجوال</label>
                <input
                  className="bg-[#F4F3EF] h-12 px-4 rounded-xl outline-none text-sm"
                  placeholder="05xxxxxxxx"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-[#4E525D]">البريد الإلكتروني</label>
                <input
                  className="bg-[#F4F3EF] h-12 px-4 rounded-xl outline-none text-sm"
                  placeholder="email@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>
          </div>

          {/* Upload Logo */}
          <div className="bg-[#E8E7E3] p-6 rounded-xl">
             <h3 className="text-[18px] font-bold text-[#4E525D] flex items-center gap-2 mb-4">
              <Image src="/images/modals/download.svg" alt="logo" width={20} height={20} />
              شعار المكتب
            </h3>
            <div className="h-32 border-2 border-dashed border-[#999894] rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-gray-200/50 transition-all">
               <span className="text-sm text-[#4E525D]">انقر لرفع شعار المكتب</span>
               <span className="text-xs text-[#999894]">PNG, JPG (الحد الأقصى 2MB)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddOfficeModal