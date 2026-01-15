'use client'

import { Search, X } from 'lucide-react'
import { useRef } from 'react'

interface BlogSearchProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function BlogSearch({
  value,
  onChange,
  placeholder = 'Search articles...'
}: BlogSearchProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleClear = () => {
    onChange('')
    inputRef.current?.focus()
  }

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-9 pr-8 py-2 bg-white border border-[#e5e5e5] rounded text-[13px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-400 transition-colors"
      />
      {value && (
        <button
          onClick={handleClear}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 rounded hover:bg-gray-100 transition-colors"
        >
          <X className="w-3.5 h-3.5 text-gray-400" />
        </button>
      )}
    </div>
  )
}
