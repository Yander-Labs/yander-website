'use client'

import { useState, useMemo } from 'react'
import { StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection'
import { BlogCard } from '@/components/blog/BlogCard'
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
    <div className="space-y-8">
      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 md:items-center">
        <div className="flex-1 max-w-md">
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
        <p className="text-sm text-gray-500">
          {filteredPosts.length} {filteredPosts.length === 1 ? 'result' : 'results'} for &quot;{searchQuery}&quot;
        </p>
      )}

      {/* Posts Grid */}
      {filteredPosts.length > 0 ? (
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <StaggerItem key={post._id}>
              <BlogCard post={post} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      ) : (
        <div className="py-16 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">No posts found</h3>
          <p className="text-sm text-gray-500">
            {searchQuery
              ? 'Try adjusting your search or filters'
              : 'Check back later for new content'}
          </p>
        </div>
      )}

      {/* Pagination - only show when not searching */}
      {!searchQuery && totalPages > 1 && (
        <div className="pt-8">
          <Pagination currentPage={currentPage} totalPages={totalPages} />
        </div>
      )}
    </div>
  )
}
