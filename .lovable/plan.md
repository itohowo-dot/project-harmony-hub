

# Landing Page Tightening

## Issues Found

### 1. Competing hover effects on campaign cards (visual conflict)
The `premium-card` CSS class adds `scale(1.02)` on hover, while the `CampaignCard` component's inner `motion.div` also applies `whileHover={{ y: -4, boxShadow: "..." }}`. These two hover animations fight each other, causing a jittery double-transform effect.

**Fix**: Remove the `whileHover` from inside `CampaignCard` since `premium-card` already handles the hover lift/scale.

### 2. Hero subtitle lacks max-width constraint
The subtitle paragraph under "Fund the Future with Bitcoin" runs too wide on larger screens, reducing readability.

**Fix**: Add `max-w-2xl` to the subtitle `<p>` tag (line 248).

### 3. Excessive vertical spacing between sections
Several sections have generous padding that makes the page feel loose:
- Stats section: `py-12` is too generous for a compact stat bar
- Featured Campaigns to How It Works gap is large
- Trust indicators section: `py-16 md:py-20` before the CTA creates dead space
- CTA section: `py-16 md:py-20` is generous for a simple closing CTA

**Fix**: Tighten padding values:
- Stats: `py-12` to `py-10`
- Featured Campaigns: `py-16 md:py-20` to `py-14 md:py-16`
- Trust indicators: `py-16 md:py-20` to `py-12 md:py-16`
- CTA: `py-16 md:py-20` to `py-14 md:py-16`

### 4. How It Works section has loose internal spacing
The `mb-16` header margin and `mt-14` CTA margin are generous.

**Fix**: Tighten to `mb-12` and `mt-10`.

### 5. Unused import
`formatBtc` is imported in `Index.tsx` but never used.

**Fix**: Remove from the import statement.

---

## Technical Details

### Files to modify

| File | Changes |
|------|---------|
| `src/pages/Index.tsx` | Remove unused `formatBtc` import; add `max-w-2xl` to hero subtitle; tighten section padding values; tighten How It Works internal spacing |
| `src/components/CampaignCard.tsx` | Remove `whileHover` from inner `motion.div` to avoid conflicting with `premium-card` hover |

