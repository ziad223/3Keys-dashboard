'use client'

import React from 'react'
import Image from 'next/image'
import { User } from 'lucide-react'

interface AgentCardProps {
  agent: {
    name: string
    img: string
    email?: string
    bio?: string
    unitsForSale?: number
    unitsForRent?: number
    status?: string
  }
  index: number
}

const AgentCard: React.FC<AgentCardProps> = ({ agent, index }) => {
  return (
    <div className="bg-[#E8E7E3] rounded-[20px] sm:rounded-[24px] p-4 sm:p-6 shadow-sm space-y-3 sm:space-y-4 relative overflow-hidden">
      <div className="flex justify-between items-start gap-3">
        <div className="flex gap-3">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gray-200 overflow-hidden shrink-0 border-2 border-[#F4F3EF]">
            <Image src={agent.img} alt="agent" width={80} height={80} className="object-cover" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1 flex-wrap">
              <h5 className="text-[14px] sm:text-[16px] font-bold text-[#01284F]">{agent.name}</h5>
              <Image src="/images/home/table-2.svg" alt="v" width={12} height={12} className="sm:w-[14px] sm:h-[14px]" />
            </div>
            <p className="text-[10px] sm:text-[11px] text-[#999894]">{agent.email || 'noraabdelaziz@gmail.com'}</p>
          </div>
        </div>
        <span className="bg-[#00614E1A] text-[#00614E] px-2 sm:px-3 py-1 sm:py-2 rounded-[8px] text-[12px] sm:text-[14px] font-medium shrink-0">{agent.status || 'نشط'}</span>
      </div>
      <p className="text-[11px] sm:text-[12px] text-[#4E525D] leading-5">
        {agent.bio || 'وكيلة عقارية متخصصة في تأجير وبيع الوحدات السكنية في شمال الرياض، تتمتع بخبرة عملية في فهم احتياجات العملاء وتقديم خيارات سكنية مناسبة بمواقع مميزة.'}
      </p>
      <div className="rounded-xl flex flex-wrap items-center gap-3 sm:gap-5 font-medium">
        <div className="text-[#00614E] text-xs sm:text-sm">عدد الوحدات المعروضة بواسطته:</div>
        <div className="flex gap-2">
          <span className="text-[#4E525D] bg-[#F4F3EF] p-2 sm:p-3 rounded-[8px] text-[10px] sm:text-[12px]">للبيع: <span className='text-[#00614E]'>{agent.unitsForSale || 28}</span></span>
          <span className="text-[#4E525D] bg-[#F4F3EF] p-2 sm:p-3 rounded-[8px] text-[10px] sm:text-[12px]">للإيجار: <span className='text-[#00614E]'>{agent.unitsForRent || 83}</span></span>
        </div>
      </div>
      <button className="w-full h-[38px] sm:h-[40px] bg-[#00614E] text-white rounded-[10px] text-[12px] sm:text-[13px] font-bold hover:bg-[#005240] transition-all cursor-pointer flex items-center justify-center gap-2">
        <User size={14} className="sm:w-[16px] sm:h-[16px]" />
        عرض الملف الشخصي
      </button>
    </div>
  )
}

export default AgentCard
