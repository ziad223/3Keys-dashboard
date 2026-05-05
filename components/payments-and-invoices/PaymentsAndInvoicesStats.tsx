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
}

const stats: StatCard[] = [
  {
    label: 'إجمالي الإيرادات (شهر)',
    value: '847,200 ر.س',
    change: '+8.2%',
    iconBg: '#00614E',
    icon: '/images/payments-icon.svg',
    valueColor: '#00614E',
  },
  {
    label: 'قيد التحصيل',
    value: '5,980 ر.س',
    change: '+3.4%',
    iconBg: '#E07E3D',
    icon: '/images/payments-icon.svg',
    valueColor: '#E07E3D',
  },
  {
    label: 'مكاتب مرفوضة',
    value: '553',
    change: '+6.7%',
    iconBg: '#E03D40',
    icon: '/images/payments-icon.svg',
    valueColor: '#E03D40',
  },
  {
    label: 'استردادات',
    value: '1,200 ر.س',
    change: '+12.1%',
    iconBg: '#999894',
    icon: '/images/payments-icon.svg',
    valueColor: '#999894',
  },
  
]

const PaymentsAndInvoicesStats = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className="bg-[#E8E7E3] rounded-[12px] p-2 lg:p-5 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between w-full">
            <div
              className="w-9 h-9 rounded-[10px] flex items-center justify-center"
              style={{ backgroundColor: stat.iconBg }}
            >
              
              <Image src={stat.icon} alt={stat.label} width={18} height={18} />
            </div>
         
          </div>
          <h2
            className="text-[20px] mb-5 lg:text-[24px] font-medium text-left mt-3"
            style={{ color: stat.valueColor }}
          >
            {stat.value}
          </h2>
          <span className="text-[14px]  font-medium text-[#30343F]">
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  )
}

export default PaymentsAndInvoicesStats