'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import AddBlogModal from '../blogs/AddBlogModal'
import AddUnitModal from '../real-estate/AddUnitModal'
import AddOfficeModal from '../real-estate-offices/AddOfficeModal'

interface ProcedureCardProps {
  imageSrc: string;
  title: string;
  description: string;
  onClick?: () => void;
}

const ProcedureCard: React.FC<ProcedureCardProps> = ({ imageSrc, title, description, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className='bg-[#E8E7E3] hover:bg-[#00614E] py-4 px-4 rounded-[16px] transition-all duration-300 cursor-pointer group border border-transparent hover:border-[#00614E]/20 active:scale-[0.98]'
    >
      <div className='flex items-center gap-4'>
        <div className='shrink-0 w-[50px] h-[50px] lg:w-[56px] lg:h-[56px] rounded-[12px] bg-[#F4F3EF] flex items-center justify-center'>
          <Image src={imageSrc} alt={title} width={24} height={24} />
        </div>
        <div className='flex flex-col gap-1'>
          <p className='text-sm lg:text-base font-bold text-[#00614E] group-hover:text-white transition-colors duration-300 text-right'>
            {title}
          </p>
          <p className='text-xs text-[#4E525D] group-hover:text-white/80 transition-colors duration-300 text-right'>
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

const QuickProcedures = () => {
  const [isAddBlogOpen, setIsAddBlogOpen] = useState(false)
  const [isAddUnitOpen, setIsAddUnitOpen] = useState(false)
  const [isAddOfficeOpen, setIsAddOfficeOpen] = useState(false)

  const procedures = [
    {
      id: 1,
      imageSrc: "/images/home/card-6.svg",
      title: "اضافة وحدة جديدة",
      description: "قم بإضافة الوحدات الجديدة إلى المنصة",
      onClick: () => setIsAddUnitOpen(true)
    },
    {
      id: 2,
      imageSrc: "/images/home/card-7.svg",
      title: "اضافة مكتب عقاري جديد",
      description: "اضف مكتب عقاري جديد الى المنصة",
      onClick: () => setIsAddOfficeOpen(true)
    },
    {
      id: 3,
      imageSrc: "/images/home/card-8.svg",
      title: "نشر مقالة جديدة",
      description: "اضف مقالة عقارية جديدة وقم بمشاركتها",
      onClick: () => setIsAddBlogOpen(true)
    }
  ];

  return (
    <div className='mt-10 lg:mt-12' dir="rtl">
      <div className='mb-6'>
        <h2 className='text-[20px] lg:text-[24px] font-bold text-[#00614E]'>اجراءات سريعة</h2>
        <p className='text-xs lg:text-sm font-medium text-[#4E525D] mt-2'>
          لمحة شاملة عن أداء منصة ديار العقارية اليوم
        </p>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4'>
        {procedures.map((procedure) => (
          <ProcedureCard
            key={procedure.id}
            imageSrc={procedure.imageSrc}
            title={procedure.title}
            description={procedure.description}
            onClick={procedure.onClick}
          />
        ))}
      </div>

      <AddBlogModal 
        isOpen={isAddBlogOpen}
        onClose={() => setIsAddBlogOpen(false)}
      />

      <AddUnitModal 
        isOpen={isAddUnitOpen}
        onClose={() => setIsAddUnitOpen(false)}
      />

      <AddOfficeModal 
        isOpen={isAddOfficeOpen}
        onClose={() => setIsAddOfficeOpen(false)}
      />
    </div>
  )
}

export default QuickProcedures