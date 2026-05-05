import React from 'react'
import Image from 'next/image'
import { Eye, ChevronRight, ChevronLeft, ArrowUpLeft } from 'lucide-react'
import Link from 'next/link'

const UNITS = Array.from({ length: 8 }, (_, i) => ({ id: i + 1 }))

const AllUnitsPage = () => {
  return (
    <div className="px-4 lg:px-10 pb-10" dir="rtl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row  items-center  gap-4 mb-8 pt-6">
        <div className="flex items-center gap-3">
          <Link
            href="/real-estate-offices"
            className="w-8 h-8 bg-[#E8E7E3] rounded-full flex items-center justify-center hover:bg-gray-200 transition-all shrink-0"
          >
            <ChevronRight size={18} className="text-[#4E525D]" />
          </Link>
          <div>
            <h1 className="text-[20px] lg:text-[24px] font-bold text-[#00614E]">الوحدات المعروضة</h1>
          </div>
        </div>
        <span className="text-[#00614E] text-sm rounded-[10px] font-medium px-3 py-2 bg-[#E8E7E3]">
          {UNITS.length} وحدات
        </span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4 sm:gap-6">
        {UNITS.map((unit) => (
          <div key={unit.id} className="bg-white rounded-[20px] sm:rounded-[24px] shadow-sm group overflow-hidden">
            <div className="relative">
              <Image
                src={unit.id % 2 === 0 ? '/images/modals/gellary-2.png' : '/images/modals/gellary-1.png'}
                alt="unit"
                height={400}
                width={600}
                className="object-cover w-full group-hover:scale-105 transition-transform duration-500 rounded-t-[20px] sm:rounded-t-[24px]"
              />
              <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-[#E6B536] flex items-center gap-1 justify-center backdrop-blur-md px-2 sm:px-4 py-1.5 sm:py-2 rounded-[10px] sm:rounded-[12px] text-[12px] sm:text-[14px] font-bold text-[#F4F3EF]">
                250,000
                <Image src="/images/modals/sar.svg" alt="sar" width={16} height={16} className="sm:w-[18px] sm:h-[18px]" />
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
              <div className="flex items-center gap-3 sm:gap-5 absolute bottom-4 right-3 sm:right-4">
                <button className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#F4F3EF] cursor-pointer backdrop-blur-md flex items-center justify-center">
                  <ChevronRight size={16} className="sm:w-[20px] sm:h-[20px] text-[#00614E]" />
                </button>
                <button className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#F4F3EF] cursor-pointer backdrop-blur-md flex items-center justify-center">
                  <ChevronLeft size={16} className="sm:w-[20px] sm:h-[20px] text-[#00614E]" />
                </button>
              </div>
            </div>
            <div className="p-4 sm:p-5 space-y-3 sm:space-y-4">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[11px] sm:text-[12px] text-[#999894]">
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
              <h5 className="text-[16px] sm:text-[18px] lg:text-[20px] flex items-center gap-1 font-medium text-[#00614E]">
                شقة فاخرة في شمال الرياض
                <ArrowUpLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </h5>
              <div className="flex items-center gap-1 text-[10px] sm:text-[11px] text-[#999894]">
                <Image src="/images/modals/unit-icon-4.svg" alt="location" width={16} height={20} className="sm:w-[18px] sm:h-[24px]" />
                <span className="text-xs sm:text-sm text-[#999894]">شارع علي الظاهري - العارض - الرياض</span>
              </div>
              <button className="w-full h-[38px] sm:h-[40px] bg-[#00614E] text-white rounded-[10px] text-[12px] sm:text-[13px] font-bold hover:bg-[#005240] transition-all cursor-pointer flex items-center justify-center gap-2">
                <Eye size={14} className="sm:w-[16px] sm:h-[16px]" />
                عرض
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllUnitsPage