

# Level Up BitHive -- Comprehensive Polish & UX Upgrade

After reviewing every page and component, here are the highest-impact improvements grouped into one cohesive upgrade.

---

## 1. Animated Page Transitions Between Routes

Currently each page fades in independently. Add smooth cross-fade transitions using `AnimatePresence` in `App.tsx` wrapping the route outlet, so navigating between pages feels seamless rather than jumpy.

**File**: `src/App.tsx`

---

## 2. Skeleton Loading States for Campaign Cards

When pages load (especially via lazy loading), show shimmer skeleton cards instead of a blank spinner. Create a `CampaignCardSkeleton` component and use it on the Explore page and Dashboard while data "loads."

**New file**: `src/components/CampaignCardSkeleton.tsx`
- 4 skeleton cards matching the CampaignCard layout (image area, title bar, progress bar, meta row)
- Uses the existing `Skeleton` component with amber-tinted shimmer

**Modified**: `src/pages/Explore.tsx` -- show skeleton grid briefly
**Modified**: `src/pages/Dashboard.tsx` -- show skeleton list items

---

## 3. Upgraded 404 Page

The current 404 page is plain and doesn't match the app's dark theme. Replace it with a branded page using the honeycomb background, a large animated hexagon, and proper navigation back.

**File**: `src/pages/NotFound.tsx`
- Use `PageWrapper` for consistent header/footer
- Honeycomb background + floating hexagon animation
- "Return to Hive" CTA button with glow

---

## 4. Toast Notifications for Key Actions

Add success/error toasts for:
- Campaign creation ("Campaign launched successfully!")
- Wallet connect/disconnect ("Wallet connected" / "Wallet disconnected")

**Modified**: `src/pages/CreateCampaign.tsx` -- toast on launch
**Modified**: `src/hooks/useWallet.ts` -- toast on connect/disconnect (import `toast` from sonner)

---

## 5. Footer Links That Actually Work

Footer links are currently dead `<li>` elements. Convert them to proper `<Link>` components pointing to real routes.

**File**: `src/components/layout/Footer.tsx`
- "Explore Campaigns" -> `/explore`
- "Create Campaign" -> `/create`
- "Dashboard" -> `/dashboard`
- "How It Works" -> `/#how-it-works` (scroll anchor)

---

## 6. Progress Bar Animation on Scroll

Campaign card progress bars currently render at full width immediately. Add an intersection observer so the progress bar fills from 0 to its target width when scrolled into view -- a satisfying visual effect.

**File**: `src/components/CampaignCard.tsx`
- Add a small `useEffect` + `IntersectionObserver` to animate the bar width from 0

---

## 7. Keyboard Accessibility & Focus Indicators

Add visible focus rings (amber-colored) on interactive elements for keyboard navigation. Currently there are no custom focus styles.

**File**: `src/index.css`
- Add `focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background` utilities
- Apply globally to buttons, links, and cards

---

## 8. Empty State for Dashboard

When the user has no campaigns or contributions, show a friendly empty state with a hexagon illustration and a CTA instead of just nothing.

**File**: `src/pages/Dashboard.tsx`
- Add empty state block with icon + message + CTA button

---

## Summary of All File Changes

| File | Change |
|------|--------|
| `src/App.tsx` | Add `AnimatePresence` for route transitions |
| `src/components/CampaignCardSkeleton.tsx` | **New** -- shimmer skeleton matching card layout |
| `src/components/CampaignCard.tsx` | Add progress bar scroll animation |
| `src/pages/Explore.tsx` | Show skeleton grid during initial render |
| `src/pages/Dashboard.tsx` | Show skeletons + empty state for no data |
| `src/pages/NotFound.tsx` | Redesign with branded theme + PageWrapper |
| `src/pages/CreateCampaign.tsx` | Add success toast on launch |
| `src/hooks/useWallet.ts` | Add connect/disconnect toasts |
| `src/components/layout/Footer.tsx` | Convert dead links to real `<Link>` components |
| `src/index.css` | Add global focus-visible ring styles |

---

## Technical Details

### Route Transitions
- Wrap `<Routes>` children with `AnimatePresence mode="wait"` and a `motion.div` keyed on `location.pathname`
- Uses `useLocation()` from react-router-dom

### Skeleton Shimmer
- Uses the existing `Skeleton` from `src/components/ui/skeleton.tsx`
- Card skeleton: 16:10 aspect ratio image area + 3 text lines + progress bar + meta row
- List skeleton (Dashboard): horizontal layout matching the existing card rows

### Progress Bar Animation
- `IntersectionObserver` with `threshold: 0.3`
- CSS transition from `width: 0` to target width over 800ms with ease-out
- `hasAnimated` ref to fire only once

### Focus Styles
```css
*:focus-visible {
  outline: none;
  ring: 2px solid hsl(var(--primary));
  ring-offset: 2px solid hsl(var(--background));
}
```

