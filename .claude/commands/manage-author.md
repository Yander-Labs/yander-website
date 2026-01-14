# Manage Authors

Create, update, list, or delete author profiles in Sanity CMS.

## Prerequisites

- `SANITY_TOKEN` environment variable with write access (for create/update/delete)
- No token needed for listing authors

## Operations

### List All Authors

```typescript
import { listAuthors } from '@/lib/sanity-crud'

const authors = await listAuthors()

console.log('Available Authors:')
console.log('─────────────────────────────────────')
authors.forEach(a => {
  console.log(`${a.name}`)
  console.log(`  ID: ${a._id}`)
  console.log(`  Role: ${a.role || 'Not set'}`)
  console.log(`  Bio: ${a.bio ? a.bio.substring(0, 60) + '...' : 'Not set'}`)
  console.log(`  Image: ${a.image ? 'Yes' : 'No'}`)
  console.log('')
})
```

### Create Author

Required fields:
- **name** - Full name (required)

Optional fields:
- **role** - Job title or expertise area
- **bio** - Short biography (2-3 sentences)
- **image** - Profile photo

```typescript
import { createAuthor, generateSlug } from '@/lib/sanity-crud'
import type { AuthorInput } from '@/lib/types'

const author: AuthorInput = {
  _type: 'author',
  name: 'Jane Smith',
  slug: generateSlug('jane-smith'),
  role: 'Remote Work Specialist',
  bio: 'Jane has 10+ years of experience building and leading remote teams. She specializes in async communication and distributed team culture.'
}

const created = await createAuthor(author)
console.log(`Created author: ${created._id}`)
```

### Update Author

```typescript
import { updateAuthor, getAuthorById } from '@/lib/sanity-crud'

// First, show current state
const current = await getAuthorById('author-id')
console.log('Current author:')
console.log(`  Name: ${current.name}`)
console.log(`  Role: ${current.role || 'Not set'}`)
console.log(`  Bio: ${current.bio || 'Not set'}`)

// Then apply updates
await updateAuthor('author-id', {
  role: 'Senior Remote Work Consultant',
  bio: 'Updated biography text...'
})

console.log('Author updated successfully')
```

### Delete Author

**WARNING:** Cannot delete if posts reference this author.

```typescript
import { deleteAuthor } from '@/lib/sanity-crud'

try {
  await deleteAuthor('author-id')
  console.log('Author deleted successfully')
} catch (error) {
  // Will throw if posts reference this author
  console.log(error.message)
  // "Cannot delete author: X post(s) reference this author..."
}
```

**To delete an author with posts:**
1. First reassign posts to another author
2. Or delete the posts first
3. Then delete the author

### Add Author Image

```typescript
import { uploadImage, updateAuthor } from '@/lib/sanity-crud'
import { createReadStream } from 'fs'

// Upload the image
const imageRef = await uploadImage(
  createReadStream('/path/to/photo.jpg'),
  'jane-smith.jpg',
  'Photo of Jane Smith'
)

// Update the author with the image
await updateAuthor('author-jane-smith', { image: imageRef })
console.log('Author image updated')
```

## Field Reference

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| name | string | Yes | Full display name |
| slug | slug | Auto | Generated from name |
| role | string | No | Job title, e.g., "Employee Engagement Expert" |
| bio | text | No | 2-3 sentence biography |
| image | image | No | Profile photo with alt text |

## Best Practices

### Name Format
- Use full name: "Jane Smith" not "J. Smith"
- Consistent capitalization
- Include credentials if relevant: "Dr. Jane Smith"

### Role Guidelines
- Keep concise: 3-5 words
- Focus on expertise: "Remote Team Specialist"
- Avoid generic titles: not just "Writer"

### Bio Guidelines
- 2-3 sentences (100-200 characters)
- Third person: "Jane specializes in..." not "I specialize in..."
- Include relevant credentials/experience
- Focus on expertise relevant to blog content

### Image Requirements
- Square aspect ratio (for circular crop)
- Minimum 400x400px
- Professional headshot preferred
- Include alt text for accessibility

## Example Workflow

```
User: Add a new author

Agent: I'll help create a new author. Please provide:

1. Full name:
   > Dr. Sarah Chen

2. Role/Title:
   > Director of People Analytics

3. Short bio (2-3 sentences):
   > Dr. Chen leads people analytics at Fortune 500 companies.
   > She specializes in using data to improve employee engagement
   > and predict retention risks.

Creating author...
✓ Created: author-dr-sarah-chen

Author Details:
  Name: Dr. Sarah Chen
  Role: Director of People Analytics
  ID: author-dr-sarah-chen

Would you like to add a profile image? (Upload separately with image path)
```

## Checklist

- [ ] Name is properly formatted
- [ ] Slug is URL-safe and unique
- [ ] Role is concise and descriptive
- [ ] Bio is written in third person
- [ ] Bio is 2-3 sentences
- [ ] If adding image: square aspect, has alt text
