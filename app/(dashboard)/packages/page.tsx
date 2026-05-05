import React from 'react'
import PackagesHeader from '@/components/packages/PackagesHeader'
import PackagesCards from '@/components/packages/PackagesCards'

const page = () => {
  return (
    <div className="px-4 lg:px-10 ">
      <PackagesHeader/>
      <PackagesCards/>
    </div>
  )
}

export default page