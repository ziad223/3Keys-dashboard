// components/UnitActionConfirmModal.tsx
'use client'

import React from 'react'
import { X, Trash2, AlertCircle, CheckCircle2 } from 'lucide-react'

type ActionType = 'delete' | 'reject' | 'cancel_approval' | 'approve'

type UnitActionConfirmModalProps = {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  type: ActionType
  title?: string
  message?: string
}

const UnitActionConfirmModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  type,
  title,
  message 
}: UnitActionConfirmModalProps) => {
  if (!isOpen) return null

  const getConfigs = () => {
    switch (type) {
      case 'delete':
        return {
          icon: <Trash2 size={40} className="text-[#E03D40]" />,
          iconBg: 'bg-[#E03D401A]',
          title: title || 'حذف الوحدة؟',
          message: message || 'هل أنت متأكد من حذف هذه الوحدة نهائياً؟',
          confirmText: 'نعم، حذف',
          confirmBg: 'bg-[#E03D40]',
          titleColor: 'text-[#E03D40]', // لون أحمر للحذف
        }
      case 'reject':
        return {
          icon: <X size={40} className="text-[#E03D40]" />,
          iconBg: 'bg-[#E03D401A]',
          title: title || 'رفض الوحدة؟',
          message: message || 'هل أنت متأكد من رفض هذه الوحدة؟',
          confirmText: 'نعم، رفض',
          confirmBg: 'bg-[#E03D40]',
          titleColor: 'text-[#E03D40]', // لون أحمر للرفض
        }
      case 'cancel_approval':
        return {
          icon: <AlertCircle size={40} className="text-[#E03D40]" />,
          iconBg: 'bg-[#E03D401A]',
          title: title || 'إلغاء الاعتماد؟',
          message: message || 'هل أنت متأكد من إلغاء اعتماد هذه الوحدة العقارية؟',
          confirmText: 'تم، إلغاء الاعتماد',
          confirmBg: 'bg-[#E03D40]',
          titleColor: 'text-[#E03D40]', // لون أحمر لإلغاء الاعتماد
        }
      case 'approve':
        return {
          icon: <CheckCircle2 size={40} className="text-[#E6B536]" />,
          iconBg: 'bg-[#E6B5361A]',
          title: title || 'اعتماد الوحدة؟',
          message: message || 'هل أنت متأكد من اعتماد هذه الوحدة العقارية؟',
          confirmText: 'نعم، اعتمد',
          confirmBg: 'bg-[#E6B536]',
          titleColor: 'text-[#E6B536]', // لون ذهبي للاعتماد
        }
    }
  }

  const config = getConfigs()

  return (
    <div className="fixed inset-0 z-[160] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-[400px] rounded-[24px] shadow-2xl p-6 sm:p-8 text-center animate-in zoom-in-95 duration-200">
        <div className={`w-16 h-16 sm:w-20 sm:h-20 ${config.iconBg} rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6`}>
          {config.icon}
        </div>
        
        <h3 className={`text-[18px] sm:text-[20px] font-bold ${config.titleColor} mb-2`}>
          {config.title}
        </h3>
        <p className="text-[13px] sm:text-[14px] text-[#999894] mb-6 sm:mb-8 leading-relaxed px-2 sm:px-0">
          {config.message}
        </p>

        <div className="flex gap-3">
          <button 
            onClick={onConfirm}
            className={`w-full py-1.5 px-5 h-12 ${config.confirmBg} text-white rounded-[12px] text-[13px] sm:text-[14px] font-bold hover:opacity-90 transition-all cursor-pointer`}
          >
            {config.confirmText}
          </button>
          <button 
            onClick={onClose}
            className="w-full py-1.5 px-5 h-12 bg-[#F4F3EF] text-[#4E525D] rounded-[12px] text-[13px] sm:text-[14px] font-bold hover:bg-[#EEEDEA] transition-all cursor-pointer"
          >
            إلغاء
          </button>
        </div>
      </div>
    </div>
  )
}

export default UnitActionConfirmModal