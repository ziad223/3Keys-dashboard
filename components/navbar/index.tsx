'use client'

import Image from 'next/image'
import React from 'react'
import { Menu, Search, Bell, LogOut } from 'lucide-react'

interface NavbarProps {
  onMenuClick?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  return (
    <div className='flex flex-col lg:flex-row mb-6 lg:mb-10 items-center justify-between w-full px-4 lg:px-10 py-4 lg:py-5 gap-4 lg:gap-0'>
       <div className='flex items-center justify- w-full gap-3'>
          <div className='flex items-center gap-3'>
            <button 
              onClick={onMenuClick}
              className='lg:hidden p-2 text-[#00614E] hover:bg-[#E8E7E3] rounded-lg'
            >
              <Menu size={24} />
            </button>
            <div className='relative w-10 h-10 lg:w-12 lg:h-12'>
              <Image src="/images/navbar/person.svg" alt="person icon" fill className="rounded-full" />
            </div>
            <div className='flex flex-col'>
              <p className='text-[#00614E] font-medium text-[13px] lg:text-lg whitespace-nowrap'>مرحبا،  زياد عبدالله</p>
              <p className='text-xs lg:text-sm text-[#4E525D]'>مسؤول ديار</p>
            </div>
          </div>
          
          {/* Mobile Actions (Visible only on mobile) */}
          <div className='flex lg:hidden items-center gap-2'>
            <div className='w-9 h-9 flex items-center bg-[#E8E7E3] justify-center rounded-[10px]'>
               <Image src="/images/navbar/notificaions.svg" alt="notification icon" width={14} height={14} />
            </div>
            <div className='w-9 h-9 flex items-center bg-[#E03D401A] justify-center rounded-[10px]'>
               <Image src="/images/navbar/logout.svg" alt="logout icon" width={14} height={14} />
            </div>
          </div>
       </div>

       <div className='flex items-center gap-2 w-full '>
         <div className='relative flex-1 lg:w-[600px]  h-[48px] lg:h-[56px]'>
           <input
             className='bg-[#E8E7E3] outline-none w-full h-full py-1 pr-10 pl-2.5 rounded-[16px] placeholder:text-[#999894] text-sm lg:text-base placeholder:text-xs lg:placeholder:text-sm'
             type="text"
             placeholder="ابحث عن وحدة، مكتب، وسيط..." 
           />
           <div className='absolute right-3 top-1/2 -translate-y-1/2'>
             <Image src="/images/navbar/search.svg" alt="search icon" width={16} height={16} />
           </div>
           <div className='hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2'>
             <div className='bg-[#F4F3EF] py-1 px-2 rounded-[6px] flex items-center justify-center border border-[#E8E7E3]'>
               <p className='text-[10px] text-[#4E525D]'>K⌘</p>
             </div>
           </div>
         </div>

         {/* Desktop Actions */}
         <div className='hidden lg:flex items-center gap-2'>
            <div className='w-[56px] h-[56px] flex items-center bg-[#E8E7E3] justify-center rounded-[12px] hover:bg-[#dfdeda] cursor-pointer transition-colors'>
               <Image src="/images/navbar/notificaions.svg" alt="notification icon" width={16} height={16} />
            </div>
            <div className='w-[56px] h-[56px] flex items-center bg-[#E03D401A] justify-center rounded-[12px] hover:bg-[#E03D402A] cursor-pointer transition-colors'>
               <Image src="/images/navbar/logout.svg" alt="logout icon" width={16} height={16} />
            </div>
         </div>
       </div>
    </div>
  )
}

export default Navbar