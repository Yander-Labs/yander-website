# Component Rules

## File Template

```typescript
"use client" // Only if needed

import { cn } from "@/lib/utils"

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

## Naming

| Item | Convention |
|------|------------|
| Files | `PascalCase.tsx` |
| Components | `PascalCase` function |
| Props | `ComponentNameProps` |
| Exports | Named only (not default) |

## "use client" Decision

**Required for:**
- `useState`, `useEffect`, `useRef`, `useCallback`
- Event handlers: `onClick`, `onChange`, `onSubmit`
- Framer Motion animations
- Browser APIs

**Not needed for:**
- Static rendering
- Server-side data fetching
- Pure display components

## Common Wrappers

```typescript
import { Container } from "@/components/ui/Container"
import { AnimatedSection } from "@/components/ui/AnimatedSection"

<Container>
  <AnimatedSection>
    {/* Content */}
  </AnimatedSection>
</Container>
```

## Component Locations

| Type | Directory |
|------|-----------|
| UI primitives | `components/ui/` |
| Homepage sections | `components/sections/` |
| Blog-specific | `components/blog/` |
| Navigation/Footer | `components/` |
