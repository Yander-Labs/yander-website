'use client'

import { useState } from 'react'
import { Check, Copy, FileCode } from 'lucide-react'

interface CodeBlockProps {
  code: string
  language?: string
  filename?: string
}

// Language display names
const languageLabels: Record<string, string> = {
  javascript: 'JavaScript',
  typescript: 'TypeScript',
  python: 'Python',
  css: 'CSS',
  html: 'HTML',
  json: 'JSON',
  bash: 'Bash',
  text: 'Plain Text'
}

export function CodeBlock({ code, language = 'text', filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="my-6 rounded-xl overflow-hidden border border-[#E4E7EC] bg-gray-900">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center gap-2">
          {/* Dots */}
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>

          {/* Filename or language */}
          <div className="flex items-center gap-2 ml-3">
            <FileCode className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-400">
              {filename || languageLabels[language] || language}
            </span>
          </div>
        </div>

        {/* Copy button */}
        <button
          onClick={copyCode}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium transition-all ${
            copied
              ? 'bg-emerald-500/20 text-emerald-400'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              Copy
            </>
          )}
        </button>
      </div>

      {/* Code */}
      <pre className="p-4 overflow-x-auto">
        <code className="text-sm text-gray-100 leading-relaxed font-mono">
          {code}
        </code>
      </pre>
    </div>
  )
}
