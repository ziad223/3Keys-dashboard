'use client'
import Image from 'next/image'
import { useState } from 'react'
import AddBlogModal from '../blogs/AddBlogModal'
import AddUnitModal from '../real-estate/AddUnitModal'
import AddOfficeModal from '../real-estate-offices/AddOfficeModal'

type Activity = {
  icon: string
  iconBg: string
  name: string
  nameColor: string
  action: string
  target?: string
  targetColor?: string
  time: string
}

const activities: Activity[] = [
  {
    icon: '/images/home/activity-1.svg',
    iconBg: '#f2ecdc',
    name: 'مكتب النخبة',
    nameColor: '#E6B536',
    action: ' — أضاف مكتب عقاري جديد ',
    time: 'قبل 5 دقائق',
  },
  {
    icon: '/images/home/activity-2.svg',
    iconBg: '#00614E1A',
    name: 'خالد الحربي',
    nameColor: '#00614E',
    action: ' — أضاف وحدة جديدة ',
    target: '(U-10291)',
    targetColor: '#30343F',
    time: 'قبل 18 دقيقة',
  },
  {
    icon: '/images/home/activity-3.svg',
    iconBg: '#E03D401A',
    name: 'النظام',
    nameColor: '#E03D40',
    action: ' — بلاغ جديد بحاجة للمراجعة',
    time: 'قبل 44 دقيقة',
  },
  {
    icon: '/images/home/activity-4.svg',
    iconBg: '#3093821A',
    name: 'عقارات الشرق',
    nameColor: '#309382',
    action: ' — دفعة تجديد اشتراك تمت بنجاح',
    time: 'قبل 5 دقائق',
  },
  {
    icon: '/images/home/activity-5.svg',
    iconBg: '#30343F1A',
    name: 'قسم المحتوى',
    nameColor: '#30343F',
    action: ' — نشر مقالة جديدة في المدونة',
    time: 'قبل 6 ساعات',
  },
  {
    icon: '/images/home/activity-1.svg',
    iconBg: '#E6B5361A',
    name: 'مكتب النخبة',
    nameColor: '#E6B536',
    action: ' — ترقية الباقة إلى ',
    target: 'الذهبية',
    targetColor: '#E6B536',
    time: 'قبل 8 دقائق',
  },
]

const RecentActivity = () => {
  const [isAddBlogOpen, setIsAddBlogOpen] = useState(false)
  const [isAddUnitOpen, setIsAddUnitOpen] = useState(false)
  const [isAddOfficeOpen, setIsAddOfficeOpen] = useState(false)

  const handleActivityClick = (item: Activity) => {
    const actionText = item.action + item.name;
    if (actionText.includes('وحدة')) {
      setIsAddUnitOpen(true)
    } else if (actionText.includes('مقالة') || actionText.includes('مدونة')) {
      setIsAddBlogOpen(true)
    } else if (actionText.includes('مكتب')) {
      setIsAddOfficeOpen(true)
    }
  }

  return (
    <div className="bg-[#E8E7E3] rounded-[12px] p-6 shadow-sm border border-gray-100 h-full flex flex-col">
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-[18px] font-medium text-[#00614E]">النشاط الأخير على المنصة</h3>
      </div>

      <div className="flex flex-col gap-2 flex-grow overflow-y-auto mt-5">
        {activities.map((item, idx) => (
          <div 
            key={idx} 
            className="flex items-center px-3 gap-3 hover:bg-white h-[62px] rounded-[10px] cursor-pointer transition-all active:scale-[0.98]"
            onClick={() => handleActivityClick(item)}
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{ backgroundColor: item.iconBg }}
            >
              <Image src={item.icon} alt="activity icon" width={14} height={14} />
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <p className="text-[13px] leading-snug">
                <span className="text-[#E6B536]" style={{ color: item.nameColor }}>{item.name}</span>
                <span className="text-[#30343F] font-normal">{item.action}</span>
                {item.target && (
                  <span className="font-bold" style={{ color: item.targetColor }}>{item.target}</span>
                )}
              </p>
              <p className="text-[11px] text-[#9CA3AF] mt-0.5">{item.time}</p>
            </div>
          </div>
        ))}
      </div>

      <AddBlogModal 
        isOpen={isAddBlogOpen}
        onClose={() => setIsAddBlogOpen(false)}
      />

      <AddUnitModal 
        isOpen={isAddUnitOpen}
        onClose={() => setIsAddUnitOpen(false)}
      />

      <AddOfficeModal 
        isOpen={isAddOfficeOpen}
        onClose={() => setIsAddOfficeOpen(false)}
      />
    </div>
  )
}

export default RecentActivity
