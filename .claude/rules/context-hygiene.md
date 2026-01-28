# Context Hygiene Rules

Maintain agent configuration health to prevent context rot.

## Line Count Limits

| File Type | Max Lines | Action if Exceeded |
|-----------|-----------|-------------------|
| CLAUDE.md | 100 | Move details to rules/ |
| Individual rule file | 150 | Move examples to deep-dive/ |
| Skill SKILL.md | 200 | Split into focused skills |
| Total rules/ directory | 1000 | Audit for redundancy |

## Redundancy Prevention

**Single Source of Truth:**
| Topic | Canonical Location |
|-------|-------------------|
| Anti-AI-slop design | `.claude/skills/frontend-design/SKILL.md` |
| Always/Ask/Never boundaries | `.claude/rules/boundaries.md` |
| Sanity CRUD patterns | `.claude/rules/sanity.md` |
| SEO requirements | `.claude/rules/seo.md` |

**Never duplicate** these topics elsewhere. Reference the canonical file instead.

## Structure Requirements

### CLAUDE.md Must Have
- [ ] Project one-liner (first line)
- [ ] Architecture table (key decisions)
- [ ] Commands section (3-5 essential commands)
- [ ] Rules & Skills reference table
- [ ] Quick Reference (5-10 bullets max)

### Rules Files Must Have
- [ ] Single responsibility (one domain per file)
- [ ] Tables over prose (scannable)
- [ ] Decision trees for conditional logic
- [ ] Reference to deep-dive/ for detailed examples

### Boundaries File Must Have
- [ ] ALWAYS section (no confirmation needed)
- [ ] ASK FIRST section (require confirmation)
- [ ] NEVER section (refuse even if asked)
- [ ] Decision trees for common choices

## When to Create Deep-Dive Docs

Move content to `.claude/deep-dive/` when:
- Code examples exceed 20 lines
- Step-by-step tutorials with multiple code blocks
- Reference tables with 10+ rows
- Content only needed for specific tasks (not always)

## Quarterly Audit Checklist

Run `/context-audit` or manually check:

1. **Line counts** - All files within limits?
2. **Redundancy** - Same content in multiple files?
3. **Freshness** - Instructions match current codebase?
4. **Boundaries** - Clear Always/Ask/Never sections?
5. **Decision trees** - Conditional logic in tree format?

## Red Flags

Immediate action needed if you notice:

| Red Flag | Fix |
|----------|-----|
| CLAUDE.md > 100 lines | Extract to rules/ |
| Same instruction in 2+ files | Delete duplicates, keep canonical |
| Prose paragraphs explaining "how to decide" | Convert to decision tree |
| Examples inline in rules | Move to deep-dive/ |
| Rule file > 150 lines | Split or extract examples |

## Adding New Rules

Before creating a new rule file:

1. Check if topic fits existing file
2. Verify no overlap with current rules
3. Use tables and decision trees
4. Keep under 150 lines
5. Add to CLAUDE.md rules table
