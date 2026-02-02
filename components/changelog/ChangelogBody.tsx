'use client'

import {
  PortableText,
  type PortableTextReactComponents
} from '@portabletext/react'
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity'
import { CodeBlock } from '@/components/blog/CodeBlock'
import type { PortableTextBlock } from '@portabletext/types'

interface ChangelogBodyProps {
  body: PortableTextBlock[]
}

const components: Partial<PortableTextReactComponents> = {
  block: {
    h2: ({ children }) => (
      <h2 className="font-serif text-2xl md:text-3xl text-gray-900 mt-12 mb-4 first:mt-0">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-semibold text-xl text-gray-900 mt-8 mb-3">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="font-semibold text-lg text-gray-900 mt-6 mb-2">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="text-gray-600 leading-relaxed mb-4">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-emerald-500 pl-4 py-2 my-6 italic text-gray-600 bg-gray-50 rounded-r-lg pr-4">
        {children}
      </blockquote>
    )
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside space-y-2 mb-4 text-gray-600">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside space-y-2 mb-4 text-gray-600">
        {children}
      </ol>
    )
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed">{children}</li>
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-gray-900">{children}</strong>
    ),
    em: ({ children }) => <em>{children}</em>,
    code: ({ children }) => (
      <code className="px-1.5 py-0.5 bg-gray-100 text-gray-800 rounded text-sm font-mono">
        {children}
      </code>
    ),
    underline: ({ children }) => <span className="underline">{children}</span>,
    'strike-through': ({ children }) => <s>{children}</s>,
    link: ({ children, value }) => {
      const href = value?.href || '#'
      const isExternal = href.startsWith('http')

      if (isExternal) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-600 hover:text-emerald-700 underline underline-offset-2"
          >
            {children}
          </a>
        )
      }

      return (
        <Link
          href={href}
          className="text-emerald-600 hover:text-emerald-700 underline underline-offset-2"
        >
          {children}
        </Link>
      )
    }
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null

      return (
        <figure className="my-8">
          <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-100">
            <Image
              src={urlFor(value).width(1200).auto('format').url()}
              alt={value.alt || 'Changelog image'}
              fill
              className="object-cover"
            />
          </div>
          {value.caption && (
            <figcaption className="mt-2 text-center text-sm text-gray-500">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
    codeBlock: ({ value }) => (
      <CodeBlock
        code={value.code || ''}
        language={value.language}
        filename={value.filename}
      />
    )
  }
}

export function ChangelogBody({ body }: ChangelogBodyProps) {
  return (
    <div className="prose-custom">
      <PortableText value={body} components={components} />
    </div>
  )
}
