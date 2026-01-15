'use client'

import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'
import { CategoryBadge } from './CategoryBadge'
import { BlogCard } from './BlogCard'
import type { PostCard } from '@/lib/types'

interface BlogTableProps {
  posts: PostCard[]
}

function formatDate(dateString?: string) {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

export function BlogTable({ posts }: BlogTableProps) {
  if (posts.length === 0) return null

  return (
    <>
      {/* Desktop: Table view */}
      <div className="hidden md:block overflow-hidden rounded border border-[#e5e5e5]">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#fafafa]">
              <th className="text-left text-[10px] font-medium text-gray-500 uppercase tracking-wide px-3 py-2 border-b border-[#f0f0f0] w-[40%]">
                Title
              </th>
              <th className="text-left text-[10px] font-medium text-gray-500 uppercase tracking-wide px-3 py-2 border-b border-[#f0f0f0] w-[35%]">
                Excerpt
              </th>
              <th className="text-left text-[10px] font-medium text-gray-500 uppercase tracking-wide px-3 py-2 border-b border-[#f0f0f0] w-[15%]">
                Author
              </th>
              <th className="text-left text-[10px] font-medium text-gray-500 uppercase tracking-wide px-3 py-2 border-b border-[#f0f0f0] w-[10%]">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post, index) => (
              <tr
                key={post._id}
                className={`hover:bg-gray-50/50 transition-colors ${
                  index !== posts.length - 1 ? 'border-b border-[#f5f5f5]' : ''
                }`}
              >
                {/* Title Column */}
                <td className="px-3 py-2.5 align-top">
                  <Link
                    href={`/blog/${post.slug.current}`}
                    className="block group"
                  >
                    <span className="text-[13px] font-medium text-gray-900 group-hover:text-gray-600 transition-colors">
                      {post.title}
                    </span>
                  </Link>
                  {post.categories && post.categories.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {post.categories.slice(0, 2).map((category) => (
                        <CategoryBadge
                          key={category.slug.current}
                          title={category.title}
                          slug={category.slug.current}
                          color={category.color}
                          size="sm"
                          clickable={false}
                        />
                      ))}
                    </div>
                  )}
                </td>

                {/* Excerpt Column */}
                <td className="px-3 py-2.5 align-top">
                  <p className="text-[13px] text-gray-500 line-clamp-2">
                    {post.excerpt || 'No excerpt available'}
                  </p>
                </td>

                {/* Author Column */}
                <td className="px-3 py-2.5 align-top">
                  <div className="flex items-center gap-2">
                    {post.author?.image ? (
                      <Image
                        src={urlFor(post.author.image).width(20).height(20).auto('format').url()}
                        alt={post.author.name}
                        width={20}
                        height={20}
                        className="rounded flex-shrink-0"
                      />
                    ) : (
                      <div className="w-5 h-5 rounded bg-gray-200 flex items-center justify-center text-gray-600 text-[10px] font-medium flex-shrink-0">
                        {post.author?.name?.charAt(0) || 'A'}
                      </div>
                    )}
                    <span className="text-[13px] text-gray-600 truncate">
                      {post.author?.name || 'Anonymous'}
                    </span>
                  </div>
                </td>

                {/* Date Column */}
                <td className="px-3 py-2.5 align-top">
                  <span className="text-[13px] text-gray-400 whitespace-nowrap">
                    {formatDate(post.publishedAt)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile: Card view */}
      <div className="md:hidden space-y-3">
        {posts.map((post) => (
          <BlogCard key={post._id} post={post} />
        ))}
      </div>
    </>
  )
}
