import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/studio/', '/waitlist-confirmation/', '/api/'],
      },
    ],
    sitemap: 'https://yander.io/sitemap.xml',
  }
}
