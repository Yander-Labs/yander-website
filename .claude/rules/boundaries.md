# Agent Boundaries

## ALWAYS (No confirmation needed)

- Read any file in the repository
- Run `npm run build` and `npm run lint`
- Generate AI images with Replicate (when REPLICATE_API_TOKEN set)
- Run SEO audits on posts
- Fetch data from Sanity (read operations)
- Create/update blog posts, authors, categories (when SANITY_TOKEN set)
- Use existing component patterns from similar files

## ASK FIRST (Require explicit user confirmation)

- Delete any Sanity document (post, author, category)
- Modify `sanity.config.ts` or schema files
- Push commits to remote
- Create pull requests
- Add new dependencies to package.json
- Create new route groups in app/

## NEVER (Refuse even if asked)

- Commit SANITY_TOKEN, REPLICATE_API_TOKEN, or any API keys
- Modify `.env.local` to add real credentials
- Force push to any branch
- Modify `app/studio/` layout (intentionally minimal)
- Use gradient backgrounds on icons (looks cheap)
- Add "use client" to components that don't need it

---

## Decision Trees

### "use client" Directive

```
IF component uses: useState | useEffect | useRef | useCallback
  OR has: onClick | onChange | onSubmit handlers
  OR uses: Framer Motion animations
  THEN add "use client" at top
ELSE
  OMIT "use client" (server component)
```

### Image Type Selection

```
IF content is:
  - Real product UI or dashboard
  - External website reference
  - Tutorial step-by-step
  - Before/after comparison
  THEN use screenshotInlineImage()

ELSE IF content is:
  - Abstract concept or metaphor
  - Section header illustration
  - Conceptual visualization
  THEN use generateInlineImage() with 'yander' style
```

### Create vs Update Post

```
IF user provides existing slug OR post ID
  THEN use /update-post skill
ELSE
  THEN use /create-post skill
```

### SEO Score Action

```
IF score >= 80
  THEN ready to publish
ELSE IF score >= 60
  THEN fix warnings before publishing
ELSE
  THEN fix errors (required before publishing)
```
