import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { ChangelogCard } from '@/lib/types'

interface RecentChangelogsProps {
  entries: ChangelogCard[]
  title?: string
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

export function RecentChangelogs({
  entries,
  title = 'Other Releases'
}: RecentChangelogsProps) {
  if (entries.length === 0) return null

  return (
    <section className="border-t border-[#E4E7EC] pt-12 pb-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-serif text-2xl text-gray-900">{title}</h2>
        <Link
          href="/changelog"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
        >
          View all
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {entries.slice(0, 3).map((entry) => (
          <Link
            key={entry._id}
            href={`/changelog/${entry.slug.current}`}
            className="group block p-5 rounded-xl border border-[#E4E7EC] bg-white hover:border-gray-300 hover:shadow-md transition-all duration-200"
          >
            {/* Version + Date */}
            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono text-xs font-semibold text-white bg-gray-900 px-2 py-0.5 rounded">
                v{entry.version}
              </span>
              <span className="text-xs text-gray-500">
                {formatDate(entry.releaseDate)}
              </span>
            </div>

            {/* Title */}
            <h3 className="font-medium text-gray-900 group-hover:text-gray-700 transition-colors line-clamp-2">
              {entry.title}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  )
}
