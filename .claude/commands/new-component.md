# Create New Component

Templates for creating new components in different categories.

## UI Component Template

Create in `components/ui/ComponentName.tsx`:

```typescript
import { cn } from "@/lib/utils"

interface ComponentNameProps {
  className?: string
  children?: React.ReactNode
}

export function ComponentName({ className, children }: ComponentNameProps) {
  return (
    <div className={cn(
      "base-tailwind-classes",
      className
    )}>
      {children}
    </div>
  )
}
```

## Interactive UI Component

```typescript
"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface ComponentNameProps {
  className?: string
  defaultValue?: string
  onChange?: (value: string) => void
}

export function ComponentName({
  className,
  defaultValue = "",
  onChange
}: ComponentNameProps) {
  const [value, setValue] = useState(defaultValue)

  const handleChange = (newValue: string) => {
    setValue(newValue)
    onChange?.(newValue)
  }

  return (
    <div className={cn("base-classes", className)}>
      {/* Interactive content */}
    </div>
  )
}
```

## Blog Component Template

Create in `components/blog/ComponentName.tsx`:

```typescript
"use client"

import Image from "next/image"
import { urlFor } from "@/lib/sanity"
import type { Post } from "@/lib/types"

interface ComponentNameProps {
  post: Post
}

export function ComponentName({ post }: ComponentNameProps) {
  return (
    <div className="...">
      {post.mainImage && (
        <Image
          src={urlFor(post.mainImage).width(600).height(400).url()}
          alt={post.mainImage.alt || post.title}
          width={600}
          height={400}
          className="rounded-lg"
        />
      )}
      <h3>{post.title}</h3>
    </div>
  )
}
```

## Section Component Template

Create in `components/sections/ComponentName.tsx`:

```typescript
"use client"

import { motion } from "framer-motion"
import { Container } from "@/components/ui/Container"

export function ComponentName() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Section content */}
        </motion.div>
      </Container>
    </section>
  )
}
```

## Checklist

- [ ] File created in correct directory
- [ ] Named export used (not default export)
- [ ] Props interface defined
- [ ] `"use client"` added only if needed
- [ ] `cn()` used for conditional classes
- [ ] Absolute imports used (`@/`)
- [ ] TypeScript types defined
- [ ] Component tested locally
