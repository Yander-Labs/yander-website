# Context Engineering Playbook

A portable guide to setting up optimal AI agent configuration for any codebase. Copy this to a new project and follow the instructions.

---

## The Problem: Context Rot

When AI agent instructions exceed ~150-200 effective instructions, models experience "context rot":
- Instructions get ignored uniformly (not selectively)
- Middle-of-document content gets least attention
- Redundant instructions compound the problem
- Prose is harder to follow than structured formats

**Research basis:** Claude Code's system prompt uses ~50 high-quality instructions. Cursor recommends keeping rules files concise. Frontier LLMs can reliably follow 150-200 instructions maximum.

---

## Target Architecture

```
project-root/
├── CLAUDE.md                    # 60-100 lines - Pointer file
├── .claude/
│   ├── rules/                   # Domain-specific rules
│   │   ├── boundaries.md        # Always/Ask/Never (40-80 lines)
│   │   ├── [domain].md          # One file per domain (≤150 lines each)
│   │   └── context-hygiene.md   # Maintenance rules
│   ├── commands/                # User-invocable skills
│   │   ├── [skill-name].md      # Task-specific instructions
│   │   └── context-audit.md     # Health check skill
│   ├── skills/                  # Complex skill bundles
│   │   └── [skill-name]/
│   │       └── SKILL.md         # ≤200 lines
│   └── deep-dive/               # Reference docs (loaded on demand)
│       └── [topic].md           # Detailed examples, tutorials
```

### Line Count Limits

| File | Max Lines | Purpose |
|------|-----------|---------|
| CLAUDE.md | 100 | Entry point, essential context only |
| rules/*.md | 150 each | Domain rules, tables, decision trees |
| skills/*/SKILL.md | 200 | Complex task instructions |
| Total always-loaded | 1000 | Prevents context rot |

---

## Step 1: Audit Existing Files

Before restructuring, understand what you have:

```bash
# Count lines in all agent config files
find . -name "CLAUDE.md" -o -name "AGENTS.md" -o -name "*.mdc" | xargs wc -l
find .claude -name "*.md" 2>/dev/null | xargs wc -l
find .cursor -name "*.md" 2>/dev/null | xargs wc -l

# Find redundancy (same content in multiple files)
grep -r "your-key-pattern" --include="*.md" .
```

**Red flags:**
- Total > 1500 lines
- Single file > 300 lines
- Same instruction in 2+ files
- Long prose explanations

---

## Step 2: Create CLAUDE.md (Pointer File)

Template:

```markdown
# [Project Name]

[One-line description of the project]

## Architecture

| Decision | Rationale |
|----------|-----------|
| [Key tech choice] | [Why] |
| [Key pattern] | [Why] |

## Commands

```bash
[3-5 essential commands with comments]
```

## Rules & Skills

| Topic | Location |
|-------|----------|
| Boundaries | `.claude/rules/boundaries.md` |
| [Domain 1] | `.claude/rules/[domain].md` |
| [Domain 2] | `.claude/rules/[domain].md` |
| [Skill 1] | `.claude/commands/[skill].md` |

## Quick Reference

- [5-10 most important conventions as bullets]
- [Things the agent needs to know constantly]
```

**Key principles:**
- First line = project identity
- Tables over prose
- Reference other files, don't duplicate
- Only include what's needed for EVERY task

---

## Step 3: Create boundaries.md

This is the most important rule file. Template:

```markdown
# Agent Boundaries

## ALWAYS (No confirmation needed)

- Read any file in the repository
- Run build and lint commands
- [Safe operations for your project]

## ASK FIRST (Require explicit user confirmation)

- Delete any [important resources]
- Modify [critical config files]
- [Destructive or irreversible operations]

## NEVER (Refuse even if asked)

- Commit API keys, tokens, or secrets
- [Security-critical prohibitions]
- [Project-specific hard limits]

## Decision Trees

### [Common Decision 1]
```
IF [condition]
  THEN [action]
ELSE IF [condition]
  THEN [action]
ELSE
  [default action]
```

### [Common Decision 2]
```
[Another decision tree]
```
```

**Decision tree format beats prose** because:
- Unambiguous logic flow
- Easy to scan
- No interpretation needed
- Covers edge cases explicitly

---

## Step 4: Create Domain Rules

One file per domain. Template:

```markdown
# [Domain] Rules

## [Section 1 - Tables]

| [Column 1] | [Column 2] | [Column 3] |
|------------|------------|------------|
| [Data] | [Data] | [Data] |

## [Section 2 - Quick Reference]

```[language]
// Essential code pattern
```

## [Section 3 - Checklist]

- [ ] [Requirement 1]
- [ ] [Requirement 2]

## Detailed Examples

See `.claude/deep-dive/[topic].md` for:
- [Detailed example 1]
- [Detailed example 2]
```

**Rules for rules files:**
- Tables for reference data
- Code blocks for patterns (keep short)
- Checklists for workflows
- Move long examples to deep-dive/

---

## Step 5: Create Deep-Dive Docs

For detailed examples that aren't needed for every task:

```markdown
# [Topic] - Detailed Examples

> This file is loaded on demand. Keep rules files concise by referencing this.

## [Example Category 1]

```[language]
// Full code example with comments
```

## [Example Category 2]

[Step-by-step tutorial content]
```

---

## Step 6: Set Up Maintenance

Create `.claude/rules/context-hygiene.md`:

```markdown
# Context Hygiene Rules

## Line Count Limits

| File Type | Max Lines |
|-----------|-----------|
| CLAUDE.md | 100 |
| Rule file | 150 |
| SKILL.md | 200 |
| Total rules/ | 1000 |

## Single Source of Truth

| Topic | Canonical Location |
|-------|-------------------|
| [Topic 1] | [File path] |
| [Topic 2] | [File path] |

## Red Flags

| Issue | Fix |
|-------|-----|
| File > limit | Extract to deep-dive/ |
| Duplicate content | Delete, keep canonical |
| Prose decisions | Convert to decision tree |
```

Create `.claude/commands/context-audit.md`:
- Skill to audit line counts
- Check for redundancy
- Verify structure
- Generate health score

---

## Anti-Patterns to Avoid

### 1. The Mega-File
❌ One 500-line CLAUDE.md with everything
✅ 60-line pointer file + focused rule files

### 2. Copy-Paste Duplication
❌ Same "don't do X" rule in 4 files
✅ Single canonical location, reference elsewhere

### 3. Prose Explanations
❌ "When you're creating a component, if it needs state you should add 'use client', but if it doesn't need state then you shouldn't add it, unless..."
✅ Decision tree with clear IF/THEN/ELSE

### 4. Inline Examples
❌ 50-line code example in a rules file
✅ Short pattern in rules, full example in deep-dive/

### 5. Kitchen Sink Skills
❌ 400-line skill that does everything
✅ Focused skills under 200 lines each

---

## Migration Checklist

When applying to a new codebase:

- [ ] Audit existing files (line counts, redundancy)
- [ ] Create directory structure (`.claude/rules/`, `.claude/deep-dive/`)
- [ ] Write CLAUDE.md as pointer file (≤100 lines)
- [ ] Write boundaries.md with Always/Ask/Never sections
- [ ] Create domain rule files (one per domain, ≤150 lines each)
- [ ] Move detailed examples to deep-dive/
- [ ] Add context-hygiene.md for maintenance
- [ ] Add context-audit.md skill
- [ ] Delete redundant files (AGENTS.md if duplicative)
- [ ] Verify total always-loaded content ≤1000 lines
- [ ] Run build to verify no breaks

---

## Metrics for Success

| Metric | Target |
|--------|--------|
| CLAUDE.md lines | ≤100 |
| Total rules/ lines | ≤1000 |
| Redundant content | 0 locations |
| Decision trees | ≥3 (for common choices) |
| Files > 200 lines | 0 |

---

## Quick Reference Card

```
CLAUDE.md = Pointer file (100 lines max)
           → Architecture, commands, file locations

boundaries.md = Always/Ask/Never + decision trees
               → What agent can/can't do autonomously

rules/*.md = Domain-specific rules (150 lines each)
            → Tables, short patterns, checklists

deep-dive/*.md = Detailed examples (loaded on demand)
                → Full tutorials, long code examples

commands/*.md = User-invocable skills
               → Task-specific instructions

TOTAL ALWAYS-LOADED ≤ 1000 lines
```
