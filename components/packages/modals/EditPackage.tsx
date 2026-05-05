'use client'

import React, { useEffect, useState } from 'react'
import { X, Plus, Check } from 'lucide-react'

export type Package = {
  id: string
  name: string
  distinctionLevel: number
  color: string
  monthlyPrice: number
  annualPrice: number
  allowedUnits: number
  allowedAgents: number
  features: string[]
}

type EditPackageProps = {
  isOpen: boolean
  onClose: () => void
  pkg?: Package | null
  className?: string
}

const EditPackage = ({ isOpen, onClose, pkg, className }: EditPackageProps) => {
  const [name, setName] = useState('')
  const [distinctionLevel, setDistinctionLevel] = useState(2)
  const [selectedColor, setSelectedColor] = useState('#E6B536')
  const [monthlyPrice, setMonthlyPrice] = useState(0)
  const [annualPrice, setAnnualPrice] = useState(0)
  const [allowedUnits, setAllowedUnits] = useState(0)
  const [allowedAgents, setAllowedAgents] = useState(0)
  const [features, setFeatures] = useState<string[]>([])
  const [newFeature, setNewFeature] = useState('')

  const colors = [
    '#999894', 
    '#E6B536',
    '#309382', 
    '#E07E3D', 
    '#00614E', 
  ]

  // Pre-fill data when the modal opens or when the pkg changes
  useEffect(() => {
    if (pkg) {
      setName(pkg.name)
      setDistinctionLevel(pkg.distinctionLevel)
      setSelectedColor(pkg.color)
      setMonthlyPrice(pkg.monthlyPrice)
      setAnnualPrice(pkg.annualPrice)
      setAllowedUnits(pkg.allowedUnits)
      setAllowedAgents(pkg.allowedAgents)
      setFeatures(pkg.features || [])
    } else {
      // Default to "Golden Package" as seen in the design if no pkg is provided
      setName('الباقة الذهبية')
      setDistinctionLevel(2)
      setSelectedColor('#E6B536')
      setMonthlyPrice(600)
      setAnnualPrice(7600)
      setAllowedUnits(50)
      setAllowedAgents(10)
      setFeatures([
        'عدد غير محدود من العقارات',
        'أولوية الظهور في النتائج',
        'لوحة تحكم أساسية',
        'دعم فني مميز (24/7)',
        'شارة وكيل'
      ])
    }
  }, [pkg, isOpen])

  const handleAddFeature = () => {
    if (newFeature.trim()) {
      setFeatures([...features, newFeature.trim()])
      setNewFeature('')
    }
  }

  const removeFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index))
  }

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
        className={`relative bg-[#E8E7E3] lg:w-[688px] w-full h-auto max-h-[85vh] rounded-[40px] shadow-2xl z-10 flex flex-col overflow-y-auto ${className || ''}`}
      >

        {/* Header - ثابت */}
        <div className="p-8 pb-4 flex items-center justify-between shrink-0">
          <h2 className="text-[20px] lg:text-2xl font-medium text-[#00614E]">تعديل {name || 'الباقة'}</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 transition-all cursor-pointer"
          >
            <X size={18} className="text-[#4E525D]" />
          </button>
        </div>

        {/* Form Body */}
        <div className="px-8">
          <div className="flex flex-col gap-6 py-4">

            {/* Package Name */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[#4E525D]">اسم الباقة</label>
              <input
                type="text"
                placeholder="مثال: برو"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#F4F3EF] h-[48px] rounded-[12px] px-4 outline-none text-[#4E525D] focus:ring-1 focus:ring-[#00614E] transition-all"
              />
            </div>

            {/* Distinction & Color Row */}
            <div className="grid grid-cols-2 gap-4">
               <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-[#4E525D]">درجة التميز</label>
                    <div className="relative">
                        <select 
                          value={distinctionLevel}
                          onChange={(e) => setDistinctionLevel(Number(e.target.value))}
                          className="w-full bg-[#F4F3EF] rounded-[12px] h-[48px] px-4 outline-none appearance-none text-[#4E525D] font-medium cursor-pointer"
                        >
                            <option value={4}>4</option>
                            <option value={3}>3</option>
                            <option value={2}>2</option>
                            <option value={1}>1</option>
                        </select>
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 1L6 6L11 1" stroke="#4E525D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-[#4E525D]">اللون المميز</label>
                    <div className="flex items-center gap-2 h-[48px]">
                        {colors.map((color) => (
                            <button
                                key={color}
                                onClick={() => setSelectedColor(color)}
                                className={`w-8 h-8 lg:w-12 lg:h-12 cursor-pointer rounded-[12px] transition-all ${selectedColor === color ? 'ring-2 ring-offset-2 ring-[#00614E]' : ''}`}
                                style={{ backgroundColor: color }}
                                type="button"
                            />
                        ))}
                    </div>
                </div>
               
            </div>

            {/* Prices Row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-[#4E525D]">السعر الشهري (ر.س)</label>
                <input
                  type="number"
                  placeholder="0"
                  value={monthlyPrice}
                  onChange={(e) => setMonthlyPrice(Number(e.target.value))}
                  className="w-full bg-[#F4F3EF] h-[48px] rounded-[12px] px-4 outline-none text-[#4E525D] focus:ring-1 focus:ring-[#00614E]"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-[#4E525D]">السعر السنوي (ر.س)</label>
                <input
                  type="number"
                  placeholder="0"
                  value={annualPrice}
                  onChange={(e) => setAnnualPrice(Number(e.target.value))}
                  className="w-full bg-[#F4F3EF] h-[48px] rounded-[12px] px-4 outline-none text-[#4E525D] focus:ring-1 focus:ring-[#00614E]"
                />
              </div>
            </div>

            {/* Limits Row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-[#4E525D]">عدد الوحدات المسموح</label>
                <input
                  type="number"
                  placeholder="0"
                  value={allowedUnits}
                  onChange={(e) => setAllowedUnits(Number(e.target.value))}
                  className="w-full bg-[#F4F3EF] h-[48px] rounded-[12px] px-4 outline-none text-[#4E525D] focus:ring-1 focus:ring-[#00614E]"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-[#4E525D]">عدد الوسطاء المسموح</label>
                <input
                  type="number"
                  placeholder="0"
                  value={allowedAgents}
                  onChange={(e) => setAllowedAgents(Number(e.target.value))}
                  className="w-full bg-[#F4F3EF] h-[48px] rounded-[12px] px-4 outline-none text-[#4E525D] focus:ring-1 focus:ring-[#00614E]"
                />
              </div>
            </div>

            {/* Features */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[#4E525D]">المميزات</label>
              <div className="relative flex gap-2 items-center">
                <input
                  type="text"
                  placeholder="أضف ميزة جديدة"
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddFeature()}
                  className="w-full bg-[#F4F3EF] h-[48px] rounded-[12px] px-4 pl-[90px] outline-none text-[#4E525D] focus:ring-1 focus:ring-[#00614E]"
                />
                <button
                  onClick={handleAddFeature}
                  type="button"
                  className=" bg-[#E6B536] text-white px-4 h-[48px] rounded-[12px] text-sm font-medium flex items-center gap-1 cursor-pointer hover:bg-[#d4a02e] transition-all"
                >
                  <Plus size={16} />
                  <span>إضافة</span>
                </button>
              </div>

              
              {features.length > 0 && (
                <div className="flex flex-col gap-2 mt-2 bg-[#F4F3EF] p-4 rounded-[12px]">
                  {features.map((feature, index) => (
                    <div key={index} className="bg-[#E8E7E3] px-4 h-[40px] rounded-[10px] flex items-center justify-between w-full gap-4 border border-[#E8E7E3]">
                      
                      <span className="text-sm text-[#4E525D] font-medium">{feature}</span>
                      <button onClick={() => removeFeature(index)} className="text-[#999894] hover:text-red-500 transition-colors">
                        <X size={16} className='text-[#30343F] cursor-pointer' />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Footer Buttons - ثابت */}
        <div className="p-8 pt-4 flex gap-4 shrink-0">
          
          <button
            className="flex-[2.5] h-[48px] rounded-[12px] bg-[#00614E] text-white font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#005240] transition-all cursor-pointer"
          >
            <Check size={20} />
            <span>حفظ التغييرات</span>
          </button>
          <button
            onClick={onClose}
            className="flex-1 h-[48px] rounded-[12px] bg-white text-[#4E525D] font-bold text-sm border border-[#E8E7E3] hover:bg-gray-50 transition-all cursor-pointer"
          >
            إلغاء
          </button>
        </div>

      </div>
    </div>
  )
}

export default EditPackage
