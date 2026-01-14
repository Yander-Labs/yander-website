# Manage Categories

Create, update, list, or delete blog categories in Sanity CMS.

## Prerequisites

- `SANITY_TOKEN` environment variable with write access (for create/update/delete)
- No token needed for listing categories

## Available Colors

Categories use Tailwind color names for visual theming:

| Color | Use Case |
|-------|----------|
| `blue` | Primary, default, general |
| `emerald` | Success, growth, positive |
| `purple` | Premium, special, featured |
| `amber` | Warning, attention, important |
| `rose` | Highlight, trending, hot |
| `cyan` | Info, technical, data |
| `orange` | Energy, action, updates |

## Operations

### List All Categories

```typescript
import { listCategories } from '@/lib/sanity-crud'

const categories = await listCategories()

console.log('Available Categories:')
console.log('─────────────────────────────────────')
categories.forEach(c => {
  console.log(`${c.title} (${c.color || 'no color'})`)
  console.log(`  ID: ${c._id}`)
  console.log(`  Slug: ${c.slug.current}`)
  console.log(`  Description: ${c.description || 'Not set'}`)
  console.log('')
})
```

### Create Category

```typescript
import { createCategory, generateSlug } from '@/lib/sanity-crud'
import type { CategoryInput } from '@/lib/types'

const category: CategoryInput = {
  _type: 'category',
  title: 'Employee Wellbeing',
  slug: generateSlug('employee-wellbeing'),
  description: 'Articles about mental health, work-life balance, and employee wellness programs.',
  color: 'emerald'
}

const created = await createCategory(category)
console.log(`Created category: ${created._id}`)
```

### Update Category

```typescript
import { updateCategory, getCategoryById } from '@/lib/sanity-crud'

// Show current state
const current = await getCategoryById('category-id')
console.log('Current category:')
console.log(`  Title: ${current.title}`)
console.log(`  Description: ${current.description || 'Not set'}`)
console.log(`  Color: ${current.color || 'Not set'}`)

// Apply updates
await updateCategory('category-id', {
  description: 'Updated description...',
  color: 'purple'
})

console.log('Category updated successfully')
```

### Delete Category

**WARNING:** Cannot delete if posts use this category.

```typescript
import { deleteCategory } from '@/lib/sanity-crud'

try {
  await deleteCategory('category-id')
  console.log('Category deleted successfully')
} catch (error) {
  // Will throw if posts use this category
  console.log(error.message)
  // "Cannot delete category: X post(s) use this category..."
}
```

**To delete a category with posts:**
1. First remove the category from all posts using it
2. Or reassign posts to different categories
3. Then delete the category

## Field Reference

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| title | string | Yes | Display name |
| slug | slug | Auto | Generated from title |
| description | text | No | What this category covers |
| color | string | No | Tailwind color name |

## Best Practices

### Naming
- Use clear, specific names
- Keep consistent style (all "X Leadership" or all "X Management")
- Avoid overlapping categories

### Description
- Explain what content belongs in this category
- Help authors choose the right category
- 1-2 sentences is sufficient

### Color Strategy
- Use consistent color meanings across the site
- Don't use too many colors (cognitive overload)
- Consider color-blind accessibility

### Category Count
- Aim for 5-10 categories total
- Too few = posts are hard to organize
- Too many = users get overwhelmed
- Merge similar categories when possible

## Current Categories (Yander)

Based on the seed data:

| Category | Slug | Color |
|----------|------|-------|
| Remote Leadership | remote-leadership | blue |
| Team Insights | team-insights | emerald |
| Best Practices | best-practices | purple |

## Suggested Category Ideas

For a remote team engagement platform:

| Category | Color | Description |
|----------|-------|-------------|
| Remote Leadership | blue | Managing distributed teams effectively |
| Team Insights | emerald | Data-driven observations about team dynamics |
| Best Practices | purple | Proven strategies and methodologies |
| Employee Wellbeing | cyan | Mental health and work-life balance |
| Productivity | orange | Efficiency and output optimization |
| Company Culture | rose | Building culture in remote environments |
| Tools & Tech | amber | Software and technology recommendations |

## Example Workflow

```
User: Create a new category for retention articles

Agent: I'll create a category for retention content.

Suggested setup:
  Title: Employee Retention
  Slug: employee-retention
  Color: rose (highlight/important)
  Description: Strategies and insights for retaining top talent in remote teams.

Does this look right? (yes to create, or suggest changes)

User: yes

Creating category...
✓ Created: category-employee-retention

Category Details:
  Title: Employee Retention
  Slug: employee-retention
  Color: rose
  URL: /blog?category=employee-retention
```

## Checklist

- [ ] Title is clear and specific
- [ ] Slug is URL-safe
- [ ] Description explains what belongs here
- [ ] Color is valid Tailwind color name
- [ ] Not a duplicate of existing category
- [ ] Fits within 5-10 total category target
