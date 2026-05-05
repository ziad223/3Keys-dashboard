'use client'

import React from 'react'

export interface Column<T> {
  header: string
  key: string
  render?: (item: T) => React.ReactNode
  align?: 'right' | 'left' | 'center'
  className?: string
  headerClassName?: string
}

interface PaginationProps {
  totalItems: number
  itemsPerPage: number
  currentPage: number
  onPageChange: (page: number) => void
  rangeText?: string
}

interface CustomTableProps<T> {
  columns: Column<T>[]
  data: T[]
  loading?: boolean
  minWidth?: string
  pagination?: PaginationProps
  onRowClick?: (item: T) => void
  containerClassName?: string
}

const CustomTable = <T extends { id: string | number }>({
  columns,
  data,
  loading,
  minWidth = '960px',
  pagination,
  onRowClick,
  containerClassName = "bg-[#E8E7E3] rounded-[16px] shadow-sm border border-gray-100 overflow-hidden mt-6"
}: CustomTableProps<T>) => {
  return (
    <div className={containerClassName}>
      <div className="overflow-x-auto">
        <table className="w-full border-separate border-spacing-0" style={{ minWidth }}>
          <thead>
            <tr className="text-[#4E525D] text-center">
              {columns.map((column, idx) => (
                <th
                  key={idx}
                  className={`text-[12px] font-medium py-3 px-5 border-b border-[#D9D8D4] whitespace-nowrap ${
                    column.align === 'center' ? 'text-center' : column.align === 'left' ? 'text-left' : 'text-right'
                  } ${column.headerClassName || ''}`}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className='text-center'>
            {loading ? (
              <tr className='text-center'>
                <td colSpan={columns.length} className="py-10 text-center text-[#4E525D]">
                  جاري التحميل...
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr className='text-center' >
                <td colSpan={columns.length} className="py-10 text-center text-[#4E525D]">
                  لا توجد بيانات
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr
                  key={item.id}
                  onClick={() => onRowClick?.(item)}
                  className={`border-b border-[#D9D8D4] hover:bg-[#EEEDEA] transition-colors bg-[#E8E7E3] ${
                    onRowClick ? 'cursor-pointer' : ''
                  }`}
                >
                  {columns.map((column, colIdx) => (
                    <td
                      key={colIdx}
                      className={`py-4 px-5 ${
                        column.align === 'center' ? 'text-center' : column.align === 'left' ? 'text-left' : 'text-right'
                      } ${column.className || ''}`}
                    >
                      {column.render ? column.render(item) : (item as any)[column.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && (
        <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 border-t border-[#D9D8D4]">
          <span className="text-[12px] text-[#4E525D] mb-2 sm:mb-0 font-medium">
            {pagination.rangeText || `عرض 1-${data.length} من ${pagination.totalItems}`}
          </span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => pagination.onPageChange(pagination.currentPage - 1)}
              disabled={pagination.currentPage === 1}
              className="px-3 py-1.5 rounded-[8px] text-[12px] font-medium text-[#4E525D] hover:bg-[#F4F3EF] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              السابق
            </button>
            {[1, 2, 3].map((page) => (
              <button
                key={page}
                onClick={() => pagination.onPageChange(page)}
                className={`w-8 h-8 rounded-[8px] text-[12px] font-medium flex items-center justify-center transition-all cursor-pointer ${
                  pagination.currentPage === page ? 'bg-[#00614E] text-white' : 'text-[#4E525D] bg-[#F4F3EF]'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => pagination.onPageChange(pagination.currentPage + 1)}
              className="px-3 py-1.5 rounded-[8px] text-[12px] font-medium text-[#00614E] hover:bg-[#F4F3EF] transition-all cursor-pointer"
            >
              التالي
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default CustomTable
