import Link from "next/link"
import { Container } from "@/components/ui/Container"
import { Eyebrow } from "@/components/ui/Eyebrow"
import { Button } from "@/components/ui/Button"

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center">
      <Container>
        <div className="text-center py-20">
          <div className="mb-4 flex justify-center">
            <Eyebrow>404 Error</Eyebrow>
          </div>
          <h1 className="font-geist font-bold text-4xl md:text-5xl text-[var(--color-ink-primary)] tracking-tight leading-[1.1] mb-4">
            Page not found
          </h1>
          <p className="text-lg text-[var(--color-ink-secondary)] mb-8 max-w-md mx-auto">
            Sorry, we couldn't find the page you're looking for. It may have been moved or deleted.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/">
              <Button variant="primary" size="lg">Go to Homepage</Button>
            </Link>
            <Link href="/blog">
              <Button variant="secondary" size="lg">Visit Our Blog</Button>
            </Link>
          </div>
        </div>
      </Container>
    </main>
  )
}
