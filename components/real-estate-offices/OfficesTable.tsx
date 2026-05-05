'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Search, ChevronDown, Eye } from 'lucide-react'
import OfficePreviewModal from  './OfficePreviewModal'
import OfficeActionConfirmModal from './OfficeActionConfirmModal'
import CustomTable, { Column } from '@/components/common/CustomTable'

type PackageType = 'المجانية' | 'الذهبية' | 'الماسية'
type SubscriptionType = 'شهري' | 'سنوي'
type AccountStatus = 'نشط' | 'موقوف'
type VerificationStatus = 'موثق' | 'قيد المراجعة' | 'مرفوض'

type Office = {
  id: string
  name: string
  package: PackageType
  subscription: SubscriptionType
  city: string
  accountStatus: AccountStatus
  joinDate: string
  verificationStatus: VerificationStatus
  units: { current: number; total: number }
  agents: { current: number; total: number }
  logo?: string
}

const offices: Office[] = [
  { id: '1', name: 'المتحدة العقارية', package: 'الماسية', subscription: 'شهري', units: { current: 67, total: 100 }, agents: { current: 12, total: 15 }, city: 'الرياض', accountStatus: 'نشط', joinDate: '15 مارس 2026', verificationStatus: 'قيد المراجعة' },
  { id: '2', name: 'مكتب مكة العقارية', package: 'المجانية', subscription: 'سنوي', units: { current: 5, total: 10 }, agents: { current: 1, total: 3 }, city: 'الرياض', accountStatus: 'موقوف', joinDate: '15 مارس 2026', verificationStatus: 'قيد المراجعة' },
  { id: '3', name: 'المتحدة العقارية', package: 'الذهبية', subscription: 'شهري', units: { current: 32, total: 50 }, agents: { current: 5, total: 10 }, city: 'الرياض', accountStatus: 'نشط', joinDate: '15 مارس 2026', verificationStatus: 'مرفوض' },
  { id: '4', name: 'مكتب جدة للإستثمار', package: 'الماسية', subscription: 'شهري', units: { current: 67, total: 100 }, agents: { current: 12, total: 15 }, city: 'الرياض', accountStatus: 'نشط', joinDate: '15 مارس 2026', verificationStatus: 'موثق' },
  { id: '5', name: 'المتحدة العقارية', package: 'المجانية', subscription: 'سنوي', units: { current: 5, total: 10 }, agents: { current: 1, total: 3 }, city: 'الرياض', accountStatus: 'نشط', joinDate: '15 مارس 2026', verificationStatus: 'قيد المراجعة' },
  { id: '6', name: 'مكتب مكة العقارية', package: 'الماسية', subscription: 'شهري', units: { current: 67, total: 100 }, agents: { current: 12, total: 15 }, city: 'الرياض', accountStatus: 'موقوف', joinDate: '15 مارس 2026', verificationStatus: 'مرفوض' },
  { id: '7', name: 'مكتب المدينة العقارات', package: 'الذهبية', subscription: 'سنوي', units: { current: 32, total: 50 }, agents: { current: 5, total: 10 }, city: 'الرياض', accountStatus: 'نشط', joinDate: '15 مارس 2026', verificationStatus: 'موثق' },
]

const tabs = [
  { label: 'كل المكاتب', value: 'all', color: '#00614E' },
  { label: 'موثق', value: 'verified', color: '#E6B536' },
  { label: 'قيد المراجعة', value: 'review', color: '#E07E3D' },
  { label: 'مرفوض', value: 'rejected', color: '#E03D40' },
]

const getVerificationStatusStyle = (status: VerificationStatus) => {
  switch (status) {
    case 'موثق': return 'bg-[#E6B5361A] text-[#E6B536]'
    case 'قيد المراجعة': return 'bg-[#E07E3D1A] text-[#E07E3D]'
    case 'مرفوض': return 'bg-[#E03D401A] text-[#E03D40]'
    default: return 'bg-gray-100 text-gray-500'
  }
}

const getPackageColor = (pkg: PackageType) => {
  switch (pkg) {
    case 'الماسية': return '#00614E'
    case 'الذهبية': return '#E6B536'
    case 'المجانية': return '#4E525D'
    default: return '#4E525D'
  }
}

const OfficesTable = () => {
  const [activeTab, setActiveTab] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [packageFilter, setPackageFilter] = useState('all')
  const [subscriptionFilter, setSubscriptionFilter] = useState('all')
  const [accountStatusFilter, setAccountStatusFilter] = useState('all')
  
  const [isPackageOpen, setIsPackageOpen] = useState(false)
  const [isSubscriptionOpen, setIsSubscriptionOpen] = useState(false)
  const [isAccountStatusOpen, setIsAccountStatusOpen] = useState(false)

  const [selectedOffice, setSelectedOffice] = useState<Office | null>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [confirmModalType, setConfirmModalType] = useState<'delete' | 'reject' | 'cancel_verification' | 'verify' | 'suspend' | null>(null)

  const filteredOffices = offices.filter((office) => {
    if (activeTab === 'verified' && office.verificationStatus !== 'موثق') return false
    if (activeTab === 'rejected' && office.verificationStatus !== 'مرفوض') return false
    if (activeTab === 'review' && office.verificationStatus !== 'قيد المراجعة') return false
    if (packageFilter !== 'all' && office.package !== packageFilter) return false
    if (subscriptionFilter !== 'all' && office.subscription !== subscriptionFilter) return false
    if (accountStatusFilter !== 'all' && office.accountStatus !== accountStatusFilter) return false
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return office.name.toLowerCase().includes(query) || office.city.toLowerCase().includes(query)
    }
    return true
  })

  const columns: Column<Office>[] = [
    {
      header: 'اسم المكتب',
      key: 'name',
      render: (office) => (
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#00614E] flex items-center justify-center flex-shrink-0">
            <Building2 size={14} className="text-white" />
          </div>
          <span className="text-[12px] text-[#30343F] font-medium whitespace-nowrap">{office.name}</span>
          {office.name.includes('جدة') && <Image src="/images/home/table-2.svg" alt="star" width={12} height={12} />}
        </div>
      )
    },
    {
      header: 'الباقة',
      key: 'package',
      render: (office) => (
        <div className="flex items-center gap-1.5 whitespace-nowrap">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: getPackageColor(office.package) }} />
          <span className="text-[12px] font-medium" style={{ color: getPackageColor(office.package) }}>{office.package}</span>
        </div>
      )
    },
    { header: 'نوع الاشتراك', key: 'subscription', render: (office) => <span className="text-[12px] text-[#4E525D] whitespace-nowrap">{office.subscription}</span> },
    {
      header: 'عدد الوحدات',
      key: 'units',
      render: (office) => (
        <div className="flex flex-col gap-1 w-24">
          <div className="flex justify-between text-[10px] text-[#4E525D] font-bold">
            <span>{office.units.current} / {office.units.total}</span>
          </div>
          <div className="w-full h-1.5 bg-[#F4F3EF] rounded-full overflow-hidden">
            <div className="h-full bg-[#00614E]" style={{ width: `${(office.units.current / office.units.total) * 100}%` }} />
          </div>
        </div>
      )
    },
    {
      header: 'عدد الوكلاء',
      key: 'agents',
      render: (office) => (
        <div className="flex flex-col gap-1 w-20">
          <div className="flex justify-between text-[10px] text-[#4E525D] font-bold">
            <span>{office.agents.current} / {office.agents.total}</span>
          </div>
          <div className="w-full h-1.5 bg-[#F4F3EF] rounded-full overflow-hidden">
            <div className="h-full bg-[#00614E]" style={{ width: `${(office.agents.current / office.agents.total) * 100}%` }} />
          </div>
        </div>
      )
    },
    { header: 'المدينة', key: 'city', render: (office) => <span className="text-[14px] text-[#30343F] whitespace-nowrap">{office.city}</span> },
    {
      header: 'حالة الحساب',
      key: 'accountStatus',
      render: (office) => (
        <span className={`text-[14px] font-medium whitespace-nowrap ${office.accountStatus === 'نشط' ? 'text-[#00614E]' : 'text-[#E03D40]'}`}>
          {office.accountStatus}
        </span>
      )
    },
    { header: 'تاريخ الإنضمام', key: 'joinDate', render: (office) => <span className="text-[12px] text-[#4E525D] whitespace-nowrap">{office.joinDate}</span> },
    {
      header: 'التوثيق',
      key: 'verificationStatus',
      render: (office) => (
        <span className={`text-[12px] font-medium px-3 py-1 rounded-full whitespace-nowrap ${getVerificationStatusStyle(office.verificationStatus)}`}>
          {office.verificationStatus}
        </span>
      )
    },
    {
      header: 'الإجراءات',
      key: 'actions',
      align: 'center',
      render: (office) => {
        const showReject = office.verificationStatus !== 'موثق' && office.verificationStatus !== 'مرفوض'
        const showVerify = office.verificationStatus !== 'موثق'
        const showCancel = office.verificationStatus === 'موثق'
        
        return (
          <div className="flex gap-2 items-center min-w-[200px]">
            <div className="flex flex-1 gap-2">
              {showVerify && (
                <button 
                  onClick={() => { setSelectedOffice(office); setConfirmModalType('verify') }}
                  className={`flex items-center justify-center gap-1.5 h-8 rounded-[12px] text-[11px] font-medium bg-[#E6B536] text-white cursor-pointer transition-all ${!showReject ? 'flex-[2]' : 'flex-1'}`}
                >
                  <span>✓</span>
                  <span>توثيق</span>
                </button>
              )}
              {showCancel && (
                <button 
                  onClick={() => { setSelectedOffice(office); setConfirmModalType('cancel_verification') }}
                  className={`flex items-center justify-center gap-1.5 h-8 rounded-[12px] text-[11px] font-medium bg-[#E03D40] text-white cursor-pointer transition-all ${!showReject ? 'flex-[2]' : 'flex-1'}`}
                >
                  <span>✕</span>
                  <span>إلغاء التوثيق</span>
                </button>
              )}
              {showReject && (
                <button 
                  onClick={() => { setSelectedOffice(office); setConfirmModalType('reject') }}
                  className="flex-1 flex items-center justify-center gap-1.5 h-8 rounded-[12px] text-[11px] font-medium bg-[#E03D40] text-white cursor-pointer transition-all"
                >
                  <span>✕</span>
                  <span>رفض</span>
                </button>
              )}
            </div>
            
            <button 
              onClick={() => { setSelectedOffice(office); setIsPreviewOpen(true) }}
              className="w-16 h-8 flex items-center justify-center gap-1.5 rounded-[12px] text-[11px] font-medium bg-[#00614E] text-white cursor-pointer shrink-0"
            >
              <Eye size={12} strokeWidth={3}/>
              <span>عرض</span>
            </button>
          </div>
        )
      }
    }
  ]

  return (
    <div className="mt-6">
      <div className="bg-[#E8E7E3] rounded-t-[16px] border border-gray-100 border-b-0 px-6 pt-6 pb-0">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-5">
          <div className="flex items-center gap-2 shrink-0">
            <h2 className="text-[18px] lg:text-[20px] font-bold text-[#00614E]">كل المكاتب العقارية</h2>
            <span className="text-[12px] text-[#4E525D] bg-[#F4F3EF] px-2.5 py-1 rounded-full font-medium">
              2393 مكتب
            </span>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto scrollbar-hide hide-scrollbar">
            <div className="flex items-center gap-2 min-w-max">
              {tabs.map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setActiveTab(tab.value)}
                  className={`px-4 py-1.5 cursor-pointer rounded-[8px] text-[12px] lg:text-[13px] font-medium transition-all ${
                    activeTab === tab.value ? 'bg-[#00614E] text-white' : 'bg-white'
                  }`}
                  style={activeTab === tab.value ? {} : { color: tab.color }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-2 w-full lg:w-[60%]">
             <div className="relative">
              <button
                onClick={() => {
                  setIsPackageOpen(!isPackageOpen)
                  setIsSubscriptionOpen(false)
                  setIsAccountStatusOpen(false)
                }}
                className="flex items-center justify-between gap-2 h-[48px] lg:h-[42px] w-full px-4 bg-[#F4F3EF] rounded-[10px] text-[14px] text-[#999894] font-medium transition-all cursor-pointer overflow-hidden whitespace-nowrap"
              >
                <span className="truncate">{packageFilter === 'all' ? 'نوع الباقة' : packageFilter}</span>
                <ChevronDown size={14} className="shrink-0" />
              </button>
              {isPackageOpen && (
                <div className="absolute top-[52px] lg:top-[48px] right-0 w-full bg-white rounded-[12px] shadow-xl border border-gray-100 py-2 z-50 overflow-hidden">
                  <button
                    onClick={() => { setPackageFilter('all'); setIsPackageOpen(false) }}
                    className="w-full text-right px-4 py-2.5 text-[13px] font-bold bg-[#00614E] text-white"
                  >
                    كل الباقات
                  </button>
                  {[
                    { label: 'المجانية', value: 'المجانية', color: '#4E525D' },
                    { label: 'الذهبية', value: 'الذهبية', color: '#E6B536' },
                    { label: 'الماسية', value: 'الماسية', color: '#00614E' },
                  ].map((item) => (
                    <button
                      key={item.value}
                      onClick={() => { setPackageFilter(item.value as PackageType); setIsPackageOpen(false) }}
                      className="w-full text-right px-4 py-2.5 text-[13px] font-medium hover:bg-[#F4F3EF] transition-colors"
                      style={{ color: item.color }}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => {
                  setIsSubscriptionOpen(!isSubscriptionOpen)
                  setIsPackageOpen(false)
                  setIsAccountStatusOpen(false)
                }}
                className="flex items-center justify-between gap-2 h-[48px] lg:h-[42px] w-full px-4 bg-[#F4F3EF] rounded-[10px] text-[14px] text-[#999894] font-medium transition-all cursor-pointer overflow-hidden whitespace-nowrap"
              >
                <span className="truncate">{subscriptionFilter === 'all' ? 'نوع الاشتراك' : subscriptionFilter}</span>
                <ChevronDown size={14} className="shrink-0" />
              </button>
              {isSubscriptionOpen && (
                <div className="absolute top-[52px] lg:top-[48px] right-0 w-full bg-white rounded-[12px] shadow-xl border border-gray-100 py-2 z-50 overflow-hidden">
                  <button
                    onClick={() => { setSubscriptionFilter('all'); setIsSubscriptionOpen(false) }}
                    className="w-full text-right px-4 py-2.5 text-[13px] font-bold bg-[#00614E] text-white"
                  >
                    كل الاشتراكات
                  </button>
                  {[
                    { label: 'شهري', value: 'شهري', color: '#4E525D' },
                    { label: 'سنوي', value: 'سنوي', color: '#00614E' },
                  ].map((item) => (
                    <button
                      key={item.value}
                      onClick={() => { setSubscriptionFilter(item.value as SubscriptionType); setIsSubscriptionOpen(false) }}
                      className="w-full text-right px-4 py-2.5 text-[13px] font-medium hover:bg-[#F4F3EF] transition-colors"
                      style={{ color: item.color }}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => {
                  setIsAccountStatusOpen(!isAccountStatusOpen)
                  setIsPackageOpen(false)
                  setIsSubscriptionOpen(false)
                }}
                className="flex items-center justify-between gap-2 h-[48px] lg:h-[42px] w-full px-4 bg-[#F4F3EF] rounded-[10px] text-[14px] text-[#999894] font-medium transition-all cursor-pointer overflow-hidden whitespace-nowrap"
              >
                <span className="truncate">{accountStatusFilter === 'all' ? 'حالة الحساب' : accountStatusFilter}</span>
                <ChevronDown size={14} className="shrink-0" />
              </button>
              {isAccountStatusOpen && (
                <div className="absolute top-[52px] lg:top-[48px] right-0 w-full bg-white rounded-[12px] shadow-xl border border-gray-100 py-2 z-50 overflow-hidden">
                  <button
                    onClick={() => { setAccountStatusFilter('all'); setIsAccountStatusOpen(false) }}
                    className="w-full text-right px-4 py-2.5 text-[13px] font-bold bg-[#00614E] text-white"
                  >
                    كل الحالات
                  </button>
                  {[
                    { label: 'نشط', value: 'نشط', color: '#309382' },
                    { label: 'موقوف', value: 'موقوف', color: '#E03D40' },
                  ].map((item) => (
                    <button
                      key={item.value}
                      onClick={() => { setAccountStatusFilter(item.value as AccountStatus); setIsAccountStatusOpen(false) }}
                      className="w-full text-right px-4 py-2.5 text-[13px] font-medium hover:bg-[#F4F3EF] transition-colors"
                      style={{ color: item.color }}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="relative w-full lg:flex-1">
            <input
              type="text"
              placeholder="بحث باسم المكتب..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-[48px] lg:h-[42px] bg-[#F4F3EF] rounded-[10px] pr-10 pl-4 text-[14px] outline-none  "
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999894]" />
          </div>
        </div>
      </div>

      <CustomTable
        columns={columns}
        data={filteredOffices}
        minWidth="1100px"
        containerClassName="bg-[#E8E7E3] rounded-b-[16px] border border-gray-100 border-t-0 overflow-hidden"
        pagination={{
          totalItems: 5202,
          itemsPerPage: 8,
          currentPage: 1,
          onPageChange: (page) => console.log('Page:', page),
          rangeText: `عرض 1-8 من 5,202`
        }}
      />

      <OfficePreviewModal isOpen={isPreviewOpen} onClose={() => setIsPreviewOpen(false)} office={selectedOffice} />
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

const Building2 = ({ size, className }: { size: number, className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/></svg>
)

export default OfficesTable
