import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'industryPage',
  title: 'Industry / Use Case Page',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      group: 'content',
      description: 'e.g. "Yander for Agencies" or "Yander for SaaS Teams"',
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
      name: 'industry',
      title: 'Industry / Use Case',
      type: 'string',
      group: 'content',
      description: 'e.g. "Agencies", "SaaS", "Startups", "E-commerce"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'headline',
      title: 'Hero Headline',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero Description',
      type: 'text',
      group: 'content',
      rows: 3,
      validation: (Rule) => Rule.required().max(300),
    }),
    defineField({
      name: 'painPoints',
      title: 'Pain Points',
      type: 'array',
      group: 'content',
      description: 'Industry-specific hiring challenges Yander solves',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'problem',
              title: 'Problem',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'solution',
              title: 'How Yander Solves It',
              type: 'text',
              rows: 2,
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: 'problem' },
          },
        },
      ],
    }),
    defineField({
      name: 'features',
      title: 'Key Features for This Industry',
      type: 'array',
      group: 'content',
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
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: 'feature' },
          },
        },
      ],
    }),
    defineField({
      name: 'stats',
      title: 'Highlight Stats',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'value', title: 'Value', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'label', title: 'Label', type: 'string', validation: (Rule) => Rule.required() }),
          ],
          preview: {
            select: { title: 'value', subtitle: 'label' },
          },
        },
      ],
    }),
    defineField({
      name: 'body',
      title: 'Additional Content',
      type: 'blockContent',
      group: 'content',
    }),
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
      name: 'faqs',
      title: 'FAQ',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'question', title: 'Question', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'answer', title: 'Answer', type: 'text', rows: 4, validation: (Rule) => Rule.required() }),
          ],
          preview: { select: { title: 'question' } },
        },
      ],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      group: 'content',
    }),
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
      subtitle: 'industry',
    },
  },
  orderings: [
    {
      title: 'Industry',
      name: 'industryAsc',
      by: [{ field: 'industry', direction: 'asc' }],
    },
  ],
})
