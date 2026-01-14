'use client'

import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'
import { CategoryBadge } from './CategoryBadge'
import type { PostCard } from '@/lib/types'
import { Calendar, Clock } from 'lucide-react'

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
  const imageUrl = post.mainImage
    ? urlFor(post.mainImage).width(600).height(400).url()
    : null

  return (
    <Link
      href={`/blog/${post.slug.current}`}
      className="group block bg-white rounded-2xl border border-[#E4E7EC] overflow-hidden shadow-card hover:shadow-elevated hover:-translate-y-1 transition-all duration-300"
    >
      {/* Image */}
      <div className="relative aspect-[16/10] bg-gray-100 overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={post.mainImage?.alt || post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
            <span className="text-gray-400 text-sm">No image</span>
          </div>
        )}
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Categories */}
        {post.categories && post.categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
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
        <h3 className="font-semibold text-gray-900 text-lg leading-snug mb-2 group-hover:text-gray-700 transition-colors line-clamp-2">
          {post.title}
        </h3>

        {/* Excerpt */}
        {post.excerpt && (
          <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-2">
            {post.excerpt}
          </p>
        )}

        {/* Meta */}
        <div className="flex items-center justify-between pt-4 border-t border-[#E4E7EC]">
          {/* Author */}
          <div className="flex items-center gap-2">
            {post.author?.image ? (
              <Image
                src={urlFor(post.author.image).width(32).height(32).url()}
                alt={post.author.name}
                width={32}
                height={32}
                className="rounded-full"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center text-white text-xs font-medium">
                {post.author?.name?.charAt(0) || 'A'}
              </div>
            )}
            <span className="text-sm text-gray-600">{post.author?.name || 'Anonymous'}</span>
          </div>

          {/* Date & Read Time */}
          <div className="flex items-center gap-3 text-xs text-gray-400">
            {post.publishedAt && (
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {formatDate(post.publishedAt)}
              </span>
            )}
            {post.readTime && (
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {post.readTime} min
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
