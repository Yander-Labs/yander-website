# Add Homepage Section

Step-by-step guide for adding a new section to the homepage.

## Steps

### 1. Create the Component

Create `components/sections/NewSectionName.tsx`:

```typescript
"use client"

import { motion } from "framer-motion"
import { Container } from "@/components/ui/Container"
import { SectionLabel } from "@/components/ui/SectionLabel"

export function NewSectionName() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <SectionLabel>Category Label</SectionLabel>
          <h2 className="font-serif text-3xl md:text-4xl text-gray-900 mt-4">
            Section Title Here
          </h2>
          <p className="text-lg text-gray-600 mt-4 max-w-2xl">
            Section description goes here.
          </p>

          {/* Add section content here */}

        </motion.div>
      </Container>
    </section>
  )
}
```

### 2. Add to Homepage

Edit `app/(main)/page.tsx`:

```typescript
import { NewSectionName } from "@/components/sections/NewSectionName"

export default function Home() {
  return (
    <main>
      {/* ... existing sections ... */}
      <NewSectionName />
      {/* ... more sections ... */}
    </main>
  )
}
```

### 3. Order Sections

Current homepage section order:
1. Hero
2. Dashboard
3. TrustedBy
4. Integrations
5. GallupStats
6. HowItWorks
7. Results
8. Testimonials
9. BuiltForRemote
10. PrivacyFirst
11. ProactiveRetention
12. WhoItsFor
13. GetStarted
14. CTA

## Common Patterns

### With Background Pattern
```typescript
<section className="py-20 md:py-28 bg-gray-50">
```

### With Grid Layout
```typescript
<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
  {items.map((item) => (
    <Card key={item.id}>{/* ... */}</Card>
  ))}
</div>
```

### With Animation Stagger
```typescript
<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={{
    visible: { transition: { staggerChildren: 0.1 } }
  }}
>
  {items.map((item) => (
    <motion.div
      key={item.id}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
    >
      {/* ... */}
    </motion.div>
  ))}
</motion.div>
```

## Checklist

- [ ] Component created in `components/sections/`
- [ ] Named export used (not default)
- [ ] Imported and added to `app/(main)/page.tsx`
- [ ] Responsive design tested (mobile, tablet, desktop)
- [ ] Animations work smoothly
- [ ] `npm run build` passes
