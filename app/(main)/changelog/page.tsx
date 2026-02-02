import { Suspense } from 'react'
import type { Metadata } from 'next'
import { sanityFetch } from '@/lib/sanity'
import { paginatedChangelogsQuery } from '@/lib/queries'
import type { PaginatedChangelogs } from '@/lib/types'
import { Container } from '@/components/ui/Container'
import { ChangelogContent } from './ChangelogContent'

export const metadata: Metadata = {
  title: 'Changelog | Yander',
  description:
    "See what's new in Yander. Track new features, improvements, and bug fixes.",
  alternates: {
    canonical: 'https://yander.io/changelog'
  },
  openGraph: {
    title: 'Changelog | Yander',
    description:
      "See what's new in Yander. Track new features, improvements, and bug fixes.",
    url: 'https://yander.io/changelog',
    siteName: 'Yander',
    type: 'website',
    images: [
      {
        url: 'https://yander.io/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Yander Changelog'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Changelog | Yander',
    description:
      "See what's new in Yander. Track new features, improvements, and bug fixes.",
    images: ['https://yander.io/og-image.png']
  }
}

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
      <div className="mb-12 pb-8 border-b border-[#E4E7EC]">
        <div className="h-12 w-48 bg-gray-100 rounded-lg animate-pulse mb-3" />
        <div className="h-6 w-72 max-w-full bg-gray-100 rounded animate-pulse" />
      </div>

      {/* Card skeletons */}
      <div className="space-y-2">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className={`rounded-2xl p-6 md:p-8 animate-pulse ${
              i === 0 ? 'bg-gray-50 border border-[#E4E7EC]' : ''
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
