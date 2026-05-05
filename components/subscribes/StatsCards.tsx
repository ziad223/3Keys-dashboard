'use client'

import React from 'react'
import Image from 'next/image'
import { Users, UserCheck, UserX, UserMinus, TrendingUp, TrendingDown, ArrowUpRight } from 'lucide-react'

const stats = [
  {
    label: 'إجمالي الاشتراكات',
    value: '691',
    change: '8.2%+',
    icon: <Image src="/images/sidebar/sidebar-icon-5.svg" alt="subscribe icon" width={20} height={20} />,
    bgColor: 'bg-[#00614E]',
    textColor: 'text-[#00614E]',
    isUp: true
  },
  {
    label: 'الاشتراكات النشطة',
    change: '+3.4%',
    value: '299',
    icon: <Image src="/images/sidebar/sidebar-icon-5.svg" alt="subscribe icon" width={20} height={20} />,
    bgColor: 'bg-[#309382]',
    textColor: 'text-[#309382]',
    isUp: true
  },
  {
    label: 'الاشتراكات المنتهية',
    value: '120',
    change: '+6.7%',
    icon: <Image src="/images/sidebar/sidebar-icon-5.svg" alt="subscribe icon" width={20} height={20} />,
    bgColor: 'bg-[#E03D40]',
    textColor: 'text-[#E03D40]',
    isUp: true
  },
  {
    label: 'الاشتراكات الملغاة',
    value: '220',
    change: '+12.1%',
    icon: <Image src="/images/sidebar/sidebar-icon-5.svg" alt="subscribe icon" width={20} height={20} />,
    bgColor: 'bg-[#999894]',
    textColor: 'text-[#999894]',
    isUp: true
  }
]

const StatsCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8" dir="rtl">
      {stats.map((stat, i) => (
        <div key={i} className="bg-[#E8E7E3] rounded-[20px] p-4 shadow-sm">
          <div className="flex justify-between items-start mb-4">
             <div className={`w-10 h-10 ${stat.bgColor} rounded-[10px] flex items-center justify-center`}>
                {stat.icon}
             </div>
             <div className={`flex items-center gap-1 text-[16px] ${stat.textColor}  px-2 py-1 rounded-full`}>
                <span className='flex items-center'>
            <ArrowUpRight size={18} className=''/>
                  {stat.change}
                  </span>
             </div>
          </div>
          <p className={`text-[24px] font-medium ${stat.textColor} text-left`}>{stat.value}</p>
          <h3 className="text-[14px] text-[#30343F] mb-1 font-medium">{stat.label}</h3>
        </div>
      ))}
    </div>
  )
}

export default StatsCards
