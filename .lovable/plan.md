

# Error Boundaries + Enhanced Theme Toggle Animation

## 1. Error Boundary Component — `src/components/ErrorBoundary.tsx` (new file)

Create a React class component (error boundaries require class components) that:
- Catches runtime errors via `componentDidCatch` / `getDerivedStateFromError`
- Displays a friendly error UI with the BitHive branding (hexagon icon, amber gradient)
- Shows a "Try Again" button that resets error state and reloads
- Shows a "Go Home" link as fallback
- Uses Framer Motion for a fade-in animation on the error screen

## 2. Wire Error Boundary into App — `src/App.tsx`

Wrap the `<BrowserRouter>` (and its children) with `<ErrorBoundary>` so any page-level crash is caught. Place it inside `ThemeProvider` so the error page respects the current theme.

## 3. Enhanced Theme Toggle Animation — `src/components/layout/Header.tsx`

The current toggle already has a basic rotate+fade animation via `motion.div`. Enhance it with:
- A scale bounce effect (scale 0 → 1.2 → 1) combined with the rotation
- A brief background flash/pulse on the button itself using `motion` `whileTap={{ scale: 0.9 }}`

This is a small tweak to the existing `motion.div` transition properties — no structural changes needed.

## 4. Theme Persistence — Already Done

`ThemeProvider.tsx` already reads from and writes to `localStorage`. No changes needed.

## Files Affected

| File | Action |
|------|--------|
| `src/components/ErrorBoundary.tsx` | Create |
| `src/App.tsx` | Add ErrorBoundary wrapper |
| `src/components/layout/Header.tsx` | Enhance toggle animation |

