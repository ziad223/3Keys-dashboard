import React from 'react'
import HomeRightCharts from './SubscribesRightCharts'
import HomeLeftCharts from './SubscribesLeftCharts'

const SubscriptionsCharts = () => {
  return (
   <div className='mt-8'>
    
      <div className='flex flex-col lg:flex-row gap-3 mt-5'>
        
        <div className="lg:w-[65%] w-full">
          <HomeRightCharts/>
        </div>

        <div className="lg:w-[35%] w-full">
          <HomeLeftCharts/>
        </div>

      </div>
   </div>
  )
}

export default SubscriptionsCharts