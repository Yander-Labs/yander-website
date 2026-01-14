import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'post',
  title: 'Blog Post',
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
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      group: 'meta',
      to: [{ type: 'author' }]
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      group: 'content',
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
      name: 'categories',
      title: 'Categories',
      type: 'array',
      group: 'meta',
      of: [{ type: 'reference', to: [{ type: 'category' }] }]
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      group: 'meta'
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      group: 'content',
      rows: 3
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
      group: 'content'
    }),
    defineField({
      name: 'readTime',
      title: 'Read Time (minutes)',
      type: 'number',
      group: 'meta'
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'seo',
      group: 'seo'
    })
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage'
    },
    prepare(selection) {
      const { author } = selection
      return { ...selection, subtitle: author && `by ${author}` }
    }
  }
})
