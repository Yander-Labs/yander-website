import Link from "next/link"
import { Container } from "@/components/ui/Container"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Page Not Found | Yander",
  description: "The page you're looking for doesn't exist or has been moved.",
  robots: "noindex, nofollow",
}

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center">
      <Container>
        <div className="text-center py-20">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">
            404 Error
          </p>
          <h1 className="font-serif text-4xl md:text-5xl text-gray-900 mb-4">
            Page not found
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
            Sorry, we couldn't find the page you're looking for. It may have been moved or deleted.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Go to Homepage
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Visit Our Blog
            </Link>
          </div>
        </div>
      </Container>
    </main>
  )
}
