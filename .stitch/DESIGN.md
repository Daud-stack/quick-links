---
name: Quick Links Hub
colors:
  surface: '#0f1117'
  surface-dim: '#0a0b10'
  surface-bright: '#1a1c27'
  surface-container-lowest: '#080910'
  surface-container-low: '#12131d'
  surface-container: '#181a26'
  surface-container-high: '#1f2130'
  surface-container-highest: '#262839'
  on-surface: '#e8e9f0'
  on-surface-variant: '#9a9cad'
  inverse-surface: '#e8e9f0'
  inverse-on-surface: '#1a1c27'
  outline: '#4e5068'
  outline-variant: '#33354a'
  surface-tint: '#7c8aff'
  primary: '#7c8aff'
  on-primary: '#0f1117'
  primary-container: '#2a3070'
  on-primary-container: '#bcc4ff'
  inverse-primary: '#3d4899'
  secondary: '#ff6b9d'
  on-secondary: '#0f1117'
  secondary-container: '#5c1a35'
  on-secondary-container: '#ffb8d0'
  tertiary: '#4dd9b4'
  on-tertiary: '#0f1117'
  tertiary-container: '#0d4a38'
  on-tertiary-container: '#a4f0d8'
  error: '#ff6b6b'
  on-error: '#0f1117'
  error-container: '#5c1a1a'
  on-error-container: '#ffb8b8'
  primary-fixed: '#dce0ff'
  primary-fixed-dim: '#bcc4ff'
  on-primary-fixed: '#141a50'
  on-primary-fixed-variant: '#3d4899'
  secondary-fixed: '#ffd9e6'
  secondary-fixed-dim: '#ffb8d0'
  on-secondary-fixed: '#3e0d21'
  on-secondary-fixed-variant: '#7d2346'
  tertiary-fixed: '#c6f5e4'
  tertiary-fixed-dim: '#a4f0d8'
  on-tertiary-fixed: '#0d3528'
  on-tertiary-fixed-variant: '#1a6b52'
  background: '#0f1117'
  on-background: '#e8e9f0'
  surface-variant: '#262839'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 56px
    fontWeight: '800'
    lineHeight: 64px
    letterSpacing: -0.03em
  display-md:
    fontFamily: Inter
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
    letterSpacing: '0'
  body-base:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0.01em
  body-bold:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: 0.01em
  label-caps:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.08em
  label-md:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
    letterSpacing: 0.02em
rounded:
  sm: 0.375rem
  DEFAULT: 0.75rem
  md: 1rem
  lg: 1.25rem
  xl: 1.5rem
  2xl: 2rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  3xl: 64px
  gutter: 20px
  margin-mobile: 16px
  margin-desktop: 48px
---

# Design System: Quick Links Hub

## 1. Visual Theme & Atmosphere

The Quick Links Hub is a **sleek, dark-mode command center** — designed to feel like a pilot's cockpit or a premium launcher application. The interface greets users with a deep, inky charcoal canvas (`#0f1117`) that recedes into the background, letting the content *float* forward through luminous cards and soft glows. It's the kind of interface that makes you feel productive just by looking at it.

The atmosphere is **calm but electric** — a controlled darkness punctuated by vibrant accent colors that guide the eye to interactive elements without overwhelming. Glassmorphism surfaces with subtle translucency create depth, while smooth micro-animations (hover lifts, gentle glows, and card scale transitions) bring the interface to life. The overall mood sits at the intersection of a developer dashboard and a curated content hub — minimal clutter, maximum intentionality, and a distinctly premium feel.

## 2. Color Palette & Roles

### Primary Foundation
- **Void Black** `#0f1117` — The primary canvas. Deep and warm-cool, not a pure black, giving the interface subtle warmth.
- **Obsidian** `#12131d` — Card and container backgrounds. Just slightly lifted from the canvas to create layering.
- **Slate Mist** `#1a1c27` — Elevated surfaces, modal backgrounds, and hover states.
- **Graphite Edge** `#262839` — Dividers, subtle borders, and surface variants.

### Accent & Interactive
- **Periwinkle Glow** `#7c8aff` — Primary interactive color. Used for CTAs, active link indicators, hover glows, and focused states. A soft lavender-indigo that's calming but attention-drawing.
- **Rose Pulse** `#ff6b9d` — Secondary accent for category badges, notification dots, and visual variety. A warm, vibrant pink that contrasts the cool primary.
- **Mint Spark** `#4dd9b4` — Tertiary accent for success states, online indicators, and quick-action confirmation feedback.

### Typography & Text Hierarchy
- **Lunar White** `#e8e9f0` — Primary text. A soft, not-quite-pure white that's easy on the eyes against dark backgrounds.
- **Silver Haze** `#9a9cad` — Secondary text for descriptions, metadata, timestamps, and helper text.
- **Steel Fog** `#4e5068` — Tertiary text for disabled states and subtle annotations.

### Functional States
- **Coral Alert** `#ff6b6b` — Error states, broken links, and deletion warnings.
- **Mint Spark** `#4dd9b4` — Success confirmations, verified links, and "online" indicators.
- **Amber Signal** `#ffb347` — Warnings and "slow to load" indicators.
- **Periwinkle Glow** `#7c8aff` — Informational tooltips and help states.

## 3. Typography Rules

### Hierarchy & Weights

The typographic system uses **Inter** exclusively — a typeface chosen for its exceptional readability on screens and its clean, geometric precision that complements the dashboard aesthetic. The hierarchy is built on contrast through size and weight rather than through multiple typefaces.

| Role | Size | Weight | Tracking | Usage |
|:---|:---|:---|:---|:---|
| **Display Large** | 56px | 800 (ExtraBold) | -0.03em | Page title — "Quick Links" |
| **Display Medium** | 40px | 700 (Bold) | -0.02em | Section headers if hero-style |
| **Headline Medium** | 24px | 700 (Bold) | -0.01em | Category group headings |
| **Headline Small** | 18px | 600 (SemiBold) | 0 | Card titles, link names |
| **Body Base** | 15px | 400 (Regular) | +0.01em | Descriptions, URL previews |
| **Body Bold** | 15px | 600 (SemiBold) | +0.01em | Inline emphasis, bold metadata |
| **Label Caps** | 11px | 700 (Bold) | +0.08em | Category tags, uppercase badges |
| **Label Medium** | 13px | 500 (Medium) | +0.02em | Metadata, timestamps, counters |

### Spacing Principles

- **Tight tracking on headlines** (`-0.01em` to `-0.03em`) creates a dense, confident presence for titles that feel authoritative.
- **Positive tracking on body and labels** (`+0.01em` to `+0.08em`) opens up smaller text for readability against dark backgrounds.
- **Line heights are generous** at the body level (24px for 15px text = 1.6 ratio) to prevent the dark interface from feeling cramped.
- **Uppercase labels** always pair tight size with wide tracking for a refined "instrument panel" aesthetic.

## 4. Component Stylings

### Buttons

- **Primary**: Filled with Periwinkle Glow (`#7c8aff`), white text, `rounded-md` (1rem), 14px vertical / 24px horizontal padding. On hover: slight scale (1.02) and a soft glow shadow (`0 4px 20px rgba(124, 138, 255, 0.35)`). Active: scale 0.98 for a tactile "press" feel.
- **Secondary / Ghost**: Transparent background with a 1px Graphite Edge (`#262839`) border and Silver Haze text. On hover: background fills to `rgba(124, 138, 255, 0.08)` and border transitions to Periwinkle Glow.
- **Danger**: Coral Alert fill with white text. Hover: deeper red with glow.
- **Transitions**: All state changes use `200ms cubic-bezier(0.4, 0, 0.2, 1)` for a smooth, non-jarring feel.

### Cards & Link Tiles

This is the **core component** of the Quick Links page. Each link is presented as a card tile.

- **Surface**: `surface-container` (`#181a26`) with a 1px `outline-variant` (`#33354a`) border. On hover: border transitions to `rgba(124, 138, 255, 0.4)` and a soft ambient glow appears (`0 8px 32px rgba(124, 138, 255, 0.12)`).
- **Corner radius**: `rounded-lg` (1.25rem) — rounder than buttons for a softer, more approachable feel.
- **Internal padding**: `xl` (32px) — generous to give each link breathing room.
- **Favicon / Icon**: 40×40px with `rounded-md` (1rem) corners, placed left-aligned.
- **Content**: Link title in Headline Small + description in Body Base / Silver Haze below. URL preview in Label Medium / Steel Fog at the bottom.
- **Hover animation**: Entire card lifts by 4px (`translateY(-4px)`) with the border glow, creating a "selection" effect.
- **Category badge**: Positioned top-right as a pill (`rounded-full`) with Label Caps text, color-coded per category (using the secondary/tertiary palette).

### Navigation

- **Top bar**: Fixed at top, `surface-dim` (`#0a0b10`) background with glassmorphism (backdrop-filter: blur(20px), 85% opacity).
- **Logo / Title**: Left-aligned, Display Medium or Headline Medium weight.
- **Search bar**: Centered, occupying up to 480px width, with a `surface-container-high` background, `rounded-xl` corners, and a focus ring of Periwinkle Glow.
- **Action buttons**: Right-aligned (add link, settings). Ghost button style.
- **Mobile**: Collapses to a compact bar with a hamburger menu drawer, keeping search prominent.

### Inputs & Forms

- **Background**: `surface-container-low` (`#12131d`) with a 1px `outline-variant` border.
- **Corner radius**: `rounded-md` (1rem) — consistent with button rounding.
- **Focus state**: Border transitions to Periwinkle Glow with a soft outer glow (`0 0 0 3px rgba(124, 138, 255, 0.2)`).
- **Labels**: Always visible above the input in Label Medium / Silver Haze.
- **Placeholder text**: Steel Fog (`#4e5068`), italic.
- **Padding**: 12px vertical, 16px horizontal.

### Quick-Add Modal

A slide-up modal for adding new links. Glassmorphism surface (80% opacity `surface-container-high`, 24px blur). Centered with a max-width of 520px. Contains text inputs for URL, title, description, and a category selector (pill buttons). A prominent "Add Link" primary button at the bottom.

## 5. Layout Principles

### Grid & Structure

- **Max content width**: 1280px — wide enough for a 4-column card grid on desktop.
- **Grid system**: CSS Grid with auto-fill columns, `minmax(280px, 1fr)` — cards naturally reflow across breakpoints.
- **Column gap**: `lg` (24px). Row gap: `lg` (24px).
- **Page structure**: Fixed top nav → optional hero/search section → category filters → card grid → optional footer.

### Whitespace Strategy

- **Base unit**: 4px grid.
- **Section spacing**: `3xl` (64px) between major sections (nav-to-content, content-to-footer).
- **Card internal padding**: `xl` (32px) — generous for a dashboard feel.
- **Edge padding**: `margin-mobile` (16px) on mobile, `margin-desktop` (48px) on desktop.
- **Between category groups**: `2xl` (48px) for clear visual separation.

### Alignment & Visual Balance

- **Page title**: Left-aligned to anchor the layout.
- **Search**: Centered in the nav or hero section — the primary action deserves prime real estate.
- **Cards**: Left-aligned within the auto-fill grid. Content within cards is left-aligned.
- **Category filters**: Horizontal scroll row of pill buttons, left-aligned, with overflow fade on the right edge.

### Responsive Behavior & Touch

- **Desktop (1024px+)**: 3–4 column card grid, full nav with search bar, generous spacing.
- **Tablet (768px–1023px)**: 2-column grid, search remains visible, spacing reduces to `lg`.
- **Mobile (< 768px)**: Single column, stacked cards, full-width search at top, bottom floating action button for "Add Link".
- **Touch targets**: All interactive elements maintain a minimum 44×44px touch area.
- **Mobile-first approach**: Base styles are for mobile, with `min-width` media queries scaling up.

## 6. Design System Notes for Stitch Generation

### Language to Use

When prompting Stitch for screens in this design system, use atmospheric descriptors like:
- "Dark cockpit dashboard", "premium launcher interface", "inky command center"
- "Floating glass cards with soft glow borders"
- "Electric accent colors against deep charcoal"
- "Calm, minimal, with purposeful color pops"
- "Developer-aesthetic with consumer polish"

### Color References

| Name | Hex | Role |
|:---|:---|:---|
| Void Black | `#0f1117` | Page canvas |
| Obsidian | `#12131d` | Card backgrounds |
| Slate Mist | `#1a1c27` | Elevated surfaces |
| Graphite Edge | `#262839` | Borders, dividers |
| Periwinkle Glow | `#7c8aff` | Primary interactive |
| Rose Pulse | `#ff6b9d` | Secondary accent |
| Mint Spark | `#4dd9b4` | Success / tertiary |
| Lunar White | `#e8e9f0` | Primary text |
| Silver Haze | `#9a9cad` | Secondary text |

### Component Prompts

- **Quick Links Grid**: "A dark dashboard showing a responsive grid of link cards. Each card has a favicon, bold title, short description, and a small category pill badge. Cards have subtle borders that glow blue-purple on hover."
- **Search & Filter Bar**: "A centered search input with rounded corners and a row of horizontal filter pills below it for categories like Work, Social, Dev Tools, Entertainment."
- **Add Link Modal**: "A glassmorphic floating modal with inputs for URL, Title, and Description, a row of category selector pills, and a prominent blue-purple 'Add Link' button."

### Incremental Iteration

- Start with the card grid and nav bar — these define the page's identity.
- Add the search and category filter row next for functionality.
- Polish with hover animations, glassmorphism depth, and micro-interactions last.
- Test mobile layout by verifying single-column card stacking and the floating action button.
