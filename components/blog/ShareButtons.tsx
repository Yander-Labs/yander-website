'use client'

import { useState } from 'react'
import { Link2, Check } from 'lucide-react'

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

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
      <span className="text-sm text-gray-500">Share:</span>

      {/* X (Twitter) */}
      <button
        onClick={shareOnTwitter}
        className="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-black hover:text-white text-gray-600 transition-all"
        aria-label="Share on X"
      >
        <XIcon className="w-4 h-4" />
      </button>

      {/* LinkedIn */}
      <button
        onClick={shareOnLinkedIn}
        className="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-[#0A66C2] hover:text-white text-gray-600 transition-all"
        aria-label="Share on LinkedIn"
      >
        <LinkedInIcon className="w-4 h-4" />
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
