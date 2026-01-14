'use client'

import { useEffect } from 'react'

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Hide navigation and footer when studio is mounted
  useEffect(() => {
    document.body.classList.add('studio-mode')
    return () => {
      document.body.classList.remove('studio-mode')
    }
  }, [])

  return (
    <div className="min-h-screen">
      {children}
    </div>
  )
}
