'use client'

import React, { useState } from 'react'
import { Search, ChevronDown, Eye, Trash2, FileOutput, CheckCircle, Edit } from 'lucide-react'
import Image from 'next/image'
import CustomTable, { Column } from '@/components/common/CustomTable'
import ViewBlogModal from './ViewBlogModal'
import EditBlogModal from './EditBlogModal'
import DeleteBlogModal from './DeleteBlogModal'
import { Pencil } from 'lucide-react'

type ArticleStatus = 'منشور' | 'مسودة'
type ArticleCategory = 'إيجار' | 'بيع' | 'شراء' | 'إيجار يومي' | 'استثمار'

type BlogRecord = {
  id: string
  title: string
  image: string
  category: ArticleCategory
  views: number
  status: ArticleStatus
  readTime: string
  createdAt: string
}

const mockBlogs: BlogRecord[] = [
  {
    id: '1',
    title: 'أفضل مناطق الاستثمار العقاري في الرياض',
    image: '/images/modals/gellary-1.png',
    category: 'إيجار',
    views: 2249,
    status: 'منشور',
    readTime: '5 دقائق',
    createdAt: '15 مارس 2026',
  },
  {
    id: '2',
    title: 'كيف تحدد سعر الإيجار المناسب لعقارك',
         image: '/images/modals/gellary-1.png',
    category: 'بيع',
    views: 2249,
    status: 'منشور',
    readTime: '5 دقائق',
    createdAt: '15 مارس 2026',
  },
  {
    id: '3',
    title: 'التصميم الداخلي للعقارات الفاخرة',
        image: '/images/modals/gellary-1.png',
    category: 'شراء',
    views: 2249,
    status: 'مسودة',
    readTime: '5 دقائق',
    createdAt: '15 مارس 2026',
  },
  {
    id: '4',
    title: 'دليلك الشامل للاستثمار العقاري في السعودية',
         image: '/images/modals/gellary-1.png',
    category: 'إيجار يومي',
    views: 2249,
    status: 'منشور',
    readTime: '5 دقائق',
    createdAt: '15 مارس 2026',
  },
  {
    id: '5',
    title: 'دليل الإيجار اليومي: كيف تختار وحدة مثالية',
         image: '/images/modals/gellary-1.png',

    category: 'استثمار',
    views: 2249,
    status: 'منشور',
    readTime: '5 دقائق',
    createdAt: '15 مارس 2026',
  },
  {
    id: '6',
    title: 'التصميم الداخلي للعقارات الفاخرة',
        image: '/images/modals/gellary-1.png',
    category: 'إيجار',
    views: 2249,
    status: 'مسودة',
    readTime: '5 دقائق',
    createdAt: '15 مارس 2026',
  },
  {
    id: '7',
    title: '5 خطوات لشراء عقار في المملكة بسهولة',
         image: '/images/modals/gellary-1.png',
    category: 'إيجار',
    views: 2249,
    status: 'منشور',
    readTime: '5 دقائق',
    createdAt: '15 مارس 2026',
  },
]

const tabs = [
  { label: 'كل المقالات', value: 'all' },
  { label: 'منشور', value: 'منشور' },
  { label: 'مسودة', value: 'مسودة' },
]

const getStatusStyle = (status: ArticleStatus) => {
  switch (status) {
    case 'منشور':
      return 'bg-[#00614E1A] text-[#309382]'
    case 'مسودة':
      return 'bg-[#9998941A] text-[#4E525D]'
    default:
      return 'bg-gray-100 text-gray-500'
  }
}

const getCategoryColor = (category: ArticleCategory) => {
  switch (category) {
    case 'إيجار':
      return '#00614E'
    case 'بيع':
      return '#E6B536'
    case 'شراء':
      return '#E07E3D'
    case 'إيجار يومي':
      return '#309382'
    case 'استثمار':
      return '#E03D40'
    default:
      return '#4E525D'
  }
}

const BlogsTable = () => {
  const [activeTab, setActiveTab] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [isCategoryOpen, setIsCategoryOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedBlog, setSelectedBlog] = useState<BlogRecord | null>(null)

  const filteredBlogs = mockBlogs.filter((item) => {
    if (activeTab !== 'all' && item.status !== activeTab) return false
    if (categoryFilter !== 'all' && item.category !== categoryFilter) return false
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return item.title.toLowerCase().includes(query)
    }
    return true
  })

  const columns: Column<BlogRecord>[] = [
    {
      header: 'عنوان المقال',
      key: 'title',
      render: (item) => (
        <div className="flex items-center gap-2">
             <Image src={item.image} alt={item.title} width={28} height={24} className="" />
          <span className="text-[12px] text-[#30343F] font-medium whitespace-nowrap">
            {item.title}
          </span>
        </div>
      ),
    },
    {
      header: 'التصنيف',
      key: 'category',
      render: (item) => (
        <div className="flex items-center gap-1.5 whitespace-nowrap">
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: getCategoryColor(item.category) }}
          />
          <span
            className="text-[12px] font-medium"
            style={{ color: getCategoryColor(item.category) }}
          >
            {item.category}
          </span>
        </div>
      ),
    },
    {
      header: 'عدد المشاهدات',
      key: 'views',
      render: (item) => (
        <span className="text-[12px] text-[#30343F] font-bold whitespace-nowrap">
          {item.views}
        </span>
      ),
    },
    {
      header: 'حالة المقال',
      key: 'status',
      className: '!px-2',
      render: (item) => (
        <div
          className={`text-[12px] text-center font-medium py-1.5 px-3 rounded-full w-max mx-auto ${getStatusStyle(
            item.status
          )}`}
        >
          {item.status}
        </div>
      ),
    },
    {
      header: 'مدة القراءة',
      key: 'readTime',
      render: (item) => (
        <span className="text-[12px] text-[#4E525D] whitespace-nowrap">
          {item.readTime}
        </span>
      ),
    },
    {
      header: 'تاريخ الإنشاء',
      key: 'createdAt',
      render: (item) => (
        <span className="text-[12px] text-[#30343F] whitespace-nowrap">
          {item.createdAt}
        </span>
      ),
    },
    {
      header: 'الإجراءات',
      key: 'actions',
      align: 'center',
      render: (item) => (
        <div className="flex gap-2 items-center justify-center">
           {item.status === 'منشور' ? (
             <button 
               className="w-[115px] h-8 flex items-center  justify-center gap-1.5 rounded-[10px] text-[11px] font-medium bg-[#999894] text-white cursor-pointer transition-all hover:bg-[#858481] shrink-0"
             >
               <FileOutput size={12} strokeWidth={2} />
               <span>نقل إلى المسودة</span>
             </button>
          ) : (
             <button 
               className="w-[115px] h-8 flex items-center  justify-center gap-1.5 rounded-[10px] text-[11px] font-medium bg-white text-[#00614E] cursor-pointer transition-all hover:bg-gray-50 shrink-0"
             >
               <CheckCircle size={12} strokeWidth={2} />
               <span>نشر المقال</span>
             </button>
          )}
          
          <button 
            onClick={() => {
              setSelectedBlog(item)
              setIsViewModalOpen(true)
            }}
            className="w-[70px] h-8 flex items-center  justify-center gap-1.5 rounded-[10px] text-[11px] font-medium bg-[#00614E] text-white cursor-pointer transition-all hover:bg-[#004d3e] shrink-0"
          >
            <Eye size={12} strokeWidth={3} />
            <span>عرض</span>
          </button>

          <button 
            onClick={() => {
              setSelectedBlog(item)
              setIsEditModalOpen(true)
            }}
            className="w-8 h-8 cursor-pointer flex items-center justify-center rounded-[10px] bg-[#E8E7E3] text-[#4E525D] hover:bg-[#D9D8D4] transition-colors shrink-0"
          >
            <Edit size={14} />
          </button>

          <button 
            onClick={() => {
              setSelectedBlog(item)
              setIsDeleteModalOpen(true)
            }}
            className="w-8 h-8 cursor-pointer flex items-center justify-center rounded-[10px] bg-[#E03D401A] text-[#E03D40] hover:bg-[#E03D402A] transition-colors shrink-0"
          >
            <Trash2 size={14} />
          </button>
        </div>
      ),
    },
  ]

  return (
    <div className="mt-6">
      <div className="bg-[#E8E7E3] pb-5 rounded-t-[16px] border border-gray-100 border-b-0 px-6 pt-6 pb-0">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-5">
          <div className="flex items-center gap-2 shrink-0">
            <h2 className="text-[18px] lg:text-[20px] font-bold text-[#00614E]">
              كل المقالات
            </h2>
            <span className="text-[12px] text-[#4E525D] bg-[#F4F3EF] px-2.5 py-1 rounded-full font-medium">
              691 مقال
            </span>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto scrollbar-hide hide-scrollbar">
            <div className="flex items-center gap-2 min-w-max">
              {tabs.map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setActiveTab(tab.value)}
                  className={`px-4 py-1.5 cursor-pointer rounded-[8px] text-[12px] lg:text-[13px] font-medium transition-all ${
                    activeTab === tab.value
                      ? 'bg-[#00614E] text-white'
                      : 'bg-white text-[#4E525D]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center  gap-3 w-full">
             <div className="relative w-full lg:w-[200px]">
            <button
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              className="flex items-center justify-between gap-2 h-[48px] lg:h-[42px] w-full px-4 bg-[#F4F3EF] rounded-[10px] text-[14px] text-[#999894] font-medium transition-all cursor-pointer overflow-hidden whitespace-nowrap"
            >
              <span className="truncate">
                {categoryFilter === 'all' ? 'كل التصنيفات' : categoryFilter}
              </span>
              <ChevronDown size={14} className="shrink-0" />
            </button>
            {isCategoryOpen && (
              <div className="absolute top-[52px] lg:top-[48px] right-0 w-full bg-white rounded-[12px] shadow-xl border border-gray-100 py-2 z-50 overflow-hidden">
                <button
                  onClick={() => {
                    setCategoryFilter('all')
                    setIsCategoryOpen(false)
                  }}
                  className="w-full text-right px-4 py-2.5 text-[13px] font-bold bg-[#00614E] text-white"
                >
                  كل التصنيفات
                </button>
                {['إيجار', 'بيع', 'شراء', 'إيجار يومي', 'استثمار'].map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      setCategoryFilter(item as ArticleCategory)
                      setIsCategoryOpen(false)
                    }}
                    className="w-full text-right px-4 py-2.5 text-[13px] font-medium hover:bg-[#F4F3EF] transition-colors"
                  >
                    <div className="flex items-center justify-between">
                       <span style={{ color: getCategoryColor(item as ArticleCategory) }}>{item}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="relative w-full lg:w-[800px]">
            <input
              type="text"
              placeholder="بحث باسم المقال..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-[48px] lg:h-[42px] bg-[#F4F3EF] rounded-[10px] pr-10 pl-4 text-[14px] outline-none text-right"
              dir="rtl"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999894]" />
          </div>

       
        </div>
      </div>

      <CustomTable
        columns={columns}
        data={filteredBlogs}
        minWidth="1000px"
        containerClassName="bg-[#E8E7E3] rounded-b-[16px] border border-gray-100 border-t-0 overflow-hidden"
        pagination={{
          totalItems: 5202,
          itemsPerPage: 8,
          currentPage: 1,
          onPageChange: (page) => console.log('Page:', page),
          rangeText: `عرض 1-8 من 5,202`,
        }}
      />

      <ViewBlogModal 
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        blog={selectedBlog}
      />

      <EditBlogModal 
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        blog={selectedBlog}
      />

      <DeleteBlogModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => {
          console.log('Deleting:', selectedBlog?.id)
          setIsDeleteModalOpen(false)
        }}
        title={selectedBlog?.title}
      />
    </div>
  )
}

export default BlogsTable
