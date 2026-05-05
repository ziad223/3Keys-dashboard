'use client'

import React, { useState } from 'react'
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { X } from 'lucide-react'

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  return (
    <div className="flex flex-1 overflow-hidden relative h-full">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block h-full shrink-0">
        <Sidebar isCollapsed={false} />
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-[60] lg:hidden transition-opacity duration-300"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar Drawer */}
      <div className={`
        fixed inset-y-0 right-0 z-[70] w-[280px] bg-[#00614E] shadow-2xl transform transition-transform duration-300 ease-in-out lg:hidden
        ${isMobileSidebarOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <div className="flex flex-col h-full relative">
          <button 
            onClick={() => setIsMobileSidebarOpen(false)}
            className="absolute top-4 left-4 p-2 text-white/80 hover:text-white z-[80] bg-white/10 rounded-full"
          >
            <X size={20} />
          </button>
          <div className="h-full pt-4">
            <Sidebar onMobile={true} />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative h-full">
        <Navbar onMenuClick={() => setIsMobileSidebarOpen(true)} />
        <div className="flex-1 overflow-y-auto px-0">
          <div className="pb-10">
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}
