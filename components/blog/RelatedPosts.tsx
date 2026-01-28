'use client'

import { BlogCard } from './BlogCard'
import type { PostCard } from '@/lib/types'

interface RelatedPostsProps {
  posts: PostCard[]
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null

  return (
    <section className="py-16 border-t border-[#E4E7EC]">
      <div className="mb-8">
        <h2 className="font-serif text-2xl text-gray-900 mb-2">
          Related Articles
        </h2>
        <p className="text-sm text-gray-500">
          Continue reading with these related posts
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <BlogCard key={post._id} post={post} />
        ))}
      </div>
    </section>
  )
}
