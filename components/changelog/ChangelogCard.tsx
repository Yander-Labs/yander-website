import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { ChangelogCard as ChangelogCardType } from '@/lib/types'

interface ChangelogCardProps {
  entry: ChangelogCardType
  isFirst?: boolean
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })
}

export function ChangelogCard({ entry, isFirst = false }: ChangelogCardProps) {
  const isHighlight = entry.isHighlight || isFirst

  return (
    <Link
      href={`/changelog/${entry.slug.current}`}
      className="group block"
    >
      <article
        className={`relative rounded-2xl border transition-all duration-200 ${
          isHighlight
            ? 'bg-gray-50/50 border-[#E4E7EC] p-6 md:p-8 hover:border-gray-300 hover:shadow-md'
            : 'bg-white border-transparent hover:bg-gray-50 p-6 md:p-8 -mx-6 md:-mx-8'
        }`}
      >
        {/* Top row: Version + Date */}
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-sm font-semibold text-white bg-gray-900 px-2.5 py-1 rounded-md">
            v{entry.version}
          </span>
          <span className="text-sm text-gray-500">
            {formatDate(entry.releaseDate)}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-serif text-2xl md:text-3xl text-gray-900 mb-3 group-hover:text-gray-700 transition-colors">
          {entry.title}
        </h3>

        {/* Summary */}
        {entry.summary && (
          <p className="text-base text-gray-600 leading-relaxed max-w-2xl">
            {entry.summary}
          </p>
        )}

        {/* Read more indicator */}
        <div className="mt-4">
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 group-hover:text-gray-900 transition-colors">
            Read more
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </article>
    </Link>
  )
}
