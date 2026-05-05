import React from 'react'
import HomeRightCharts from './HomeRightCharts'
import HomeLeftCharts from './HomeLeftCharts'

const HomeCharts = () => {
  return (
   <div className='mt-8'>
      <div className='mb-6'>
        <h2 className='text-[20px] lg:text-[24px] font-bold text-[#00614E]'>
          ملخص سريع لأداء المنصة
        </h2>
        <p className='text-xs lg:text-sm font-medium text-[#4E525D] mt-2'>
          لمحة شاملة عن أداء منصة ديار العقارية اليوم
        </p>
      </div>

      <div className='flex flex-col lg:flex-row gap-3 mt-5'>
        
        <div className="lg:w-[65%] w-full">
          <HomeRightCharts/>
        </div>

        <div className="lg:w-[35%] w-full">
          <HomeLeftCharts/>
        </div>

      </div>
   </div>
  )
}

export default HomeCharts