import React from 'react'
import { useTranslations } from 'next-intl'

const TeamPerformance = () => {
  const t = useTranslations('Team');
  
  const teamData = [
    { id: 1, name: 'أحمد المالكي', properties: 34, leads: 890, views: 890, status: 'active' },
    { id: 2, name: 'أحمد المالكي', properties: 34, leads: 890, views: 890, status: 'active' },
    { id: 3, name: 'أحمد المالكي', properties: 34, leads: 890, views: 890, status: 'active' },
    { id: 4, name: 'أحمد المالكي', properties: 34, leads: 890, views: 890, status: 'active' },
    { id: 5, name: 'أحمد المالكي', properties: 34, leads: 890, views: 890, status: 'active' },
  ];

  return (
    <div className='mt-5 bg-[#1a1a1a] rounded-[16px] p-4 sm:p-5'>
      <h2 className='font-bold text-base sm:text-lg'>{t('teamPerformance')}</h2>
      <div className='mt-4 sm:mt-7'>
        <div className="relative overflow-x-auto shadow-xs rounded-base">
          <table className="w-full text-sm text-left rtl:text-right border-none min-w-[600px]">
            <thead className="text-sm bg-neutral-primary-soft border-b border-[#666666]">
              <tr>
                <th scope="col" className="px-3 sm:px-6 py-3 font-medium text-xs sm:text-sm text-[#B3B3B3] text-center">
                  {t('broker')}
                </th>
                <th scope="col" className="px-3 sm:px-6 py-3 font-medium text-xs sm:text-sm text-[#B3B3B3] text-center">
                  {t('properties')}
                </th>
                <th scope="col" className="px-3 sm:px-6 py-3 font-medium text-xs sm:text-sm text-[#B3B3B3] text-center">
                  {t('leads')}
                </th>
                <th scope="col" className="px-3 sm:px-6 py-3 font-medium text-xs sm:text-sm text-[#B3B3B3] text-center">
                  {t('views')}
                </th>
                <th scope="col" className="px-3 sm:px-6 py-3 font-medium text-xs sm:text-sm text-[#B3B3B3] text-center">
                  {t('status')}
                </th>
              </tr>
            </thead>
            <tbody>
              {teamData.map((member) => (
                <tr key={member.id} className="bg-neutral-primary-soft text-center border-b border-[#666666] hover:bg-neutral-secondary-medium">
                  <th scope="row" className="px-3 sm:px-6 py-3 sm:py-4 font-medium text-[#B3B3B3] text-xs sm:text-sm whitespace-nowrap">
                    {member.name}
                  </th>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 text-[#B3B3B3] text-xs sm:text-sm">
                    {member.properties}
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 text-[#B3B3B3] text-xs sm:text-sm">
                    {member.leads}
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 text-[#B3B3B3] text-xs sm:text-sm">
                    {member.views}
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4">
                    <div className='bg-[#22C55E1F] border-[#22C55E] flex items-center justify-center border h-[33px] rounded-[20px] text-[#22C55E] text-xs sm:text-sm px-2 sm:px-0'>
                      {t('active')}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="mt-3 bg-[#D6533D14] cursor-pointer w-full h-[50px] flex items-center justify-center text-[#DC653D] text-sm sm:text-base">
            {t('viewAllTeam')} ←
          </button>
        </div>
      </div>
    </div>
  )
}

export default TeamPerformance