import { defineType, defineArrayMember } from 'sanity'

export default defineType({
  name: 'blockContent',
  title: 'Block Content',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'H4', value: 'h4' },
        { title: 'Quote', value: 'blockquote' }
      ],
      lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Numbered', value: 'number' }
      ],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          { title: 'Code', value: 'code' },
          { title: 'Underline', value: 'underline' },
          { title: 'Strike', value: 'strike-through' }
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'Link',
            fields: [
              {
                name: 'href',
                type: 'url',
                title: 'URL',
                validation: (Rule) =>
                  Rule.uri({
                    allowRelative: true,
                    scheme: ['http', 'https', 'mailto', 'tel']
                  })
              },
              {
                name: 'blank',
                type: 'boolean',
                title: 'Open in new tab',
                initialValue: false
              }
            ]
          }
        ]
      }
    }),
    defineArrayMember({
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text'
        },
        {
          name: 'caption',
          type: 'string',
          title: 'Caption'
        }
      ]
    }),
    defineArrayMember({
      type: 'object',
      name: 'codeBlock',
      title: 'Code Block',
      fields: [
        {
          name: 'code',
          title: 'Code',
          type: 'text'
        },
        {
          name: 'language',
          title: 'Language',
          type: 'string',
          options: {
            list: [
              { title: 'JavaScript', value: 'javascript' },
              { title: 'TypeScript', value: 'typescript' },
              { title: 'Python', value: 'python' },
              { title: 'CSS', value: 'css' },
              { title: 'HTML', value: 'html' },
              { title: 'JSON', value: 'json' },
              { title: 'Bash', value: 'bash' },
              { title: 'Plain Text', value: 'text' }
            ]
          }
        },
        {
          name: 'filename',
          title: 'Filename',
          type: 'string'
        }
      ],
      preview: {
        select: {
          language: 'language',
          filename: 'filename'
        },
        prepare({ language, filename }) {
          return {
            title: filename || 'Code Block',
            subtitle: language || 'Plain text'
          }
        }
      }
    }),
    defineArrayMember({
      type: 'object',
      name: 'comparisonTable',
      title: 'Comparison Table',
      fields: [
        {
          name: 'headers',
          title: 'Headers',
          type: 'array',
          of: [{ type: 'string' }],
          validation: (Rule) => Rule.min(2).max(8)
        },
        {
          name: 'rows',
          title: 'Rows',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'tableRow',
              fields: [
                {
                  name: 'cells',
                  title: 'Cells',
                  type: 'array',
                  of: [{ type: 'text', rows: 2 }]
                }
              ],
              preview: {
                select: { cells: 'cells' },
                prepare({ cells }) {
                  const first = Array.isArray(cells) && cells[0] ? cells[0] : 'Row'
                  return { title: typeof first === 'string' ? first.slice(0, 60) : 'Row' }
                }
              }
            }
          ]
        },
        {
          name: 'caption',
          title: 'Caption (optional)',
          type: 'string'
        }
      ],
      preview: {
        select: { headers: 'headers', rows: 'rows' },
        prepare({ headers, rows }) {
          const cols = Array.isArray(headers) ? headers.length : 0
          const r = Array.isArray(rows) ? rows.length : 0
          return {
            title: 'Comparison Table',
            subtitle: `${cols} columns × ${r} rows`
          }
        }
      }
    })
  ]
})
