
# Fix Premium Card CSS + Cross-Page Scroll Verification

## 1. Fix Premium Card Rotating Gradient Border

The current `.premium-card` CSS has two issues preventing the gradient border from showing:

1. **`overflow: hidden`** clips the `::before` pseudo-element which extends beyond the card via `inset: -2px`
2. **`z-index: -1`** on `::before` pushes it behind the card background, making it invisible

### Changes

**`src/index.css`** (lines 209-213) -- Update `.premium-card`:
- Remove `overflow: hidden`
- Add `isolation: isolate` to create a proper stacking context so `z-index: -1` works correctly relative to the card, not the page background

```css
.premium-card {
  position: relative;
  isolation: isolate;
  border-radius: var(--radius);
}
```

No changes needed to the `::before` pseudo-element -- the `inset: -2px` and `z-index: -1` approach is correct once `isolation: isolate` creates the stacking context.

## 2. Test Cross-Page Smooth Scroll

After the CSS fix, navigate to `/explore` and click the "How It Works" footer link to verify it navigates back to `/` and scrolls to the section. This is already implemented in `Footer.tsx` with retry logic -- just needs manual verification.

## Files Changed

| File | Change |
|------|--------|
| `src/index.css` | Remove `overflow: hidden`, add `isolation: isolate` on `.premium-card` |
