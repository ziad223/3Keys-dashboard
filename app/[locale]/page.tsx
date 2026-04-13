import LastestLeads from "@/components/home/LastestLeads";
import TeamPerformance from "@/components/home/TeamPerformance";
import Image from "next/image";

export default function Home() {
  return (
   <div className="p-4 lg:p-8">
      <div className="">
         <h2 className="text-[22px] font-bold mb-4">مرحباً، شركة الخليج العقارية 🏢</h2>
         <span className="text-[14px]  text-[#A0A0A0]">الأربعاء، ١١ مارس ٢٠٢٦</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 mt-8">
         <div className="bg-[#1a1a1a]  p-5 rounded-[10px]">
          <div className="flex flex-col gap-2 items-start">
  <div className="w-[48px] h-[48px] rounded-full bg-[#22C55E1F] flex items-center justify-center">
        <Image src = '/images/home-icon-1.svg' alt="home" width={24} height={24}/>
          </div>
          <h2 className="text-[36px]">12</h2>
          <h4 className="text-sm text-[#B3B3B3]">صفقة مكتملة</h4>
          </div>
          <span className="flex items-center justify-end mt-7 text-[#22C55E] text-[11px]">+2 هذا الشهر</span>
         </div>
         <div className="bg-[#1a1a1a]  p-5 rounded-[10px]">
          <div className="flex flex-col gap-2 items-start">
  <div className="w-[48px] h-[48px] rounded-full bg-[#D6533D14] flex items-center justify-center">
        <Image src = '/images/home-icon-2.svg' alt="home" width={24} height={24}/>
          </div>
          <h2 className="text-[36px]">48</h2>
          <h4 className="text-sm text-[#B3B3B3]">عقار نشط</h4>
          </div>
          <span className="flex items-center justify-end mt-7 text-[#22C55E] text-[11px]">+2 هذا الشهر</span>
         </div>
          <div className="bg-[#1a1a1a]  p-5 rounded-[10px]">
          <div className="flex flex-col gap-2 items-start">
  <div className="w-[48px] h-[48px] rounded-full bg-[#3B82F626] flex items-center justify-center">
        <Image src = '/images/home-icon-3.svg' alt="home" width={24} height={24}/>
          </div>
          <h2 className="text-[36px]">120</h2>
          <h4 className="text-sm text-[#B3B3B3]">lead جديد</h4>
          </div>
          <span className="flex items-center justify-end mt-7 text-[#22C55E] text-[11px]">+2 هذا الشهر</span>
         </div>
          <div className="bg-[#1a1a1a]  p-5 rounded-[10px]">
          <div className="flex flex-col gap-2 items-start">
  <div className="w-[48px] h-[48px] rounded-full bg-[#F59E0B1A] flex items-center justify-center">
        <Image src = '/images/home-icon-4.svg' alt="home" width={24} height={24}/>
          </div>
          <h2 className="text-[36px]">5860</h2>
          <h4 className="text-sm text-[#B3B3B3]">مشاهدة </h4>
          </div>
          <span className="flex items-center justify-end mt-7 text-[#22C55E] text-[11px]">+2 هذا الشهر</span>
         </div>
         <div className="bg-[#1a1a1a]  p-5 rounded-[10px]">
          <div className="flex flex-col gap-2 items-start">
  <div className="w-[48px] h-[48px] rounded-full bg-[#A855F71A] flex items-center justify-center">
        <Image src = '/images/home-icon-5.svg' alt="home" width={24} height={24}/>
          </div>
          <h2 className="text-[36px]">8</h2>
          <h4 className="text-sm text-[#B3B3B3]">وكيل في الفريق </h4>
          </div>
          <span className="flex items-center justify-end mt-7 text-[#22C55E] text-[11px]">+2 هذا الشهر</span>
         </div>
      </div>
      <LastestLeads/>
      <TeamPerformance/>
   </div>
  );
}
