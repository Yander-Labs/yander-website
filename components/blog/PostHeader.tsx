'use client'

import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity'
import { CategoryBadge } from './CategoryBadge'
import { Container } from '../ui/Container'
import type { Post } from '@/lib/types'
import { Calendar, Clock, ArrowLeft } from 'lucide-react'

interface PostHeaderProps {
  post: Post
}

function formatDate(dateString?: string) {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })
}

export function PostHeader({ post }: PostHeaderProps) {
  return (
    <header className="pt-28 pb-8">
      <Container>
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        {/* Categories */}
        {post.categories && post.categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.categories.map((category) => (
              <CategoryBadge
                key={category.slug.current}
                title={category.title}
                slug={category.slug.current}
                color={category.color}
                size="md"
              />
            ))}
          </div>
        )}

        {/* Title */}
        <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-gray-900 leading-tight mb-6">
          {post.title}
        </h1>

        {/* Excerpt */}
        {post.excerpt && (
          <p className="text-lg text-gray-500 leading-relaxed mb-6 max-w-3xl">
            {post.excerpt}
          </p>
        )}

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-6 pb-8 border-b border-[#E4E7EC]">
          {/* Author */}
          <div className="flex items-center gap-3">
            {post.author?.image ? (
              <Image
                src={urlFor(post.author.image).width(40).height(40).auto('format').url()}
                alt={post.author.name}
                width={40}
                height={40}
                className="rounded-full"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center text-white text-sm font-medium">
                {post.author?.name?.charAt(0) || 'A'}
              </div>
            )}
            <div>
              <p className="font-medium text-gray-900 text-sm">
                {post.author?.name || 'Anonymous'}
              </p>
              {post.author?.role && (
                <p className="text-xs text-gray-500">{post.author.role}</p>
              )}
            </div>
          </div>

          {/* Date */}
          {post.publishedAt && (
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Calendar className="w-4 h-4" />
              {formatDate(post.publishedAt)}
            </div>
          )}

          {/* Read Time */}
          {post.readTime && (
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Clock className="w-4 h-4" />
              {post.readTime} min read
            </div>
          )}
        </div>
      </Container>
    </header>
  )
}
