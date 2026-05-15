import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' }
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true }
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
      description: '120-300 chars — used in author Person schema and the byline card.'
    }),
    defineField({
      name: 'role',
      title: 'Role / Job Title',
      type: 'string',
      description: 'e.g. "Founder, Yander" or "Senior Recruiter".'
    }),
    defineField({
      name: 'linkedinUrl',
      title: 'LinkedIn URL',
      type: 'url',
      description: 'Strongest single E-E-A-T signal — used in Person schema sameAs.'
    }),
    defineField({
      name: 'twitterUrl',
      title: 'X / Twitter URL',
      type: 'url'
    }),
    defineField({
      name: 'yearsExperience',
      title: 'Years of experience',
      type: 'number'
    }),
    defineField({
      name: 'expertise',
      title: 'Areas of expertise',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      description: 'e.g. "AI sourcing", "Global hiring law", "B2B SaaS hiring". Surfaces in About page + author card.'
    }),
    defineField({
      name: 'certifications',
      title: 'Certifications',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' }
    })
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'image'
    }
  }
})
