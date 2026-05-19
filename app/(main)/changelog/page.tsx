import { Suspense } from 'react'
import { sanityFetch } from '@/lib/sanity'
import { paginatedChangelogsQuery } from '@/lib/queries'
import type { PaginatedChangelogs } from '@/lib/types'
import { Container } from '@/components/ui/Container'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import { ChangelogContent } from './ChangelogContent'
import { pageMetadata } from '@/lib/page-metadata'

export const metadata = pageMetadata({
  title: 'Yander Changelog — Product Updates, Features & Improvements',
  description:
    "Every Yander product release — new AI sourcing capabilities, integrations, performance improvements, and bug fixes. Follow @yanderlabs for updates.",
  path: '/changelog',
  ogImageAlt: 'Yander Changelog',
})

export const revalidate = 60

const ENTRIES_PER_PAGE = 20

interface ChangelogPageProps {
  searchParams: Promise<{ page?: string }>
}

async function getEntries(
  page: number = 1
): Promise<{ entries: PaginatedChangelogs['entries']; total: number }> {
  const start = (page - 1) * ENTRIES_PER_PAGE
  const end = start + ENTRIES_PER_PAGE

  const result = await sanityFetch<PaginatedChangelogs>(
    paginatedChangelogsQuery,
    { start, end }
  )
  return result
}

export default async function ChangelogPage({
  searchParams
}: ChangelogPageProps) {
  const params = await searchParams
  const page = parseInt(params.page || '1', 10)

  const { entries, total } = await getEntries(page)
  const totalPages = Math.ceil(total / ENTRIES_PER_PAGE)

  return (
    <main className="min-h-screen bg-white pt-28 pb-16">
      <Container>
        <Breadcrumbs
          className="mb-6"
          items={[{ name: 'Home', href: '/' }, { name: 'Changelog' }]}
        />
        <Suspense fallback={<ChangelogSkeleton />}>
          <ChangelogContent
            entries={entries}
            totalPages={totalPages}
            currentPage={page}
          />
        </Suspense>
      </Container>
    </main>
  )
}

function ChangelogSkeleton() {
  return (
    <div>
      {/* Header skeleton */}
      <div className="mb-12 pb-8 border-b border-[var(--color-border-canon)]">
        <div className="h-12 w-48 bg-gray-100 rounded-none animate-pulse mb-3" />
        <div className="h-6 w-72 max-w-full bg-gray-100 rounded animate-pulse" />
      </div>

      {/* Card skeletons */}
      <div className="space-y-2">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className={`rounded-none p-6 md:p-8 animate-pulse ${
              i === 0 ? 'bg-[var(--color-surface-subtle)] border border-[var(--color-border-canon)]' : ''
            }`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-8 w-16 bg-gray-200 rounded-md" />
              <div className="h-5 w-32 bg-gray-100 rounded" />
            </div>
            <div className="h-8 w-80 max-w-full bg-gray-100 rounded mb-3" />
            <div className="h-5 w-full max-w-lg bg-gray-100 rounded mb-4" />
            <div className="h-5 w-24 bg-gray-100 rounded" />
          </div>
        ))}
      </div>
    </div>
  )
}
