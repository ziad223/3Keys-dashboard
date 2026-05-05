import React from 'react'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'

type StatCard = {
  label: string
  value: string
  change: string
  iconBg: string
  icon: string
  valueColor: string
  changeBg: string
  changeColor: string
  changeIcon: string
  changeIconRotate?: boolean
}

const stats: StatCard[] = [
  {
    label: 'إجمالي المكاتب العقارية',
    value: '2393',
    change: '+8.2%',
    iconBg: '#00614E',
    icon: '/images/home/card-2.svg',
    valueColor: '#00614E',
    changeBg: '#00614E1A',
    changeColor: '#00614E',
    changeIcon: '/images/home/arrow-up.svg',
  },
  {
    label: 'مكاتب موثقة',
    value: '1203',
    change: '+3.4%',
    iconBg: '#E6B536',
    icon: '/images/home/card-2.svg',
    valueColor: '#E6B536',
    changeBg: '#00614E1A',
    changeColor: '#00614E',
    changeIcon: '/images/home/arrow-up.svg',
  },
  {
    label: 'قيد المراجعة',
    value: '892',
    change: '+12.1%',
    iconBg: '#E07E3D',
    icon: '/images/home/card-2.svg',
    valueColor: '#E07E3D',
    changeBg: '#E07E3D1A',
    changeColor: '#E07E3D',
    changeIcon: '/images/home/arrow-up.svg',
  },
  {
    label: 'مكاتب مرفوضة',
    value: '553',
    change: '+6.7%',
    iconBg: '#E03D40',
    icon: '/images/home/card-2.svg',
    valueColor: '#E03D40',
    changeBg: '#E03D401A',
    changeColor: '#E03D40',
    changeIcon: '/images/home/arrow-up.svg',
  },
]

const OfficesStats = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className="bg-[#E8E7E3] rounded-[12px] p-4 lg:p-5 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between w-full">
            <div
              className="w-9 h-9 rounded-[10px] flex items-center justify-center"
              style={{ backgroundColor: stat.iconBg }}
            >
              
              <Image src={stat.icon} alt={stat.label} width={18} height={18} />
            </div>
            <div
              className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[16px] font-medium"
              style={{ color: stat.changeColor }}
            >
              <ArrowUpRight className='w-4 h-4'/>
              <span>{stat.change}</span>
            </div>
          </div>
          <h2
            className="text-[20px] lg:text-[24px] font-medium text-left mt-3"
            style={{ color: stat.valueColor }}
          >
            {stat.value}
          </h2>
          <span className="text-[14px] font-medium text-[#30343F]">
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  )
}

export default OfficesStats