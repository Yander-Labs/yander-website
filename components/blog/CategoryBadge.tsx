'use client'

import Link from 'next/link'

interface CategoryBadgeProps {
  title: string
  slug: string
  color?: string
  size?: 'sm' | 'md'
  clickable?: boolean
}

const colorClasses: Record<string, { bg: string; text: string; border: string }> = {
  emerald: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-100' },
  blue: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-100' },
  purple: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-100' },
  amber: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-100' },
  rose: { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-100' },
  cyan: { bg: 'bg-cyan-50', text: 'text-cyan-700', border: 'border-cyan-100' },
  indigo: { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-100' },
  default: { bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-200' }
}

export function CategoryBadge({
  title,
  slug,
  color = 'default',
  size = 'sm',
  clickable = true
}: CategoryBadgeProps) {
  const colors = colorClasses[color] || colorClasses.default

  const sizeClasses = size === 'sm'
    ? 'px-2 py-0.5 text-[10px]'
    : 'px-3 py-1 text-xs'

  const className = `inline-flex items-center rounded-full border font-medium transition-colors ${colors.bg} ${colors.text} ${colors.border} ${sizeClasses} ${clickable ? 'hover:opacity-80' : ''}`

  if (clickable) {
    return (
      <Link href={`/blog?category=${slug}`} className={className}>
        {title}
      </Link>
    )
  }

  return <span className={className}>{title}</span>
}
