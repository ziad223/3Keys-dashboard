'use client'
import { Plus } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'
import AddBlogModal from './AddBlogModal'

const BlogsHeader = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  return (
    <>
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between w-full gap-4 sm:gap-0'>
          <div className='text-center sm:text-right '>
              <h2 className='text-xl sm:text-[20px] lg:text-2xl font-medium text-[#00614E]'>إدارة المقالات</h2>
              <p className='text-sm sm:text-[16px] mt-1 sm:mt-3 font-normal text-[#4E525D]'>نظام إدارة محتوى المدونة العقارية</p>
          </div>
         <div className='flex items-center  flex-col md:flex-row gap-3'>
             <button 
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center justify-center gap-2 h-[40px] px-4 rounded-[10px] cursor-pointer bg-[#E8E7E3] text-[#00614E] text-[14px] font-medium transition-all w-full sm:w-auto"
          >
            <Image
            src='/images/home/download.svg'
            alt='download'
            width={14}
            height={14}
            />
            <span>تصدير التقرير</span>
          </button>
           <button 
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center justify-center gap-2 h-[40px] px-4 rounded-[10px] cursor-pointer bg-[#00614E] text-white text-[14px] font-medium hover:bg-[#005240] transition-all w-full sm:w-auto"
          >
            <Plus size={16} />
            <span>إضافة مقال جديد</span>
          </button>
         </div>
      </div>

    
      <AddBlogModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
      />
    </>
  )
}

export default BlogsHeader