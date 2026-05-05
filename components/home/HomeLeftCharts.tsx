'use client'

import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'

const data = [
  { name: 'مجاني', value: 412, color: '#999894' },
  { name: 'الباقة الذهبية', value: 168, color: '#E6B536' },
  { name: 'الباقة الماسية', value: 62, color: '#309382' },
]

const HomeLeftCharts = () => {
  return (
    <div className="bg-[#E8E7E3] rounded-[12px] p-6 shadow-sm border border-gray-100 h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-[18px] font-medium text-[#00614E]">توزيع الاشتراكات</h3>
        <span className="text-[#00614E] bg-[#F4F3EF] px-2 h-8 rounded-full flex items-center justify-center text-[13px] font-medium">
          412 اشتراكات نشطة
        </span>
      </div>

      <div className="flex-grow flex items-center justify-center min-h-[220px]" dir="ltr">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={90}
              paddingAngle={2}
              dataKey="value"
              stroke="none"
              cornerRadius={4}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', textAlign: 'right', direction: 'rtl' }}
              itemStyle={{ color: '#4E525D' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 space-y-6">
        {/* Legend */}
        <div className="flex justify-center gap-6 text-sm">
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#999894]"></span>
            <span className="text-[#999894] text-[14px]">مجاني</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E6B536]"></span>
            <span className="text-[#E6B536] text-[12px]">الباقة الذهبية</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#309382]"></span>
            <span className="text-[#309382] text-[12px]">الباقة الماسية</span>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-3">
          <div className="flex flex-col items-center justify-center py-4 rounded-[12px] bg-[#F8FAFC]">
            <span className="text-base  text-[#999894]">412</span>
            <span className="text-[11px] text-[#999894] mt-1">مجاني</span>
          </div>
          <div className="flex flex-col items-center justify-center py-4 rounded-[12px] bg-[#FFFBEB]">
            <span className="text-base font-bold text-[#E6B536]">168</span>
            <span className="text-[11px] text-[#E6B536] mt-1">الباقة الذهبية</span>
          </div>
          <div className="flex flex-col items-center justify-center py-4 rounded-[12px] bg-[#ECFDF5]">
            <span className="text-base font-bold text-[#309382]">62</span>
            <span className="text-[11px] text-[#309382] mt-1">مجموع</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeLeftCharts