'use client'

import React, { useState } from 'react'
import { Search, ChevronDown, Eye, Download, Building2 } from 'lucide-react'
import Image from 'next/image'
import CustomTable, { Column } from '@/components/common/CustomTable'
import InvoiceDetailsModal from './InvoiceDetailsModal'

type PaymentStatus = 'مدفوع' | 'قيد التحصيل' | 'فشل'
type PackageType = 'الماسية' | 'الذهبية' | 'المجانية'

type PaymentRecord = {
  id: string
  invoiceNumber: string
  officeName: string
  officeLogo?: string
  package: PackageType
  amount: string
  paymentMethod: string
  status: PaymentStatus
  date: string
}

const mockPayments: PaymentRecord[] = [
  {
    id: '1',
    invoiceNumber: 'INV-8821',
    officeName: 'المتحدة العقارية',
    package: 'الماسية',
    amount: '1,499 ر.س',
    paymentMethod: 'بطاقة ائتمان',
    status: 'مدفوع',
    date: '15 مارس 2026',
  },
  {
    id: '2',
    invoiceNumber: 'INV-8821',
    officeName: 'مكتب مكة العقارية',
    package: 'الذهبية',
    amount: '499 ر.س',
    paymentMethod: 'Apple Pay',
    status: 'قيد التحصيل',
    date: '15 مارس 2026',
  },
  {
    id: '3',
    invoiceNumber: 'INV-8821',
    officeName: 'المتحدة العقارية',
    package: 'الذهبية',
    amount: '499 ر.س',
    paymentMethod: 'مدى',
    status: 'مدفوع',
    date: '15 مارس 2026',
  },
  {
    id: '4',
    invoiceNumber: 'INV-8821',
    officeName: 'مكتب جدة العقارية',
    package: 'الماسية',
    amount: '1,499 ر.س',
    paymentMethod: 'تحويل بنكي',
    status: 'فشل',
    date: '15 مارس 2026',
  },
  {
    id: '5',
    invoiceNumber: 'INV-8821',
    officeName: 'المتحدة العقارية',
    package: 'الماسية',
    amount: '499 ر.س',
    paymentMethod: 'Apple Pay',

    status: 'مدفوع',
    date: '15 مارس 2026',
  },
  {
    id: '6',
    invoiceNumber: 'INV-8821',
    officeName: 'مكتب مكة العقارية',
    package: 'الماسية',
    amount: '1,499 ر.س',
    paymentMethod: 'بطاقة ائتمان',
    status: 'قيد التحصيل',
    date: '15 مارس 2026',
  },
  {
    id: '7',
    invoiceNumber: 'INV-8821',
    officeName: 'مكتب المدينة العقارية',
    package: 'الذهبية',
    amount: '499 ر.س',
    paymentMethod: 'تحويل بنكي',
    status: 'فشل',
    date: '15 مارس 2026',
  },
]

const tabs = [
  { label: 'كل الفواتير', value: 'all', color: '#00614E' },
  { label: 'مدفوع', value: 'مدفوع', color: '#309382' },
  { label: 'قيد التحصيل', value: 'قيد التحصيل', color: '#E07E3D' },
  { label: 'فشل', value: 'فشل', color: '#E03D40' },
]

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

const PaymentsTable = () => {
  const [activeTab, setActiveTab] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [packageFilter, setPackageFilter] = useState('all')
  const [methodFilter, setMethodFilter] = useState('all')

  const [isPackageOpen, setIsPackageOpen] = useState(false)
  const [isMethodOpen, setIsMethodOpen] = useState(false)

  // Modal State
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false)
  const [selectedInvoice, setSelectedInvoice] = useState<PaymentRecord | null>(null)

  const handleViewInvoice = (invoice: PaymentRecord) => {
    setSelectedInvoice(invoice)
    setIsInvoiceModalOpen(true)
  }

  const filteredPayments = mockPayments.filter((item) => {
    if (activeTab !== 'all' && item.status !== activeTab) return false
    if (packageFilter !== 'all' && item.package !== packageFilter) return false
    if (methodFilter !== 'all' && item.paymentMethod !== methodFilter) return false
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        item.invoiceNumber.toLowerCase().includes(query) ||
        item.officeName.toLowerCase().includes(query)
      )
    }
    return true
  })

  const columns: Column<PaymentRecord>[] = [
    {
      header: 'الفاتورة',
      key: 'invoiceNumber',
      render: (item) => (
        <span className="text-[12px] text-[#30343F] font-medium whitespace-nowrap">
          {item.invoiceNumber}
        </span>
      ),
    },
    {
      header: 'المكتب',
      key: 'officeName',
      render: (item) => (
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#00614E] flex items-center justify-center flex-shrink-0 overflow-hidden">
             {item.officeLogo ? (
               <Image src={item.officeLogo} alt={item.officeName} width={32} height={32} />
             ) : (
               <Building2 size={14} className="text-white" />
             )}
          </div>
          <span className="text-[12px] text-[#30343F] font-medium whitespace-nowrap">
            {item.officeName}
          </span>
          {item.officeName.includes('جدة') && (
            <Image src="/images/home/table-2.svg" alt="star" width={12} height={12} />
          )}
        </div>
      ),
    },
    {
      header: 'الباقة',
      key: 'package',
      render: (item) => (
        <div className="flex items-center gap-1.5 whitespace-nowrap">
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: getPackageColor(item.package) }}
          />
          <span
            className="text-[12px] font-medium"
            style={{ color: getPackageColor(item.package) }}
          >
            {item.package}
          </span>
        </div>
      ),
    },
    {
      header: 'المبلغ',
      key: 'amount',
      render: (item) => (
        <span className="text-[14px] text-[#30343F] font-bold whitespace-nowrap">
          {item.amount}
        </span>
      ),
    },
    {
      header: 'طريقة الدفع',
      key: 'paymentMethod',
      render: (item) => (
        <span className="text-[12px] text-[#4E525D] whitespace-nowrap">
          {item.paymentMethod}
        </span>
      ),
    },
    {
      header: 'حالة الدفع',
      key: 'status',
      className: '!px-2',
      render: (item) => (
        <div
          className={`text-[12px] text-center font-medium py-1.5 px-2 rounded-full w-full ${getStatusStyle(
            item.status
          )}`}
        >
          {item.status}
        </div>
      ),
    },
    {
      header: 'تاريخ الدفع',
      key: 'date',
      render: (item) => (
        <span className="text-[14px] text-[#30343F] whitespace-nowrap">
          {item.date}
        </span>
      ),
    },
    {
      header: 'الإجراءات',
      key: 'actions',
      align: 'center',
      render: (item) => (
        <div className="flex gap-2 items-center justify-center">
          <button className="flex items-center justify-center gap-1.5 h-8 px-3 rounded-[12px] text-[11px] font-medium bg-white text-[#00614E]  cursor-pointer transition-all hover:bg-gray-50">
            <Download size={12} />
            <span>تحميل PDF</span>
          </button>
          <button 
            onClick={() => handleViewInvoice(item)}
            className="w-16 h-8 flex items-center justify-center gap-1.5 rounded-[12px] text-[11px] font-medium bg-[#00614E] text-white cursor-pointer shrink-0 transition-all hover:bg-[#004d3e]"
          >
            <Eye size={12} strokeWidth={3} />
            <span>عرض</span>
          </button>
        </div>
      ),
    },
  ]

  return (
    <div className="mt-6">
      <div className="bg-[#E8E7E3] rounded-t-[16px] border border-gray-100 border-b-0 px-6 pt-6 pb-0">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-5">
          <div className="flex items-center gap-2 shrink-0">
            <h2 className="text-[18px] lg:text-[20px] font-bold text-[#00614E]">
              كل الفواتير
            </h2>
            <span className="text-[12px] text-[#4E525D] bg-[#F4F3EF] px-2.5 py-1 rounded-full font-medium">
              491 فاتورة
            </span>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto scrollbar-hide hide-scrollbar">
            <div className="flex items-center gap-2 min-w-max">
              {tabs.map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setActiveTab(tab.value)}
                  className={`px-4 py-1.5 cursor-pointer rounded-[8px] text-[12px] lg:text-[13px] font-medium transition-all ${
                    activeTab === tab.value
                      ? 'bg-[#00614E] text-white'
                      : 'bg-white'
                  }`}
                  style={activeTab === tab.value ? {} : { color: tab.color }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-3 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-2 w-full lg:w-1/3">
            <div className="relative">
              <button
                onClick={() => {
                  setIsPackageOpen(!isPackageOpen)
                  setIsMethodOpen(false)
                }}
                className="flex items-center justify-between gap-2 h-[48px] lg:h-[42px] w-full px-4 bg-[#F4F3EF] rounded-[10px] text-[14px] text-[#999894] font-medium transition-all cursor-pointer overflow-hidden whitespace-nowrap"
              >
                <span className="truncate">
                  {packageFilter === 'all' ? 'نوع الباقة' : packageFilter}
                </span>
                <ChevronDown size={14} className="shrink-0" />
              </button>
              {isPackageOpen && (
                <div className="absolute top-[52px] lg:top-[48px] right-0 w-full bg-white rounded-[12px] shadow-xl border border-gray-100 py-2 z-50 overflow-hidden">
                  <button
                    onClick={() => {
                      setPackageFilter('all')
                      setIsPackageOpen(false)
                    }}
                    className="w-full text-right px-4 py-2.5 text-[13px] font-bold bg-[#00614E] text-white"
                  >
                    كل الباقات
                  </button>
                  {['المجانية', 'الذهبية', 'الماسية'].map((item) => (
                    <button
                      key={item}
                      onClick={() => {
                        setPackageFilter(item as PackageType)
                        setIsPackageOpen(false)
                      }}
                      className="w-full text-right px-4 py-2.5 text-[13px] font-medium hover:bg-[#F4F3EF] transition-colors"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => {
                  setIsMethodOpen(!isMethodOpen)
                  setIsPackageOpen(false)
                }}
                className="flex items-center justify-between gap-2 h-[48px] lg:h-[42px] w-full px-4 bg-[#F4F3EF] rounded-[10px] text-[14px] text-[#999894] font-medium transition-all cursor-pointer overflow-hidden whitespace-nowrap"
              >
                <span className="truncate">
                  {methodFilter === 'all' ? 'طريقة الدفع' : methodFilter}
                </span>
                <ChevronDown size={14} className="shrink-0" />
              </button>
              {isMethodOpen && (
                <div className="absolute top-[52px] lg:top-[48px] right-0 w-full bg-white rounded-[12px] shadow-xl border border-gray-100 py-2 z-50 overflow-hidden">
                  <button
                    onClick={() => {
                      setMethodFilter('all')
                      isMethodOpen && setIsMethodOpen(false)
                    }}
                    className="w-full text-right px-4 py-2.5 text-[13px] font-bold bg-[#00614E] text-white"
                  >
                    كل الطرق
                  </button>
                  {['بطاقة ائتمان', 'Apple Pay', 'مدى', 'تحويل بنكي'].map(
                    (item) => (
                      <button
                        key={item}
                        onClick={() => {
                          setMethodFilter(item)
                          setIsMethodOpen(false)
                        }}
                        className="w-full text-right px-4 py-2.5 text-[13px] font-medium hover:bg-[#F4F3EF] transition-colors"
                      >
                        {item}
                      </button>
                    )
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="relative w-full lg:w-2/3">
            <input
              type="text"
              placeholder="ابحث عن فاتورة..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-[48px] lg:h-[42px] bg-[#F4F3EF] rounded-[10px] pr-10 pl-4 text-[14px] outline-none"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999894]" />
          </div>
        </div>
      </div>

      <CustomTable
        columns={columns}
        data={filteredPayments}
        minWidth="1100px"
        pagination={{
          totalItems: 5202,
          itemsPerPage: 8,
          currentPage: 1,
          onPageChange: (page) => console.log('Page:', page),
          rangeText: `عرض 1-8 من 5,202`,
        }}
      />

      <InvoiceDetailsModal 
        isOpen={isInvoiceModalOpen}
        onClose={() => setIsInvoiceModalOpen(false)}
        data={selectedInvoice}
      />
    </div>
  )
}

export default PaymentsTable
