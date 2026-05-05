'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { X, ChevronDown, ChevronUp, Home, Building, MapPin, AlertCircle, RotateCw, Plus, Check, CheckCircle2 } from 'lucide-react'

type AddUnitModalProps = {
  isOpen: boolean
  onClose: () => void
}

const AddUnitModal = ({ isOpen, onClose }: AddUnitModalProps) => {
  // State for accordion sections
  const [openSections, setOpenSections] = useState({
    office: true,
    basicInfo: true,
    location: true,
    specifications: true,
    amenities: true,
    pricing: true,
  })

  // State for checkboxes
  const [checkedAmenities, setCheckedAmenities] = useState<{ [key: string]: boolean }>({
    'مطبخ مفتوح (American)': false,
    'انذار حريق ودخان': false,
    'شرفة / بلكونة': false,
    'نظام كاميرات مراقبة': false,
    'مصعد كهربائي': false,
    'حراسة أمن': false,
    'شبكة انترنت هوائية (Wifi)': false,
    'مبردات هواء (مكيفات)': false,
    'موقف سيارات (Parking)': false,
    'مسبح': false,
    'غرفة خادمة': false,
    'حديقة خاصة': false,
    'صالة رياضية': false,
    'غرفة سائق': false,
  })

  // State for additional features
  const [additionalFeatures, setAdditionalFeatures] = useState<string[]>([])
  const [newFeature, setNewFeature] = useState('')

  // State for gallery images
  const [galleryImages, setGalleryImages] = useState([
    { id: 1, src: '/images/modals/gellary-1.png', isMain: true },
    { id: 2, src: '/images/modals/gellary-2.png', isMain: false },
    { id: 3, src: '/images/modals/gellary-3.png', isMain: false },
    { id: 4, src: '/images/modals/gellary-1.png', isMain: false },
  ])

  // State for form data
  const [formData, setFormData] = useState({
    unitName: '',
    unitCode: '',
    unitType: '',
    unitCondition: '',
    description: '',
    city: '',
    district: '',
    address: '',
    area: '',
    bedrooms: '',
    bathrooms: '',
    price: '',
  })

  // Get missing fields list
  const getMissingFields = () => {
    const missing = []
    if (!formData.unitName) missing.push('اسم الوحدة')
    if (!formData.city) missing.push('المدينة')
    if (!formData.district) missing.push('الحي')
    if (!formData.address) missing.push('العنوان')
    if (!formData.area) missing.push('المساحة')
    if (!formData.bedrooms) missing.push('عدد الغرف')
    if (!formData.bathrooms) missing.push('دورات المياه')
    if (Object.values(checkedAmenities).every(v => v === false)) missing.push('المميزات')
    if (galleryImages.length === 0) missing.push('الصور')
    return missing
  }

  // Calculate completion percentage
  const calculateProgress = () => {
    let filledFields = 0
    let totalFields = 10 // اسم الوحدة، المدينة، الحي، العنوان، المساحة، الغرف، الحمامات، السعر، المميزات، الصور
    
    if (formData.unitName) filledFields++
    if (formData.city) filledFields++
    if (formData.district) filledFields++
    if (formData.address) filledFields++
    if (formData.area) filledFields++
    if (formData.bedrooms) filledFields++
    if (formData.bathrooms) filledFields++
    if (formData.price) filledFields++
    if (Object.values(checkedAmenities).some(v => v === true)) filledFields++
    if (galleryImages.length > 0) filledFields++
    
    return Math.round((filledFields / totalFields) * 100)
  }

  const progress = calculateProgress()
  const missingFields = getMissingFields()

  // Toggle accordion section
  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }))
  }

  // Toggle checkbox
  const toggleCheckbox = (label: string) => {
    setCheckedAmenities(prev => ({ ...prev, [label]: !prev[label] }))
  }

  // Add new feature
  const handleAddFeature = () => {
    if (newFeature.trim()) {
      setAdditionalFeatures([...additionalFeatures, newFeature.trim()])
      setNewFeature('')
    }
  }

  // Remove feature
  const removeFeature = (index: number) => {
    setAdditionalFeatures(additionalFeatures.filter((_, i) => i !== index))
  }

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const newImages = Array.from(files).map((file, index) => ({
        id: galleryImages.length + index + 1,
        src: URL.createObjectURL(file),
        isMain: false
      }))
      setGalleryImages([...galleryImages, ...newImages])
    }
  }

  // Set main image
  const setMainImage = (id: number) => {
    setGalleryImages(galleryImages.map(img => ({
      ...img,
      isMain: img.id === id
    })))
  }

  // Remove image
  const removeImage = (id: number) => {
    setGalleryImages(galleryImages.filter(img => img.id !== id))
  }

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[150] flex justify-end items-start pointer-events-none">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 pointer-events-auto"
        onClick={onClose}
      />
      
      {/* Side Modal Content */}
      <div className="relative bg-[#F4F3EF] h-full rounded-r-[32px] shadow-2xl overflow-y-auto transform transition-transform duration-300 ease-out z-10 w-full md:w-[1218px] max-w-[95vw] pointer-events-auto flex flex-col">
        
        {/* Header - Sticky */}
        <div className="sticky top-0 z-30 bg-[#F4F3EF] pt-4 pb-3 px-4 sm:px-6 lg:px-8 shadow-sm border-b border-[#E8E7E3]">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <button 
                onClick={onClose}
                className="w-7 h-7 sm:w-8 sm:h-8 bg-[#E8E7E3] rounded-full flex items-center justify-center hover:bg-gray-200 transition-all cursor-pointer text-[#4E525D]"
              >
                <X size={18} className="" />
              </button>
              <h2 className="text-[18px] sm:text-[20px] font-bold text-[#00614E]">إضافة وحدة جديدة</h2>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
              <button 
                onClick={onClose}
                className="h-10 sm:h-[48px] px-3 sm:px-5 bg-[#E8E7E3] text-[#4E525D] rounded-[10px] sm:rounded-[12px] text-[12px] sm:text-[14px] font-bold hover:bg-gray-200 transition-all cursor-pointer"
              >
                إلغاء
              </button>
              <button className="h-10 sm:h-[48px] px-3 sm:px-5 bg-[#00614E] text-white rounded-[10px] sm:rounded-[12px] text-[12px] sm:text-[14px] font-bold hover:bg-[#005240] transition-all cursor-pointer flex items-center gap-2">
                <Image src="/images/modals/puplish.svg" alt="save" width={12} height={12} className="sm:w-3.5 sm:h-3.5 brightness-0 invert" />
                <span>حفظ ونشر</span>
              </button>
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6 lg:p-8 pt-4">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
            <div className='flex flex-col gap-4 sm:gap-6 lg:w-full xl:w-[65%]'>
              
              {/* المكتب العقاري */}
              <div className='bg-[#E8E7E3] p-4 sm:p-6 lg:p-8 rounded-[12px]'>
                <div className='flex items-center justify-between w-full flex-wrap gap-2'>
                  <div className='flex items-center gap-2'>
                    <Image src="/images/modals/addUnit-1.svg" alt="addUnit" width={18} height={18} className="sm:w-5 sm:h-5" />
                    <h2 className='text-[16px] sm:text-[18px] lg:text-xl font-medium text-[#4E525D]'>المكتب العقاري</h2>
                    <span className='text-[12px] sm:text-[14px] text-[#E03D40] py-1 px-2 sm:py-2 sm:px-3 rounded-[8px] bg-[#E03D401A]'>غير مكتملة</span>
                  </div>
                  <button onClick={() => toggleSection('office')} className="cursor-pointer">
                    {openSections.office ? <ChevronUp size={18} className="text-[#4E525D]" /> : <ChevronDown size={18} className="text-[#4E525D]" />}
                  </button>
                </div>
                {openSections.office && (
                  <div className="mt-6 sm:mt-8 grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-[#4E525D]">المكتب العقاري</label>
                      <div className="relative">
                        <select className="bg-[#F4F3EF] text-sm text-[#999894] rounded-[12px] outline-none min-h-[48px] py-3 px-3 w-full appearance-none">
                          <option value="" disabled>اختر المكتب العقاري</option>
                          <option value="1">مكتب 1</option>
                          <option value="2">مكتب 2</option>
                        </select>
                        <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 text-[#999894] pointer-events-none" size={18} />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-[#4E525D]">الحالة</label>
                      <div className="relative">
                        <select className="bg-[#F4F3EF] text-sm rounded-[12px] outline-none min-h-[48px] py-3 px-4 pr-10 w-full appearance-none text-[#E6B536]">
                          <option value="approved" className="text-[#E6B536]">معتمدة</option>
                          <option value="pending" className="text-[#999894]">قيد المراجعة</option>
                          <option value="rejected" className="text-red-400">مرفوضة</option>
                        </select>
                        <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 text-[#999894] pointer-events-none" size={18} />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* معلومات الوحدة الأساسية */}
              <div className='bg-[#E8E7E3] p-4 sm:p-6 lg:p-8 rounded-[12px]'>
                <div className='flex items-center justify-between w-full flex-wrap gap-2'>
                  <div className='flex items-center gap-2'>
                    <Image src="/images/modals/addUnit-2.svg" alt="addUnit" width={18} height={18} className="sm:w-5 sm:h-5" />
                    <h2 className='text-[16px] sm:text-[18px] lg:text-xl font-medium text-[#4E525D]'>معلومات الوحدة الأساسية</h2>
                    <span className='text-[12px] sm:text-[14px] text-[#E03D40] py-1 px-2 sm:py-2 sm:px-3 rounded-[8px] bg-[#E03D401A]'>غير مكتملة</span>
                  </div>
                  <button onClick={() => toggleSection('basicInfo')} className="cursor-pointer">
                    {openSections.basicInfo ? <ChevronUp size={18} className="text-[#4E525D]" /> : <ChevronDown size={18} className="text-[#4E525D]" />}
                  </button>
                </div>
                {openSections.basicInfo && (
                  <div className="mt-6 sm:mt-8 grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-3">
                      <label className="text-sm font-medium text-[#4E525D]">اسم الوحدة</label>
                      <input
                        className="bg-[#F4F3EF] text-sm text-[#999894] placeholder:text-[#999894] rounded-[12px] outline-none min-h-[48px] py-3 px-3 w-full appearance-none"
                        placeholder='مثال: شقة فاخرة في شمال الرياض'
                        type="text"
                        value={formData.unitName}
                        onChange={(e) => setFormData({...formData, unitName: e.target.value})}
                      />
                    </div>
                    <div className="flex flex-col gap-3">
                      <label className="text-sm font-medium text-[#4E525D]">كود الوحدة / الرقم المرجعي</label>
                      <div className="relative">
                        <input
                          placeholder='REF-67147'
                          className="bg-[#F4F3EF] text-sm placeholder:text-[#999894] text-[#999894] rounded-[12px] outline-none min-h-[48px] py-3 px-3 w-full appearance-none"
                          value={formData.unitCode}
                          onChange={(e) => setFormData({...formData, unitCode: e.target.value})}
                        />
                        <Image alt='rotate' src='/images/modals/rotate.svg' className="absolute left-3 top-1/2 -translate-y-1/2" width={16} height={16} />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-[#4E525D]">نوع الوحدة</label>
                      <div className="relative">
                        <select
                          className="bg-[#F4F3EF] text-sm text-[#999894] rounded-[12px] outline-none min-h-[48px] py-3 px-3 w-full appearance-none"
                          value={formData.unitType}
                          onChange={(e) => setFormData({...formData, unitType: e.target.value})}
                        >
                          <option value="" disabled>اختر النوع</option>
                          <option value="شقة">شقة</option>
                          <option value="فيلا">فيلا</option>
                        </select>
                        <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 text-[#999894] pointer-events-none" size={18} />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-[#4E525D]">حالة الوحدة</label>
                      <div className="relative">
                        <select
                          className="bg-[#F4F3EF] text-sm rounded-[12px] outline-none min-h-[48px] py-3 px-4 text-[#999894] w-full appearance-none"
                          value={formData.unitCondition}
                          onChange={(e) => setFormData({...formData, unitCondition: e.target.value})}
                        >
                          <option value="مفروشة">مفروشة</option>
                          <option value="غير مفروشة">غير مفروشة</option>
                        </select>
                        <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 text-[#999894] pointer-events-none" size={18} />
                      </div>
                    </div>
                    <div className="flex flex-col gap-3 col-span-2">
                      <label className="text-sm font-medium text-[#4E525D] flex items-center justify-between w-full">
                        <span>وصف تفصيلي للوحدة</span>
                        <span className="text-[#999894] text-sm">اختياري</span>
                      </label>
                      <textarea
                        className="bg-[#F4F3EF] h-[120px] text-sm text-[#999894] placeholder:text-[#999894] rounded-[12px] outline-none min-h-[48px] py-3 px-3 w-full appearance-none"
                        placeholder='اكتب وصف جذابًا للوحدة...'
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* الموقع والعنوان */}
              <div className='bg-[#E8E7E3] p-4 sm:p-6 lg:p-8 rounded-[12px]'>
                <div className='flex items-center justify-between w-full flex-wrap gap-2'>
                  <div className='flex items-center gap-2'>
                    <Image src="/images/modals/addUnit-3.svg" alt="addUnit" width={18} height={18} className="sm:w-5 sm:h-5" />
                    <h2 className='text-[16px] sm:text-[18px] lg:text-xl font-medium text-[#4E525D]'>الموقع والعنوان</h2>
                    <span className='text-[12px] sm:text-[14px] text-[#E03D40] py-1 px-2 sm:py-2 sm:px-3 rounded-[8px] bg-[#E03D401A]'>غير مكتملة</span>
                  </div>
                  <button onClick={() => toggleSection('location')} className="cursor-pointer">
                    {openSections.location ? <ChevronUp size={18} className="text-[#4E525D]" /> : <ChevronDown size={18} className="text-[#4E525D]" />}
                  </button>
                </div>
                {openSections.location && (
                  <div className="mt-6 sm:mt-8 grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-[#4E525D]">المدينة</label>
                      <div className="relative">
                        <select
                          className="bg-[#F4F3EF] text-sm text-[#999894] rounded-[12px] outline-none min-h-[48px] py-3 px-3 w-full appearance-none"
                          value={formData.city}
                          onChange={(e) => setFormData({...formData, city: e.target.value})}
                        >
                          <option value="" disabled>اختر المدينة</option>
                          <option value="الرياض">الرياض</option>
                          <option value="جدة">جدة</option>
                        </select>
                        <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 text-[#999894] pointer-events-none" size={18} />
                      </div>
                    </div>
                    <div className="flex flex-col gap-3">
                      <label className="text-sm font-medium text-[#4E525D]">الحي</label>
                      <input
                        className="bg-[#F4F3EF] text-sm text-[#999894] placeholder:text-[#999894] rounded-[12px] outline-none min-h-[48px] py-3 px-3 w-full appearance-none"
                        placeholder='اسم الحي'
                        type="text"
                        value={formData.district}
                        onChange={(e) => setFormData({...formData, district: e.target.value})}
                      />
                    </div>
                    <div className="flex flex-col gap-3 col-span-2">
                      <label className="text-sm font-medium text-[#4E525D]">العنوان التفصيلي</label>
                      <input
                        className="bg-[#F4F3EF] text-sm text-[#999894] placeholder:text-[#999894] rounded-[12px] outline-none min-h-[48px] py-3 px-3 w-full appearance-none"
                        placeholder='اسم الشارع، المعالم القريبة...'
                        type="text"
                        value={formData.address}
                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                      />
                    </div>
                    <div className="flex flex-col gap-3 col-span-2">
                      <label className="text-sm font-medium text-[#4E525D]">الموقع على الخريطة</label>
                      <div className="w-full h-[200px] sm:h-[250px] rounded-[20px] overflow-hidden border border-[#E8E7E3] relative">
                        <iframe 
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.1623618109575!2d31.354991084884627!3d30.060880181876374!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583fdb20898de3%3A0x914664f3522c8e7d!2z2LTYsdmD2Kkg2KfZhNmF2KfYs9iq2LEg2KrZg9mG2YjZhNmI2KzZig!5e0!3m2!1sar!2seg!4v1777364953096!5m2!1sar!2seg" 
                          width="100%" 
                          height="100%" 
                          style={{ border: 0, filter: 'grayscale(0.1) contrast(1.1)' }} 
                          allowFullScreen={true} 
                          loading="lazy" 
                          referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                        <div className="absolute bottom-4 right-4 bg-white p-2 rounded-[8px] shadow-sm flex flex-col gap-1 border border-[#E8E7E3]">
                          <button className="w-6 h-6 flex items-center justify-center text-[#4E525D] hover:bg-gray-100 rounded">+</button>
                          <div className="h-px bg-[#E8E7E3] w-full"></div>
                          <button className="w-6 h-6 flex items-center justify-center text-[#4E525D] hover:bg-gray-100 rounded">-</button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* مواصفات الوحدة */}
              <div className='bg-[#E8E7E3] p-4 sm:p-6 lg:p-8 rounded-[12px]'>
                <div className='flex items-center justify-between w-full flex-wrap gap-2'>
                  <div className='flex items-center gap-2'>
                    <Image src="/images/modals/addUnit-4.svg" alt="addUnit" width={18} height={18} className="sm:w-5 sm:h-5" />
                    <h2 className='text-[16px] sm:text-[18px] lg:text-xl font-medium text-[#4E525D]'>مواصفات الوحدة</h2>
                    <span className='text-[12px] sm:text-[14px] text-[#E03D40] py-1 px-2 sm:py-2 sm:px-3 rounded-[8px] bg-[#E03D401A]'>غير مكتملة</span>
                  </div>
                  <button onClick={() => toggleSection('specifications')} className="cursor-pointer">
                    {openSections.specifications ? <ChevronUp size={18} className="text-[#4E525D]" /> : <ChevronDown size={18} className="text-[#4E525D]" />}
                  </button>
                </div>
                {openSections.specifications && (
                  <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                    <div className="flex flex-col gap-3">
                      <label className="text-sm font-medium text-[#4E525D]">المساحة (متر²)</label>
                      <input
                        className="bg-[#F4F3EF] text-sm text-[#999894] placeholder:text-[#999894] rounded-[12px] outline-none min-h-[48px] py-3 px-3 w-full appearance-none"
                        placeholder='المساحة'
                        type="text"
                        value={formData.area}
                        onChange={(e) => setFormData({...formData, area: e.target.value})}
                      />
                    </div>
                    <div className="flex flex-col gap-3">
                      <label className="text-sm font-medium text-[#4E525D]">عدد الغرف</label>
                      <input
                        className="bg-[#F4F3EF] text-sm text-[#999894] placeholder:text-[#999894] rounded-[12px] outline-none min-h-[48px] py-3 px-3 w-full appearance-none"
                        placeholder='عدد الغرف'
                        type="number"
                        value={formData.bedrooms}
                        onChange={(e) => setFormData({...formData, bedrooms: e.target.value})}
                      />
                    </div>
                    <div className="flex flex-col gap-3">
                      <label className="text-sm font-medium text-[#4E525D]">عدد دورات المياه</label>
                      <input
                        className="bg-[#F4F3EF] text-sm text-[#999894] placeholder:text-[#999894] rounded-[12px] outline-none min-h-[48px] py-3 px-3 w-full appearance-none"
                        placeholder='عدد دورات المياه'
                        type="number"
                        value={formData.bathrooms}
                        onChange={(e) => setFormData({...formData, bathrooms: e.target.value})}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* المميزات والمرافق */}
              <div className='bg-[#E8E7E3] p-4 sm:p-6 lg:p-8 rounded-[12px]'>
                <div className='flex items-center justify-between w-full flex-wrap gap-2'>
                  <div className='flex items-center gap-2'>
                    <Image src="/images/modals/addUnit-3.svg" alt="addUnit" width={18} height={18} className="sm:w-5 sm:h-5" />
                    <h2 className='text-[16px] sm:text-[18px] lg:text-xl font-medium text-[#4E525D]'>المميزات والمرافق</h2>
                    <span className='text-[12px] sm:text-[14px] text-[#E03D40] py-1 px-2 sm:py-2 sm:px-3 rounded-[8px] bg-[#E03D401A]'>غير مكتملة</span>
                  </div>
                  <button onClick={() => toggleSection('amenities')} className="cursor-pointer">
                    {openSections.amenities ? <ChevronUp size={18} className="text-[#4E525D]" /> : <ChevronDown size={18} className="text-[#4E525D]" />}
                  </button>
                </div>
                {openSections.amenities && (
                  <>
                    <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {Object.keys(checkedAmenities).map((amenity) => (
                        <label key={amenity} className='bg-[#F4F3EF] p-3 sm:p-4 h-[42px] flex items-center gap-3 cursor-pointer hover:bg-[#EEEDEA] transition-all group'>
                          <input type="checkbox" className="hidden peer" checked={checkedAmenities[amenity]} onChange={() => toggleCheckbox(amenity)} />
                          <div className={`w-4 h-4 rounded-[2px] flex items-center justify-center transition-all ${checkedAmenities[amenity] ? 'bg-[#00614E]' : 'bg-[#E8E7E3]'}`}>
                            {checkedAmenities[amenity] && <Check className='w-3 h-3 text-white' strokeWidth={3} />}
                          </div>
                          <span className='text-xs sm:text-sm text-[#4E525D] font-medium'>{amenity}</span>
                        </label>
                      ))}
                    </div>
                    <div className="flex flex-col gap-3 mt-6">
                      <label className="text-sm font-medium text-[#4E525D]">مزايا أخرى</label>
                      <div className='relative'>
                        <input
                          className="bg-[#F4F3EF] text-sm text-[#999894] placeholder:text-[#999894] rounded-[12px] outline-none min-h-[48px] py-3 px-3 w-full appearance-none pr-4"
                          placeholder='مثال: أسقف مرتفعة'
                          type="text"
                          value={newFeature}
                          onChange={(e) => setNewFeature(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleAddFeature()}
                        />
                        <button onClick={handleAddFeature} className='absolute top-1/2 left-4 -translate-y-1/2 bg-[#E6B536] px-3 rounded-[8px] h-[36px] text-white cursor-pointer text-xs sm:text-sm'>
                          إضافة
                        </button>
                      </div>
                      {additionalFeatures.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {additionalFeatures.map((feature, index) => (
                            <div key={index} className="bg-[#F4F3EF] px-3 py-1.5 rounded-[8px] flex items-center gap-2">
                              <span className="text-sm text-[#4E525D]">{feature}</span>
                              <button onClick={() => removeFeature(index)} className="text-[#E03D40] hover:text-[#c03538]">
                                <X size={14} />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>

              {/* التسعير والتفاصيل المالية */}
              <div className='bg-[#E8E7E3] p-4 sm:p-6 lg:p-8 rounded-[12px]'>
                <div className='flex items-center justify-between w-full flex-wrap gap-2'>
                  <div className='flex items-center gap-2'>
                    <Image src="/images/modals/addUnit-5.svg" alt="addUnit" width={18} height={18} className="sm:w-5 sm:h-5" />
                    <h2 className='text-[16px] sm:text-[18px] lg:text-xl font-medium text-[#4E525D]'>التسعير والتفاصيل المالية</h2>
                    <span className='text-[12px] sm:text-[14px] text-[#E03D40] py-1 px-2 sm:py-2 sm:px-3 rounded-[8px] bg-[#E03D401A]'>غير مكتملة</span>
                  </div>
                  <button onClick={() => toggleSection('pricing')} className="cursor-pointer">
                    {openSections.pricing ? <ChevronUp size={18} className="text-[#4E525D]" /> : <ChevronDown size={18} className="text-[#4E525D]" />}
                  </button>
                </div>
                {openSections.pricing && (
                  <>
                    <div className="mt-6 grid grid-cols-1 gap-4">
                      <div className="flex flex-col gap-3">
                        <label className="text-sm font-medium text-[#4E525D]">السعر (ريال / اليوم)</label>
                        <input
                          className="bg-[#F4F3EF] text-sm text-[#999894] placeholder:text-[#999894] rounded-[12px] outline-none min-h-[48px] py-3 px-3 w-full appearance-none"
                          placeholder='مثال: 2500'
                          type="number"
                          value={formData.price}
                          onChange={(e) => setFormData({...formData, price: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className='h-[160px] sm:h-[185px] cursor-pointer flex flex-col gap-3 items-center justify-center border-2 border-[#999894] border-dashed p-3 rounded-[12px] mt-6'>
                      <label className='w-12 h-12 rounded-full flex items-center justify-center bg-[#F4F3EF] cursor-pointer'>
                        <Image src="/images/modals/download.svg" alt="download" width={18} height={18} />
                        <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageUpload} />
                      </label>
                      <h2 className='text-sm text-[#4E525D] text-center'>انقر لرفع الصور PNG, JPG</h2>
                    </div>
                    {galleryImages.length > 0 && (
                      <div className='mt-3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3'>
                        {galleryImages.map((image) => (
                          <div key={image.id} className='relative group'>
                            <Image src={image.src} alt='gellary' width={161} height={166} className='w-full rounded-[12px] h-[100px] sm:h-[120px] lg:h-[140px] object-cover' />
                            {image.isMain && (
                              <div className='rounded-[24px] bg-[#E6B536] py-1 px-2 flex items-center justify-center absolute top-2 right-2 cursor-pointer gap-1'>
                                <Image src='/images/modals/star.svg' alt='star' width={10} height={10} />
                                <span className='text-[10px] font-medium text-white'>الرئيسية</span>
                              </div>
                            )}
                            {!image.isMain && (
                              <div className='absolute inset-0 bg-black/40 rounded-[12px] opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2'>
                                <button onClick={() => setMainImage(image.id)} className='rounded-[24px] bg-[#E8E7E3] py-1 px-3 flex items-center gap-1'>
                                  <span className='text-[10px] font-medium text-[#00614E]'>تعيين كرئيسية</span>
                                </button>
                                <button onClick={() => removeImage(image.id)} className='w-[23px] h-[23px] rounded-full bg-[#E03D40] text-white flex items-center justify-center'>
                                  <X size={14} />
                                </button>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* ملخص الوحدة - ثابت */}
            <div className="lg:w-[35%] w-full rounded-[16px] bg-[#E8E7E3] p-4 sm:p-6 h-max sticky top-24">
              <h2 className='text-lg sm:text-xl font-semibold text-[#4E525D]'>ملخص الوحدة</h2>
              <div className='w-full h-px bg-[#F4F3EF] my-4 sm:my-5'></div>
              <div className='grid grid-cols-2 gap-3'>
                <div className='flex flex-col gap-2 sm:gap-3'>
                  <h2 className='text-xs sm:text-sm text-[#999894]'>اسم الوحدة</h2>
                  <span className='text-sm text-[#4E525D] break-words'>{formData.unitName || '----'}</span>
                </div>
                <div className='flex flex-col gap-2 sm:gap-3'>
                  <h2 className='text-xs sm:text-sm text-[#999894]'>النوع</h2>
                  <span className='text-sm text-[#4E525D]'>{formData.unitType || '----'}</span>
                </div>
                <div className='flex flex-col gap-2 sm:gap-3'>
                  <h2 className='text-xs sm:text-sm text-[#999894]'>السعر</h2>
                  <span className='text-sm text-[#4E525D]'>{formData.price ? `${formData.price} ر/يوم` : '----'}</span>
                </div>
                <div className='flex flex-col gap-2 sm:gap-3'>
                  <h2 className='text-xs sm:text-sm text-[#999894]'>الموقع</h2>
                  <span className='text-sm text-[#4E525D] break-words'>{formData.city || formData.district || '----'}</span>
                </div>
                <div className='flex flex-col gap-2 sm:gap-3 col-span-2 mt-5'>
                  <h2 className='text-xs sm:text-sm text-[#999894]'>اكتمال البيانات</h2>
                  <div className='h-2.5 bg-[#F4F3EF] rounded-[24px] relative'>
                    <div className={`absolute top-0 right-0 h-full rounded-[24px] transition-all duration-300 ${progress < 30 ? 'bg-[#E03D40]' : progress < 70 ? 'bg-[#E6B536]' : 'bg-[#00614E]'}`} style={{ width: `${progress}%` }}></div>
                  </div>
                  <span className='text-xs text-[#999894] text-left'>{progress}% مكتمل</span>
                </div>
              </div>
              
              {/* قسم التنبيهات بشكل جديد وأخصر */}
              {missingFields.length > 0 ? (
                <div className='mt-5 bg-[#E03D401A] p-3 rounded-[8px]'>
                  <div className='flex items-center gap-2'>
                    <AlertCircle size={16} className="text-[#E03D40]" />
                    <span className='text-[14px] sm:text-[16px] text-[#E03D40] font-medium'>ينقصك {missingFields.length} حقول</span>
                  </div>
                  <div className='mt-2'>
                    <span className='text-[13px] text-[#E03D40]'>
                      {missingFields.slice(0, 3).join('، ')}{missingFields.length > 3 && ` +${missingFields.length - 3}`}
                    </span>
                  </div>
                </div>
              ) : (
                <div className='mt-5 bg-[#00614E1A] p-3 rounded-[8px]'>
                  <div className='flex items-center gap-2'>
                    <CheckCircle2 size={16} className="text-[#00614E]" />
                    <span className='text-[14px] sm:text-[16px] text-[#00614E] font-medium'>اكتملت جميع البيانات! </span>
                  </div>
                  <div className='mt-1'>
                    <span className='text-[13px] text-[#00614E]'>الوحدة جاهزة للنشر</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddUnitModal