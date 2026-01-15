'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationProps {
  currentPage: number
  totalPages: number
}

export function Pagination({ currentPage, totalPages }: PaginationProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  if (totalPages <= 1) return null

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    if (page === 1) {
      params.delete('page')
    } else {
      params.set('page', page.toString())
    }
    router.push(`/blog?${params.toString()}`)
  }

  // Generate page numbers to show
  const getPageNumbers = () => {
    const pages: (number | 'ellipsis')[] = []
    const showPages = 5 // Number of page buttons to show

    if (totalPages <= showPages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i)
        pages.push('ellipsis')
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1)
        pages.push('ellipsis')
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i)
      } else {
        pages.push(1)
        pages.push('ellipsis')
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i)
        pages.push('ellipsis')
        pages.push(totalPages)
      }
    }

    return pages
  }

  return (
    <nav className="flex items-center justify-center gap-1">
      {/* Previous */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center gap-1 px-2 py-1.5 text-[13px] font-medium text-gray-600 bg-white border border-[#e5e5e5] rounded hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeft className="w-3.5 h-3.5" />
        Prev
      </button>

      {/* Page numbers */}
      <div className="flex items-center gap-0.5">
        {getPageNumbers().map((page, index) => (
          page === 'ellipsis' ? (
            <span key={`ellipsis-${index}`} className="px-1.5 text-gray-400 text-[13px]">
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`w-8 h-8 flex items-center justify-center text-[13px] font-medium rounded transition-colors ${
                currentPage === page
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {page}
            </button>
          )
        ))}
      </div>

      {/* Next */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center gap-1 px-2 py-1.5 text-[13px] font-medium text-gray-600 bg-white border border-[#e5e5e5] rounded hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        Next
        <ChevronRight className="w-3.5 h-3.5" />
      </button>
    </nav>
  )
}
