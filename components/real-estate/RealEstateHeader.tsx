'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { Plus } from 'lucide-react'
import AddUnitModal from './AddUnitModal'

const RealEstateHeader = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  const handleOpenAddModal = () => {
    setIsAddModalOpen(true)
  }

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false)
  }

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-[20px] lg:text-[24px] font-bold text-[#00614E]">الوحدات العقارية</h1>
          <p className="text-[14px] text-[#4E525D] mt-3">إدارة شاملة لكل الوحدات المدرجة على المنصة</p>
        </div>

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 h-[40px] px-4 rounded-[10px] bg-[#E8E7E3] cursor-pointer text-[#00614E] text-[13px] font-medium hover:bg-[#00614E]/5 transition-all">
            <Image src="/images/home/download.svg" alt="export" width={16} height={16} />
            <span>تصدير التقرير</span>
          </button>
          <button 
            onClick={handleOpenAddModal}
            className="flex items-center gap-2 h-[40px] px-4 rounded-[10px] cursor-pointer bg-[#00614E] text-white text-[13px] font-medium hover:bg-[#005240] transition-all"
          >
            <Plus size={16} />
            <span>إضافة وحدة</span>
          </button>
        </div>
      </div>

      <AddUnitModal 
        isOpen={isAddModalOpen}
        onClose={handleCloseAddModal}
      />
    </>
  )
}

export default RealEstateHeader
