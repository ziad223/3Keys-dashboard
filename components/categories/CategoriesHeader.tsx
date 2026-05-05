'use client'
import { Plus } from 'lucide-react'
import React, { useState } from 'react'
import AddCategoryModal from './modals/AddCategoryModal'

const CategoriesHeader = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  return (
    <>
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between w-full gap-4 sm:gap-0'>
          <div className='text-center sm:text-right'>
              <h2 className='text-xl sm:text-[20px] lg:text-2xl font-medium text-[#00614E]'>إدارة التصنيفات</h2>
              <p className='text-sm sm:text-[16px] mt-1 sm:mt-3 font-normal text-[#4E525D]'>تنظيم مقالات المدونة حسب الفئات</p>
          </div>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center justify-center gap-2 h-[40px] px-4 rounded-[10px] cursor-pointer bg-[#00614E] text-white text-[13px] font-medium hover:bg-[#005240] transition-all w-full sm:w-auto"
          >
            <Plus size={16} />
            <span>إضافة تصنيف جديد</span>
          </button>
      </div>

      <AddCategoryModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
      />
    </>
  )
}

export default CategoriesHeader