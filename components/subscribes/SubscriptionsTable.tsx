'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Search, ChevronDown, X, Eye, RefreshCcw } from 'lucide-react'
import SubscriptionDetailsModal from './SubscriptionDetailsModal'
import SubscribeUnitActionConfirmModal from './SubscribeUnitActionConfirmModal'
import CustomTable, { Column } from '@/components/common/CustomTable'

type PropertyType = 'فيلا' | 'شقة' | 'أرض' | 'محل تجاري' | 'مكاتب' | 'استوديو'
type ListingType = 'الماسية' | 'المجانية' | 'الذهبية'

type Unit = {
  id: string
  name: string
  type: PropertyType
  city: string
  agent: string
  agentOffice: string
  listingType: ListingType
  price: string
  status: 'قيد المراجعة' | 'مرفوضة' | 'معتمدة'
  subscriptionStatus: 'نشط' | 'منتهي' | 'ملغي'
}

const units: Unit[] = [
  { id: '#RU-10388', name: 'شقة فاخرة - حي الياسمين', type: 'شقة', city: 'الرياض', agent: 'المتحدة العقارية', agentOffice: '', listingType: 'الماسية', price: '600 ر.س', status: 'معتمدة', subscriptionStatus: 'نشط' },
  { id: '#RU-10389', name: 'بيت دوبلكس - الخبر', type: 'فيلا', city: 'الرياض', agent: 'مكتب مكة العقارية', agentOffice: '', listingType: 'المجانية', price: '600 ر.س / اليوم', status: 'معتمدة', subscriptionStatus: 'منتهي' },
  { id: '#RU-10290', name: 'أرض تجارية - طريق الملك', type: 'أرض', city: 'الرياض', agent: 'المتحدة العقارية', agentOffice: '', listingType: 'الذهبية', price: '600,000 ر.س', status: 'معتمدة', subscriptionStatus: 'ملغي' },
  { id: '#RU-10291', name: 'شقة مجمع الاستثمار', type: 'شقة', city: 'الخبر', agent: 'مكتب جدة للاستثمار', agentOffice: '', listingType: 'المجانية', price: '600 ر.س', status: 'معتمدة', subscriptionStatus: 'نشط' },
  { id: '#RU-10292', name: 'استوديو مارينوس - الغربي', type: 'استوديو', city: 'الرياض', agent: 'المتحدة العقارية', agentOffice: '', listingType: 'الماسية', price: '600 ر.س / اليوم', status: 'معتمدة', subscriptionStatus: 'منتهي' },
  { id: '#RU-10293', name: 'محل تجاري - العليا', type: 'محل تجاري', city: 'الرياض', agent: 'مكتب ملك العقارية', agentOffice: '', listingType: 'الذهبية', price: '600,000 ر.س', status: 'معتمدة', subscriptionStatus: 'ملغي' },
  { id: '#RU-10294', name: 'فيلا مكتب المدينة العقارات', type: 'فيلا', city: 'الخبر', agent: 'مكتب المدينة العقارات', agentOffice: '', listingType: 'المجانية', price: '600 ر.س', status: 'معتمدة', subscriptionStatus: 'نشط' },
  { id: '#RU-10295', name: 'محل مكتب المدينة العقارات', type: 'محل تجاري', city: 'الخبر', agent: 'مكتب المدينة العقارات', agentOffice: '', listingType: 'الذهبية', price: '600,000 ر.س', status: 'معتمدة', subscriptionStatus: 'نشط' },
]

const tabs = [
  { label: 'كل الباقات', value: 'all', color: '#00614E' },
  { label: 'المجانية', value: 'approved', color: '#999894' },
  { label: ' الذهبية', value: 'review', color: '#E6B536' },
  { label: ' الماسية', value: 'rejected', color: '#309382' },
]

const getListingTypeStyle = (type: ListingType) => {
  switch (type) {
    case 'الماسية':
      return { dotColor: '#00614E', textColor: '#00614E' }
    case 'الذهبية':
      return { dotColor: '#FEC200', textColor: '#FEC200' }
    case 'المجانية':
      return { dotColor: '#999894', textColor: '#999894' }
  }
}

const getSubscriptionStatusStyle = (status: 'نشط' | 'منتهي' | 'ملغي') => {
  switch (status) {
    case 'نشط':
      return 'bg-[#00614E1A] text-[#00614E]'
    case 'منتهي':
      return 'bg-[#E03D401A] text-[#E03D40]'
    case 'ملغي':
      return 'bg-[#9998941A] text-[#999894] '
    default:
      return 'bg-gray-100 text-gray-500'
  }
}

const SubscriptionsTable = () => {
  const [activeTab, setActiveTab] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [propertyTypeFilter, setPropertyTypeFilter] = useState('all')
  const [listingTypeFilter, setListingTypeFilter] = useState('all')
  const [isPropertyTypeOpen, setIsPropertyTypeOpen] = useState(false)
  const [isListingTypeOpen, setIsListingTypeOpen] = useState(false)
  
  // Modals state
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [confirmModalType, setConfirmModalType] = useState<'delete' | 'reject' | 'cancel_approval' | 'approve' | null>(null)

  const filteredUnits = units.filter((unit) => {
    // Tab Filter
    if (activeTab === 'approved' && unit.status !== 'معتمدة') return false
    if (activeTab === 'rejected' && unit.status !== 'مرفوضة') return false
    if (activeTab === 'review' && unit.status !== 'قيد المراجعة') return false

    // Property Type Filter
    if (propertyTypeFilter !== 'all' && unit.type !== propertyTypeFilter) return false

    // Listing Type Filter
    if (listingTypeFilter !== 'all' && unit.listingType !== listingTypeFilter) return false

    // Search Filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        unit.name.toLowerCase().includes(query) ||
        unit.id.toLowerCase().includes(query) ||
        unit.city.toLowerCase().includes(query) ||
        unit.agent.toLowerCase().includes(query)
      )
    }

    return true
  })

  const columns: Column<Unit>[] = [
    {
      header: 'اسم المكتب',
      key: 'agent',
      render: (unit) => (
        <div className="flex items-center gap-1.5">
          <Image src = '/images/home/table.svg' alt='table-icon' width={20} height={20}/>
          <span className="text-[12px] text-[#30343F] font-medium whitespace-nowrap">{unit.agent}</span>
        </div>
      )
    },
    {
      header: 'الباقة',
      key: 'listingType',
      render: (unit) => {
        const listingStyle = getListingTypeStyle(unit.listingType)
        return (
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: listingStyle.dotColor }} />
            <span className="text-[12px] font-medium whitespace-nowrap" style={{ color: listingStyle.textColor }}>{unit.listingType}</span>
          </div>
        )
      }
    },
    { header: 'نوع الإشتراك', key: 'subType', render: () => <span className="text-sm text-[#30343F]">شهري</span> },
    {
      header: 'عدد الوحدات',
      key: 'units',
      render: () => (
        <div className="flex flex-col gap-1 w-20">
          <div className="flex justify-between text-[10px] text-[#4E525D] font-bold">
            <span>40 /100</span>
          </div>
          <div className="w-full h-1.5 bg-[#F4F3EF] rounded-full overflow-hidden">
            <div className="h-full bg-[#00614E]" style={{ width: `40%` }} />
          </div>
        </div>
      )
    },
    {
      header: 'عدد الوكلاء',
      key: 'agents',
      render: () => (
        <div className="flex flex-col gap-1 w-20">
          <div className="flex justify-between text-[10px] text-[#4E525D] font-bold">
            <span>60 /100</span>
          </div>
          <div className="w-full h-1.5 bg-[#F4F3EF] rounded-full overflow-hidden">
            <div className="h-full bg-[#00614E]" style={{ width: `60%` }} />
          </div>
        </div>
      )
    },
    { header: 'المدينة', key: 'city', render: (unit) => <span className='text-sm font-medium text-[#30343F]'>{unit.city}</span> },
    {
      header: 'حالة الإشتراك',
      key: 'subscriptionStatus',
      render: (unit) => (
        <div className={`px-3 py-1 rounded-full text-[12px] font-bold text-center inline-block min-w-[68px] ${getSubscriptionStatusStyle(unit.subscriptionStatus)}`}>
          {unit.subscriptionStatus}
        </div>
      )
    },
    { header: 'تاريخ الإنتهاء', key: 'endDate', render: () => <span className='text-sm font-medium text-[#30343F]'>15 مارس 2026</span> },
    {
      header: 'الإجراءات',
      key: 'actions',
      align: 'center',
      render: (unit) => (
        <div className="flex items-center justify-center gap-2">
          <button 
            disabled={unit.subscriptionStatus !== 'منتهي'}
            onClick={() => { setSelectedUnit(unit); setConfirmModalType('approve') }}
            className={`flex items-center gap-1 px-4 py-1.5 rounded-[10px] text-[13px] transition-all whitespace-nowrap text-white ${unit.subscriptionStatus === 'منتهي' ? 'bg-[#E6B536] hover:bg-[#d4a02e] cursor-pointer' : 'bg-[#E6B536] opacity-50 cursor-not-allowed'}`}
          >
            <RefreshCcw size={16} />
            <span>تجديد</span>
          </button>
          <button 
            disabled={unit.subscriptionStatus !== 'نشط'}
            onClick={() => { setSelectedUnit(unit); setConfirmModalType('cancel_approval') }}
            className={`flex items-center gap-1 px-4 py-1.5 rounded-[10px] text-[13px] transition-all whitespace-nowrap text-white ${unit.subscriptionStatus === 'نشط' ? 'bg-[#E03D40] hover:bg-[#c73437] cursor-pointer' : 'bg-[#E03D40] opacity-50 cursor-not-allowed'}`}
          >
            <X size={16} />
            <span>إلغاء الإشتراك</span>
          </button>
          <button 
            onClick={() => { setSelectedUnit(unit); setIsPreviewOpen(true) }}
            className="flex items-center gap-1 px-4 py-1.5 rounded-[10px] text-[13px] font-bold bg-[#00614E] text-white hover:bg-[#004d3d] transition-all cursor-pointer whitespace-nowrap"
          >
            <Eye size={16} />
            <span>عرض</span>
          </button>
        </div>
      )
    }
  ]

  return (
    <div className="mt-6">
      <div className="bg-[#E8E7E3] rounded-t-[16px] border border-gray-100 border-b-0 px-6 pt-6 pb-0">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-5">
          <div className="flex items-center gap-2">
            <h2 className="text-[18px] lg:text-[20px] font-bold text-[#00614E]">كل الوحدات العقارية</h2>
            <span className="text-[12px] text-[#4E525D] bg-[#F4F3EF] px-2.5 py-1 rounded-full font-medium">
              {units.length.toLocaleString()} وحدة
            </span>
          </div>
          <div className="flex items-center gap-2">
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

        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 mb-6">
          <div className="flex flex-row items-center gap-2 w-full lg:w-1/3">
            <div className="relative w-1/2 ">
              <button
                onClick={() => {
                  setIsPropertyTypeOpen(!isPropertyTypeOpen)
                  setIsListingTypeOpen(false)
                }}
                className="flex items-center justify-between gap-2 h-[42px] w-full px-4 bg-[#F4F3EF] rounded-[10px] text-[13px] text-[#4E525D] font-medium hover:bg-[#EEEDEA] transition-all cursor-pointer"
              >
                <span>{propertyTypeFilter === 'all' ? 'نوع الإشتراك ' : propertyTypeFilter}</span>
                <ChevronDown size={14} className={`transition-transform ${isPropertyTypeOpen ? 'rotate-180' : ''}`} />
              </button>

              {isPropertyTypeOpen && (
                <div className="absolute top-[48px] right-0 w-full bg-white rounded-[12px] shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  {['all', 'شهري', 'ثانوي'].map((item) => (
                    <button
                      key={item}
                      onClick={() => {
                        setPropertyTypeFilter(item)
                        setIsPropertyTypeOpen(false)
                      }}
                      className={`w-full text-right px-4 py-2 text-[13px] transition-colors ${
                        (item === 'all' ? 'all' : item) === propertyTypeFilter
                          ? 'bg-[#00614E] text-white'
                          : 'text-[#4E525D] hover:bg-[#F4F3EF]'
                      }`}
                    >
                      {item === 'all' ? 'كل الاشتراكات' : item}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="relative w-1/2 md:w-[160px]">
              <button
                onClick={() => {
                  setIsListingTypeOpen(!isListingTypeOpen)
                  setIsPropertyTypeOpen(false)
                }}
                className="flex items-center justify-between gap-2 h-[42px] w-full px-4 bg-[#F4F3EF] rounded-[10px] text-[13px] text-[#4E525D] font-medium hover:bg-[#EEEDEA] transition-all cursor-pointer"
              >
                <span>{listingTypeFilter === 'all' ? ' حالة الأشتراك' : listingTypeFilter}</span>
                <ChevronDown size={14} className={`transition-transform ${isListingTypeOpen ? 'rotate-180' : ''}`} />
              </button>

              {isListingTypeOpen && (
                <div className="absolute top-[48px] right-0 w-full bg-white rounded-[12px] shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  {[
                    { label: 'كل أنواع العرض', value: 'all' },
                    { label: 'نشط', value: 'نشط', color: '#00614E' },
                    { label: 'منتهى', value: 'منتهى', color: '#E03D40' },
                    { label: 'ملغي', value: 'ملغي', color: '#999894' },
                  ].map((item) => (
                    <button
                      key={item.value}
                      onClick={() => {
                        setListingTypeFilter(item.value)
                        setIsListingTypeOpen(false)
                      }}
                      className={`w-full text-right px-4 py-2 font-medium cursor-pointer  text-[14px] transition-colors ${
                        item.value === listingTypeFilter
                          ? 'bg-[#00614E] text-white'
                          : 'hover:bg-[#F4F3EF]'
                      }`}
                      style={{ 
                        color: item.value === listingTypeFilter ? 'white' : (item.color || '#4E525D') 
                      }}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="relative flex-1 lg:w-2/3">
            <input
              type="text"
              placeholder="بحث باسم المكتب..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-[42px] bg-[#F4F3EF] rounded-[10px] pr-10 pl-4 text-[13px] outline-none placeholder:text-[#999894] border border-transparent  transition-all"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999894]" />
          </div>
        </div>
      </div>

      <CustomTable
        columns={columns}
        data={filteredUnits}
        pagination={{
          totalItems: 3000,
          itemsPerPage: 10,
          currentPage: 1,
          onPageChange: (page) => console.log('Page:', page),
          rangeText: `عرض 1-${filteredUnits.length} من 3,000`
        }}
      />

      {/* Modals */}
      <SubscriptionDetailsModal 
        isOpen={isPreviewOpen} 
        onClose={() => setIsPreviewOpen(false)} 
        unit={selectedUnit} 
      />

      {confirmModalType && (
        <SubscribeUnitActionConfirmModal
          isOpen={!!confirmModalType}
          onClose={() => setConfirmModalType(null)}
          onConfirm={() => {
            console.log(`Confirmed: ${confirmModalType} for unit ${selectedUnit?.id}`)
            setConfirmModalType(null)
          }}
          type={confirmModalType}
        />
      )}
    </div>
  )
}

export default SubscriptionsTable
