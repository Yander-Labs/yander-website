import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'changelog',
  title: 'Changelog Entry',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'meta', title: 'Metadata' },
    { name: 'seo', title: 'SEO' }
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      description: 'Release headline (e.g., "Team Analytics Dashboard")',
      validation: (Rule) => Rule.required().max(100)
    }),
    defineField({
      name: 'version',
      title: 'Version',
      type: 'string',
      group: 'content',
      description: 'Semantic version (e.g., "1.2.0") or release name',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      options: {
        source: (doc) =>
          `${(doc as { version?: string }).version || ''}-${(doc as { title?: string }).title || ''}`,
        maxLength: 96
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      group: 'content',
      rows: 3,
      description: 'Brief description for list views (120-160 chars)',
      validation: (Rule) => Rule.max(200)
    }),
    defineField({
      name: 'body',
      title: 'Changes',
      type: 'blockContent',
      group: 'content',
      description: 'Detailed changelog content using headings for categories'
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      group: 'content',
      options: { hotspot: true },
      description: 'Optional hero image for the release',
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text'
        }
      ]
    }),
    defineField({
      name: 'releaseDate',
      title: 'Release Date',
      type: 'date',
      group: 'meta',
      options: { dateFormat: 'MMMM D, YYYY' },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'changeTypes',
      title: 'Change Types',
      type: 'array',
      group: 'meta',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'New Feature', value: 'feature' },
          { title: 'Improvement', value: 'improvement' },
          { title: 'Bug Fix', value: 'fix' },
          { title: 'Breaking Change', value: 'breaking' },
          { title: 'Deprecation', value: 'deprecated' },
          { title: 'Security', value: 'security' },
          { title: 'Performance', value: 'performance' }
        ],
        layout: 'tags'
      },
      description: 'Tag this release with change categories'
    }),
    defineField({
      name: 'isHighlight',
      title: 'Highlight Release',
      type: 'boolean',
      group: 'meta',
      description: 'Feature this release prominently (major versions)',
      initialValue: false
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'seo',
      group: 'seo'
    })
  ],
  orderings: [
    {
      title: 'Release Date (Newest)',
      name: 'releaseDateDesc',
      by: [{ field: 'releaseDate', direction: 'desc' }]
    },
    {
      title: 'Version',
      name: 'versionDesc',
      by: [{ field: 'version', direction: 'desc' }]
    }
  ],
  preview: {
    select: {
      title: 'title',
      version: 'version',
      date: 'releaseDate',
      media: 'coverImage'
    },
    prepare({ title, version, date, media }) {
      const formattedDate = date
        ? new Date(date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          })
        : 'No date'
      return {
        title: `${version}: ${title}`,
        subtitle: formattedDate,
        media
      }
    }
  }
})
