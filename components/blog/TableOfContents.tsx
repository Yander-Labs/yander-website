'use client'

import { useEffect, useState } from 'react'
import type { PortableTextBlock, PortableTextSpan } from '@portabletext/types'

interface Heading {
  id: string
  text: string
  level: 'h2' | 'h3'
}

interface TableOfContentsProps {
  body: PortableTextBlock[]
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

export function TableOfContents({ body }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')
  const [headings, setHeadings] = useState<Heading[]>([])

  // Extract headings from portable text
  useEffect(() => {
    const extractedHeadings: Heading[] = []

    body.forEach((block) => {
      if (block._type === 'block' && (block.style === 'h2' || block.style === 'h3')) {
        const text = extractTextFromBlock(block.children as unknown[] | undefined)

        if (text) {
          const id = text
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '')

          extractedHeadings.push({
            id,
            text,
            level: block.style as 'h2' | 'h3'
          })
        }
      }
    })

    setHeadings(extractedHeadings)
  }, [body])

  // Track active heading
  useEffect(() => {
    if (headings.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-80px 0px -70% 0px',
        threshold: 0
      }
    )

    headings.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [headings])

  if (headings.length === 0) return null

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 100
      const elementPosition = element.getBoundingClientRect().top + window.scrollY
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      })
    }
  }

  return (
    <nav className="sticky top-28">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
        On this page
      </p>
      <ul className="space-y-2">
        {headings.map(({ id, text, level }) => (
          <li key={id}>
            <button
              onClick={() => scrollToHeading(id)}
              className={`block text-left text-sm leading-snug transition-colors ${
                level === 'h3' ? 'pl-4' : ''
              } ${
                activeId === id
                  ? 'text-emerald-600 font-medium'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {text}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
