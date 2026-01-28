# Context Audit Skill

Audit agent configuration files for context rot and hygiene issues.

## Instructions

Perform a comprehensive audit of all agent configuration files following these steps:

### Step 1: Count Lines

Run this command and capture output:
```bash
wc -l CLAUDE.md .claude/rules/*.md .claude/skills/*/SKILL.md 2>/dev/null | sort -n
```

Check against limits:
| File Type | Limit | Status |
|-----------|-------|--------|
| CLAUDE.md | 100 lines | |
| Each rule file | 150 lines | |
| Each SKILL.md | 200 lines | |
| Total rules/ | 1000 lines | |

### Step 2: Check for Redundancy

Search for duplicate content patterns:
```bash
# Anti-slop rules (should only be in SKILL.md)
grep -l "AI.slop\|anti-slop\|Never Use.*gradient" .claude/rules/*.md CLAUDE.md 2>/dev/null

# Sanity patterns (should only be in sanity.md)
grep -l "writeClient\|createPost\|SANITY_TOKEN" .claude/rules/*.md CLAUDE.md 2>/dev/null | grep -v sanity.md
```

Flag any files that contain content that should be in a single canonical location.

### Step 3: Verify Structure

Check CLAUDE.md has required sections:
- [ ] Project one-liner (line 1)
- [ ] Architecture table
- [ ] Commands section
- [ ] Rules & Skills table
- [ ] Quick Reference

Check boundaries.md has required sections:
- [ ] ALWAYS section
- [ ] ASK FIRST section
- [ ] NEVER section
- [ ] At least one decision tree

### Step 4: Check for Prose Overload

Flag files with too much prose (decision logic should be in tree format):
```bash
# Files with many "if", "when", "should" phrases may need decision trees
grep -c "if you\|when the\|you should\|in case" .claude/rules/*.md | grep -v ":0$"
```

### Step 5: Generate Report

Create a summary report:

```markdown
## Context Audit Report - [DATE]

### Line Counts
| File | Lines | Limit | Status |
|------|-------|-------|--------|
| CLAUDE.md | X | 100 | ✅/⚠️/❌ |
| ... | | | |

### Redundancy Issues
- [ ] None found / List issues

### Structure Compliance
- [ ] CLAUDE.md: Complete / Missing: X
- [ ] boundaries.md: Complete / Missing: X

### Recommendations
1. ...
2. ...

### Health Score
- X/100 (Excellent/Good/Needs Work/Poor)
```

## Scoring

| Score | Criteria |
|-------|----------|
| 90-100 | All limits met, no redundancy, complete structure |
| 80-89 | Minor issues (1-2 files slightly over limit) |
| 60-79 | Multiple issues needing attention |
| <60 | Major restructure needed |

## Output

Present the audit report to the user with:
1. Overall health score
2. Specific issues found
3. Prioritized recommendations
4. Commands to fix issues (if applicable)
