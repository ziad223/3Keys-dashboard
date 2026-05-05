import { Home } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const RealEstateDetails = () => {
  return (
    <div className='px-4 sm:px-6 md:px-8 py-4 sm:py-6'>
        <div className='flex flex-col lg:flex-row gap-6 lg:gap-10'>
              <div className='lg:w-[744px] w-full'>
                <div>
                    <h2 className='lg:text-xl text-lg font-medium text-[#1C202B]'>وصف العقار</h2>
                    <p className='text-[#4E525D] text-base leading-[150%] mt-3'>
                        شقة سكنية فاخرة للإيجار تقع في أحد أرقى أحياء شمال الرياض، مصممة بعناية لتوفير تجربة سكنية تجمع بين الراحة، الخصوصية، والطابع العصري. تتميز الشقة بتوزيع ذكي للمساحات يضمن سهولة الحركة داخل الوحدة، مع تشطيبات عالية الجودة تعكس مستوى راقٍ من الاهتمام بالتفاصيل.

توفر الشقة إضاءة طبيعية ممتازة بفضل النوافذ الواسعة، إلى جانب تهوية جيدة تخلق بيئة سكنية مريحة طوال اليوم. الموقع الاستراتيجي يضعك بالقرب من الطرق الرئيسية، المراكز التجارية، والمرافق الخدمية، مما يجعلها خيارًا مثاليًا للراغبين في السكن في منطقة حيوية مع الحفاظ على الهدوء والخصوصية.
                    </p>
                </div>
                <div className='mt-10 sm:mt-16 lg:mt-20'>
                    <h2 className='lg:text-xl text-lg font-medium text-[#1C202B]'>تفاصيل العقار</h2>
                     <div className="mt-6 sm:mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                         <div className='flex items-center gap-3 rounded-[12px]'>
                            <div className='w-10 h-10 sm:w-12 sm:h-12 bg-[#E8E7E3] rounded-[8px] text-[#999894] flex items-center justify-center'>
                                <Image src='/images/modals/details-1.svg' alt='نوع العقار' width={20} height={20} className='sm:w-6 sm:h-6'/>
                            </div>
                            <div>
                                <p className='text-[#4E525D] text-xs sm:text-sm'>نوع العقار</p>
                                <p className='text-[#999894] text-sm sm:text-[16px] font-medium'>شقة سكنية</p>
                            </div>
                         </div>
                          <div className='flex items-center gap-3 rounded-[12px]'>
                            <div className='w-10 h-10 sm:w-12 sm:h-12 bg-[#E8E7E3] rounded-[8px] text-[#999894] flex items-center justify-center'>
                                <Image src='/images/modals/details-2.svg' alt='المساحة' width={20} height={20} className='sm:w-6 sm:h-6'/>
                            </div>
                            <div>
                                <p className='text-[#4E525D] text-xs sm:text-sm'>المساحة</p>
                                <p className='text-[#999894] text-sm sm:text-[16px] font-medium'>350 متر²</p>
                            </div>
                         </div>
                         <div className='flex items-center gap-3 rounded-[12px]'>
                            <div className='w-10 h-10 sm:w-12 sm:h-12 bg-[#E8E7E3] rounded-[8px] text-[#999894] flex items-center justify-center'>
                                <Image src='/images/modals/details-3.svg' alt='دورات المياه' width={20} height={20} className='sm:w-6 sm:h-6'/>
                            </div>
                            <div>
                                <p className='text-[#4E525D] text-xs sm:text-sm'>دورات المياه</p>
                                <p className='text-[#999894] text-sm sm:text-[16px] font-medium'>2</p>
                            </div>
                         </div>
                          <div className='flex items-center gap-3 rounded-[12px]'>
                            <div className='w-10 h-10 sm:w-12 sm:h-12 bg-[#E8E7E3] rounded-[8px] text-[#999894] flex items-center justify-center'>
                                <Image src='/images/modals/details-4.svg' alt='عدد الغرف' width={20} height={20} className='sm:w-6 sm:h-6'/>
                            </div>
                            <div>
                                <p className='text-[#4E525D] text-xs sm:text-sm'>عدد الغرف </p>
                                <p className='text-[#999894] text-sm sm:text-[16px] font-medium'>4</p>
                            </div>
                         </div>
                     </div>
                </div>
                 <div className='mt-10 sm:mt-16 lg:mt-20'>
                    <h2 className='text-lg lg:text-xl font-medium text-[#1C202B]'>المميزات والخدمات</h2>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-6 sm:mt-8 lg:mt-10 gap-3 sm:gap-4'>
                        <div className='flex items-center gap-3 sm:gap-4'>
                             <div className='w-10 h-10 sm:w-12 sm:h-12 rounded-[8px] bg-[#E8E7E3] flex items-center justify-center'>
                                <Image src='/images/modals/servcie-1.svg' alt='مطبخ مفتوح' width={18} height={18} className='sm:w-5 sm:h-5'/>
                             </div>
                             <p className='text-[#4E525D] text-[12px] sm:text-[14px] font-medium'>مطبخ مفتوح (American)</p>
                        </div>
                        <div className='flex items-center gap-3 sm:gap-4'>
                             <div className='w-10 h-10 sm:w-12 sm:h-12 rounded-[8px] bg-[#E8E7E3] flex items-center justify-center'>
                                <Image src='/images/modals/servcie-2.svg' alt='كاميرات مراقبة' width={18} height={18} className='sm:w-5 sm:h-5'/>
                             </div>
                             <p className='text-[#4E525D] text-[12px] sm:text-[14px] font-medium'>نظام كاميرات مراقبة</p>
                        </div>
                         <div className='flex items-center gap-3 sm:gap-4'>
                             <div className='w-10 h-10 sm:w-12 sm:h-12 rounded-[8px] bg-[#E8E7E3] flex items-center justify-center'>
                                <Image src='/images/modals/servcie-3.svg' alt='واي فاي' width={18} height={18} className='sm:w-5 sm:h-5'/>
                             </div>
                             <p className='text-[#4E525D] text-[12px] sm:text-[14px] font-medium'>شبكة انترنت هوائية (Wifi)</p>
                        </div>
                         <div className='flex items-center gap-3 sm:gap-4'>
                             <div className='w-10 h-10 sm:w-12 sm:h-12 rounded-[8px] bg-[#E8E7E3] flex items-center justify-center'>
                                <Image src='/images/modals/servcie-4.svg' alt='مكيفات' width={18} height={18} className='sm:w-5 sm:h-5'/>
                             </div>
                             <p className='text-[#4E525D] text-[12px] sm:text-[14px] font-medium'>مبردات هواء (مكيفات)</p>
                        </div>
                         <div className='flex items-center gap-3 sm:gap-4'>
                             <div className='w-10 h-10 sm:w-12 sm:h-12 rounded-[8px] bg-[#E8E7E3] flex items-center justify-center'>
                                <Image src='/images/modals/servcie-5.svg' alt='مصعد' width={18} height={18} className='sm:w-5 sm:h-5'/>
                             </div>
                             <p className='text-[#4E525D] text-[12px] sm:text-[14px] font-medium'>مصعد كهربائي</p>
                        </div>
                          <div className='flex items-center gap-3 sm:gap-4'>
                             <div className='w-10 h-10 sm:w-12 sm:h-12 rounded-[8px] bg-[#E8E7E3] flex items-center justify-center'>
                                <Image src='/images/modals/servcie-6.svg' alt='إنذار حريق' width={18} height={18} className='sm:w-5 sm:h-5'/>
                             </div>
                             <p className='text-[#4E525D] text-[12px] sm:text-[14px] font-medium'>انذار حريق ودخان</p>
                        </div>
                        <div className='flex items-center gap-3 sm:gap-4'>
                             <div className='w-10 h-10 sm:w-12 sm:h-12 rounded-[8px] bg-[#E8E7E3] flex items-center justify-center'>
                                <Image src='/images/modals/servcie-7.svg' alt='موقف سيارات' width={18} height={18} className='sm:w-5 sm:h-5'/>
                             </div>
                             <p className='text-[#4E525D] text-[12px] sm:text-[14px] font-medium'>موقف سيارات (Parking)</p>
                        </div>
                    </div>
                </div>
               <div className="mt-10 sm:mt-16 lg:mt-20">
                    <h2 className='text-lg lg:text-xl font-medium text-[#1C202B]'>مزايا اخرى</h2>
                    <div className='mt-4 sm:mt-6 flex flex-col gap-2 list-disc'>
                         <div className='flex items-center gap-3'>
                            <div className='w-1.5 h-1.5 sm:w-2 sm:h-2 mt-1 rounded-full bg-[#4E525D]'></div>
                            <p className='text-sm sm:text-base text-[#4E525D]'>نوافذ واسعة بعزل حراري وصوتي</p>
                         </div>
                          <div className='flex items-center gap-3'>
                            <div className='w-1.5 h-1.5 sm:w-2 sm:h-2 mt-1 rounded-full bg-[#4E525D]'></div>
                            <p className='text-sm sm:text-base text-[#4E525D]'>أرضيات بورسلان فاخرة</p>
                         </div>
                         <div className='flex items-center gap-3'>
                            <div className='w-1.5 h-1.5 sm:w-2 sm:h-2 mt-1 rounded-full bg-[#4E525D]'></div>
                            <p className='text-sm sm:text-base text-[#4E525D]'>أسقف مرتفعة تمنح إحساسًا بالمساحة</p>
                         </div>
                        <div className='flex items-center gap-3'>
                            <div className='w-1.5 h-1.5 sm:w-2 sm:h-2 mt-1 rounded-full bg-[#4E525D]'></div>
                            <p className='text-sm sm:text-base text-[#4E525D]'>إنترنت وألياف بصرية جاهزة</p>
                         </div>
                      <div className='flex items-center gap-3'>
                            <div className='w-1.5 h-1.5 sm:w-2 sm:h-2 mt-1 rounded-full bg-[#4E525D]'></div>
                            <p className='text-sm sm:text-base text-[#4E525D]'>عدادات كهرباء ومياه مستقلة</p>
                         </div>
                     <div className='flex items-center gap-3'>
                            <div className='w-1.5 h-1.5 sm:w-2 sm:h-2 mt-1 rounded-full bg-[#4E525D]'></div>
                            <p className='text-sm sm:text-base text-[#4E525D]'>نظام تهوية متطور</p>
                         </div>
                    </div>
               </div>
               <div className="mt-10 sm:mt-16 lg:mt-20">
                    <h2 className='text-lg lg:text-xl font-medium text-[#1C202B]'>الموقع </h2>
                    <p className='mt-2 text-sm sm:text-base text-[#4E525D]'>شارع علي الظاهري - العارض - الرياض</p>
                    <iframe className='rounded-r-[32px] mt-4 sm:mt-6 w-full h-[250px] sm:h-[350px] lg:h-[450px]' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.1623618109575!2d31.354991084884627!3d30.060880181876374!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583fdb20898de3%3A0x914664f3522c8e7d!2z2LTYsdmD2Kkg2KfZhNmF2KfYs9iq2LEg2KrZg9mG2YjZhNmI2KzZig!5e0!3m2!1sar!2seg!4v1777364953096!5m2!1sar!2seg" loading="lazy" ></iframe>
               </div>
              </div>
              
              <div className='lg:w-[370px] w-full mt-6 lg:mt-0'>
                     <div className='w-full bg-[#E6B536] py-4 sm:py-5 px-4 sm:px-6 rounded-[16px] min-h-[75px] flex flex-wrap items-center justify-between gap-2'>
                         <p className='text-sm sm:text-base text-[#F4F3EF]'>سعر الوحدة:</p>
                       <div className='flex items-center gap-1 sm:gap-2 flex-wrap'>
                           <p className='text-2xl sm:text-[28px] text-[#F4F3EF] font-medium'>2,500</p>
                           <Image src='/images/modals/sar.svg' alt='currency' width={24} height={24} className='sm:w-7 sm:h-7'/>
                           <span className='text-xl sm:text-[24px] text-[#F4F3EF] font-medium'>/ اليوم</span>
                       </div>
                     </div>
                     <div className="mt-3 p-4 sm:p-6 rounded-[16px] bg-[#E8E7E3]">
                         <h2 className='text-sm sm:text-base font-semibold text-[#4E525D]'>تم النشر بواسطة الوكيل:</h2>
                         <div className='mt-4 sm:mt-5 flex items-center gap-3 sm:gap-4'>
                              <Image src='/images/navbar/person.svg' alt='person' width={40} height={40} className='sm:w-12 sm:h-12' />
                              <div className='space-y-1'>
                                <div className='flex items-center gap-1'> 
                                    <span className='text-sm sm:text-base text-[#00614E] font-medium'>محمد العتيبي</span>
                                    <Image src='/images/home/table-2.svg' alt='verified' width={10} height={10} className='sm:w-3 sm:h-3 mt-1' />
                                </div>
                                <p className='text-xs sm:text-sm text-[#999894]'>
                                    mohamedabdallah@gmail.com
                                </p>
                              </div>
                         </div>
                         <div className="mt-6 sm:mt-8">
                             <h2 className='text-sm sm:text-base font-semibold text-[#4E525D]'>طرق التواصل:</h2>
                             <div className='mt-4 sm:mt-5 flex items-center gap-2 flex-wrap'>
                                <button className='flex items-center gap-2 bg-[#00614E26] px-4 sm:px-5 py-1.5 rounded-[8px] h-9 sm:h-[40px] cursor-pointer'> 
                                    <Image src="/images/modals/whatsapp.svg" alt="whatsapp" width={14} height={14} className='sm:w-4 sm:h-4'/>
                                    <p className='text-xs sm:text-sm font-medium text-[#00614E]'>واتساب</p>
                                </button>
                                <button className='flex items-center gap-2 bg-[#E6B53626] px-4 sm:px-5 py-1.5 rounded-[8px] h-9 sm:h-[40px] cursor-pointer'> 
                                    <Image src="/images/modals/phone.svg" alt="phone" width={14} height={14} className='sm:w-4 sm:h-4'/>
                                    <p className='text-xs sm:text-sm font-medium text-[#E6B536]'>اتصال</p>
                                </button>
                             </div>
                         </div>
                         <div className="mt-6 sm:mt-8 mb-4 sm:mb-6 bg-[#F4F3EF] h-px w-full"></div>
                         <div className='flex items-center justify-between w-full'>
                           <div className='flex items-center gap-1.5'>
                             <Image src='/images/modals/calendar.svg' alt='calendar' width={10} height={10} className='sm:w-3 sm:h-3' />
                             <span className='text-xs sm:text-sm text-[#999894]'>تاريخ النشر:</span>
                           </div>
                           <h4 className='text-[#4E525D] text-xs sm:text-sm'>15 مارس 2026</h4>
                         </div>
                     </div> 
              </div>
        </div>
    </div>
  )
}

export default RealEstateDetails