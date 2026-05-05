'use client'

import React, { useEffect } from 'react'
import Image from 'next/image'
import { X, ShieldCheck, Building2, Users, Download, Eye, Calendar, ArrowUpCircle, ArrowDownCircle, RefreshCcw, Trash2 } from 'lucide-react'

type Payment = {
  invoice: string
  package: string
  amount: string
  method: string
  status: 'مدفوع' | 'قيد التحصيل'
  date: string
}

const payments: Payment[] = [
  { invoice: 'INV-0021', package: 'الذهبية', amount: '499 ر.س', method: 'مدى', status: 'مدفوع', date: '15 مارس 2026' },
  { invoice: 'INV-8821', package: 'الذهبية', amount: '499 ر.س', method: 'Apple Pay', status: 'مدفوع', date: '15 مارس 2026' },
  { invoice: 'INV-0021', package: 'الماسية', amount: '1,499 ر.س', method: 'بطاقة ائتمان', status: 'مدفوع', date: '15 مارس 2026' },
  { invoice: 'INV-8821', package: 'الذهبية', amount: '499 ر.س', method: 'تحويل بنكي', status: 'قيد التحصيل', date: '15 مارس 2026' },
]

type SubscriptionDetailsModalProps = {
  isOpen: boolean
  onClose: () => void
  unit: any
}

const SubscriptionDetailsModal = ({ isOpen, onClose, unit }: SubscriptionDetailsModalProps) => {
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
      <div 
        className={`relative bg-[#F4F3EF] h-full rounded-r-[24px] shadow-2xl overflow-y-auto transform transition-transform duration-300 ease-out z-10 max-w-[892px]  pointer-events-auto ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        dir="rtl"
      >
        {/* Header */}
        <div className="bg-[#F4F3EF] z-20 px-4 sm:px-6 py-4 sm:py-5 flex items-center gap-2 border-b border-[#E8E7E3] sticky top-0">
          <button 
            onClick={onClose}
            className="w-8 h-8 sm:w-9 sm:h-9 bg-[#E8E7E3] rounded-full flex items-center justify-center hover:bg-gray-200 transition-all cursor-pointer text-[#4E525D]"
          >
            <X size={16} />
          </button>
          <h2 className="text-[18px] sm:text-[20px] font-bold text-[#00614E]">تفاصيل الاشتراك</h2>
        </div>

        <div className="p-4 sm:p-6">
          {/* Company Info Card */}
          <div className="flex flex-col md:flex-row justify-between bg-[#E8E7E3] h-auto md:h-[120px] p-4 sm:p-5 rounded-[16px] items-start md:items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#00614E] rounded-full flex items-center justify-center relative shrink-0">
                <Image src="/images/logo.svg" alt="subscribe icon" width={40} height={40} className="sm:w-[50px] sm:h-[50px]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-[18px] sm:text-[22px] font-medium text-[#00614E]">{unit?.agent || 'المتحدة العقارية'}</h3>
                  <Image src="/images/modals/officePreview-2.svg" alt="subscribe icon" width={14} height={14} className="sm:w-[16px] sm:h-[16px]" />
                </div>
                <p className="text-[12px] sm:text-[14px] text-[#999894] mt-1">شارع علي الظاهري - العارض - الرياض</p>
              </div>
            </div>
            <div className="self-start md:self-center">
              <span className="bg-[#00614E1A] text-[#00614E] text-[11px] sm:text-[13px] font-bold px-3 sm:px-4 py-1 sm:py-1.5 rounded-full">
                نشط
              </span>
            </div>
          </div>

          {/* Package Details Card */}
          <div className="bg-[#E8E7E3] rounded-[20px] sm:rounded-[24px] mt-4 p-4 sm:p-6 md:p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-0 mb-6 sm:mb-8">
              <div>
                <span className="text-[12px] sm:text-[14px] text-[#999894] block mb-1">الباقة الحالية</span>
                <h4 className="text-[20px] sm:text-[22px] font-bold text-[#E6B536]">الباقة الذهبية</h4>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-[24px] sm:text-[28px] font-bold text-[#00614E] flex items-center gap-1">
                  800
                  <Image src="/images/modals/green-sar.svg" alt="sar" width={20} height={20} className="sm:w-[24px] sm:h-[24px]" />
                </span>
                <span className="text-[18px] sm:text-[24px] font-medium text-[#00614E]">/ شهرياً</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 sm:gap-10 mb-6 sm:mb-8 text-[12px] sm:text-[14px] text-[#4E525D]">
              <div className="flex items-center">
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center">
                  <Image src="/images/modals/calendar.svg" alt="cal" width={14} height={14} className="sm:w-[16px] sm:h-[16px]" />
                </div>
                <span className="text-sm sm:text-base text-[#30343F]">تاريخ البداية:</span>
                <span className='mr-1 text-sm sm:text-base text-[#30343F]'>15 مارس 2026</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[#E03D40]">
                  <Image src="/images/modals/red-calendar.svg" alt="cal" width={14} height={14} className="sm:w-[16px] sm:h-[16px]" />
                </div>
                <span className="text-sm sm:text-base text-[#E03D40]">تاريخ الانتهاء:</span>
                <span className="text-sm sm:text-base text-[#E03D40] mr-1">15 أبريل 2026</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">
              {/* Units Section */}
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-[12px] flex items-center justify-center shrink-0 shadow-sm border border-white/50">
                  <Image src="/images/modals/officePreview-1.svg" alt="u" width={18} height={18} className="sm:w-[20px] sm:h-[20px]" />
                </div>
                <div className="flex-1 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[12px] sm:text-[14px] font-medium text-[#4E525D]">الوحدات العقارية</span>
                    <span className="text-[12px] sm:text-[14px] font-medium text-[#4E525D]">12 / 20 وحدة</span>
                  </div>
                  <div className="h-2 w-full bg-[#F4F3EF] rounded-full overflow-hidden">
                    <div className="h-full bg-[#00614E] w-[60%]" />
                  </div>
                </div>
              </div>

              {/* Agents Section */}
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-[12px] flex items-center justify-center shrink-0 shadow-sm border border-white/50">
                  <Image src="/images/modals/users.svg" alt="a" width={18} height={18} className="sm:w-[20px] sm:h-[20px]" />
                </div>
                <div className="flex-1 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[12px] sm:text-[14px] font-medium text-[#4E525D]">الوكلاء</span>
                    <span className="text-[12px] sm:text-[14px] font-medium text-[#4E525D]">4 / 5 وكيل</span>
                  </div>
                  <div className="h-2 w-full bg-[#F4F3EF] rounded-full overflow-hidden">
                    <div className="h-full bg-[#00614E] w-[80%]" />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 mt-8 sm:mt-10 lg:w-[70%] mx-auto">
              <button className="h-[40px] sm:h-[44px] lg:h-[48px] bg-[#00614E] text-white rounded-[12px] text-[10px] sm:text-[11px] lg:text-[13px] font-bold hover:bg-[#005240] transition-all cursor-pointer flex items-center justify-center gap-1 sm:gap-2 px-2">
                <Image src="/images/modals/arrow-up-white.svg" alt="up" width={10} height={10} className="sm:w-[12px] sm:h-[12px] lg:w-[14px] lg:h-[14px]" />
                ترقية الباقة
              </button>
              <button className="h-[40px] sm:h-[44px] lg:h-[48px] bg-[#999894] text-[#F4F3EF] rounded-[12px] text-[10px] sm:text-[12px] lg:text-[14px] font-medium transition-all cursor-pointer flex items-center justify-center gap-1 sm:gap-2 px-2">
                <Image src="/images/modals/arrow-down.svg" alt="down" width={10} height={10} className="sm:w-[12px] sm:h-[12px] lg:w-[14px] lg:h-[14px]" />
                تخفيض الباقة
              </button>
              <button className="h-[40px] sm:h-[44px] lg:h-[48px] bg-[#E6B536] text-white rounded-[12px] text-[10px] sm:text-[11px] lg:text-[13px] font-bold hover:bg-[#d4a631] transition-all cursor-pointer flex items-center justify-center gap-1 sm:gap-2 px-2">
                <Image src="/images/modals/refresh.svg" alt="refresh" width={10} height={10} className="sm:w-[12px] sm:h-[12px] lg:w-[14px] lg:h-[14px]" />
                تجديد الاشتراك
              </button>
              <button className="h-[40px] sm:h-[44px] lg:h-[48px] bg-[#E03D40] text-white rounded-[12px] text-[10px] sm:text-[11px] lg:text-[13px] font-bold hover:bg-[#c03538] transition-all cursor-pointer flex items-center justify-center gap-1 sm:gap-2 px-2">
                <X size={12} className="sm:w-[14px] sm:h-[14px] lg:w-[16px] lg:h-[16px]" />
                إلغاء الاشتراك
              </button>
            </div>
          </div>
        </div>

        {/* Payment History Section */}
        <div className='p-4 sm:p-6'>
          <div className="flex items-center gap-2 mb-4 px-2">
            <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] font-bold text-[#00614E]">سجل المدفوعات</h3>
            <span className="text-[10px] sm:text-[12px] text-[#00614E] font-medium bg-[#E8E7E3] px-2 sm:px-3 py-1 sm:py-2 rounded-[16px]">4 فواتير</span>
          </div>
          
          <div className="bg-[#E8E7E3] rounded-[20px] overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-right min-w-[800px] lg:min-w-full">
                <thead>
                  <tr className="bg-[#F9F9F8] text-center">
                    <th className="py-3 sm:py-4 px-4 sm:px-6 text-[11px] sm:text-[13px] font-bold text-[#4E525D] whitespace-nowrap">الفاتورة</th>
                    <th className="py-3 sm:py-4 px-4 sm:px-6 text-[11px] sm:text-[13px] font-bold text-[#4E525D] whitespace-nowrap">الباقة</th>
                    <th className="py-3 sm:py-4 px-4 sm:px-6 text-[11px] sm:text-[13px] font-bold text-[#4E525D] whitespace-nowrap">المبلغ</th>
                    <th className="py-3 sm:py-4 px-4 sm:px-6 text-[11px] sm:text-[13px] font-bold text-[#4E525D] whitespace-nowrap">طريقة الدفع</th>
                    <th className="py-3 sm:py-4 px-4 sm:px-6 text-[11px] sm:text-[13px] font-bold text-[#4E525D] whitespace-nowrap">حالة الدفع</th>
                    <th className="py-3 sm:py-4 px-4 sm:px-6 text-[11px] sm:text-[13px] font-bold text-[#4E525D] whitespace-nowrap">تاريخ الدفع</th>
                    <th className="py-3 sm:py-4 px-4 sm:px-6 text-[11px] sm:text-[13px] font-bold text-[#4E525D] text-center whitespace-nowrap">الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment, idx) => (
                    <tr key={idx} className="hover:bg-[#F9F9F8] transition-colors text-center border-b border-[#F4F3EF] last:border-0">
                      <td className="py-3 sm:py-4 px-4 sm:px-6 text-[11px] sm:text-[13px] font-medium text-[#4E525D] whitespace-nowrap">{payment.invoice}</td>
                      <td className="py-3 sm:py-4 px-4 sm:px-6 whitespace-nowrap">
                        <div className="flex items-center gap-1.5 justify-center">
                          <span className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${payment.package === 'الماسية' ? 'bg-[#00614E]' : 'bg-[#E6B536]'}`} />
                          <span className={`text-[11px] sm:text-[13px] font-bold ${payment.package === 'الماسية' ? 'text-[#00614E]' : 'text-[#E6B536]'}`}>
                            {payment.package}
                          </span>
                        </div>
                       </td>
                      <td className="py-3 sm:py-4 px-4 sm:px-6 text-[11px] sm:text-[13px] font-bold text-[#30343F] whitespace-nowrap">{payment.amount}</td>
                      <td className="py-3 sm:py-4 px-4 sm:px-6 text-[11px] sm:text-[13px] font-medium text-[#4E525D] whitespace-nowrap">{payment.method}</td>
                      <td className="py-3 sm:py-4 px-4 sm:px-6 whitespace-nowrap">
                        <span className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-[11px] font-bold inline-block ${
                          payment.status === 'مدفوع' 
                            ? 'bg-[#00614E1A] text-[#00614E]' 
                            : 'bg-[#E07E3D1A] text-[#E07E3D]'
                        }`}>
                          {payment.status}
                        </span>
                       </td>
                      <td className="py-3 sm:py-4 px-4 sm:px-6 text-[11px] sm:text-[13px] font-medium text-[#999894] whitespace-nowrap">{payment.date}</td>
                      <td className="py-3 sm:py-4 px-4 sm:px-6 whitespace-nowrap">
                        <div className="flex items-center justify-center gap-2">
                          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F4F3EF] text-[#00614E] hover:bg-[#00614E2A] transition-all cursor-pointer text-[10px] sm:text-[11px] font-bold shadow-sm">
                            <Download size={14} />
                            <span className="hidden sm:inline">تحميل PDF</span>
                            <span className="sm:hidden">PDF</span>
                          </button>
                          <button className="flex items-center px-3 py-1.5 rounded-[10px] justify-center bg-[#00614E] text-[#F4F3EF] hover:bg-[#004d3d] transition-all cursor-pointer shadow-sm">
                            <Eye size={14} />
                            <span className='text-[10px] font-bold mr-2'>عرض</span>
                          </button>
                        </div>
                       </td>
                     </tr>
                  ))}
                </tbody>
               </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SubscriptionDetailsModal