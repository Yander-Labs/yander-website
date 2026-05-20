import type { ChangelogCard } from '@/lib/types'
import { ChangelogList } from '@/components/changelog/ChangelogList'
import { Pagination } from '@/components/blog/Pagination'

interface ChangelogContentProps {
  entries: ChangelogCard[]
  totalPages: number
  currentPage: number
}

export function ChangelogContent({
  entries,
  totalPages,
  currentPage
}: ChangelogContentProps) {
  return (
    <div>
      {/* Page Header */}
      <div className="mb-12 pb-8 border-b border-[var(--color-border-canon)]">
        <h1 className="font-medium text-4xl md:text-5xl text-[var(--color-ink-primary)] tracking-tight leading-[1.05] mb-3">
          Changelog
        </h1>
        <p className="text-lg text-[var(--color-ink-secondary)] max-w-2xl">
          New updates and improvements to Yander.
        </p>
      </div>

      {/* Release list */}
      <ChangelogList entries={entries} />

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-16 pt-8 border-t border-[var(--color-border-canon)]">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            basePath="/changelog"
          />
        </div>
      )}
    </div>
  )
}
