'use client'

import React from 'react'

const PageLoader = () => {
  return (
    <div className="w-full min-h-[calc(100vh-100px)] flex flex-col items-center justify-center transition-all duration-300" dir="rtl">
      <div className="relative flex items-center justify-center">
        {/* Outer rotating ring */}
        <div className="absolute inset-0 -m-6 rounded-full border-[2px] border-transparent border-t-[#00614E] border-r-[#00614E] animate-[spin_2s_linear_infinite] opacity-80" />
        
        {/* Inner reverse rotating ring */}
        <div className="absolute inset-0 -m-3 rounded-full border-[2px] border-transparent border-b-[#E6B536] border-l-[#E6B536] animate-[spin_1.5s_linear_infinite_reverse] opacity-80" />
        
        {/* Core pulsing logo container */}
        {/* <div className="w-14 h-14 bg-white rounded-full shadow-[0_0_30px_rgba(0,97,78,0.15)] flex items-center justify-center relative z-10 animate-pulse border border-[#00614E]/5">
          <span className="text-[20px] font-bold text-[#00614E] tracking-tight">ديار</span>
        </div> */}
      </div>
      
      {/* Loading Text & Dots */}
      <div className="mt-10 flex flex-col items-center gap-3">
        <div className="flex items-center gap-2 bg-white/60 px-4 py-2 rounded-full shadow-sm border border-[#00614E]/10">
          <span className="text-[13px] font-medium text-[#00614E]">جاري التحميل...</span>
          <div className="flex gap-1.5 mr-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00614E] animate-[pulse_1s_ease-in-out_infinite]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#E6B536] animate-[pulse_1s_ease-in-out_infinite_200ms]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#00614E] animate-[pulse_1s_ease-in-out_infinite_400ms]" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PageLoader
