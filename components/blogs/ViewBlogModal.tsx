'use client'

import React from 'react'
import { X, Calendar, Clock, Eye, Send, FileText, ArrowLeft } from 'lucide-react'
import Image from 'next/image'

interface ViewBlogModalProps {
  isOpen: boolean
  onClose: () => void
  blog: {
    title: string
    image: string
    category: string
    views: number
    readTime: string
    createdAt: string
  } | null
}

const ViewBlogModal = ({ isOpen, onClose, blog }: ViewBlogModalProps) => {
  if (!isOpen || !blog) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/40 backdrop-blur-sm overflow-y-auto" dir="rtl">
      <div className="bg-[#E8E7E3] h-[95%] w-full max-w-[1027px] rounded-[20px] sm:rounded-[32px] shadow-2xl overflow-y-auto flex flex-col my-4 sm:my-0">
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4 sm:py-5 lg:py-6">
          <h2 className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold text-[#00614E]">عرض المقال</h2>
          <button 
            onClick={onClose}
            className="w-8 h-8 sm:w-10 sm:h-10 flex cursor-pointer items-center justify-center rounded-full bg-[#F4F3EF] text-[#999894] hover:bg-[#D9D8DA] transition-colors"
          >
            <X size={18} className="sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="px-4 sm:px-6 lg:px-8 pb-4 flex flex-col gap-4 sm:gap-6">

          <div className="bg-[#F4F3EF] rounded-[16px] sm:rounded-[20px] lg:rounded-[24px] p-4 sm:p-6 lg:p-8 flex flex-col gap-4 sm:gap-6">
            
            {/* Title & Category */}
            <div className="flex flex-col gap-3 sm:gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <h1 className="text-[20px] sm:text-[26px] lg:text-[32px] font-medium text-[#00614E] leading-tight">
                  {blog.title}
                </h1>
                <span className="bg-[#E6B536] text-white text-[11px] sm:text-[12px] font-bold px-3 sm:px-4 py-1.5 sm:py-2 rounded-[12px] w-fit">
                  {blog.category}
                </span>
              </div>
            </div>

            {/* Featured Image */}
            <div className="relative w-full h-[200px] sm:h-[300px] lg:h-[400px] rounded-[16px] sm:rounded-[20px] overflow-hidden">
              <Image 
                src={blog.image} 
                alt={blog.title} 
                fill 
                className="object-cover"
              />
            </div>

            {/* Content Text */}
            <div className="flex flex-col gap-6 sm:gap-8 text-[#4E525D] text-[13px] sm:text-[14px] lg:text-[15px] leading-[1.6] sm:leading-[1.8]">
              <p>
                يشهد السوق العقاري السعودي نمواً متسارعاً في السنوات الأخيرة، مدفوعاً برؤية المملكة 2030 والمشاريع التطويرية الضخمة التي تشهدها مختلف المدن السعودية. في هذا المقال، سنستعرض أهم العوامل التي تجعل الاستثمار العقاري في السعودية فرصة واعدة للمستثمرين المحليين والدوليين.
              </p>
              
              <div className="flex flex-col gap-2 sm:gap-3">
                <h3 className="text-[16px] sm:text-[17px] lg:text-[18px] font-bold text-[#30343F]">نمو السوق العقاري السعودي</h3>
                <p>
                  تعتبر المملكة العربية السعودية من أكبر أسواق العقارات في منطقة الشرق الأوسط، حيث تبلغ قيمة السوق أكثر من 800 مليار ريال سعودي. ويتوقع الخبراء استمرار هذا النمو بمعدلات تتراوح بين 5-7% سنوياً خلال السنوات القادمة.
                </p>
                <p>
                  تساهم عدة عوامل في هذا النمو، من أبرزها النمو السكاني المتزايد، وارتفاع معدلات التوظيف، والإصلاحات الاقتصادية التي تنفذها الحكومة السعودية ضمن رؤية 2030.
                </p>
              </div>

              <div className="bg-[#E8E7E3] p-4 sm:p-5 rounded-[16px] border-r-4 border-[#E6B536]">
                <p className="italic text-[#E6B536] font-medium text-[13px] sm:text-[14px]">
                  "الاستثمار العقاري في السعودية لم يعد مجرد شراء عقار، بل أصبح استثماراً في مستقبل واعد ورؤية طموحة للمملكة."
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:gap-4">
                <h3 className="text-[16px] sm:text-[17px] lg:text-[18px] font-bold text-[#30343F]">أفضل المدن للاستثمار العقاري</h3>
                <p>تتنوع الفرص الاستثمارية في المملكة، لكن بعض المدن تتميز بإمكانيات أكبر:</p>
                <ul className="list-disc pr-4 sm:pr-5 flex flex-col gap-1.5 sm:gap-2">
                  <li>الرياض: العاصمة التي تشهد تطوراً عمرانياً هائلاً مع مشاريع مثل مسار الرياض والقدية.</li>
                  <li>جدة: العروس الساحلية ومركز الأعمال والتجارة على البحر الأحمر.</li>
                  <li>الدمام: قلب المنطقة الشرقية والبوابة الاقتصادية للخليج.</li>
                  <li>نيوم: مدينة المستقبل التي ستغير مفهوم الحياة الحضرية.</li>
                </ul>
              </div>

              <div className="flex flex-col gap-3 sm:gap-4">
                <h3 className="text-[16px] sm:text-[17px] lg:text-[18px] font-bold text-[#30343F]">نصائح للمستثمرين الجدد</h3>
                <p>إذا كنت تفكر في دخول سوق العقارات السعودي، فإليك بعض النصائح الأساسية:</p>
                <ul className="list-disc pr-4 sm:pr-5 flex flex-col gap-1.5 sm:gap-2">
                  <li>ابدأ بدراسة السوق والموقع الجغرافي بعناية.</li>
                  <li>استشر خبراء عقاريين موثوقين قبل اتخاذ أي قرار.</li>
                  <li>تأكد من جميع الأوراق القانونية والتراخيص.</li>
                  <li>حدد ميزانيتك بوضوح والتزم بها.</li>
                  <li>فكر في العائد على المدى الطويل وليس السريع فقط.</li>
                </ul>
              </div>

              <div className="flex flex-col gap-3 sm:gap-4">
                <h3 className="text-[16px] sm:text-[17px] lg:text-[18px] font-bold text-[#30343F]">التحديات والفرص</h3>
                <p>
                  رغم الفرص الواعدة، يواجه سوق العقارات السعودي بعض التحديات مثل تقلبات أسعار النفط وتأثيرها على الاقتصاد الكلي، بالإضافة إلى المنافسة المتزايدة في بعض القطاعات.
                </p>
                <p>
                  لكن في المقابل، توفر المشاريع الضخمة مثل مشروع البحر الأحمر، والقدية، ونيوم فرصاً استثنائية لم تكن متاحة من قبل. هذه المشاريع لا تقتصر على الإسكان فقط، بل تشمل السياحة، والترفيه، والتجارة.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:gap-4">
                <h3 className="text-[16px] sm:text-[17px] lg:text-[18px] font-bold text-[#30343F]">الخلاصة</h3>
                <p>
                  يمثل السوق العقاري السعودي واحداً من أكثر الأسواق جاذبية للاستثمار في المنطقة. مع التخطيط السليم والدراسة الجيدة، يمكن للمستثمرين تحقيق عوائد ممتازة والمساهمة في نمو الاقتصاد الوطني.
                </p>
                <p>
                  تذكر دائماً أن النجاح في الاستثمار العقاري يتطلب الصبر والمعرفة والاستعانة بالخبراء. ابدأ صغيراً، وتعلم من التجربة، واستثمر بذكاء.
                </p>
              </div>
            </div>
          </div>
          
          {/* Return to Editor Button */}
          <button className="w-full sm:w-auto h-[44px] sm:h-[48px] bg-[#E6B536] text-white py-3 px-5 cursor-pointer rounded-[12px] font-bold text-[13px] sm:text-[14px] flex items-center justify-center gap-2 hover:bg-[#d4a631] transition-colors">
            <Image src="/images/blog-icon.svg" alt="blog" width={14} height={14} />
            <span>العودة إلى المحرر</span>
          </button>
        </div>

        {/* Footer Actions */}
        <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6  flex flex-col sm:flex-row items-center gap-3">
          <button 
            onClick={onClose}
            className="w-full sm:flex-1 h-[44px] sm:h-[48px] bg-[#00614E] text-white rounded-[12px] font-bold text-[13px] sm:text-[14px] flex items-center justify-center gap-2 hover:bg-[#005240] transition-colors"
          >
            <Send size={16} className="sm:w-[18px] sm:h-[18px]" />
            <span>نشر المقال</span>
          </button>
          <button 
            className="w-full sm:flex-1 h-[44px] sm:h-[48px] bg-[#999894] text-white rounded-[12px] font-bold text-[13px] sm:text-[14px] flex items-center justify-center gap-2 hover:bg-[#858481] transition-colors"
          >
            <FileText size={16} className="sm:w-[18px] sm:h-[18px]" />
            <span>حفظ كمسودة</span>
          </button>
          <button 
            onClick={onClose}
            className="w-full sm:w-[100px] h-[44px] sm:h-[48px] bg-white text-[#4E525D] border border-[#D9D8D4] rounded-[12px] font-bold text-[13px] sm:text-[14px] hover:bg-gray-50 transition-colors"
          >
            إلغاء
          </button>
        </div>
      </div>
    </div>
  )
}

export default ViewBlogModal