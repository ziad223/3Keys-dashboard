'use client'

import React, { useState } from 'react'
import { X, MapPin, Eye, ShieldCheck, ChevronRight, ChevronLeft, User, ArrowUpLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import OfficeActionConfirmModal from './OfficeActionConfirmModal'

interface OfficePreviewModalProps {
   isOpen: boolean
   onClose: () => void
   office: any
}

const OfficePreviewModal: React.FC<OfficePreviewModalProps> = ({ isOpen, onClose, office }) => {
   const [confirmModalType, setConfirmModalType] = useState<'delete' | 'reject' | 'cancel_verification' | 'verify' | 'suspend' | null>(null)
   const [view, setView] = useState<'main' | 'units' | 'agents'>('main')

   if (!isOpen || !office) return null

   const handleBack = () => setView('main')

   const renderUnitCard = (i: number) => (
      <div key={i} className="bg-white rounded-[20px] sm:rounded-[24px] shadow-sm group">
         <div className="relative">
            <Image
               src={i % 2 === 0 ? "/images/modals/gellary-2.png" : "/images/modals/gellary-1.png"}
               alt="unit"
               height={400}
               width={600}
               className="object-cover w-full group-hover:scale-105 transition-transform duration-500 rounded-t-[20px] sm:rounded-t-[24px]"
            />
            <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-[#E6B536] flex items-center gap-1 justify-center backdrop-blur-md px-2 sm:px-4 py-1.5 sm:py-2 rounded-[10px] sm:rounded-[12px] text-[12px] sm:text-[14px] font-bold text-[#F4F3EF]">
               250,000
               <Image src="/images/modals/sar.svg" alt="unit" width={16} height={16} className="sm:w-[18px] sm:h-[18px]" />
            </div>
            <div className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-black/40 backdrop-blur-sm px-2 sm:px-4 py-1.5 sm:py-2 rounded-[10px] sm:rounded-[12px] flex items-center gap-1 text-white text-[10px] sm:text-[11px]">
               <Eye size={12} />
               <span>145</span>
            </div>
            <div className="absolute bottom-6 sm:bottom-8 left-3 sm:left-4 flex items-center gap-2">
               <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-[16px] bg-[#F4F3EF]" />
               <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-[16px] bg-[#F4F3EF]" />
               <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-[16px] bg-[#F4F3EF]" />
               <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-[16px] bg-[#F4F3EF]" />
               <div className="w-3 h-1 sm:w-5 sm:h-1.5 rounded-[16px] bg-[#E6B536]" />
            </div>
            <div className="flex items-center gap-3 sm:gap-5 absolute bottom-4 sm:bottom-4 right-3 sm:right-4">
               <button className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#F4F3EF] cursor-pointer backdrop-blur-md flex items-center justify-center text-white">
                  <ChevronRight size={16} className="sm:w-[20px] sm:h-[20px] text-[#00614E]" />
               </button>
               <button className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#F4F3EF] cursor-pointer backdrop-blur-md flex items-center justify-center text-white">
                  <ChevronLeft size={16} className="sm:w-[20px] sm:h-[20px] text-[#00614E]" />
               </button>
            </div>
         </div>
         <div className="p-4 sm:p-5 space-y-3 sm:space-y-4">
            <div className="flex flex-wrap items-center justify-between text-[11px] sm:text-[12px] text-[#999894] gap-2">
               <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <div className="flex items-center gap-1">
                     <Image src="/images/modals/agent-1.svg" alt="area" width={20} height={20} className="sm:w-[24px] sm:h-[24px]" />
                     <span>350 متر²</span>
                  </div>
                  <div className="flex items-center gap-1">
                     <Image src="/images/modals/unit-icon-2.svg" alt="bed" width={20} height={20} className="sm:w-[24px] sm:h-[24px]" />
                     <span>3 غرف</span>
                  </div>
                  <div className="flex items-center gap-1">
                     <Image src="/images/modals/unit-icon-3.svg" alt="bath" width={20} height={20} className="sm:w-[24px] sm:h-[24px]" />
                     <span>3 دورات مياه</span>
                  </div>
               </div>
            </div>
            <h5 className="text-[16px] sm:text-[18px] lg:text-[20px] flex items-center gap-1 font-medium text-[#00614E]">
               شقة فاخرة في شمال الرياض
               <ArrowUpLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </h5>
            <div className="flex items-center gap-1 text-[10px] sm:text-[11px] text-[#999894]">
               <Image src="/images/modals/unit-icon-4.svg" alt="location" width={16} height={20} className="sm:w-[18px] sm:h-[24px]" />
               <span className='text-xs sm:text-sm text-[#999894]'>شارع علي الظاهري - العارض - الرياض</span>
            </div>
            <button className="w-full h-[38px] sm:h-[40px] bg-[#00614E] text-white rounded-[10px] text-[12px] sm:text-[13px] font-bold transition-all cursor-pointer flex items-center justify-center gap-2">
               <Eye size={14} className="sm:w-[16px] sm:h-[16px]" />
               عرض
            </button>
         </div>
      </div>
   )

   const renderAgentCard = (agent: any, i: number) => (
      <div key={i} className="bg-[#E8E7E3] rounded-[20px] sm:rounded-[24px] p-4 sm:p-6 shadow-sm space-y-3 sm:space-y-4 relative overflow-hidden">
         <div className="flex justify-between items-start gap-3">
            <div className="flex gap-3">
               <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gray-200 overflow-hidden shrink-0 border-2 border-[#F4F3EF]">
                  <Image src={agent.img} alt="agent" width={80} height={80} className="object-cover" />
               </div>
               <div className="space-y-1">
                  <div className="flex items-center gap-1 flex-wrap">
                     <h5 className="text-[14px] sm:text-[16px] font-bold text-[#01284F]">{agent.name}</h5>
                     <Image src="/images/home/table-2.svg" alt="v" width={12} height={12} className="sm:w-[14px] sm:h-[14px]" />
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-[#999894]">noraabdelaziz@gmail.com</p>
               </div>
            </div>
            <span className="bg-[#00614E1A] text-[#00614E] px-2 sm:px-3 py-1 sm:py-2 rounded-[8px] text-[12px] sm:text-[14px] font-medium shrink-0">نشط</span>
         </div>
         <p className="text-[11px] sm:text-[12px] text-[#4E525D] leading-5">
            وكيلة عقارية متخصصة في تأجير وبيع الوحدات السكنية في شمال الرياض، تتمتع بخبرة عملية في فهم احتياجات العملاء وتقديم خيارات سكنية مناسبة بمواقع مميزة.
         </p>
         <div className="rounded-xl flex flex-wrap items-center gap-3 sm:gap-5 font-medium">
            <div className="text-[#00614E] text-xs sm:text-sm">عدد الوحدات المعروضة بواسطته:</div>
            <div className="flex gap-2">
               <span className="text-[#4E525D] bg-[#F4F3EF] p-2 sm:p-3 rounded-[8px] text-[10px] sm:text-[12px]">للبيع: <span className='text-[#00614E]'>28</span></span>
               <span className="text-[#4E525D] bg-[#F4F3EF] p-2 sm:p-3 rounded-[8px] text-[10px] sm:text-[12px]">للإيجار: <span className='text-[#00614E]'>83</span></span>
            </div>
         </div>
         <button className="w-full h-[38px] sm:h-[40px] bg-[#00614E] text-white rounded-[10px] text-[12px] sm:text-[13px] font-bold hover:bg-[#005240] transition-all cursor-pointer flex items-center justify-center gap-2">
            <User size={14} className="sm:w-[16px] sm:h-[16px]" />
            عرض الملف الشخصي
         </button>
      </div>
   )

   return (
      <div className="fixed inset-0 z-[150] flex justify-end">
         <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

         <div className="relative bg-[#F4F3EF] rounded-r-[24px] h-full p-4 sm:p-6 md:p-8 shadow-2xl overflow-y-auto w-full md:w-[750px] lg:w-[956px] flex flex-col animate-in slide-in-from-left duration-300" dir="rtl">
            {/* Header */}
            <div className="z-30 bg-[#F4F3EF] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
               <div className="flex items-center gap-3">
                  <button onClick={view === 'main' ? onClose : handleBack} className="w-8 h-8 bg-[#E8E7E3] rounded-full flex items-center justify-center hover:bg-gray-200 transition-all cursor-pointer shrink-0">
                     {view === 'main' ? <X size={18} className="text-[#4E525D]" /> : <ChevronRight size={18} className="text-[#4E525D]" />}
                  </button>
                  <h2 className="text-[18px] sm:text-[20px] lg:text-[22px] font-medium text-[#00614E]">
                     {view === 'main' && "معلومات المكتب العقاري"}
                     {view === 'units' && "الوحدات المعروضة"}
                     {view === 'agents' && "الوكلاء التابعين للمكتب"}
                  </h2>
               </div>

               {view === 'main' && (
                  <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                     <button
                        onClick={() => setConfirmModalType('suspend')}
                        className="h-[42px] px-3 sm:px-4 rounded-[12px] border border-[#E03D40] text-[#E03D40] text-[12px] sm:text-[13px] font-bold hover:bg-[#E03D40] hover:text-white transition-all cursor-pointer flex items-center gap-2"
                     >
                        <Image src="/images/modals/stop.svg" alt="stop" width={16} height={16} />
                        <span>وقف الحساب</span>
                     </button>
                     <button
                        onClick={() => setConfirmModalType('reject')}
                        className="h-[42px] px-3 sm:px-4 rounded-[12px] bg-[#E03D40] text-white text-[12px] sm:text-[13px] font-bold hover:bg-[#c03538] transition-all cursor-pointer flex items-center gap-2"
                     >
                        <span>✕</span>
                        <span>رفض التوثيق</span>
                     </button>
                     <button
                        onClick={() => setConfirmModalType('verify')}
                        className="h-[42px] px-3 sm:px-6 rounded-[12px] bg-[#E6B536] text-white text-[12px] sm:text-[13px] font-bold hover:bg-[#d4a631] transition-all cursor-pointer flex items-center gap-2"
                     >
                        <span>✓</span>
                        <span>توثيق المكتب</span>
                     </button>
                  </div>
               )}
            </div>

            <div className="mt-6 sm:mt-8 space-y-4 sm:space-y-6">
               {view === 'main' ? (
                  <>
                     {/* Main Card Section */}
                     <div className="bg-[#E8E7E3] rounded-[20px] sm:rounded-[24px] p-4 sm:p-6 md:p-8 shadow-sm relative overflow-hidden">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
                           <div className="flex items-center gap-4">
                              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#00614E] flex items-center justify-center relative shrink-0">
                                 <Image src="/images/logo.svg" alt="logo" width={40} height={40} className="brightness-0 invert" />
                              </div>
                              <div className="space-y-2">
                                 <div className="flex items-center gap-2 flex-wrap">
                                    <h3 className="text-[18px] sm:text-[20px] lg:text-[22px] font-medium text-[#00614E]">المتحدة العقارية</h3>
                                    <Image src="/images/home/table-2.svg" alt="verified" width={14} height={14} />
                                 </div>
                                 <div className="flex items-center gap-2 text-[#999894] text-[12px] sm:text-[14px] mt-2">
                                    <span>شارع علي الظاهري - العارض - الرياض</span>
                                 </div>
                              </div>
                           </div>
                           <span className="bg-[#3093821A] text-[#309382] px-3 sm:px-4 py-1.5 sm:py-2 rounded-[12px] text-[12px] sm:text-[14px] font-bold self-start sm:self-auto">نشط</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
                           <div className="p-3 sm:p-4 rounded-[20px] flex items-center gap-4">
                              <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-[8.67px] bg-[#F4F3EF] flex items-center justify-center shrink-0">
                                 <Image src="/images/modals/officePreview-1.svg" alt="units" width={22} height={22} />
                              </div>
                              <div>
                                 <span className="text-[#00614E] font-bold text-[13px] sm:text-[15px]">54 وحدة سكنية</span>
                                 <p className="text-[12px] sm:text-[14px] text-[#999894]">عدد الوحدات التي قام بمشاركتها</p>
                              </div>
                           </div>
                           <div className="p-3 sm:p-4 rounded-[20px] flex items-center gap-4">
                              <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-[8.67px] bg-[#F4F3EF] flex items-center justify-center shrink-0">
                                 <Image src="/images/modals/officePreview-2.svg" alt="v" width={18} height={18} />
                              </div>
                              <div>
                                 <div className="flex items-center gap-1">
                                    <span className="text-[#E6B536] font-bold text-[13px] sm:text-[15px]">وكيل معتمد</span>
                                 </div>
                                 <p className="text-[10px] sm:text-[12px] text-[#999894] mt-1">وكيل موثق ومعتمد على منصة ديار</p>
                              </div>
                           </div>
                        </div>

                        <p className="mt-6 text-[13px] sm:text-[14px] text-[#4E525D] leading-6 sm:leading-7">
                           شركة المتحدة العقارية هي شركة متخصصة في تقديم الحلول العقارية داخل المملكة العربية السعودية، تعمل على تسويق وبيع وتأجير العقارات السكنية والتجارية. تتميز الشركة بفهم عميق للسوق المحلي وتسعى إلى تقديم خيارات موثوقة تلبي احتياجات الأفراد والعائلات والمستثمرين.
                        </p>

                        <div className="mt-6 flex flex-wrap items-center gap-3 sm:gap-4 text-[12px] sm:text-[14px] text-[#00614E]">
                           <span>تفاصيل الوحدات المعروضة:</span>
                           <span className="bg-[#F4F3EF] px-2 sm:px-3 py-1 sm:py-1.5 rounded-[4px] text-[#999894]">للبيع: <span className='text-[#00614E]'>14</span></span>
                           <span className="bg-[#F4F3EF] px-2 sm:px-3 py-1 sm:py-1.5 rounded-[4px] text-[#999894]">للإيجار: <span className='text-[#00614E]'>35</span></span>
                           <span className="bg-[#F4F3EF] px-2 sm:px-3 py-1 sm:py-1.5 rounded-[4px] text-[#999894]">للإيجار اليومي: <span className='text-[#00614E]'>4</span></span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-[#E8E7E3]">
                           <div className="flex flex-col gap-3">
                              <label className="text-[12px] sm:text-[14px] text-[#4E525D]">البريد الإلكتروني</label>
                              <input placeholder='name@example.com' readOnly className="h-12 outline-none bg-[#F4F3EF] rounded-[12px] flex items-center px-4 text-[#999894] text-[12px] sm:text-[14px]" />
                           </div>
                           <div className="flex flex-col gap-3">
                              <label className="text-[12px] sm:text-[14px] text-[#4E525D]">رقم الجوال</label>
                              <input placeholder='+966 282929001' readOnly className="h-12 outline-none bg-[#F4F3EF] rounded-[12px] flex items-center px-4 text-[#999894] text-[12px] sm:text-[14px]" />
                           </div>
                           <div className="flex flex-col gap-3">
                              <label className="text-[12px] sm:text-[14px] text-[#4E525D]">كلمة المرور</label>
                              <div className="h-12 bg-[#F4F3EF] rounded-xl flex items-center px-4 text-[#999894] text-[12px] sm:text-[14px] justify-between">
                                 <input placeholder='••••••••••••' readOnly className="flex-1 bg-transparent outline-none" />
                                 <Eye size={18} className="text-[#00614E] shrink-0" />
                              </div>
                           </div>
                        </div>
                     </div>

                     {/* Package Info Section */}
                     <div className="bg-[#E8E7E3] rounded-[20px] sm:rounded-[24px] p-4 sm:p-6 md:p-8 shadow-sm">
                        <div className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-0 mb-6 sm:mb-8">
                           <div>
                              <span className="text-[12px] sm:text-[14px] text-[#999894] block mb-1">الباقة الحالية</span>
                              <h4 className="text-[20px] sm:text-[22px] font-bold text-[#E6B536]">الباقة الذهبية</h4>
                           </div>
                           <div className="flex items-center gap-1">
                              <span className="text-[24px] sm:text-[28px] font-bold text-[#00614E] flex items-center gap-1">
                                 800
                                 <Image src="/images/modals/green-sar.svg" alt="sar" width={24} height={24} />
                              </span>
                              <span className="text-[20px] sm:text-[24px] font-medium text-[#00614E]">/ شهرياً</span>
                           </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 sm:gap-10 mb-6 sm:mb-8 text-[12px] sm:text-[14px] text-[#4E525D]">
                           <div className="flex items-center">
                              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center">
                                 <Image src="/images/modals/calendar.svg" alt="cal" width={16} height={16} />
                              </div>
                              <span className="text-sm sm:text-base text-[#30343F]">تاريخ البداية:</span>
                              <span className='mr-1 text-sm sm:text-base text-[#30343F]'>15 مارس 2026</span>
                           </div>
                           <div className="flex items-center">
                              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[#E03D40]">
                                 <Image src="/images/modals/red-calendar.svg" alt="cal" width={16} height={16} />
                              </div>
                              <span className="text-sm sm:text-base text-[#E03D40]">تاريخ الانتهاء:</span>
                              <span className="text-sm sm:text-base text-[#E03D40] mr-1">15 أبريل 2026</span>
                           </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">
                           {/* Units Section */}
                           <div className="flex items-center gap-4">
                              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-[12px] flex items-center justify-center shrink-0 shadow-sm border border-white/50">
                                 <Image src="/images/modals/officePreview-1.svg" alt="u" width={20} height={20} className="sm:w-[24px] sm:h-[24px]" />
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
                                 <Image src="/images/modals/users.svg" alt="a" width={20} height={20} className="sm:w-[24px] sm:h-[24px]" />
                              </div>
                              <div className="flex-1 space-y-3">
                                 <div className="flex justify-between items-center">
                                    <span className="text-[12px] sm:text-[14px] font-medium text-[#4E525D]">4 / 5 وكيل</span>
                                    <span className="text-[12px] sm:text-[14px] font-medium text-[#4E525D]">الوكلاء</span>
                                 </div>
                                 <div className="h-2 w-full bg-[#F4F3EF] rounded-full overflow-hidden">
                                    <div className="h-full bg-[#00614E] w-[80%]" />
                                 </div>
                              </div>

                           </div>
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 mt-8 sm:mt-10">
                           <button className="h-[44px] sm:h-[48px] bg-[#00614E] text-white rounded-[12px] text-[11px] sm:text-[13px] font-bold hover:bg-[#005240] transition-all cursor-pointer flex items-center justify-center gap-1 sm:gap-2 px-2">
                              <Image src="/images/modals/arrow-up-white.svg" alt="up" width={12} height={12} className="sm:w-[14px] sm:h-[14px]" />
                              ترقية الباقة
                           </button>
                           <button className="h-[44px] sm:h-[48px] bg-[#999894] text-[#F4F3EF] rounded-[12px] text-[12px] sm:text-[14px] font-medium transition-all cursor-pointer flex items-center justify-center gap-1 sm:gap-2 px-2">
                              <Image src="/images/modals/arrow-down.svg" alt="down" width={12} height={12} className="sm:w-[14px] sm:h-[14px]" />
                              تخفيض الباقة
                           </button>
                           <button className="h-[44px] sm:h-[48px] bg-[#E6B536] text-white rounded-[12px] text-[11px] sm:text-[13px] font-bold hover:bg-[#d4a631] transition-all cursor-pointer flex items-center justify-center gap-1 sm:gap-2 px-2">
                              <Image src="/images/modals/refresh.svg" alt="refresh" width={12} height={12} className="sm:w-[14px] sm:h-[14px]" />
                              تجديد الاشتراك
                           </button>
                           <button className="h-[44px] sm:h-[48px] bg-[#E03D40] text-white rounded-[12px] text-[11px] sm:text-[13px] font-bold hover:bg-[#c03538] transition-all cursor-pointer flex items-center justify-center gap-1 sm:gap-2 px-2">
                              <X size={14} className="sm:w-[16px] sm:h-[16px]" />
                              إلغاء الاشتراك
                           </button>
                        </div>
                     </div>

                     <div className="space-y-4 mt-6 sm:mt-10">
                        <div className="flex justify-between items-center flex-wrap gap-2">
                           <h4 className="text-[18px] sm:text-[20px] font-bold text-[#00614E]">
                              الوحدات المعروضة <span className="text-[#00614E] text-xs sm:text-sm rounded-[10px] font-medium mr-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-[#E8E7E3]">8 وحدات</span>
                           </h4>
                           <Link href="/all-units" className="text-[#00614E] text-[14px] sm:text-[16px] font-medium hover:underline cursor-pointer">عرض الكل</Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                           {[1, 2].map((i) => renderUnitCard(i))}
                        </div>
                     </div>

                     {/* Agents */}
                     <div className="space-y-4">
                        <div className="flex justify-between items-center flex-wrap gap-2">
                           <h4 className="text-[18px] sm:text-[20px] font-bold text-[#01284F]">
                              الوكلاء التابعين للمكتب <span className="text-[#999894] font-medium mr-2">5 وكلاء</span>
                           </h4>
                           <Link href="/all-agents" className="text-[#00614E] text-[12px] sm:text-[14px] font-bold hover:underline cursor-pointer">عرض الكل</Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 pb-6 sm:pb-10">
                           {[
                              { name: 'نورا عبدالعزيز', img: '/images/modals/agent-1.svg' },
                              { name: 'محمد عبدالله', img: '/images/modals/agent-2.svg' }
                           ].map((agent, i) => renderAgentCard(agent, i))}
                        </div>
                     </div>
                  </>
               ) : view === 'units' ? (
                  <div className="space-y-6">
                     <div className="flex items-center gap-2 mb-2">
                        <span className="text-[#00614E] text-sm rounded-[10px] font-medium px-3 py-2 bg-[#E8E7E3]">8 وحدات</span>
                     </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 pb-10">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => renderUnitCard(i))}
                     </div>
                  </div>
               ) : (
                  <div className="space-y-6">
                     <div className="flex items-center gap-2 mb-2">
                        <span className="text-[#999894] font-medium">5 وكلاء</span>
                     </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 pb-10">
                        {[
                           { name: 'نورا عبدالعزيز', img: '/images/modals/agent-1.svg' },
                           { name: 'محمد عبدالله', img: '/images/modals/agent-2.svg' },
                           { name: 'نورا عبدالعزيز', img: '/images/modals/agent-1.svg' },
                           { name: 'محمد عبدالله', img: '/images/modals/agent-2.svg' },
                           { name: 'نورا عبدالعزيز', img: '/images/modals/agent-1.svg' }
                        ].map((agent, i) => renderAgentCard(agent, i))}
                     </div>
                  </div>
               )}
            </div>
         </div>

         {confirmModalType && (
            <OfficeActionConfirmModal
               isOpen={!!confirmModalType}
               onClose={() => setConfirmModalType(null)}
               onConfirm={() => setConfirmModalType(null)}
               type={confirmModalType}
            />
         )}
      </div>
   )
}

export default OfficePreviewModal

