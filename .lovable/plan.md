

# Animated Dashboard Mockup for Landing Page

## Overview

Add an animated "mini dashboard" mockup below the hero text on the landing page. It will feature a recharts AreaChart with smoothly cycling data values, a pulsing "live" indicator, and a gradient fill that shifts color in sync with the value cycling — creating a polished, living preview of the platform.

## Design

The mockup sits inside a styled card below the hero CTA buttons, appearing like a floating app screenshot. It includes:

- A faux window chrome bar (three dots + title)
- A row of animated stat counters (Total Raised, Active Campaigns, Live Backers)
- A recharts AreaChart with smooth data that cycles every 3 seconds
- The area gradient shifts between amber and a warmer orange tone as values change
- A pulsing green "Live" badge in the corner

## Component Architecture

### New File: `src/components/HeroDashboardMockup.tsx`

A self-contained component with:

1. **Data cycling** -- `useState` + `useEffect` with a 3-second interval that rotates through 4 pre-defined data snapshots. Uses `useRef` to track the current index.

2. **Area chart** -- Uses `recharts` (already installed) `AreaChart`, `Area`, `ResponsiveContainer` directly (no need for the chart.tsx wrapper for this simple use case). The chart has no axes/grid for a clean mockup look.

3. **Gradient color shift** -- An SVG `<linearGradient>` inside the chart's `<defs>` whose stop colors animate via inline style transitions. The gradient shifts between `hsl(43, 96%, 56%)` (amber) and `hsl(30, 96%, 50%)` (warm orange) keyed to the current data index.

4. **Stat counters** -- Three small stat displays that smoothly interpolate between values using a spring-like transition (CSS `transition` on the displayed number via state updates in small increments with `requestAnimationFrame`).

5. **Pulse indicator** -- A green dot with `animate-ping` for the "Live" badge.

### Data Snapshots

```typescript
const DATA_SETS = [
  [
    { x: 0, v: 20 }, { x: 1, v: 35 }, { x: 2, v: 28 },
    { x: 3, v: 45 }, { x: 4, v: 52 }, { x: 5, v: 48 }, { x: 6, v: 60 }
  ],
  [
    { x: 0, v: 25 }, { x: 1, v: 40 }, { x: 2, v: 32 },
    { x: 3, v: 50 }, { x: 4, v: 58 }, { x: 5, v: 55 }, { x: 6, v: 68 }
  ],
  // ... 2 more sets with slight variations
];
```

### Gradient Sync

The area fill references an SVG gradient ID. The gradient's stop colors are set via React state that updates alongside the data index:

```typescript
const GRADIENT_COLORS = [
  { start: "hsl(43, 96%, 56%)", end: "hsl(43, 96%, 56%)" },   // Pure amber
  { start: "hsl(38, 96%, 52%)", end: "hsl(43, 96%, 56%)" },   // Warm shift
  { start: "hsl(33, 96%, 50%)", end: "hsl(38, 96%, 52%)" },   // Warmer
  { start: "hsl(38, 96%, 52%)", end: "hsl(43, 96%, 56%)" },   // Back to amber
];
```

The `<stop>` elements use `style={{ transition: "stop-color 1.5s ease-in-out" }}` for smooth color morphing.

### Mockup Visual Layout

```text
+------------------------------------------+
| (o) (o) (o)   BitHive Dashboard   [Live] |
+------------------------------------------+
|  12.4 sBTC    |   24 Active   |  156     |
|  Total Raised |   Campaigns   |  Backers |
+------------------------------------------+
|                                          |
|   ~~~~~~~~  (Area Chart)  ~~~~~~~~       |
|  /        \          /          \        |
| /          \________/            \___    |
|                                          |
+------------------------------------------+
```

### Mobile Responsiveness

- On mobile (< md), the mockup scales down with `max-w-sm mx-auto`
- Stats row uses smaller text (`text-xs`) and tighter padding
- Chart height reduces from `h-32` to `h-24`
- The entire mockup card has `overflow-hidden` to prevent any bleed

## Changes to `src/pages/Index.tsx`

- Import and render `<HeroDashboardMockup />` below the CTA buttons div
- Wrap it in a `motion.div` with `initial={{ opacity: 0, y: 40 }}` and `animate={{ opacity: 1, y: 0 }}` with `delay: 0.5` for a staggered entrance after the text
- Add `mt-12 md:mt-16` spacing

## File Summary

| File | Change |
|------|--------|
| `src/components/HeroDashboardMockup.tsx` | New -- animated dashboard mockup with cycling area chart and gradient shift |
| `src/pages/Index.tsx` | Import and render mockup below hero CTA buttons |

## Technical Notes

- Uses `recharts` directly (AreaChart, Area, ResponsiveContainer) -- already installed
- No external dependencies needed
- The `animationDuration` prop on `<Area>` is set to 1500ms for smooth data transitions
- The cycling interval cleans up properly via `useEffect` return
- `framer-motion` handles the entrance animation; recharts handles the chart transitions natively
- SVG gradient stop-color CSS transitions are well-supported across browsers
