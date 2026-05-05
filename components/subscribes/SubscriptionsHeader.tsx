'use client'

import React from 'react'
import Image from 'next/image'

const SubscriptionsHeader = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8" dir="rtl">
      <div>
        <h1 className="text-[24px] font-bold text-[#00614E]">إدارة الاشتراكات</h1>
        <p className="text-[14px] text-[#4E525D] mt-1">إدارة ومتابعة اشتراكات جميع المكاتب العقارية</p>
      </div>
      
      <button className="h-[46px] px-6 bg-[#E8E7E3] text-[#00614E]  rounded-[12px] flex items-center gap-2 text-[14px] font-bold   transition-all cursor-pointer">
        <Image src="/images/home/download.svg" alt="export" width={18} height={18} />
        تصدير التقرير
      </button>
    </div>
  )
}

export default SubscriptionsHeader
