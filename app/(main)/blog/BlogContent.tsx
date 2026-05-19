'use client'

import { useState, useMemo } from 'react'
import { BlogTable } from '@/components/blog/BlogTable'
import { BlogSearch } from '@/components/blog/BlogSearch'
import { CategoryFilter } from '@/components/blog/CategoryFilter'
import { Pagination } from '@/components/blog/Pagination'
import type { PostCard, Category } from '@/lib/types'
import { FileText } from 'lucide-react'

interface BlogContentProps {
  initialPosts: PostCard[]
  categories: Category[]
  totalPages: number
  currentPage: number
  activeCategory?: string
}

export function BlogContent({
  initialPosts,
  categories,
  totalPages,
  currentPage,
  activeCategory
}: BlogContentProps) {
  const [searchQuery, setSearchQuery] = useState('')

  // Filter posts by search query (client-side)
  const filteredPosts = useMemo(() => {
    if (!searchQuery.trim()) return initialPosts

    const query = searchQuery.toLowerCase()
    return initialPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(query) ||
        post.excerpt?.toLowerCase().includes(query) ||
        post.author?.name?.toLowerCase().includes(query) ||
        post.categories?.some((cat) => cat.title.toLowerCase().includes(query))
    )
  }, [initialPosts, searchQuery])

  return (
    <div className="space-y-6">
      {/* Header row: Title + Search + Filters */}
      <div className="flex flex-col md:flex-row gap-4 md:items-end">
        <h1 className="font-geist font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[var(--color-ink-primary)] tracking-tight leading-[1.05] flex-shrink-0">
          Yander Blog
          <span className="sr-only"> — AI recruiting, global hiring, and remote team insights</span>
        </h1>
        <div className="flex-1 max-w-sm">
          <BlogSearch
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search articles..."
          />
        </div>
        <CategoryFilter categories={categories} activeCategory={activeCategory} />
      </div>

      {/* Results count */}
      {searchQuery && (
        <p className="text-[13px] text-[var(--color-ink-muted)]">
          {filteredPosts.length} {filteredPosts.length === 1 ? 'result' : 'results'} for &quot;{searchQuery}&quot;
        </p>
      )}

      {/* Posts Table */}
      {filteredPosts.length > 0 ? (
        <BlogTable posts={filteredPosts} />
      ) : (
        <div className="py-12 text-center">
          <div className="w-10 h-10 rounded-none bg-[var(--color-surface-muted)] flex items-center justify-center mx-auto mb-3">
            <FileText className="w-5 h-5 text-[var(--color-ink-faded)]" />
          </div>
          <h3 className="font-medium text-[var(--color-ink-primary)] text-sm mb-1">No posts found</h3>
          <p className="text-[13px] text-[var(--color-ink-muted)]">
            {searchQuery
              ? 'Try adjusting your search or filters'
              : 'Check back later for new content'}
          </p>
        </div>
      )}

      {/* Pagination - only show when not searching */}
      {!searchQuery && totalPages > 1 && (
        <div className="pt-4">
          <Pagination currentPage={currentPage} totalPages={totalPages} />
        </div>
      )}
    </div>
  )
}
