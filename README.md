# Yander Website

A modern marketing website for Yander - a remote team intelligence platform that helps leaders understand and improve employee engagement through data-driven insights.

## Tech Stack

- **Framework:** Next.js 16.1 with App Router
- **Language:** TypeScript
- **UI Library:** React 19
- **CMS:** Sanity (embedded studio)
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **Icons:** Lucide React

## Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Yander-Labs/yander-website.git
cd yander-website

# Install dependencies
npm install

# Start development server (runs on port 3001)
npm run dev -- --port 3001
```

Visit [http://localhost:3001](http://localhost:3001) to see the website.

> **Note:** This project uses port 3001 by default to avoid conflicts with other local projects.

### Environment Variables

Create a `.env.local` file in the root directory:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=s3r1d2vt
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

For scripts that write to Sanity (like seeding content), you'll also need:

```bash
SANITY_TOKEN=your_sanity_write_token
```

## Project Structure

```
yander-website/
├── app/                          # Next.js App Router
│   ├── (main)/                   # Public pages with nav/footer
│   │   ├── page.tsx              # Homepage
│   │   └── blog/                 # Blog pages
│   │       ├── page.tsx          # Blog listing
│   │       └── [slug]/page.tsx   # Individual posts
│   ├── studio/                   # Sanity Studio (no nav/footer)
│   │   └── [[...tool]]/page.tsx
│   ├── layout.tsx                # Root layout
│   └── globals.css               # Global styles & Tailwind config
│
├── components/
│   ├── ui/                       # Reusable UI primitives
│   │   ├── Button.tsx
│   │   ├── Container.tsx
│   │   ├── Card.tsx
│   │   └── ...
│   ├── sections/                 # Homepage section components
│   │   ├── Hero.tsx
│   │   ├── Dashboard.tsx
│   │   ├── HowItWorks.tsx
│   │   └── ...
│   ├── blog/                     # Blog-specific components
│   │   ├── BlogCard.tsx
│   │   ├── PostBody.tsx
│   │   └── ...
│   ├── Navigation.tsx
│   └── Footer.tsx
│
├── lib/                          # Utilities & configuration
│   ├── sanity.ts                 # Sanity client & image builder
│   ├── queries.ts                # GROQ queries
│   ├── types.ts                  # TypeScript interfaces
│   └── utils.ts                  # Helper functions (cn, etc.)
│
├── sanity/                       # Sanity schema definitions
│   └── schemaTypes/
│       ├── post.ts
│       ├── author.ts
│       ├── category.ts
│       ├── blockContent.ts
│       └── index.ts
│
├── scripts/                      # Utility scripts
│   ├── seed-blog-content.mjs     # Seed blog with sample content
│   └── upload-image-to-sanity.mjs
│
├── public/                       # Static assets
│   └── blog-images/              # Generated blog images
│
├── docs/                         # Extended documentation
├── .claude/                      # Claude Code configuration
├── sanity.config.ts              # Sanity Studio configuration
├── sanity.cli.ts                 # Sanity CLI configuration
└── CLAUDE.md                     # AI agent instructions
```

## Available Scripts

```bash
npm run dev      # Start development server with Turbopack
npm run build    # Create production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Features

### Homepage

The homepage consists of 14 modular sections:

1. **Hero** - Main value proposition
2. **Dashboard** - Product preview mockup
3. **TrustedBy** - Client/partner logos
4. **Integrations** - Supported platforms (Slack, Gmail, Zoom, etc.)
5. **GallupStats** - Industry statistics
6. **HowItWorks** - Product explanation
7. **Results** - Key metrics and outcomes
8. **Testimonials** - Customer quotes
9. **BuiltForRemote** - Remote-first features
10. **PrivacyFirst** - Privacy and security focus
11. **ProactiveRetention** - Predictive capabilities
12. **WhoItsFor** - Target audience tabs
13. **GetStarted** - Primary CTA
14. **CTA** - Final call-to-action

### Blog

Full-featured blog system powered by Sanity CMS:

- **Blog listing** (`/blog`) - Paginated posts with search and category filtering
- **Individual posts** (`/blog/[slug]`) - Full article with table of contents
- **Categories** - Color-coded content organization
- **Authors** - Author profiles with bio

Blog features include:
- Real-time search filtering
- Category-based filtering
- Reading progress indicator
- Table of contents (desktop)
- Related posts
- Social sharing buttons
- Code syntax highlighting

### Sanity Studio

Embedded CMS accessible at `/studio` for content management:

- Create and edit blog posts
- Manage authors and categories
- Upload and manage images
- Rich text editing with Portable Text

## Sanity CMS

### Project Details

- **Project ID:** `s3r1d2vt`
- **Dataset:** `production`
- **Studio URL:** `/studio`

### Schema Types

| Type | Description |
|------|-------------|
| `post` | Blog posts with title, body, images, categories |
| `author` | Author profiles with name, bio, image |
| `category` | Content categories with color theming |
| `blockContent` | Rich text with headings, images, code blocks |

### Seeding Content

To populate the blog with sample content:

```bash
SANITY_TOKEN=your_token node scripts/seed-blog-content.mjs
```

This creates:
- 3 categories (Remote Leadership, Team Insights, Best Practices)
- 1 author (Yander Team)
- 3 blog posts about employee engagement

## Design System

### Colors (Attio-inspired)

- **Primary text:** `text-gray-900`
- **Secondary text:** `text-gray-500`, `text-gray-400`
- **Borders:** `border-[#E4E7EC]`
- **Backgrounds:** `bg-white`, `bg-gray-50`

### Typography

- **Sans-serif:** Inter (body text)
- **Serif:** Instrument Serif (headings)

### Shadows

- `shadow-subtle` - Minimal depth
- `shadow-card` - Card components
- `shadow-elevated` - Hover states
- `shadow-xl` - Large elements

### Spacing

- **Section padding:** `py-20 md:py-28`
- **Container max-width:** `max-w-7xl`

## Development

### Adding a New Homepage Section

1. Create `components/sections/NewSection.tsx`
2. Import and add to `app/(main)/page.tsx`
3. Use `Container` and `AnimatedSection` wrappers

### Adding Blog Features

1. Update schema in `sanity/schemaTypes/` if needed
2. Add GROQ query in `lib/queries.ts`
3. Add types in `lib/types.ts`
4. Create component in `components/blog/`

### Code Style

- Named exports for components (not default)
- Use `"use client"` only when necessary
- Use `cn()` utility for conditional classnames
- Absolute imports with `@/` prefix

## Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main

### Environment Variables for Production

```
NEXT_PUBLIC_SANITY_PROJECT_ID=s3r1d2vt
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

### Sanity CORS

Add your production domain to Sanity's CORS origins:
1. Go to [Sanity Dashboard](https://www.sanity.io/manage)
2. Navigate to API → CORS Origins
3. Add your production URL

## AI Agent Configuration

This project is configured for use with Claude Code and other AI assistants:

- **CLAUDE.md** - Quick reference for AI agents
- **.claude/AGENTS.md** - Extended context and design system
- **.claude/rules/** - Modular coding conventions
- **.claude/commands/** - Custom workflow commands

## License

Private - Yander Labs

## Contributing

1. Create a feature branch
2. Make your changes
3. Run `npm run build` to verify no errors
4. Submit a pull request

## Support

For questions or issues, contact the Yander team.
