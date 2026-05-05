'use client'

import React, { useState } from 'react'
import { EyeOff, Eye, Trash2 } from 'lucide-react'
import Image from 'next/image'
import EditCategoryModal from './modals/EditCategoryModal'
import DeleteCategoryModal from './modals/DeleteCategoryModal'

export type Category = {
  id: string
  name: string
  description: string
  articleCount: number
  status: 'active' | 'inactive'
  color: string
}

const categories: Category[] = [
  {
    id: '1',
    name: 'إيجار',
    description: 'مقالات حول الإيجار',
    articleCount: 8,
    status: 'active',
    color: '#00614E', // Dark Green
  },
  {
    id: '2',
    name: 'بيع',
    description: 'مقالات حول البيع',
    articleCount: 12,
    status: 'inactive',
    color: '#E6B536', // Yellow/Gold
  },
  {
    id: '3',
    name: 'إيجار يومي',
    description: 'مقالات حول الإيجار اليومي',
    articleCount: 15,
    status: 'active',
    color: '#309382', // Teal
  },
  {
    id: '4',
    name: 'شراء',
    description: 'مقالات حول الشراء',
    articleCount: 3,
    status: 'active',
    color: '#E07E3D', // Orange
  },
  {
    id: '5',
    name: 'استثمار',
    description: 'مقالات حول الاستثمار العقاري',
    articleCount: 3,
    status: 'active',
    color: '#CF3B3B', // Red
  },
]

const CategoryCards = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const handleEditClick = (category: Category) => {
    setSelectedCategory(category)
    setIsEditModalOpen(true)
  }

  const handleDeleteClick = (category: Category) => {
    setSelectedCategory(category)
    setIsDeleteModalOpen(true)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-6" dir="rtl">
      {categories.map((category) => (
        <div key={category.id} className="bg-[#E8E7E3] rounded-[16px] p-5  transition-shadow">
          
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span 
                  className="w-2 h-2 rounded-full" 
                  style={{ backgroundColor: category.color }}
                />
                <h3 className="text-lg font-medium" style={{ color: category.color }}>{category.name}</h3>
              </div>
              <p className="text-sm text-[#999894] mt-2 ">{category.description}</p>
            </div>
            
            {/* Status Badge */}
            <div className={`px-3 py-1 rounded-[8px] text-[12px] font-bold ${
              category.status === 'active' 
                ? 'bg-[#3093821A] text-[#00614E]' 
                : 'bg-[#9998941A] text-[#999894]'
            }`}>
              {category.status === 'active' ? 'نشط' : 'مخفي'}
            </div>
          </div>

          {/* Article Count */}
          <div className="bg-[#F4F3EF] rounded-[12px] h-[56px] px-4 flex items-center justify-between mt-5">
            <span className="text-[14px] font-bold text-[#4E525D]">عدد المقالات</span>
            <span className={`text-[16px] font-bold ${category.status === 'inactive' ? 'text-[#999894]' : 'text-[#00614E]'}`}>
              {category.articleCount}
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 mt-5">
            <button 
              onClick={() => handleEditClick(category)}
              className="flex-1 h-[40px] bg-[#00614E] cursor-pointer text-white rounded-[10px] flex items-center justify-center gap-2 text-[13px] font-bold hover:bg-[#005240] transition-colors"
            >
              <Image src="/images/category-edit.svg" alt="edit" width={14} height={14} />
              تعديل
            </button>
            
            {category.status === 'active' ? (
              <button className="flex-1 h-[40px] bg-[#999894] cursor-pointer text-white rounded-[10px] flex items-center justify-center gap-2 text-[13px] font-bold hover:bg-[#8A8985] transition-colors">
                <EyeOff size={16} />
                إخفاء
              </button>
            ) : (
              <button className="flex-1 h-[40px] bg-[#E8F3EE] cursor-pointer text-[#00614E] rounded-[10px] flex items-center justify-center gap-2 text-[13px] font-bold hover:bg-[#D1E8DF] transition-colors">
                <Eye size={16} />
                إظهار
              </button>
            )}

            <button 
              onClick={() => handleDeleteClick(category)}
              className="w-[40px] h-[40px] bg-[#E03D401A] cursor-pointer text-[#FF4D4F] rounded-[10px] flex items-center justify-center shrink-0 hover:bg-[#FFE5E5] transition-colors"
            >
              <Trash2 size={16} />
            </button>
          </div>
          
        </div>
      ))}
      
      {/* Edit Modal */}
      <EditCategoryModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
        category={selectedCategory} 
      />

      {/* Delete Modal */}
      <DeleteCategoryModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        category={selectedCategory}
      />
    </div>
  )
}

export default CategoryCards
