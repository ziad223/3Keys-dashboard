import CategoriesHeader from '@/components/categories/CategoriesHeader'
import CategoryCards from '@/components/categories/CategoryCards'
import React from 'react'

const page = () => {
  return (
        <div className="px-4 lg:px-10 pb-10">
            <CategoriesHeader/>
            <CategoryCards />
        </div>
  )
}

export default page