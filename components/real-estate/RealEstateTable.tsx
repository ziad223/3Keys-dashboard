'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Search, ChevronDown, Eye } from 'lucide-react'
import UnitPreviewModal from './UnitPreviewModal'
import UnitActionConfirmModal from './UnitActionConfirmModal'
import CustomTable, { Column } from '@/components/common/CustomTable'

type PropertyType = 'فيلا' | 'شقة' | 'أرض' | 'محل تجاري' | 'مكاتب' | 'استوديو'
type ListingType = 'إيجار' | 'إيجار يومي' | 'للبيع'

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
}

const units: Unit[] = [
  { id: '#RU-10388', name: 'شقة فاخرة - حي الياسمين', type: 'شقة', city: 'الرياض', agent: 'المتحدة العقارية', agentOffice: '', listingType: 'إيجار', price: '600 ر.س', status: 'قيد المراجعة' },
  { id: '#RU-10389', name: 'بيت دوبلكس - الخبر', type: 'فيلا', city: 'الرياض', agent: 'مكتب مكة العقارية', agentOffice: '', listingType: 'إيجار يومي', price: '600 ر.س / اليوم', status: 'قيد المراجعة' },
  { id: '#RU-10290', name: 'أرض تجارية - طريق الملك', type: 'أرض', city: 'الرياض', agent: 'المتحدة العقارية', agentOffice: '', listingType: 'للبيع', price: '600,000 ر.س', status: 'مرفوضة' },
  { id: '#RU-10291', name: 'شقة مجمع الاستثمار', type: 'شقة', city: 'الخبر', agent: 'مكتب جدة للاستثمار', agentOffice: '', listingType: 'إيجار', price: '600 ر.س', status: 'معتمدة' },
  { id: '#RU-10292', name: 'استوديو مارينوس - الغربي', type: 'استوديو', city: 'الرياض', agent: 'المتحدة العقارية', agentOffice: '', listingType: 'إيجار يومي', price: '600 ر.س / اليوم', status: 'قيد المراجعة' },
  { id: '#RU-10293', name: 'محل تجاري - العليا', type: 'محل تجاري', city: 'الرياض', agent: 'مكتب ملك العقارية', agentOffice: '', listingType: 'للبيع', price: '600,000 ر.س', status: 'مرفوضة' },
  { id: '#RU-10294', name: 'فيلا مكتب المدينة العقارات', type: 'فيلا', city: 'الخبر', agent: 'مكتب المدينة العقارات', agentOffice: '', listingType: 'إيجار', price: '600 ر.س', status: 'معتمدة' },
  { id: '#RU-10295', name: 'محل مكتب المدينة العقارات', type: 'محل تجاري', city: 'الخبر', agent: 'مكتب المدينة العقارات', agentOffice: '', listingType: 'للبيع', price: '600,000 ر.س', status: 'قيد المراجعة' },
]

const tabs = [
  { label: 'كل الوحدات', value: 'all', color: '#00614E' },
  { label: 'معتمدة', value: 'approved', color: '#E6B536' },
  { label: 'قيد المراجعة', value: 'review', color: '#E07E3D' },
  { label: 'وحدات مرفوضة', value: 'rejected', color: '#E03D40' },
]

const getStatusStyle = (status: string) => {
  switch (status) {
    case 'معتمدة': return 'bg-[#E6B5361A] text-[#E6B536]'
    case 'قيد المراجعة': return 'bg-[#E07E3D1A] text-[#E07E3D]'
    case 'مرفوضة': return 'bg-[#E03D401A] text-[#E03D40]'
    default: return 'bg-gray-100 text-gray-500'
  }
}

const getListingTypeStyle = (type: ListingType) => {
  switch (type) {
    case 'إيجار':
      return { dotColor: '#00614E', textColor: '#00614E' }
    case 'إيجار يومي':
      return { dotColor: '#E07E3D', textColor: '#E07E3D' }
    case 'للبيع':
      return { dotColor: '#FEC200', textColor: '#FEC200' }
  }
}

const RealEstateTable = () => {
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
      header: 'ID',
      key: 'id',
      render: (unit) => (
        <span className="text-[12px] text-[#00614E] font-medium whitespace-nowrap">{unit.id}</span>
      )
    },
    {
      header: 'الوحدة',
      key: 'name',
      render: (unit) => (
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-[8px] bg-[#00614E1A] flex items-center justify-center flex-shrink-0 overflow-hidden">
            <Image src="/images/home/activity-2.svg" alt="unit" width={16} height={16} />
          </div>
          <span className="text-[12px] text-[#30343F] font-medium whitespace-nowrap">{unit.name}</span>
        </div>
      )
    },
    {
      header: 'النوع',
      key: 'type',
      render: (unit) => (
        <span className="text-[12px] text-[#4E525D] whitespace-nowrap">{unit.type}</span>
      )
    },
    {
      header: 'المكتب / الوسيط',
      key: 'agent',
      render: (unit) => (
        <div className="flex items-center gap-1.5">
          <Image src = '/images/home/table.svg' alt='table-icon' width={20} height={20}/>
          <span className="text-[12px] text-[#30343F] font-medium whitespace-nowrap">{unit.agent}</span>
          <Image src = '/images/home/table-2.svg' alt='table-icon' width={12} height={12}/>
        </div>
      )
    },
    {
      header: 'نوع العرض',
      key: 'listingType',
      render: (unit) => {
        const listingStyle = getListingTypeStyle(unit.listingType)
        return (
          <div className="flex items-center gap-1.5">
            <span
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ backgroundColor: listingStyle.dotColor }}
            />
            <span
              className="text-[12px] font-medium whitespace-nowrap"
              style={{ color: listingStyle.textColor }}
            >
              {unit.listingType}
            </span>
          </div>
        )
      }
    },
    {
      header: 'السعر',
      key: 'price',
      render: (unit) => (
        <span className="text-[12px] text-[#30343F] font-medium whitespace-nowrap">{unit.price}</span>
      )
    },
    {
      header: 'المدينة',
      key: 'city',
      render: (unit) => (
        <span className="text-[12px] text-[#4E525D] whitespace-nowrap">{unit.city}</span>
      )
    },
    {
      header: 'الحالة',
      key: 'status',
      render: (unit) => (
        <span className={`text-[12px] font-medium px-3 py-1.5 rounded-full whitespace-nowrap ${getStatusStyle(unit.status)}`}>
          {unit.status}
        </span>
      )
    },
    {
      header: 'الإجراءات',
      key: 'actions',
      align: 'center',
      render: (unit) => (
        <div className="flex gap-2 items-center justify-center min-w-[200px]">
          <div className="flex flex-1 gap-2">
            {unit.status === 'معتمدة' ? (
              <button 
                onClick={() => {
                  setSelectedUnit(unit)
                  setConfirmModalType('cancel_approval')
                }}
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium bg-[#E03D40] text-white hover:bg-[#c73437] transition-all cursor-pointer whitespace-nowrap"
              >
                <span>✕</span>
                <span>إلغاء الإعتماد</span>
              </button>
            ) : unit.status === 'قيد المراجعة' ? (
              <>
                <button 
                  onClick={() => {
                    setSelectedUnit(unit)
                    setConfirmModalType('approve')
                  }}
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium bg-[#E6B536] text-white hover:bg-[#d4a02e] transition-all cursor-pointer whitespace-nowrap"
                >
                  <span>✓</span>
                  <span>اعتمد</span>
                </button>
                <button 
                  onClick={() => {
                    setSelectedUnit(unit)
                    setConfirmModalType('reject')
                  }}
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium bg-[#E03D40] text-white hover:bg-[#c73437] transition-all cursor-pointer whitespace-nowrap"
                >
                  <span>✕</span>
                  <span>رفض</span>
                </button>
              </>
            ) : unit.status === 'مرفوضة' ? (
              <button 
                onClick={() => {
                  setSelectedUnit(unit)
                  setConfirmModalType('approve')
                }}
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium bg-[#E6B536] text-white hover:bg-[#d4a02e] transition-all cursor-pointer whitespace-nowrap"
              >
                <span>✓</span>
                <span>اعتمد</span>
              </button>
            ) : null}
          </div>
          <button 
            onClick={() => {
              setSelectedUnit(unit)
              setIsPreviewOpen(true)
            }}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[11px] font-medium bg-[#00614E] text-white hover:bg-[#004d3d] transition-all cursor-pointer whitespace-nowrap"
          >
            <Eye size={12} strokeWidth={3}/>
            <span>عرض</span>
          </button>
        </div>
      )
    }
  ]

  return (
    <div className="mt-6">
      {/* Header and Filters */}
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

        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
          <div className="flex flex-row items-center gap-2 w-full lg:w-1/3">
            <div className="relative w-1/2 ">
              <button
                onClick={() => {
                  setIsPropertyTypeOpen(!isPropertyTypeOpen)
                  setIsListingTypeOpen(false)
                }}
                className="flex items-center justify-between gap-2 h-[42px] w-full px-4 bg-[#F4F3EF] rounded-[10px] text-[13px] text-[#4E525D] font-medium hover:bg-[#EEEDEA] transition-all cursor-pointer"
              >
                <span>{propertyTypeFilter === 'all' ? 'نوع الوحدة' : propertyTypeFilter}</span>
                <ChevronDown size={14} className={`transition-transform ${isPropertyTypeOpen ? 'rotate-180' : ''}`} />
              </button>

              {isPropertyTypeOpen && (
                <div className="absolute top-[48px] right-0 w-full bg-white rounded-[12px] shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  {['all', 'شقة', 'تاون هاوس', 'فيلا', 'بيت', 'مكتب', 'قطعة أرض'].map((item) => (
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
                      {item === 'all' ? 'كل أنواع الوحدات' : item}
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
                <span>{listingTypeFilter === 'all' ? 'نوع العرض' : listingTypeFilter}</span>
                <ChevronDown size={14} className={`transition-transform ${isListingTypeOpen ? 'rotate-180' : ''}`} />
              </button>

              {isListingTypeOpen && (
                <div className="absolute top-[48px] right-0 w-full bg-white rounded-[12px] shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  {[
                    { label: 'كل أنواع العرض', value: 'all' },
                    { label: 'للبيع', value: 'للبيع', color: '#FEC200' },
                    { label: 'للإيجار', value: 'إيجار', color: '#00614E' },
                    { label: 'للإيجار يومي', value: 'إيجار يومي', color: '#E07E3D' },
                  ].map((item) => (
                    <button
                      key={item.value}
                      onClick={() => {
                        setListingTypeFilter(item.value)
                        setIsListingTypeOpen(false)
                      }}
                      className={`w-full text-right px-4 py-2 text-[13px] transition-colors ${
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
              placeholder="بحث عن وحدة، مدينة، رقم، وسيط..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-[42px] bg-[#F4F3EF] rounded-[10px] pr-10 pl-4 text-[13px] outline-none placeholder:text-[#999894] border border-transparent focus:border-[#00614E]/20 transition-all"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999894]" />
          </div>
        </div>
      </div>

      <CustomTable
        columns={columns}
        data={filteredUnits}
        containerClassName="bg-[#E8E7E3] rounded-b-[16px] border border-gray-100 border-t-0 overflow-hidden"
        pagination={{
          totalItems: 3000,
          itemsPerPage: 10,
          currentPage: 1,
          onPageChange: (page) => console.log('Page:', page),
          rangeText: `عرض 1-${filteredUnits.length} من 3,000`
        }}
      />

      {/* Modals */}
      <UnitPreviewModal 
        isOpen={isPreviewOpen} 
        onClose={() => setIsPreviewOpen(false)} 
        unit={selectedUnit} 
      />

      {confirmModalType && (
        <UnitActionConfirmModal
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

export default RealEstateTable
