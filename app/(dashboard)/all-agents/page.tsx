import React from 'react'
import Image from 'next/image'
import { User, ChevronRight } from 'lucide-react'
import Link from 'next/link'

const AGENTS = [
  { id: 1, name: 'نورا عبدالعزيز', img: '/images/modals/agent-1.svg', email: 'noraabdelaziz@gmail.com', forSale: 28, forRent: 83 },
  { id: 2, name: 'محمد عبدالله', img: '/images/modals/agent-2.svg', email: 'mohamedabdallah@gmail.com', forSale: 14, forRent: 52 },
  { id: 3, name: 'نورا عبدالعزيز', img: '/images/modals/agent-1.svg', email: 'noraabdelaziz@gmail.com', forSale: 28, forRent: 83 },
  { id: 4, name: 'محمد عبدالله', img: '/images/modals/agent-2.svg', email: 'mohamedabdallah@gmail.com', forSale: 14, forRent: 52 },
  { id: 5, name: 'نورا عبدالعزيز', img: '/images/modals/agent-1.svg', email: 'noraabdelaziz@gmail.com', forSale: 28, forRent: 83 },
]

const AllAgentsPage = () => {
  return (
    <div className="px-4 lg:px-10 pb-10" dir="rtl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8 pt-6">
        <div className="flex items-center gap-3">
          <Link
            href="/real-estate-offices"
            className="w-8 h-8 bg-[#E8E7E3] rounded-full flex items-center justify-center hover:bg-gray-200 transition-all shrink-0"
          >
            <ChevronRight size={18} className="text-[#4E525D]" />
          </Link>
          <div>
            <h1 className="text-[20px] lg:text-[24px] font-bold text-[#00614E]">الوكلاء التابعين للمكتب</h1>
          </div>
        </div>
        <span className="bg-[#E8E7E3] text-[#00614E] px-3 py-2 rounded-[5px] text-sm font-medium">
          {AGENTS.length} وكلاء
        </span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1  lg:grid-cols-2 gap-4 sm:gap-6">
        {AGENTS.map((agent) => (
          <div key={agent.id} className="bg-[#E8E7E3] rounded-[20px] sm:rounded-[24px] p-4 sm:p-6 shadow-sm space-y-3 sm:space-y-4 relative overflow-hidden">
            <div className="flex justify-between items-start gap-3">
              <div className="flex gap-3">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gray-200 overflow-hidden shrink-0 border-2 border-[#F4F3EF]">
                  <Image src={agent.img} alt="agent" width={80} height={80} className="object-cover w-full h-full" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1 flex-wrap">
                    <h5 className="text-[14px] sm:text-[16px] font-bold text-[#01284F]">{agent.name}</h5>
                    <Image src="/images/home/table-2.svg" alt="verified" width={12} height={12} className="sm:w-[14px] sm:h-[14px]" />
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-[#999894]">{agent.email}</p>
                </div>
              </div>
              <span className="bg-[#00614E1A] text-[#00614E] px-2 sm:px-3 py-1 sm:py-2 rounded-[8px] text-[12px] sm:text-[14px] font-medium shrink-0">نشط</span>
            </div>
            <p className="text-[11px] sm:text-[12px] text-[#4E525D] leading-5">
              وكيلة عقارية متخصصة في تأجير وبيع الوحدات السكنية في شمال الرياض، تتمتع بخبرة عملية في فهم احتياجات العملاء وتقديم خيارات سكنية مناسبة بمواقع مميزة.
            </p>
            <div className="rounded-xl flex flex-wrap items-center gap-3 sm:gap-5 font-medium">
              <div className="text-[#00614E] text-xs sm:text-sm">عدد الوحدات المعروضة بواسطته:</div>
              <div className="flex gap-2">
                <span className="text-[#4E525D] bg-[#F4F3EF] p-2 sm:p-3 rounded-[8px] text-[10px] sm:text-[12px]">
                  للبيع: <span className="text-[#00614E]">{agent.forSale}</span>
                </span>
                <span className="text-[#4E525D] bg-[#F4F3EF] p-2 sm:p-3 rounded-[8px] text-[10px] sm:text-[12px]">
                  للإيجار: <span className="text-[#00614E]">{agent.forRent}</span>
                </span>
              </div>
            </div>
            <button className="w-full h-[38px] sm:h-[40px] bg-[#00614E] text-white rounded-[10px] text-[12px] sm:text-[13px] font-bold hover:bg-[#005240] transition-all cursor-pointer flex items-center justify-center gap-2">
              <User size={14} className="sm:w-[16px] sm:h-[16px]" />
              عرض الملف الشخصي
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllAgentsPage