

# Add Visible Focus-Visible Ring Styles

## Current State

The project already has a **global** `*:focus-visible` rule in `src/index.css` (line 127) that applies `ring-2 ring-ring ring-offset-2` to all elements. All shadcn UI components (Button, Input, Checkbox, Tabs, etc.) also have their own `focus-visible` classes.

However, there are specific elements where the focus ring is either clipped, invisible, or missing explicit styling:

## Changes

### 1. Campaign Card Link -- `src/components/CampaignCard.tsx`

The `<Link>` wraps a `<Card>` with `overflow-hidden`, which clips the global focus ring. Add explicit `focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg` to the `<Link>` element so the ring renders outside the card boundary.

### 2. Custom Tab Buttons -- `src/pages/Explore.tsx` and `src/pages/Dashboard.tsx`

The custom tab `<button>` elements have no explicit `focus-visible` classes. While the global rule applies, adding `focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none` ensures consistent ring styling matching the rest of the UI components.

### 3. Duration Selector Buttons -- `src/pages/CreateCampaign.tsx`

The duration selector radio buttons (role="radio") lack explicit focus-visible styles. Add `focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none` to each.

### 4. Image Upload Zone -- `src/pages/CreateCampaign.tsx`

The upload `div[role="button"]` has no focus-visible styling. Add `focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none` to the className.

### 5. Milestone Delete Buttons -- `src/pages/CreateCampaign.tsx`

The icon-only delete buttons for milestones need explicit `focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 rounded-md focus-visible:outline-none`.

### 6. Header Nav Links -- `src/components/layout/Header.tsx`

Desktop nav links have `rounded-md` but no explicit focus-visible ring classes. Add `focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none`.

### 7. Mobile Nav Links -- `src/components/layout/MobileNav.tsx`

Same treatment as header nav links for mobile menu items.

### 8. Premium Card wrapper -- `src/index.css`

The `.premium-card` class uses `isolation: isolate` and pseudo-elements. Add a `focus-within` ring style so when the inner link is focused, the card shows a visible ring:
```css
.premium-card:focus-within {
  box-shadow: 0 0 0 2px hsl(var(--background)), 0 0 0 4px hsl(var(--ring));
  border-radius: var(--radius);
}
```

### 9. Footer Links -- `src/components/layout/Footer.tsx`

Footer anchor links should have `focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none rounded-sm` for visible keyboard focus.

## Technical Summary

| # | Element | File | Change |
|---|---------|------|--------|
| 1 | Campaign card link | `CampaignCard.tsx` | Add focus-visible ring + rounded-lg to Link |
| 2 | Custom tab buttons | `Explore.tsx`, `Dashboard.tsx` | Add focus-visible ring classes |
| 3 | Duration radio buttons | `CreateCampaign.tsx` | Add focus-visible ring classes |
| 4 | Upload zone div | `CreateCampaign.tsx` | Add focus-visible ring classes |
| 5 | Milestone delete buttons | `CreateCampaign.tsx` | Add focus-visible ring classes |
| 6 | Header nav links | `Header.tsx` | Add focus-visible ring classes |
| 7 | Mobile nav links | `MobileNav.tsx` | Add focus-visible ring classes |
| 8 | Premium card wrapper | `index.css` | Add focus-within box-shadow |
| 9 | Footer links | `Footer.tsx` | Add focus-visible ring + rounded-sm |

All changes are small class additions -- no new dependencies, no structural changes.

