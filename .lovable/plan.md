

# Dark/Light Theme Toggle + Smooth Scroll + Parallax Hexagons

## 1. Dark/Light Theme Toggle

### 1a. Create a Theme Provider
**New file**: `src/components/ThemeProvider.tsx`
- A React context that reads/writes a `"theme"` key from `localStorage`
- Toggles the `dark` class on `<html>` element
- Defaults to `"dark"` (current theme)
- Exposes `theme` and `toggleTheme` via context hook `useTheme()`

### 1b. Add Light Theme CSS Variables
**File**: `src/index.css`
- Add a `.light` (or `:root` without `.dark`) block with light-mode color tokens:
  - Background: warm off-white (`40 30% 96%`)
  - Foreground: dark navy (`222 47% 11%`)
  - Card: white with subtle warmth (`40 20% 98%`)
  - Primary: same amber (`43 96% 46%` -- slightly darker for contrast on light bg)
  - Secondary: light amber tint (`43 30% 92%`)
  - Muted: light gray (`220 15% 92%`)
  - Muted-foreground: medium gray (`220 10% 40%`)
  - Border: light warm gray (`40 10% 85%`)
  - All sidebar tokens adapted for light
- Move current `:root` values into a `.dark` class block
- Keep `:root` as the light theme (default dark via class)

### 1c. Add Toggle Button to Header
**File**: `src/components/layout/Header.tsx`
- Import `Sun` and `Moon` icons from lucide-react
- Import `useTheme` hook
- Add a small icon button between the nav links and wallet button
- Sun icon in dark mode, Moon icon in light mode
- Smooth rotation animation on toggle using framer-motion

### 1d. Wrap App with ThemeProvider
**File**: `src/App.tsx`
- Wrap the entire app with `<ThemeProvider>`

### 1e. Update gradient utilities for light mode
**File**: `src/index.css`
- The `.text-gradient-amber`, `.glow-amber`, `.bg-gradient-card`, `.bg-gradient-navy` utilities work in both modes since they reference CSS variables or use amber which works on both backgrounds
- `.honeycomb-bg` SVG stroke color: use a CSS variable or reduce opacity further in light mode via `.light .honeycomb-bg { opacity: 0.04 }`
- Scrollbar colors: add `.light` overrides for track/thumb

---

## 2. Smooth Scroll to "How It Works"

### 2a. Fix Footer Link
**File**: `src/components/layout/Footer.tsx`
- Replace the `<a href="/#how-it-works">` with an `onClick` handler
- If already on `/`, use `document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })`
- If on another page, navigate to `/` first, then scroll after mount (use `useNavigate` + setTimeout or a hash-based approach)

### 2b. Add `scroll-behavior: smooth` globally
**File**: `src/index.css`
- Add `html { scroll-behavior: smooth; }` in the base layer (simple and covers all hash links)

---

## 3. Parallax Scrolling on Hero Hexagons

### File: `src/pages/Index.tsx`
- Replace the current `FloatingHexagons` component with a parallax-aware version
- Use `framer-motion`'s `useScroll` and `useTransform` hooks to track scroll position
- Each hexagon moves at a different rate based on its index (slower = further away feel)
- Add slight horizontal drift and rotation tied to scroll for a more dynamic feel
- The hexagons already float with `y: [0, -15, 0]` animation -- parallax adds a scroll-based vertical offset on top of that

---

## Summary of File Changes

| File | Change |
|------|--------|
| `src/components/ThemeProvider.tsx` | **New** -- theme context with localStorage persistence |
| `src/index.css` | Split into light/dark variables, add `scroll-behavior: smooth`, light-mode scrollbar + honeycomb overrides |
| `src/components/layout/Header.tsx` | Add Sun/Moon toggle button with animation |
| `src/App.tsx` | Wrap with `<ThemeProvider>` |
| `src/components/layout/Footer.tsx` | Smooth scroll handler for "How It Works" link |
| `src/pages/Index.tsx` | Parallax effect on `FloatingHexagons` using `useScroll`/`useTransform` |

