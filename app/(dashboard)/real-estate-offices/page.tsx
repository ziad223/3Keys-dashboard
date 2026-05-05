import React from 'react'
import OfficesHeader from '@/components/real-estate-offices/OfficesHeader'
import OfficesStats from '@/components/real-estate-offices/OfficesStats'
import OfficesTable from '@/components/real-estate-offices/OfficesTable'

const RealEstateOfficesPage = () => {
  return (
    <div className="px-4 lg:px-10 pb-10">
      <OfficesHeader />
      <OfficesStats />
      <OfficesTable />
    </div>
  )
}

export default RealEstateOfficesPage