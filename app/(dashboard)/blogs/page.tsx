import BlogsCards from '@/components/blogs/BlogsCards'
import BlogsHeader from '@/components/blogs/BlogsHeader'
import BlogsTable from '@/components/blogs/BlogsTable'
import React from 'react'

const page = () => {
  return (
     <div className="px-4 lg:px-10 pb-10">
       <BlogsHeader/>
       <BlogsCards/>
       <BlogsTable/>
    </div>
  )
}

export default page