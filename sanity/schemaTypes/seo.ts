import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'Override the default title for search engines. Max 60 characters recommended.',
      validation: (Rule) => Rule.max(70).warning('Keep under 60 characters for best results')
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'Override the excerpt for search results. Max 160 characters recommended.',
      validation: (Rule) => Rule.max(170).warning('Keep under 160 characters for best results')
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      description: 'Image for social sharing (Facebook, LinkedIn). Recommended: 1200x630px',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text'
        }
      ]
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'Canonical URL',
      type: 'url',
      description: 'Override the default canonical URL if content exists elsewhere'
    }),
    defineField({
      name: 'noIndex',
      title: 'Hide from Search Engines',
      type: 'boolean',
      description: 'Set to true to add noindex meta tag (hides from Google)',
      initialValue: false
    }),
    defineField({
      name: 'keywords',
      title: 'Focus Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      description: 'Target keywords for this content (3-5 recommended)'
    })
  ]
})
