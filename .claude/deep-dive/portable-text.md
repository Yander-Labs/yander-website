# Portable Text Helpers

Detailed guide for building Sanity block content. For quick reference, see `.claude/rules/sanity.md`.

## Basic Blocks

```typescript
import { createTextBlock, createListBlock, estimateReadTime } from '@/lib/sanity-crud'

// Paragraph
createTextBlock('Regular paragraph text.')

// Headings
createTextBlock('Section Title', 'h2')
createTextBlock('Subsection', 'h3')
createTextBlock('Sub-subsection', 'h4')

// Estimate read time from body
const readTime = estimateReadTime(body)
```

## Lists

```typescript
import { createListBlock } from '@/lib/sanity-crud'

// Bullet list
const bullets = createListBlock([
  'First item',
  'Second item',
  'Third item'
], 'bullet')

// Numbered list
const numbered = createListBlock([
  'Step one',
  'Step two',
  'Step three'
], 'number')
```

## Building a Complete Body

```typescript
import { createTextBlock, createListBlock, generateInlineImage } from '@/lib/sanity-crud'

const body = [
  // Introduction
  createTextBlock('Introduction', 'h2'),
  createTextBlock('Opening paragraph explaining the topic...'),

  // AI image after introduction
  await generateInlineImage(
    'Conceptual visualization of remote team engagement',
    'Remote engagement concept',
    'Figure 1: Understanding engagement patterns'
  ),

  // Main content
  createTextBlock('Key Insights', 'h2'),
  createTextBlock('The main points to understand...'),
  ...createListBlock([
    'First insight with supporting detail',
    'Second insight with data',
    'Third insight with action item'
  ], 'bullet'),

  // Screenshot showing real-world example
  await screenshotInlineImage(
    'https://example.com/dashboard',
    'Dashboard showing engagement metrics',
    'Figure 2: Real engagement dashboard'
  ),

  // Conclusion
  createTextBlock('Conclusion', 'h2'),
  createTextBlock('Summary and call to action...')
]
```

## Block Types Reference

| Type | Usage | Example |
|------|-------|---------|
| `normal` | Paragraphs | `createTextBlock('text')` |
| `h2` | Main sections | `createTextBlock('Title', 'h2')` |
| `h3` | Subsections | `createTextBlock('Subtitle', 'h3')` |
| `h4` | Sub-subsections | `createTextBlock('Minor heading', 'h4')` |
| `blockquote` | Quotes | `createTextBlock('Quote text', 'blockquote')` |

## Marks Reference

Available text formatting in Portable Text:
- `strong` - Bold
- `em` - Italic
- `code` - Inline code
- `underline` - Underline
- `strike-through` - Strikethrough
- `link` - Hyperlinks (with optional "open in new tab")

## Embedded Content

Block content supports embedded:
- **Images** - with alt text and captions
- **Code blocks** - with language highlighting
- **Custom types** - extensible via schema
