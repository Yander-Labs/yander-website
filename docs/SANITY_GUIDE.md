# Sanity CMS Guide

Guide for managing content in the Yander website's Sanity CMS.

## Accessing the Studio

Visit `/studio` on your deployed site or local development server:
- Local: http://localhost:3000/studio
- Production: https://your-domain.com/studio

## Authentication

Log in with your Sanity account. Team members need to be added to the project in the Sanity dashboard.

## Content Types

### Blog Posts

**Location:** Content → Posts

**Fields:**
| Field | Required | Description |
|-------|----------|-------------|
| Title | Yes | Post headline |
| Slug | Yes | URL-friendly identifier (auto-generated) |
| Author | No | Reference to author |
| Main Image | No | Featured image with alt text |
| Categories | No | One or more category references |
| Published At | No | Publication date/time |
| Excerpt | No | Short summary for listings |
| Body | No | Full content (rich text) |
| Read Time | No | Estimated reading time in minutes |

**Best Practices:**
- Always add an excerpt (appears in listings and SEO)
- Set a published date (used for ordering)
- Add alt text to images (accessibility)
- Use H2 and H3 headings in body (creates table of contents)

### Authors

**Location:** Content → Authors

**Fields:**
| Field | Required | Description |
|-------|----------|-------------|
| Name | Yes | Author's full name |
| Slug | No | URL-friendly identifier |
| Image | No | Profile photo |
| Bio | No | Short biography |
| Role | No | Job title or role |

### Categories

**Location:** Content → Categories

**Fields:**
| Field | Required | Description |
|-------|----------|-------------|
| Title | Yes | Category name |
| Slug | No | URL-friendly identifier |
| Description | No | What this category covers |
| Color | No | Tailwind color name for theming |

**Available Colors:**
- `blue` - Remote Leadership
- `emerald` - Team Insights
- `purple` - Best Practices
- `amber`, `rose`, `cyan`, `orange` - Additional options

## Writing Blog Posts

### Rich Text Editor

The body field supports:
- **Headings:** H2, H3, H4 (H2 and H3 appear in table of contents)
- **Text Styles:** Bold, italic, code, underline, strikethrough
- **Lists:** Bullet points, numbered lists
- **Blockquotes:** For quotes or callouts
- **Links:** Inline links with optional "open in new tab"
- **Images:** Inline images with captions
- **Code Blocks:** Syntax-highlighted code with language selection

### Code Blocks

When adding code:
1. Click the code block icon
2. Select the programming language
3. Optionally add a filename
4. Paste your code

Supported languages: JavaScript, TypeScript, Python, CSS, HTML, JSON, Bash, Plain Text

### Images

For the main image:
1. Upload or select from media library
2. Use the hotspot tool to set focus point
3. Always add descriptive alt text

For inline images:
1. Add via the image button in rich text
2. Include alt text and optional caption

## Publishing Workflow

### Draft vs Published

- Content is saved as drafts by default
- Click "Publish" to make content live
- Changes are reflected on the site within 60 seconds (ISR)

### Preview

Coming soon: Preview draft content before publishing.

## Media Library

**Location:** Content → Media

All uploaded images are stored in Sanity's asset pipeline with:
- Automatic optimization
- On-the-fly transformations
- CDN delivery

## API Access

### Read Access (Public)

The website uses the public CDN for reading content:
```
Project ID: s3r1d2vt
Dataset: production
```

### Write Access (Token Required)

For programmatic content creation:
1. Go to https://www.sanity.io/manage
2. Select the project
3. Navigate to API → Tokens
4. Create a token with write access

## Troubleshooting

### Content Not Appearing

1. Check that the post is published (not just saved)
2. Wait 60 seconds for ISR to refresh
3. Try a hard refresh (Cmd+Shift+R)

### Images Not Loading

1. Verify CORS is configured for your domain
2. Check that the image was uploaded successfully
3. Ensure alt text is provided

### Studio Not Loading

1. Check that you're logged in to Sanity
2. Verify your account has access to the project
3. Try logging out and back in

## GROQ Query Reference

For developers querying content directly:

```groq
// Get all published posts
*[_type == "post"] | order(publishedAt desc)

// Get post by slug
*[_type == "post" && slug.current == "your-slug"][0]

// Get posts in category
*[_type == "post" && "category-slug" in categories[]->slug.current]

// Search posts
*[_type == "post" && title match "search term*"]
```

## Support

For access issues or questions:
- Contact the Yander team
- Sanity documentation: https://www.sanity.io/docs
