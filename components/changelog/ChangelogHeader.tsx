import Link from 'next/link'
import { ArrowLeft, Calendar } from 'lucide-react'
import type { Changelog } from '@/lib/types'
import { Container } from '@/components/ui/Container'

interface ChangelogHeaderProps {
  entry: Changelog
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })
}

export function ChangelogHeader({ entry }: ChangelogHeaderProps) {
  return (
    <header className="pt-28 pb-8">
      <Container>
        {/* Back link */}
        <Link
          href="/changelog"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          All Releases
        </Link>

        {/* Title */}
        <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-gray-900 leading-tight mb-6">
          {entry.title}
        </h1>

        {/* Summary */}
        {entry.summary && (
          <p className="text-lg text-gray-500 leading-relaxed mb-6 max-w-3xl">
            {entry.summary}
          </p>
        )}

        {/* Meta bar */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 pb-8 border-b border-[#E4E7EC]">
          {/* Version */}
          <span className="font-mono text-sm font-semibold text-white bg-gray-900 px-3 py-1.5 rounded-md">
            v{entry.version}
          </span>

          {/* Date */}
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Calendar className="w-4 h-4" />
            {formatDate(entry.releaseDate)}
          </div>
        </div>
      </Container>
    </header>
  )
}
