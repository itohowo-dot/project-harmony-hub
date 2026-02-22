

# PRD Gap Analysis -- Remaining UI Items

## Summary

The app covers ~90% of the PRD. The following items are not yet implemented or are partially implemented. They are grouped by priority.

## Missing Features

### 1. Sort Dropdown on Explore Page
**PRD Section 5.2** specifies a Sort dropdown alongside the Category filter with options: Newest, Most Funded, Ending Soon, Most Backers. Currently only Category filtering exists.

**Changes:**
- `src/pages/Explore.tsx` -- Add a Sort `<Select>` next to the Category select
- `src/hooks/useCampaigns.ts` -- Add sort logic to the campaign filtering hook

---

### 2. Wallet Connection Modal
**PRD Section 6.1** specifies a modal when clicking "Connect Wallet" showing Leather and Xverse wallet options, plus a "Don't have a wallet? Get Started" link. Currently, the wallet button just toggles a mock connected state.

**Changes:**
- `src/components/WalletModal.tsx` -- New component: a Dialog with two wallet options (Leather, Xverse) styled as clickable rows, and a help link at the bottom
- `src/components/layout/Header.tsx` -- Open the modal on wallet button click instead of directly toggling state
- `src/hooks/useWallet.ts` -- Add modal open/close state management

---

### 3. "How It Works" Step Count (3 vs 4)
**PRD Section 5.1** shows 4 steps: Connect Wallet, Create Campaign, Fund with sBTC, Success/Claim. The current implementation has only 3 steps (Connect, Create or Discover, Fund & Build).

**Changes:**
- `src/pages/Index.tsx` -- Add a 4th step to the `HOW_IT_WORKS` array (e.g., "Celebrate & Claim" or "Success!")

---

### 4. `prefers-reduced-motion` Support
**PRD Section 9.1** requires respecting `prefers-reduced-motion`. Currently, all animations run unconditionally.

**Changes:**
- `src/index.css` -- Add a `@media (prefers-reduced-motion: reduce)` block that disables/reduces animations globally (set `animation-duration: 0.01ms`, `transition-duration: 0.01ms`)
- This is a single CSS addition that covers the entire app

---

### 5. ARIA Attributes on Progress Bars
**PRD Section 9.2** specifies `role="progressbar"` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, and `aria-label` on campaign progress bars.

**Changes:**
- `src/components/CampaignCard.tsx` -- Add ARIA attributes to the progress bar div
- `src/pages/CampaignDetail.tsx` -- Add ARIA attributes to the sidebar progress bar
- `src/pages/CampaignManage.tsx` -- Add ARIA attributes to the status progress bar
- `src/pages/Dashboard.tsx` -- Add ARIA attributes to the `DashboardProgressBar` component

---

### 6. Shimmer Animation on Skeleton Components
**PRD Section 4.9 / 11.4** specifies a left-to-right shimmer gradient animation on skeleton cards. The shimmer keyframe exists in tailwind config but the `Skeleton` UI component may not be using it.

**Changes:**
- `src/components/ui/skeleton.tsx` -- Verify the skeleton uses the shimmer animation class; if not, add `animate-shimmer` with the gradient background

---

### 7. Rotating Gradient Border (Premium Card Effect)
**PRD Section 12.4** describes a premium card with rotating gradient border using `::before` pseudo-element. This decorative effect is not implemented.

**Changes:**
- `src/index.css` -- Add `.premium-card` and `.premium-card::before` CSS classes with the rotating gradient border
- Optionally apply to featured campaign cards or the contribution modal

---

## Technical Details

### Sort Implementation
```
Sort options: "newest" | "most-funded" | "ending-soon" | "most-backers"
```
Sorting logic applied after filtering in `useCampaigns`:
- Newest: sort by `createdAt` descending
- Most Funded: sort by `raisedAmount` descending
- Ending Soon: sort by `daysLeft` ascending (active only)
- Most Backers: sort by `backerCount` descending

### Wallet Modal Layout
```text
+------------------------------------------+
|  Connect Your Wallet                      |
+------------------------------------------+
|  Leather Wallet                     ->    |
|  Most popular Stacks wallet               |
+------------------------------------------+
|  Xverse Wallet                      ->    |
|  Mobile-first Bitcoin wallet              |
+------------------------------------------+
|  Don't have a wallet? Get Started ->      |
+------------------------------------------+
```

### Reduced Motion CSS
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

## Files Changed

| File | Change |
|------|--------|
| `src/pages/Explore.tsx` | Add Sort dropdown |
| `src/hooks/useCampaigns.ts` | Add sort parameter and logic |
| `src/components/WalletModal.tsx` | New -- wallet connection dialog |
| `src/components/layout/Header.tsx` | Open wallet modal instead of toggling |
| `src/hooks/useWallet.ts` | Add modal state |
| `src/pages/Index.tsx` | Add 4th "How It Works" step |
| `src/index.css` | Add `prefers-reduced-motion`, premium card CSS |
| `src/components/CampaignCard.tsx` | Add ARIA attrs to progress bar |
| `src/pages/CampaignDetail.tsx` | Add ARIA attrs to progress bar |
| `src/pages/CampaignManage.tsx` | Add ARIA attrs to progress bar |
| `src/pages/Dashboard.tsx` | Add ARIA attrs to progress bar |
| `src/components/ui/skeleton.tsx` | Ensure shimmer animation is applied |

