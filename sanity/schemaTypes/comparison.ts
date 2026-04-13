import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'comparison',
  title: 'Comparison Page',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'features', title: 'Feature Comparison' },
    { name: 'decision', title: 'Decision Framework' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    // Content group
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      group: 'content',
      description: 'e.g. "Yander vs JazzHR"',
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'competitorName',
      title: 'Competitor Name',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'competitorLogo',
      title: 'Competitor Logo',
      type: 'image',
      group: 'content',
      options: { hotspot: true },
    }),
    defineField({
      name: 'competitorUrl',
      title: 'Competitor Website',
      type: 'url',
      group: 'content',
    }),
    defineField({
      name: 'headline',
      title: 'Hero Headline',
      type: 'string',
      group: 'content',
      description: 'The main headline shown in the hero section',
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero Description',
      type: 'text',
      group: 'content',
      rows: 3,
      description: 'Brief context distinguishing both products',
      validation: (Rule) => Rule.required().max(300),
    }),
    defineField({
      name: 'yanderSummary',
      title: 'Yander Summary',
      type: 'text',
      group: 'content',
      rows: 3,
      description: 'Brief description of Yander for this comparison',
      validation: (Rule) => Rule.required().max(300),
    }),
    defineField({
      name: 'competitorSummary',
      title: 'Competitor Summary',
      type: 'text',
      group: 'content',
      rows: 3,
      description: 'Brief, fair description of the competitor',
      validation: (Rule) => Rule.required().max(300),
    }),

    // Features group
    defineField({
      name: 'featureRows',
      title: 'Feature Comparison Rows',
      type: 'array',
      group: 'features',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'feature',
              title: 'Feature',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'yander',
              title: 'Yander',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'competitor',
              title: 'Competitor',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'whyItMatters',
              title: 'Why It Matters',
              type: 'string',
            }),
          ],
          preview: {
            select: { title: 'feature', subtitle: 'yander' },
          },
        },
      ],
    }),

    // Decision group
    defineField({
      name: 'chooseYander',
      title: 'Choose Yander If...',
      type: 'array',
      group: 'decision',
      of: [{ type: 'string' }],
      description: 'List of reasons to choose Yander over this competitor',
    }),
    defineField({
      name: 'chooseCompetitor',
      title: 'Choose Competitor If...',
      type: 'array',
      group: 'decision',
      of: [{ type: 'string' }],
      description: 'List of reasons the competitor might be a better fit',
    }),
    defineField({
      name: 'verdict',
      title: 'Verdict / Bottom Line',
      type: 'text',
      group: 'decision',
      rows: 4,
      description: 'Honest summary of when each tool is the better choice',
    }),

    // Body content for additional prose
    defineField({
      name: 'body',
      title: 'Additional Content',
      type: 'blockContent',
      group: 'content',
      description: 'Optional longer-form content below the comparison table',
    }),

    // FAQ
    defineField({
      name: 'faqs',
      title: 'FAQ',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'question',
              title: 'Question',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'answer',
              title: 'Answer',
              type: 'text',
              rows: 4,
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: 'question' },
          },
        },
      ],
    }),

    // Stats
    defineField({
      name: 'stats',
      title: 'Highlight Stats',
      type: 'array',
      group: 'content',
      description: 'Key stats to highlight (e.g. "71% faster screening")',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'value',
              title: 'Value',
              type: 'string',
              description: 'e.g. "71%"',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'e.g. "Faster screening"',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: 'value', subtitle: 'label' },
          },
        },
      ],
    }),

    // Testimonial
    defineField({
      name: 'testimonial',
      title: 'Testimonial',
      type: 'object',
      group: 'content',
      fields: [
        defineField({ name: 'quote', title: 'Quote', type: 'text', rows: 3 }),
        defineField({ name: 'name', title: 'Name', type: 'string' }),
        defineField({ name: 'role', title: 'Role / Title', type: 'string' }),
        defineField({ name: 'company', title: 'Company', type: 'string' }),
      ],
    }),

    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      group: 'content',
    }),

    // SEO group
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'competitorName',
      media: 'competitorLogo',
    },
  },
  orderings: [
    {
      title: 'Competitor Name',
      name: 'competitorAsc',
      by: [{ field: 'competitorName', direction: 'asc' }],
    },
    {
      title: 'Published Date',
      name: 'publishedDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
})
