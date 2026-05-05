'use client'

import React, { useEffect } from 'react'
import { X, Download, Building2, Receipt, Wallet, Diamond } from 'lucide-react'
import Image from 'next/image'

type PaymentStatus = 'مدفوع' | 'قيد التحصيل' | 'فشل'
type PackageType = 'الماسية' | 'الذهبية' | 'المجانية'

interface InvoiceDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  data: {
    invoiceNumber: string
    officeName: string
    officeLogo?: string
    package: PackageType
    amount: string
    paymentMethod: string
    status: PaymentStatus
    date: string
  } | null
}

const getStatusStyle = (status: PaymentStatus) => {
  switch (status) {
    case 'مدفوع':
      return 'bg-[#00614E1A] text-[#00614E]'
    case 'قيد التحصيل':
      return 'bg-[#E07E3D1A] text-[#E07E3D]'
    case 'فشل':
      return 'bg-[#E03D401A] text-[#E03D40]'
    default:
      return 'bg-gray-100 text-gray-500'
  }
}

const getPackageColor = (pkg: PackageType) => {
  switch (pkg) {
    case 'الماسية':
      return '#00614E'
    case 'الذهبية':
      return '#E6B536'
    case 'المجانية':
      return '#4E525D'
    default:
      return '#4E525D'
  }
}

const InvoiceDetailsModal = ({ isOpen, onClose, data }: InvoiceDetailsModalProps) => {

  if (!isOpen || !data) return null

  const subscriptionAmount = "1274 ر.س"
  const vatAmount = "225 ر.س"

  return (
    <div className="fixed inset-0 z-[200] pointer-events-none">
      {/* الخلفية */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 pointer-events-auto"
        onClick={onClose}
      />

      {/* المودال - زيادة العرض وتحسين الهيدر */}
      <div
        className={`absolute left-0 top-0 bottom-0 bg-[#F4F3EF] py-5 rounded-r-[24px] shadow-2xl transform transition-transform duration-300 ease-out z-10 pointer-events-auto ${isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        style={{
          width: '880px',
          maxWidth: '95vw',
          overflowY: 'auto',
          maxHeight: '100vh',
        }}
      >
        {/* الهيدر - عرض كامل و between شغال */}
        <div className=" z-20 bg-[#F4F3EF] px-6 md:px-8 py-6 flex items-center justify-between ">
          <div className="flex items-center gap-4">
            <button
              onClick={onClose}
              className="w-10 h-10 bg-[#E8E7E3] rounded-full flex items-center justify-center hover:bg-gray-200 transition-all cursor-pointer text-[#4E525D] shrink-0"
            >
              <X size={20} />
            </button>
            <h2 className="text-[22px] font-bold text-[#00614E]">تفاصيل الفاتورة</h2>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-[#00614E] text-white rounded-[12px] text-[14px] font-bold cursor-pointer hover:bg-[#004d3e] transition-colors shrink-0 shadow-sm">
            <Download size={16} />
            <span>تحميل PDF</span>
          </button>
        </div>

        {/* المحتوى القابل للتمرير - زيادة المسافات */}
        <div className="px-6 md:px-8 pt-6 pb-10">
          {/* البطاقات العلوية */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {/* المبلغ المدفوع */}
            <div className="bg-[#E8E7E3] rounded-[12px] p-4 flex flex-col justify-between h-[130px] shadow-sm">
              <div className="w-10 h-10 bg-[#00614E] rounded-[14px] flex items-center justify-center shrink-0">
                <Image src='/images/modals/invioces-icon-1.svg' alt="invoice" width={20} height={14} />
              </div>
              <span className="text-[24px] lg:text-[28px] font-bold text-left text-[#00614E] mt-1">1,499 ر.س</span>
              <span className="text-[14px] text-[#30343F] font-medium mt-2 text-right">المبلغ المدفوع</span>
            </div>

            {/* رقم الفاتورة */}
            <div className="bg-[#E8E7E3] rounded-[12px] p-4 flex flex-col justify-between h-[130px] shadow-sm">
              <div className="w-10 h-10 bg-[#00614E] rounded-[14px] flex items-center justify-center shrink-0">
                <Image src='/images/modals/invioces-icon-2.svg' alt="invoice" width={20} height={14} />
              </div>
              <span className="text-[24px] lg:text-[28px] font-bold text-left text-[#00614E] mt-1">INV-8821</span>
              <span className="text-[14px] text-[#30343F] font-medium mt-2 text-right">رقم الفاتورة</span>
            </div>
          </div>

          {/* المعلومات الأساسية */}
          <div className="mb-6">
            <div className="bg-[#E8E7E3] rounded-[16px] p-6">
              <h3 className="text-[18px] font-bold text-[#30343F] mb-6">المعلومات الأساسية</h3>
              <div className="space-y-6">
                {/* المكتب */}
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[14px] text-[#999894]">المكتب</span>
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-[#00614E] flex items-center justify-center shrink-0">
                      {data.officeLogo ? (
                        <Image src={data.officeLogo} alt={data.officeName} width={32} height={32} />
                      ) : (
                        <Building2 size={16} className="text-white" />
                      )}
                    </div>
                    <span className="text-[14px] font-medium text-[#30343F] truncate">
                      {data.officeName}
                    </span>
                  </div>
                </div>

                {/* الباقة */}
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[14px] text-[#999894]">الباقة</span>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: getPackageColor(data.package) }}
                    />
                    <span
                      className="text-[14px] font-medium"
                      style={{ color: getPackageColor(data.package) }}
                    >
                      {data.package}
                    </span>
                  </div>
                </div>

                {/* طريقة الدفع */}
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[14px] text-[#999894]">طريقة الدفع</span>
                  <span className="text-[14px] font-medium text-[#30343F]">
                    {data.paymentMethod}
                  </span>
                </div>

                {/* التاريخ */}
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[14px] text-[#999894]">التاريخ</span>
                  <span className="text-[14px] font-medium text-[#30343F]">
                    {data.date}
                  </span>
                </div>

                {/* الحالة */}
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[14px] text-[#999894]">الحالة</span>
                  <span className={`text-[13px] font-bold px-3 py-1.5 rounded-full ${getStatusStyle(data.status)}`}>
                    {data.status}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* تفاصيل المبلغ */}
          <div className="bg-[#E8E7E3] rounded-[16px] p-6">
            <h3 className="text-[18px] font-bold text-[#30343F] mb-6">تفاصيل المبلغ</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-[14px] text-[#999894] font-medium">الاشتراك</span>
                <span className="text-[14px] font-bold text-[#004D3E]">{subscriptionAmount}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[14px] text-[#999894] font-medium">ضريبة القيمة المضافة 15%</span>
                <span className="text-[14px] font-bold text-[#004D3E]">{vatAmount}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[14px] text-[#999894] font-medium">الإجمالي</span>
                <span className="text-[16px] font-medium text-[#00614E]">{data.amount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InvoiceDetailsModal