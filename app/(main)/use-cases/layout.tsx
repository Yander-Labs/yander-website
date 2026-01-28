import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Use Cases | Yander",
  description:
    "See how marketing agencies, tech startups, and professional services teams use Yander to improve remote team engagement and prevent burnout.",
  alternates: {
    canonical: "https://yander.io/use-cases",
  },
  openGraph: {
    title: "Use Cases - Yander Remote Team Intelligence",
    description:
      "See how marketing agencies, tech startups, and professional services teams use Yander to improve remote team engagement and prevent burnout.",
    url: "https://yander.io/use-cases",
    siteName: "Yander",
    type: "website",
    images: [
      {
        url: "https://yander.io/og-image.png",
        width: 1200,
        height: 630,
        alt: "Yander Use Cases",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Use Cases - Yander Remote Team Intelligence",
    description:
      "See how marketing agencies, tech startups, and professional services teams use Yander to improve remote team engagement and prevent burnout.",
    images: ["https://yander.io/og-image.png"],
  },
}

export default function UseCasesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
