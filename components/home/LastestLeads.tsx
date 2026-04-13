import Image from 'next/image'
import React from 'react'
import { useTranslations } from 'next-intl'

const LastestLeads = () => {
  const t = useTranslations('Leads');
  
  const leadsData = [
    {
      id: 1,
      name: 'محمد العتيبي',
      initial: 'م',
      property: 'فيلا النرجس',
      action: 'تم الاتصال بالوسيط العقاري',
      time: 'منذ 5 دقائق',
      type: 'call',
      bgColor: '#3B82F626',
      borderColor: '#3B82F6',
      icon: '/images/blue-phone.svg',
      iconWidth: 13.3,
      iconHeight: 13.3,
      label: 'اتصال مباشر',
      labelColor: '#3B82F6'
    },
    {
      id: 2,
      name: 'محمد العتيبي',
      initial: 'م',
      property: 'فيلا النرجس',
      action: 'أرغب في الاستفسار عن إمكانية الزيارة...',
      time: 'منذ 5 دقائق',
      type: 'whatsapp',
      bgColor: '#22C55E1F',
      borderColor: '#22C55E',
      icon: '/images/green-whatsapp.svg',
      iconWidth: 18,
      iconHeight: 18,
      label: 'واتساب',
      labelColor: '#22C55E'
    },
    {
      id: 3,
      name: 'محمد العتيبي',
      initial: 'م',
      property: 'فيلا النرجس',
      action: 'أرغب في الاستفسار عن إمكانية الزيارة...',
      time: 'منذ 5 دقائق',
      type: 'whatsapp',
      bgColor: '#22C55E1F',
      borderColor: '#22C55E',
      icon: '/images/green-whatsapp.svg',
      iconWidth: 18,
      iconHeight: 18,
      label: 'واتساب',
      labelColor: '#22C55E'
    }
  ];

  return (
    <div className='bg-[#1a1a1a] mt-[32px] rounded-[16px] p-4 sm:p-5'>
      <h2 className='font-bold text-base sm:text-lg'>{t('latestLeads')}</h2>
      <div className='mt-4 sm:mt-5 flex flex-col gap-3'>
        {leadsData.map((lead) => (
          <div 
            key={lead.id}
            className='border border-[#3B3B3B] flex flex-col sm:flex-row sm:items-center justify-between w-full rounded-[10px] p-4 sm:p-5 sm:px-5 gap-3 sm:gap-0'
          >
            <div className='flex items-center gap-3'>
              <div className='w-10 h-10 rounded-full bg-[#FF5A5F] flex items-center justify-center text-base sm:text-[16px] flex-shrink-0'>
                {lead.initial}
              </div>
              <div className='flex flex-col gap-1'>
                <div className='flex flex-wrap items-center gap-1 sm:gap-2'>
                  <h3 className='text-xs sm:text-[13px] font-normal'>{lead.name}</h3>
                  <span className='text-[10px] sm:text-[12px] text-[#666666]'>•</span>
                  <h4 className='text-[#B3B3B3] text-[10px] sm:text-[11px]'>{lead.property}</h4>
                </div>
                <h5 className='text-[11px] sm:text-[12px] text-[#B3B3B3] line-clamp-1'>{lead.action}</h5>
                <h6 className='text-[10px] sm:text-[11px] text-[#666666]'>{lead.time}</h6>
              </div>
            </div>
            <div 
              className='w-full sm:w-[127px] h-[39px] rounded-[20px] px-4 flex items-center justify-center gap-2'
              style={{ 
                backgroundColor: lead.bgColor, 
                border: `1px solid ${lead.borderColor}` 
              }}
            >
              <Image 
                src={lead.icon} 
                alt={lead.label} 
                width={lead.iconWidth} 
                height={lead.iconHeight} 
              />
              <span 
                className='text-xs sm:text-[13px] font-bold'
                style={{ color: lead.labelColor }}
              >
                {lead.label}
              </span>
            </div>
          </div>
        ))}
      </div>
      <button className="mt-3 bg-[#D6533D14] cursor-pointer w-full h-[50px] flex items-center justify-center text-[#DC653D] text-sm sm:text-base">
        {t('viewAllLeads')} ←
      </button>
    </div>
  )
}

export default LastestLeads