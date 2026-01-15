'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import type { Category } from '@/lib/types'

interface CategoryFilterProps {
  categories: Category[]
  activeCategory?: string
}

export function CategoryFilter({ categories, activeCategory }: CategoryFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleCategoryClick = (slug: string | null) => {
    const params = new URLSearchParams(searchParams.toString())
    if (slug) {
      params.set('category', slug)
    } else {
      params.delete('category')
    }
    params.delete('page') // Reset to first page when changing category
    router.push(`/blog?${params.toString()}`)
  }

  return (
    <div className="flex flex-wrap gap-1.5">
      {/* All button */}
      <button
        onClick={() => handleCategoryClick(null)}
        className={`px-3 py-1.5 rounded text-[13px] font-medium border transition-colors ${
          !activeCategory
            ? 'bg-gray-900 text-white border-gray-900'
            : 'bg-white text-gray-600 border-[#e5e5e5] hover:bg-gray-50'
        }`}
      >
        All
      </button>

      {/* Category buttons - all monochrome */}
      {categories.map((category) => {
        const isActive = activeCategory === category.slug.current

        return (
          <button
            key={category._id}
            onClick={() => handleCategoryClick(category.slug.current)}
            className={`px-3 py-1.5 rounded text-[13px] font-medium border transition-colors ${
              isActive
                ? 'bg-gray-900 text-white border-gray-900'
                : 'bg-white text-gray-600 border-[#e5e5e5] hover:bg-gray-50'
            }`}
          >
            {category.title}
          </button>
        )
      })}
    </div>
  )
}
