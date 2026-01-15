'use client'

import Image from 'next/image'
import { urlFor } from '@/lib/sanity'
import type { Author } from '@/lib/types'

interface AuthorCardProps {
  author: Author
}

export function AuthorCard({ author }: AuthorCardProps) {
  return (
    <div className="bg-gray-50/70 rounded-lg p-6 border border-[#e5e5e5]">
      <div className="flex items-start gap-4">
        {/* Avatar */}
        {author.image ? (
          <Image
            src={urlFor(author.image).width(80).height(80).auto('format').url()}
            alt={author.name}
            width={80}
            height={80}
            className="rounded-lg flex-shrink-0"
          />
        ) : (
          <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
            {author.name?.charAt(0) || 'A'}
          </div>
        )}

        {/* Info */}
        <div className="flex-1">
          <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-1">
            Written by
          </p>
          <h3 className="font-semibold text-gray-900 text-lg mb-1">
            {author.name}
          </h3>
          {author.role && (
            <p className="text-sm text-gray-500 mb-3">
              {author.role}
            </p>
          )}
          {author.bio && (
            <p className="text-sm text-gray-600 leading-relaxed">
              {author.bio}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
