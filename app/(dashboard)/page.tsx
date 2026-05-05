import HomeCharts from "@/components/home/HomeCharts";
import HomeHeader from "@/components/home/HomeHeader";
import QuickProcedures from "@/components/home/QuickProcedures";
import RecentActivity from "@/components/home/RecentActivity";
import SystemAlerts from "@/components/home/SystemAlerts";

export default function Home() {
  return (
   <div className="px-4 lg:px-10 pb-10">
    <HomeHeader/>
    <QuickProcedures/>
    <HomeCharts/>
    
    <div className="flex flex-col lg:flex-row gap-3 mt-9">
      <div className="lg:w-[65%] w-full">
        <RecentActivity/>
      </div>
      <div className="lg:w-[35%] w-full">
        <SystemAlerts/>
      </div>
    </div>
   </div>
  );
}
