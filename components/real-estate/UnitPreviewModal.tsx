// components/UnitPreviewModal.tsx
'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { X, Check, Trash2 } from 'lucide-react'
import RealEstateDetails from '@/components/real-estate/RealEstateDetails'
import UnitActionConfirmModal from './UnitActionConfirmModal'

type UnitPreviewModalProps = {
  isOpen: boolean
  onClose: () => void
  unit: any
  onUnitAction?: (action: 'approve' | 'reject' | 'delete', unitId: string) => void
}

const UnitPreviewModal = ({ isOpen, onClose, unit, onUnitAction }: UnitPreviewModalProps) => {
  // State for confirm modal
  const [confirmModalType, setConfirmModalType] = useState<'approve' | 'reject' | 'delete' | null>(null)

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

  // Handle button clicks - open confirm modal
  const handleApprove = () => {
    setConfirmModalType('approve')
  }

  const handleReject = () => {
    setConfirmModalType('reject')
  }

  const handleDelete = () => {
    setConfirmModalType('delete')
  }

  // Handle confirm action from modal
  const handleConfirmAction = () => {
    const unitId = unit?.id || '#RU-10288'
    
    if (confirmModalType === 'approve') {
      console.log('✅ تم اعتماد الوحدة:', unitId)
      onUnitAction?.('approve', unitId)
    } else if (confirmModalType === 'reject') {
      console.log('❌ تم رفض الوحدة:', unitId)
      onUnitAction?.('reject', unitId)
    } else if (confirmModalType === 'delete') {
      console.log('🗑️ تم حذف الوحدة:', unitId)
      onUnitAction?.('delete', unitId)
    }
    
    // Close confirm modal
    setConfirmModalType(null)
    // Close main modal after action
    onClose()
  }

  // Close confirm modal without action
  const handleCloseConfirmModal = () => {
    setConfirmModalType(null)
  }

  return (
    <>
      {/* Main Modal */}
      <div className="fixed inset-0 z-[150] flex justify-end items-start pointer-events-none">
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 pointer-events-auto"
          onClick={onClose}
        />
        
        {/* Side Modal Content */}
        <div 
          className={`relative bg-[#F4F3EF] h-full rounded-r-[24px] shadow-2xl overflow-y-auto transform transition-transform duration-300 ease-out z-10 w-full md:w-[1218px] max-w-[95vw] pointer-events-auto ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {/* Header */}
          <div className="bg-[#F4F3EF] z-20 px-4 sm:px-6 lg:px-8 py-4 sm:py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 sticky top-0 border-b border-[#E8E7E3]">
            <div className="flex items-center gap-2 sm:gap-3">
              <button 
                onClick={onClose}
                className="w-7 h-7 sm:w-8 sm:h-8 bg-[#E8E7E3] rounded-full flex items-center justify-center hover:bg-gray-200 transition-all cursor-pointer text-[#4E525D]"
              >
                <X size={14} />
              </button>
              <h2 className="text-[18px] sm:text-[20px] lg:text-2xl font-medium text-[#00614E]">
                معاينة الوحدة {unit?.id || '#RU-10288'}
              </h2>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <button 
                onClick={handleApprove}
                className="flex items-center gap-1 sm:gap-2 h-10 sm:h-[48px] px-3 sm:px-6 bg-[#E6B536] text-white rounded-[10px] sm:rounded-[12px] text-[12px] sm:text-[14px] font-bold hover:opacity-90 transition-all cursor-pointer"
              >
                <Check size={14} />
                <span>اعتماد الوحدة</span>
              </button>
              <button 
                onClick={handleReject}
                className="flex items-center gap-1 sm:gap-2 h-10 sm:h-[48px] px-3 sm:px-6 bg-[#E03D40] text-white rounded-[10px] sm:rounded-[12px] text-[12px] sm:text-[14px] font-bold hover:opacity-90 transition-all cursor-pointer"
              >
                <X size={14} />
                <span>رفض</span>
              </button>
              <button 
                onClick={handleDelete}
                className="flex items-center gap-1 sm:gap-2 h-10 sm:h-[48px] px-3 sm:px-6 bg-[#E03D401A] text-[#E03D40] rounded-[10px] sm:rounded-[12px] text-[12px] sm:text-[14px] font-bold hover:bg-[#E03D402A] transition-all cursor-pointer"
              >
                <Trash2 size={16} />
                <span>حذف الوحدة</span>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="px-4 sm:px-6 lg:px-8 pb-8">
            {/* Gallery */}
            <div className="flex flex-col md:flex-row gap-4 mb-6 sm:mb-8 mt-6">
              <div className="w-full md:w-[55%] h-[250px] sm:h-[350px] md:h-[500px] bg-gray-200 rounded-[16px] sm:rounded-[20px] md:rounded-[24px] overflow-hidden relative">
                <Image 
                  src="/images/modals/unit.jfif" 
                  alt="Main" 
                  fill 
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div className="w-full md:w-[45%] flex flex-col gap-4 h-auto md:h-[500px]">
                <div className="grid grid-cols-2 gap-4 h-[120px] sm:h-[160px] md:h-1/2">
                  <div className="bg-gray-200 rounded-[14px] sm:rounded-[18px] md:rounded-[20px] overflow-hidden relative">
                    <Image src="/images/modals/unit.jfif" alt="G1" fill className="object-cover" unoptimized />
                  </div>
                  <div className="bg-gray-200 rounded-[14px] sm:rounded-[18px] md:rounded-[20px] overflow-hidden relative">
                    <Image src="/images/modals/unit.jfif" alt="G2" fill className="object-cover" unoptimized />
                  </div>
                </div>
                <div className="h-[120px] sm:h-[160px] md:h-1/2 bg-gray-200 rounded-[14px] sm:rounded-[18px] md:rounded-[20px] overflow-hidden relative">
                  <Image src="/images/modals/unit.jfif" alt="G3" fill className="object-cover" unoptimized />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white font-bold text-xl sm:text-2xl md:text-3xl">
                    +12
                  </div>
                </div>
              </div>
            </div>

            {/* Details Header */}
            <div className="mb-6 sm:mb-10">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 sm:mb-6 md:mb-10">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full sm:w-auto">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <h1 className="text-xl sm:text-2xl md:text-[28px] font-bold text-[#00614E]">
                      شقة فاخرة في شمال الرياض
                    </h1>
                    <span className="bg-[#E6B536] text-white text-[11px] sm:text-[13px] font-bold px-3 sm:px-4 py-1 rounded-full whitespace-nowrap">
                      للإيجار
                    </span>
                  </div>
                </div>
                <span className="bg-[#E07E3D1A] text-[#E07E3D] text-[11px] sm:text-[13px] font-medium px-3 sm:px-4 py-1 rounded-full whitespace-nowrap">
                  قيد المراجعة
                </span>
              </div>
            </div>
          </div>
          
          {/* Real Estate Details Component */}
          <RealEstateDetails />
        </div>
      </div>

      {/* Confirm Modal - Component from separate file */}
      <UnitActionConfirmModal
        isOpen={confirmModalType !== null}
        onClose={handleCloseConfirmModal}
        onConfirm={handleConfirmAction}
        type={confirmModalType || 'delete'}
      />
    </>
  )
}

export default UnitPreviewModal