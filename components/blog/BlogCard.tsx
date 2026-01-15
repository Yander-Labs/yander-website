'use client'

import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'
import { CategoryBadge } from './CategoryBadge'
import type { PostCard } from '@/lib/types'

interface BlogCardProps {
  post: PostCard
}

function formatDate(dateString?: string) {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${post.slug.current}`}
      className="group block bg-white rounded border border-[#e5e5e5] p-4 hover:bg-gray-50/50 transition-colors"
    >
      {/* Categories */}
      {post.categories && post.categories.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-2">
          {post.categories.slice(0, 2).map((category) => (
            <CategoryBadge
              key={category.slug.current}
              title={category.title}
              slug={category.slug.current}
              color={category.color}
              clickable={false}
            />
          ))}
        </div>
      )}

      {/* Title */}
      <h3 className="font-medium text-gray-900 text-[15px] leading-snug mb-1.5 group-hover:text-gray-600 transition-colors line-clamp-2">
        {post.title}
      </h3>

      {/* Excerpt */}
      {post.excerpt && (
        <p className="text-[13px] text-gray-500 leading-relaxed mb-3 line-clamp-2">
          {post.excerpt}
        </p>
      )}

      {/* Meta */}
      <div className="flex items-center justify-between pt-3 border-t border-[#f0f0f0]">
        {/* Author */}
        <div className="flex items-center gap-2">
          {post.author?.image ? (
            <Image
              src={urlFor(post.author.image).width(20).height(20).auto('format').url()}
              alt={post.author.name}
              width={20}
              height={20}
              className="rounded"
            />
          ) : (
            <div className="w-5 h-5 rounded bg-gray-200 flex items-center justify-center text-gray-600 text-[10px] font-medium">
              {post.author?.name?.charAt(0) || 'A'}
            </div>
          )}
          <span className="text-[12px] text-gray-500">{post.author?.name || 'Anonymous'}</span>
        </div>

        {/* Date & Read Time */}
        <div className="flex items-center gap-2 text-[11px] text-gray-400">
          {post.publishedAt && (
            <span>{formatDate(post.publishedAt)}</span>
          )}
          {post.readTime && (
            <>
              <span className="text-gray-300">·</span>
              <span>{post.readTime} min</span>
            </>
          )}
        </div>
      </div>
    </Link>
  )
}
