import React from 'react'
import SubscriptionsHeader from '@/components/subscribes/SubscriptionsHeader'
import StatsCards from '@/components/subscribes/StatsCards'
import SubscriptionsCharts from '@/components/subscribes/SubscriptionsCharts'
import SubscriptionsTable from '@/components/subscribes/SubscriptionsTable'

const SubscriptionsPage = () => {
  return (
    <div className="p-4 lg:p-8 bg-[#F4F3EF] min-h-screen">
      <SubscriptionsHeader />
      <StatsCards />
      <SubscriptionsCharts />
      <SubscriptionsTable />
    </div>
  )
}

export default SubscriptionsPage