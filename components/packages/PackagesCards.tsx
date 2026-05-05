'use client'
import { Check } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'
import EditPackage, { Package } from './modals/EditPackage'

const packages = [
  {
    title: 'الباقة الأساسية',
    subtitle: 'مناسبة للوكلاء المستقلين',
    price: '800',
    features: [
      'حتى 10 عقارات',
      'استقبال طلبات العملاء',
      'لوحة تحكم أساسية',
      'دعم عبر البريد الإلكتروني',
      'شارة وكيل',
    ],
    isHighlighted: false,
  },
  {
    title: 'الباقة الاحترافية',
    subtitle: 'الخيار الأفضل للنمو السريع',
    price: '2.500',
    features: [
      'عدد غير محدود من العقارات',
      'أولوية الظهور في النتائج',
      'لوحة تحكم متقدمة',
      'دعم فني مميز (24/7)',
      'شارات تميز للعقارات',
    ],
    isHighlighted: true,
    image: '/images/packages/professional_bg.png'
  },
  {
    title: 'باقة الشركات',
    subtitle: 'للشركات والمكاتب الكبيرة',
    price: '4.500',
    features: [
      'كل مميزات الباقة الاحترافية',
      'أولوية الظهور في النتائج',
      'لوحة تحكم متكاملة',
      'دعم فني على مدار الساعة',
      'شارات تميز للعقارات',
    ],
    isHighlighted: false,
  },
]

const PackagesCards = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null)

  const handleEditClick = (pkg: any) => {
    setSelectedPackage({
      id: pkg.title,
      name: pkg.title,
      distinctionLevel: pkg.isHighlighted ? 2 : 3,
      color: pkg.isHighlighted ? '#E6B536' : '#00614E',
      monthlyPrice: parseInt(pkg.price.replace('.', '')),
      annualPrice: parseInt(pkg.price.replace('.', '')) * 12,
      allowedUnits: 50,
      allowedAgents: 10,
      features: pkg.features
    })
    setIsEditModalOpen(true)
  }
  return (
    <div className='grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-5 mt-8'>
      {packages.map((pkg, index) => (
        <div
          key={index}
          className={`relative rounded-[24px] p-3  transition-all duration-300 flex flex-col ${pkg.isHighlighted ? ' z-10 bg-[#00614E]' : 'bg-[#E8E7E3]'
            }`}
          style={pkg.image ? {
            backgroundImage: `url(${pkg.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '24px',
          } : {}}
        >
          {/* Overlay للباقة الاحترافية */}
          {pkg.image && (
            <div className='absolute inset-0 bg-black/40 rounded-[24px]'></div>
          )}

          {pkg.image ? (
            <div className='relative w-full py-3 z-10'>
              <h2 className='text-lg font-medium text-white'>{pkg.title}</h2>
            </div>
          ) : (
            <h2 className='text-xl font-medium text-[#00614E] p-3 z-10'>{pkg.title}</h2>
          )}

          <div className='bg-[#F4F3EF] p-4 rounded-[32px] mt-2 z-10 flex flex-col'>
            <h3 className='text-base font-normal py-3 px-1 text-[#4E525D]'>{pkg.subtitle}</h3>

            <div className='bg-[#E8E7E3] rounded-[20px] p-4 mt-3'>
              <div className="flex items-center gap-1">
                <span className="text-[22px] font-semibold text-[#00614E] flex items-center gap-1">
                  {pkg.price}
                  <Image src="/images/modals/green-sar.svg" alt="sar" width={24} height={24} />
                </span>
                <span className="text-[20px] font-medium text-[#00614E]">/ شهرياً</span>
              </div>
              <button 
                onClick={() => handleEditClick(pkg)}
                className='mt-4 bg-[#00614E] py-1.5 px-5 rounded-[12px] h-12 text-white cursor-pointer w-full flex items-center justify-center gap-2 hover:bg-[#005240] transition-all shadow-sm'
              >
                <Image src="/images/packages-edit.svg" alt="edit" width={14} height={14} />
                <span className='font-medium'>تعديل</span>
              </button>
            </div>

            <div className="flex gap-4 mt-6 flex-col pb-4">
              {pkg.features.map((feature, fIndex) => (
                <div key={fIndex} className='flex items-center gap-2'>
                    <Check size={16} className='text-[#4E525D]' />
                  <span className='text-sm text-[#4E525D] font-medium'>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}

      {/* Edit Package Modal */}
      <EditPackage
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        pkg={selectedPackage}
      />
    </div>
  )
}

export default PackagesCards