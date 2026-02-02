import type { ChangelogCard as ChangelogCardType } from '@/lib/types'
import { ChangelogCard } from './ChangelogCard'

interface ChangelogListProps {
  entries: ChangelogCardType[]
}

export function ChangelogList({ entries }: ChangelogListProps) {
  if (entries.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-lg text-gray-500">No changelog entries found.</p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {entries.map((entry, index) => (
        <ChangelogCard key={entry._id} entry={entry} isFirst={index === 0} />
      ))}
    </div>
  )
}
