'use client'

import Link from 'next/link'

interface CategoryBadgeProps {
  title: string
  slug: string
  color?: string
  size?: 'sm' | 'md'
  clickable?: boolean
}

export function CategoryBadge({
  title,
  slug,
  size = 'sm',
  clickable = true
}: CategoryBadgeProps) {
  const sizeClasses = size === 'sm'
    ? 'px-1.5 py-0.5 text-[10px]'
    : 'px-2 py-0.5 text-[11px]'

  const className = `inline-flex items-center rounded border border-[#e5e5e5] bg-[#fafafa] text-gray-600 font-medium ${sizeClasses} ${clickable ? 'hover:bg-gray-100' : ''} transition-colors`

  if (clickable) {
    return (
      <Link href={`/blog?category=${slug}`} className={className}>
        {title}
      </Link>
    )
  }

  return <span className={className}>{title}</span>
}
