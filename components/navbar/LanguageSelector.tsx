'use client';

import Image from 'next/image'
import React from 'react'
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';

const LanguageSelector = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = () => {
    const nextLocale = locale === 'ar' ? 'en' : 'ar';
    router.replace(pathname, { locale: nextLocale });
  };

  return (
      <div className='flex items-center gap-2 cursor-pointer' onClick={handleLanguageChange}>
            <Image src="/images/lang.svg" alt="Logo" width={16} height={16} />
         <span className='text-[14px] font-medium'>{locale === 'ar' ? 'EN' : 'عربي'}</span>
        </div> 
  )
}

export default LanguageSelector