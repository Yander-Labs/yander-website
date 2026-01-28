'use client'

import { useState } from 'react'
import { Twitter, Linkedin, Link2, Check } from 'lucide-react'

interface ShareButtonsProps {
  title: string
  url: string
}

export function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  const shareOnTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`
    window.open(twitterUrl, '_blank', 'width=550,height=435')
  }

  const shareOnLinkedIn = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    window.open(linkedInUrl, '_blank', 'width=550,height=435')
  }

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="flex items-center gap-3">
      <span className="hidden sm:inline text-sm text-gray-500">Share:</span>

      {/* Twitter */}
      <button
        onClick={shareOnTwitter}
        className="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-[#1DA1F2] hover:text-white text-gray-600 transition-all"
        aria-label="Share on Twitter"
      >
        <Twitter className="w-4 h-4" />
      </button>

      {/* LinkedIn */}
      <button
        onClick={shareOnLinkedIn}
        className="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-[#0A66C2] hover:text-white text-gray-600 transition-all"
        aria-label="Share on LinkedIn"
      >
        <Linkedin className="w-4 h-4" />
      </button>

      {/* Copy Link */}
      <button
        onClick={copyLink}
        className={`w-9 h-9 flex items-center justify-center rounded-lg transition-all ${
          copied
            ? 'bg-emerald-500 text-white'
            : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
        }`}
        aria-label="Copy link"
      >
        {copied ? (
          <Check className="w-4 h-4" />
        ) : (
          <Link2 className="w-4 h-4" />
        )}
      </button>
    </div>
  )
}
