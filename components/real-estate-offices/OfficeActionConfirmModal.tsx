'use client'

import React from 'react'
import { X, Ban } from 'lucide-react'
import Image from 'next/image'

interface OfficeActionConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  type: 'delete' | 'reject' | 'cancel_verification' | 'verify' | 'suspend' | null
}

const OfficeActionConfirmModal: React.FC<OfficeActionConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  type,
}) => {
  if (!isOpen || !type) return null

  const getContent = () => {
    switch (type) {
      case 'verify':
        return {
          title: 'اعتماد التوثيق؟',
          description: 'هل أنت متأكد من اعتماد توثيق المكتب العقاري؟',
          confirmText: 'اعتماد التوثيق',
          confirmBg: 'bg-[#E6B536]',
          icon: <div className="w-20 h-20 rounded-full bg-[#E6B5361A] flex items-center justify-center mb-6">
                  <div className="w-14 h-14 rounded-full bg-[#E6B536] flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">✓</span>
                  </div>
                </div>,
          titleColor: 'text-[#E6B536]'
        }
      case 'cancel_verification':
        return {
          title: 'إلغاء التوثيق؟',
          description: 'هل أنت متأكد من إلغاء توثيق المكتب العقاري؟',
          confirmText: 'إلغاء التوثيق',
          confirmBg: 'bg-[#E03D40]',
          icon: <div className="w-24 h-24 rounded-full bg-[#E03D401A] flex items-center justify-center mb-6">
                  <div className="w-16 h-16 rounded-full  border-[#E03D40] flex items-center justify-center">
                    <X size={32} className="text-[#E03D40]" strokeWidth={3} />
                  </div>
                </div>,
          titleColor: 'text-[#E03D40]'
        }
      case 'reject':
        return {
          title: 'رفض التوثيق؟',
          description: 'هل أنت متأكد من رفض توثيق هذا المكتب العقاري؟',
          confirmText: 'رفض التوثيق',
          confirmBg: 'bg-[#E03D40]',
          icon: <div className="w-24 h-24 rounded-full bg-[#E03D401A] flex items-center justify-center mb-6">
                  <div className="w-16 h-16 rounded-full  flex items-center justify-center">
                    <X size={32} className="text-[#E03D40]" strokeWidth={3} />
                  </div>
                </div>,
          titleColor: 'text-[#E03D40]'
        }
      case 'suspend':
        return {
          title: 'وقف الحساب؟',
          description: 'هل أنت متأكد من وقف حساب هذا المكتب العقاري؟',
          confirmText: 'وقف الحساب',
          confirmBg: 'bg-[#E03D40]',
          icon: <div className="w-24 h-24 rounded-full bg-[#E03D401A] flex items-center justify-center mb-6">
                  <div className="w-16 h-16 rounded-full  flex items-center justify-center">
                    <Image src="/images/modals/stop.svg" alt="Stop" className=' rounded-full' width={32} height={32} />
                  </div>
                </div>,
          titleColor: 'text-[#E03D40]'
        }
        case 'delete':
          return {
          title: 'حذف المكتب؟',
          description: 'هل أنت متأكد من حذف هذا المكتب العقاري نهائياً؟',
          confirmText: 'حذف المكتب',
          confirmBg: 'bg-[#E03D40]',
          icon: <div className="w-24 h-24 rounded-full bg-[#E03D401A] flex items-center justify-center mb-6">
                  <div className="w-16 h-16 rounded-full  border-[#E03D40] flex items-center justify-center">
                    <X size={32} className="text-[#E03D40]" strokeWidth={3} />
                  </div>
                </div>,
          titleColor: 'text-[#E03D40]'
        }
      default:
        return {
          title: '',
          description: '',
          confirmText: '',
          confirmBg: 'bg-[#00614E]',
          icon: null,
          titleColor: 'text-[#00614E]'
        }
    }
  }

  const content = getContent()

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      <div className="relative bg-[#F4F3EF] rounded-[32px] w-full max-w-[660px] p-10 shadow-2xl animate-in zoom-in-95 duration-200" dir="rtl">
        <button 
          onClick={onClose}
          className="absolute top-8 left-8 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
        >
          <X size={24} />
        </button>

        <div className="flex flex-col items-center text-center">
          {content.icon}

          <h3 className={`text-[24px] font-bold ${content.titleColor} mb-4`}>
            {content.title}
          </h3>
          <p className="text-[18px] text-[#01284F] font-medium leading-relaxed mb-10">
            {content.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full px-10">
             <button
              onClick={onClose}
              className="flex-1 h-[56px] rounded-[12px] bg-[#E8E7E3] text-[#4E525D] font-bold text-[16px] hover:bg-gray-200 transition-all cursor-pointer"
            >
              إلغاء
            </button>
            <button
              onClick={onConfirm}
              className={`flex-1 h-[56px] rounded-[12px] text-white font-bold text-[16px] transition-all cursor-pointer ${content.confirmBg} hover:opacity-90 flex items-center justify-center gap-2`}
            >
              {type === 'verify' ? <span>✓</span> : <span>✕</span>}
              {content.confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OfficeActionConfirmModal