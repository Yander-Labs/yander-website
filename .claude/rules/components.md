# Component Rules

## File Structure Template

```typescript
"use client" // Only if needed

import { cn } from "@/lib/utils"
// External imports (react, framer-motion, lucide-react)
// Internal imports (@/components, @/lib)

interface ComponentNameProps {
  className?: string
  children?: React.ReactNode
}

export function ComponentName({ className, children }: ComponentNameProps) {
  return (
    <div className={cn("base-classes", className)}>
      {children}
    </div>
  )
}
```

## Naming Conventions

- **Files:** `PascalCase.tsx`
- **Components:** `PascalCase` function name
- **Props Interface:** `ComponentNameProps`
- **Exports:** Named exports only (not default)

## "use client" Rules

**Required for:**
- `useState`, `useEffect`, `useRef`, `useCallback`
- Event handlers: `onClick`, `onChange`, `onSubmit`
- Framer Motion animations
- Browser APIs (localStorage, window, document)

**Not needed for:**
- Static rendering
- Server-side data fetching
- Pure display components
- Components that only receive props

## Common Wrappers

```typescript
// Page sections
import { Container } from "@/components/ui/Container"
import { AnimatedSection } from "@/components/ui/AnimatedSection"

<Container>
  <AnimatedSection>
    {/* Content */}
  </AnimatedSection>
</Container>

// Conditional classes
import { cn } from "@/lib/utils"

className={cn(
  "base-classes always-applied",
  condition && "applied-when-true",
  !condition && "applied-when-false",
  className // Allow override from props
)}
```

## Button Usage

```typescript
import { Button } from "@/components/ui/Button"

<Button variant="primary" size="lg">Primary Action</Button>
<Button variant="secondary" size="md">Secondary</Button>
<Button variant="outline" size="sm">Outline</Button>
<Button variant="ghost">Ghost</Button>
```

## Icon Usage

```typescript
import { IconName } from "lucide-react"

<IconName className="w-5 h-5 text-gray-500" />
```

## Component Location

| Type | Directory |
|------|-----------|
| Reusable UI primitives | `components/ui/` |
| Homepage sections | `components/sections/` |
| Blog-specific | `components/blog/` |
| Navigation/Footer | `components/` (root) |
| Brand logos | `components/icons/` |
