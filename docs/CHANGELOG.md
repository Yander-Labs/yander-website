# Changelog

All notable changes to the Yander Website project.

## [1.0.0] - 2025-01-14

### Initial Release

Complete marketing website with integrated blog system.

### Added

#### Core Website
- Next.js 16.1 with App Router and React 19
- TypeScript throughout the codebase
- Tailwind CSS v4 with custom Attio-inspired design system
- Framer Motion animations with scroll triggers
- Responsive design for all screen sizes

#### Homepage Sections
- **Hero** - Main value proposition with CTA
- **Dashboard** - Product preview mockup with sparklines
- **TrustedBy** - Partner/client logos
- **Integrations** - Supported platforms (Slack, Gmail, Zoom, Notion, Meet)
- **GallupStats** - Industry statistics visualization
- **HowItWorks** - Product explanation flow
- **Results** - Key metrics with animated counters
- **Testimonials** - Customer quotes
- **BuiltForRemote** - Remote-first features
- **PrivacyFirst** - Privacy and security focus
- **ProactiveRetention** - Predictive capabilities demo
- **WhoItsFor** - Target audience tabs
- **GetStarted** - Primary CTA section
- **CTA** - Final call-to-action

#### Blog System
- Sanity CMS integration with embedded studio at `/studio`
- Blog listing page with pagination
- Individual post pages with table of contents
- Category-based content organization
- Full-text search filtering
- Related posts recommendations
- Author profiles
- Social sharing buttons
- Reading progress indicator
- Code syntax highlighting with copy button
- ISR with 60-second revalidation

#### Sanity Schemas
- `post` - Blog posts with Portable Text body
- `author` - Author profiles
- `category` - Color-coded categories
- `blockContent` - Rich text with images and code blocks

#### UI Components
- Button (primary, secondary, outline, ghost variants)
- Container (responsive max-width wrapper)
- Card (rounded with shadow)
- Badge (status indicators)
- SectionLabel (category labels)
- AnimatedSection (scroll animations)
- AnimatedNumber (counting animation)
- MiniChart (sparkline visualization)

#### Blog Components
- BlogCard, BlogHero, BlogSearch
- CategoryFilter, CategoryBadge, Pagination
- PostHeader, PostBody, TableOfContents
- AuthorCard, ShareButtons, RelatedPosts
- CodeBlock, ReadingProgress

#### Scripts
- `seed-blog-content.mjs` - Seed sample blog content
- `upload-image-to-sanity.mjs` - Upload images to Sanity

#### Documentation
- `CLAUDE.md` - AI agent instructions
- `README.md` - Project documentation
- `.claude/AGENTS.md` - Extended AI context
- `.claude/rules/` - Modular coding conventions
- `.claude/commands/` - Custom workflow commands
- `docs/ARCHITECTURE.md` - Technical architecture
- `docs/CHANGELOG.md` - This file
- `docs/SANITY_GUIDE.md` - CMS usage guide

### Technical Details

- **Route Groups:** `(main)` for public pages, `studio` for CMS
- **Fonts:** Inter (sans-serif), Instrument Serif (headings)
- **Borders:** Consistent `#E4E7EC` throughout
- **Shadows:** subtle, card, elevated, xl variants
- **Animations:** 0.5s duration, custom easing curve

### Content

Initial blog content created via seed script:
- 3 categories (Remote Leadership, Team Insights, Best Practices)
- 1 author (Yander Team)
- 3 blog posts about employee engagement and retention

---

## Version History

| Version | Date | Description |
|---------|------|-------------|
| 1.0.0 | 2025-01-14 | Initial release |
