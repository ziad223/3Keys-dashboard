'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { Plus } from 'lucide-react'
import AddPackages from './modals/AddPackages'

const PackagesHeader = () => {
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
          <h1 className="text-[20px] lg:text-[24px] font-medium text-[#00614E]">إدارة الباقات </h1>
          <p className="text-[14px] text-[#4E525D] mt-3">إدارة خطط الاشتراك والحدود المتاحة لكل خطة </p>
        </div>

        <div className="flex items-center gap-2">
        
          <button 
            onClick={handleOpenAddModal}
            className="flex items-center gap-2 h-[40px] px-4 rounded-[10px] cursor-pointer bg-[#00614E] text-white text-[13px] font-medium hover:bg-[#005240] transition-all"
          >
            <Plus size={16} />
            <span>إضافة باقة جديدة</span>
          </button>
        </div>
      </div>

      <AddPackages 
        isOpen={isAddModalOpen}
        onClose={handleCloseAddModal}
      />
    </>
  )
}

export default PackagesHeader
