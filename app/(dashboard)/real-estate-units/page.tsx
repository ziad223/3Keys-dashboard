import React from 'react'
import RealEstateHeader from '@/components/real-estate/RealEstateHeader'
import RealEstateStats from '@/components/real-estate/RealEstateStats'
import RealEstateTable from '@/components/real-estate/RealEstateTable'

const RealEstateUnitsPage = () => {
  return (
    <div className="px-4 lg:px-10 pb-10">
      <RealEstateHeader />
      <RealEstateStats />
      <RealEstateTable />
    </div>
  )
}

export default RealEstateUnitsPage