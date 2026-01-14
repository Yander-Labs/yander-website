'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import type { Category } from '@/lib/types'

interface CategoryFilterProps {
  categories: Category[]
  activeCategory?: string
}

const colorClasses: Record<string, { active: string; inactive: string }> = {
  emerald: {
    active: 'bg-emerald-500 text-white border-emerald-500',
    inactive: 'bg-white text-emerald-700 border-emerald-200 hover:bg-emerald-50'
  },
  blue: {
    active: 'bg-blue-500 text-white border-blue-500',
    inactive: 'bg-white text-blue-700 border-blue-200 hover:bg-blue-50'
  },
  purple: {
    active: 'bg-purple-500 text-white border-purple-500',
    inactive: 'bg-white text-purple-700 border-purple-200 hover:bg-purple-50'
  },
  amber: {
    active: 'bg-amber-500 text-white border-amber-500',
    inactive: 'bg-white text-amber-700 border-amber-200 hover:bg-amber-50'
  },
  rose: {
    active: 'bg-rose-500 text-white border-rose-500',
    inactive: 'bg-white text-rose-700 border-rose-200 hover:bg-rose-50'
  },
  default: {
    active: 'bg-gray-900 text-white border-gray-900',
    inactive: 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
  }
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
    <div className="flex flex-wrap gap-2">
      {/* All button */}
      <button
        onClick={() => handleCategoryClick(null)}
        className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
          !activeCategory
            ? 'bg-gray-900 text-white border-gray-900'
            : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
        }`}
      >
        All
      </button>

      {/* Category buttons */}
      {categories.map((category) => {
        const isActive = activeCategory === category.slug.current
        const colors = colorClasses[category.color || 'default'] || colorClasses.default

        return (
          <button
            key={category._id}
            onClick={() => handleCategoryClick(category.slug.current)}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
              isActive ? colors.active : colors.inactive
            }`}
          >
            {category.title}
          </button>
        )
      })}
    </div>
  )
}
