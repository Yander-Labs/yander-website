'use client'

import { PortableText, type PortableTextReactComponents } from '@portabletext/react'
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity'
import { CodeBlock } from './CodeBlock'
import type { PortableTextBlock, PortableTextSpan } from '@portabletext/types'

interface PostBodyProps {
  body: PortableTextBlock[]
}

// Generate ID from text for heading anchors
function generateId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

// Helper to extract text from block children
function extractTextFromBlock(children: unknown[] | undefined): string {
  if (!children) return ''
  return children
    .filter((child): child is PortableTextSpan =>
      typeof child === 'object' && child !== null && '_type' in child && (child as { _type: string })._type === 'span'
    )
    .map((span) => span.text || '')
    .join('')
}

const components: Partial<PortableTextReactComponents> = {
  block: {
    h2: ({ children, value }) => {
      const text = extractTextFromBlock(value.children as unknown[] | undefined)
      const id = generateId(text)

      return (
        <h2 id={id} className="font-serif text-2xl md:text-3xl text-gray-900 mt-12 mb-4 scroll-mt-24">
          {children}
        </h2>
      )
    },
    h3: ({ children, value }) => {
      const text = extractTextFromBlock(value.children as unknown[] | undefined)
      const id = generateId(text)

      return (
        <h3 id={id} className="font-semibold text-xl text-gray-900 mt-8 mb-3 scroll-mt-24">
          {children}
        </h3>
      )
    },
    h4: ({ children }) => (
      <h4 className="font-semibold text-lg text-gray-900 mt-6 mb-2">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="text-gray-600 leading-relaxed mb-4">
        {children}
      </p>
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
    strong: ({ children }) => <strong className="font-semibold text-gray-900">{children}</strong>,
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
              src={urlFor(value).width(1200).url()}
              alt={value.alt || ''}
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

export function PostBody({ body }: PostBodyProps) {
  return (
    <div className="prose-custom">
      <PortableText value={body} components={components} />
    </div>
  )
}
