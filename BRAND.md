# Yander Brand Brief — for slide-deck builders

This brief is a self-contained handoff for an AI agent (or designer) building presentation slides that need to match the live yander.ai website. It captures the current "Interfere DNA" aesthetic shipped May 2026, superseding the older Cal-inspired DESIGN.md.

If you only read one section, read **§1 (identity)** and **§9 (anti-patterns)**.

---

## 1. One-line identity

> Editorial sophistication on warm off-white. Inter Medium headlines with tight tracking, mono micro-eyebrows, peach-and-lavender gradient washes for accent surfaces, hairline borders, and soft six-layer drop shadows that make every UI screenshot look like it's floating a half-inch off the paper.

The aesthetic is **single-typeface** (Inter), **near-monochrome** (one ink color, used at four opacities), and **warm-neutral** (not white-on-white — everything sits on a slightly-yellowed off-white). Contrast comes from typography weight and tracking, not bold color blocks.

---

## 2. Color tokens

Use these exact hex values. No others. Tints/shades = the same ink at different opacities.

### Ink (the only foreground color)
| Token | Value | Use |
|---|---|---|
| **ink/primary** | `#171717` | Headlines, primary buttons, body emphasis |
| **ink/secondary** | `#171717` at 60% opacity (`rgba(23,23,23,0.6)`) | Body paragraphs, nav links |
| **ink/tertiary** | `#171717` at 40% opacity (`rgba(23,23,23,0.4)`) | Eyebrows, labels, metadata, axis text |
| **ink/disabled** | `#171717` at 30% opacity (`rgba(23,23,23,0.3)`) | Disabled states, placeholder text |

### Surfaces
| Token | Value | Use |
|---|---|---|
| **surface/canvas** | `#fafaf9` | Page background. Slightly warm off-white. NEVER pure `#ffffff` for the canvas. |
| **surface/card** | `#ffffff` | Cards, mockup frames, lifted surfaces (read as "paper on canvas") |
| **surface/panel** | `#F7F7F6` | Subtle inset panels, micro-sections |
| **border/hairline** | `rgba(0,0,0,0.06)` | Card borders, dividers, mockup frames. Always 1px, never thicker. |

### Accent (use sparingly, max one per slide)
| Token | Value | Use |
|---|---|---|
| **accent/orange** | `#E05000` | Sparkle icons, "AI moment" highlights, single-word emphasis. The ONE chromatic accent in the system. |
| **status/success** | `#15803d` | Success states, percentage gains, "Top X%" callouts |
| **status/warn** | `#92400e` | Amber/warn pills (text on `#fef3c7` background) |
| **status/danger** | `#b91c1c` | Quit-risk, downward trends |

### The warm gradient wash (signature backdrop for testimonials, pull quotes, lift moments)
Three layers, applied in this exact order on a rounded container:

```css
/* Layer 1: linear sweep, corner-to-corner */
background: linear-gradient(to bottom right, #FFE9D8, #ffffff, #E8DCFF);

/* Layer 2: warm peach glow, left side */
position: absolute; left: -80px; top: 0; width: 40%; height: 100%;
background: radial-gradient(ellipse at center, rgba(255,180,140,0.45), transparent 70%);

/* Layer 3: cool lavender glow, right side */
position: absolute; right: -80px; bottom: 0; width: 40%; height: 100%;
background: radial-gradient(ellipse at center, rgba(195,170,255,0.40), transparent 70%);
```

The wash signals "this is the emotional moment" — testimonials, big claims, closing CTAs. Don't use for general sections.

---

## 3. Typography

**One typeface for everything:** Inter. One additional mono for labels: Geist Mono.

Inter Bold and Inter Light are NOT used. The full visual range comes from Inter Medium (500) at different sizes/colors.

### Stack
- **Headlines + body**: `Inter` (variable). Weight: `font-medium` (500). Never 700, never 400 for headlines.
- **Eyebrows + labels + metadata**: `Geist Mono`. Weight: 400 or 500.

### Headline scale (responsive `clamp()`)
Use the larger value for hero, the smaller for sub-section heads.

| Use | clamp() | Line-height | Tracking |
|---|---|---|---|
| Hero H1 | `clamp(2.25rem, 5vw, 3.25rem)` (36-52px) | `1` | `-0.025em` |
| Section H2 (big) | `clamp(2.5rem, 5.2vw, 3.625rem)` (40-58px) | `0.97` | `-0.02em` |
| Section H2 (standard) | `clamp(1.75rem, 3.4vw, 2.5rem)` (28-40px) | `1.05`-`1.08` | `-0.025em` |
| Card title H3 | `22px` | `tight` | `tight` |
| Body | `15px` (long form) / `13-14px` (UI) | `1.5`-`1.6` | normal |

All headlines: `font-medium`, `text-balance` (so wrapping looks intentional), `text-[#171717]`.

### Eyebrow micro-label (mandatory above every section title)
```
font-family: Geist Mono
size: 10.5-11px
text-transform: uppercase
letter-spacing: 0.18em (or 0.14em for tighter)
color: #171717 at 40% opacity
```
Examples: `RECRUIT`, `EVALUATE`, `RETAIN`, `PRICING`, `CASE STUDY`.

---

## 4. Headlines — the signature move

Two-line headlines where the second line is the same Inter Medium but in **ink/secondary** (or `#171717` at 50%) — the color shift, not a font swap, makes the second line read as a quieter "tag" to the bigger statement.

```
Reach beyond your funnel.
Start sourcing smarter.       ← #171717/50, same Inter Medium
```

```
Find the talent
your network can't reach.     ← same Inter Medium, slightly faded
```

Some sections have a wrapper component called `<AccentSerif>`. **In current builds, it does NOT change the font.** It's just a semantic wrapper that lets you bump size by `1.08em` for the hero. Treat all "accent" text as Inter Medium with a color/size shift, never a serif italic.

---

## 5. Layout & surfaces

- **Canvas**: `#fafaf9` (always, never `#ffffff`).
- **Card on canvas**: `#ffffff` with `1px solid rgba(0,0,0,0.06)` border + `rounded-2xl` (16px) or `rounded-3xl` (24px) for hero/testimonial blocks.
- **No filled color blocks for sections.** Sections are just spacing on the canvas. Lift comes from cards + shadows, not background-color section dividers.
- **Container max-width**: `1240px`. Horizontal padding `24px`.
- **Section vertical rhythm**: `py-24 lg:py-32` (96/128 px). For "hero" lift sections use `py-28 lg:py-36`.

---

## 6. Mockups (UI screenshots) — the canonical shadow + tilt

Every product mockup on the site uses a **six-layer drop shadow** that makes it look like the screenshot is floating a half-inch off the canvas:

```css
box-shadow:
  0 149px 199px rgba(0,0,0,0.07),
  0 70px  96px  rgba(0,0,0,0.05),
  0 35px  48px  rgba(0,0,0,0.04),
  0 17px  24px  rgba(0,0,0,0.03),
  0 8px   12px  rgba(0,0,0,0.02),
  0 4px   6px   rgba(0,0,0,0.015),
  inset 0 0 0 0.5px rgba(0,0,0,0.04);
```

Each card is also slightly tilted: `rotate-[1.5deg]` or `-rotate-[1deg]`. The mockup never sits perfectly square — it always has 1-1.5 degrees of off-axis to look like an in-hand prop.

For slides: any UI screenshot or app preview should get this shadow + a subtle tilt. Don't use solid drop-shadows or hard offset shadows.

---

## 7. Logo + mark

- **Wordmark**: `/logo.svg` (in repo). Use at `120×35` (or scaled, `h-7 w-auto`) on light surfaces.
- **Mark**: `<YanderMark>` — used as a small icon in footers, badges, and corners. ~5px when nested in a 16-24px circle.
- **On dark**: same logo + `text-white`. No alternate dark-mode wordmark exists.

---

## 8. Tone & copy rules

- **No em dashes.** Use a period or comma. (Both the website and the user's voice).
- **Sentence case for everything** except eyebrows (which are uppercase mono).
- **Headlines are short and benefits-first.** "Reach beyond your funnel" > "We help you reach beyond your funnel". Cut "we", "you", "us" unless functionally needed.
- **No filler.** "Tell Yander who you need to hire. It headhunts, evaluates, and presents culture-matched candidates ready to interview." 25-30 words max for a subhead.
- **No agency villainization.** Don't position against recruitment agencies — they're potential customers. Lead with product benefits ("more candidates, faster, more cost-effective") not with "stop paying agencies".
- **The word for AI behavior is "AI sourcing" or "AI agent"**, not "robots", "bots", or "automation".

---

## 9. Anti-patterns (things that scream "not Yander")

Avoid these in any slide design:

- ❌ **Pure white `#ffffff` canvas.** Yander canvas is `#fafaf9`. Pure white looks sterile and wrong.
- ❌ **Em dashes.** Period or comma.
- ❌ **Inter Bold (700) headlines.** Yander headlines are Inter Medium (500) with tight tracking — they get their weight from size and `-0.025em` letter-spacing, not from bold.
- ❌ **Purple gradients on white.** Specifically the deep purple `#1e1044` — that was a previous aesthetic that's been retired.
- ❌ **Cal Sans / display-only fonts.** Inter throughout.
- ❌ **Bright accent color blocks** (filled buttons in blue, green, etc.). The only filled-color button is `bg-[#171717]` black on `#ffffff` white. Everything else is outlined.
- ❌ **Sharp corner everything.** Sharp corners were a previous look. Now: `rounded-2xl` (16px) for cards, `rounded-3xl` (24px) for hero/testimonial blocks, `rounded-md` (6-8px) for buttons. Only the icon-button corners are tight.
- ❌ **Robot/sparkle/bot icons in headlines.** The sparkle is reserved for the orange `#E05000` AI-moment glyph; don't sprinkle it as decoration.
- ❌ **Drop shadows with offset and color.** Shadows are six-layer warm-neutral, always centered (no x-offset), always decreasing in blur+spread. No "drop shadow at 45° in slate-500" kind of look.
- ❌ **Tight section padding.** Yander sections are luxuriously spaced (`py-24` to `py-36`). Don't pack content.
- ❌ **More than one chromatic accent per view.** Orange `#E05000` is the one accent. If you've used it, don't also use blue/green/purple in the same composition.
- ❌ **Trying to fill the canvas.** Yander leans into negative space. Slides should breathe.

---

## 10. Quick reference: a "Yander-correct" slide template

```
┌────────────────────────────────────────────────────┐
│  [eyebrow]   PRICING               (mono, 10.5px,  │
│                                     uppercase, /40)│
│                                                    │
│  Start free.                       (Inter Medium,  │
│  Pay when you scale.               clamp 40-58px,  │
│                                     line 0.97,     │
│                                     2nd line /50)  │
│                                                    │
│  Get more qualified candidates,    (Inter 15px,    │
│  faster, more cost-effective       /60, max 480px) │
│  to fill roles.                                    │
│                                                    │
│  [button: black filled "Get Started Free →"]       │
│                                                    │
│                                                    │
│  ┌──────────────────────────────────┐ ← rounded-2xl│
│  │  [UI screenshot with 6-layer     │   #ffffff    │
│  │   shadow, tilted 1.5°]           │   1px border │
│  └──────────────────────────────────┘              │
│                                                    │
└────────────────────────────────────────────────────┘
  Canvas: #fafaf9 throughout. Padding: 96-128px vert.
```

---

## 11. Reference screenshots to capture

To complete this handoff, attach three full-bleed PNGs from [https://yander.ai](https://yander.ai) at desktop width (1440px or 1920px):

1. **Hero** — top of homepage. Shows the hero headline pattern, the canvas color, the candidate mockup with shadow + tilt.
2. **A "feature" section** — scroll to "Evaluate without the busywork" (or any of the Source/Evaluate/Retain features). Shows: section eyebrow micro-label, two-line headline with the color-fade second line, and a tilted UI mockup with the six-layer shadow.
3. **The Arnel pull-quote** — scroll to the testimonial that reads "Every hour I spent screening résumés was an hour I wasn't building." Shows: the peach + lavender + radial gradient backdrop, the headshot avatar with Loudface badge, the two-tone headline pattern (full-ink first sentence, faded second).

Capture them at the live site so the receiving agent sees the actual rendering, not a code interpretation.

---

## Source of truth

This brief was extracted from [components/sections/YanderInterfere.tsx](components/sections/YanderInterfere.tsx) on the `claude/youthful-cerf-a377e1` branch. If anything in the live site has drifted from this brief, the file is the canonical reference, not this document.
