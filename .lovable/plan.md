

# Add Confetti, Count-Up & Card Hover Glow Effects

## 1. Install canvas-confetti
Add `canvas-confetti` (and its types) as a dependency for the confetti burst on successful contributions.

## 2. Confetti on Successful Contribution
In `src/components/ContributionModal.tsx`:
- Import `canvas-confetti`
- Fire a confetti burst (amber/gold colored particles) via `useEffect` when `txState` transitions to `"success"`
- Use BitHive brand colors (gold, amber, honey) for the confetti particles

## 3. Improved Count-Up Animation
The `CountUp` component in `src/pages/Index.tsx` already uses IntersectionObserver to animate on scroll. Enhancements:
- Add an easing function (ease-out) instead of linear stepping for a more polished feel
- Support decimal values (for the "Total Raised" sBTC stat)
- Add a subtle scale pulse when the animation completes

## 4. Card Hover Glow Effects with Framer Motion
In `src/components/CampaignCard.tsx`:
- Wrap the card in a `motion.div` with `whileHover` for smooth translateY, scale, and animated amber box-shadow glow
- Add a subtle border-color transition to amber on hover
- Respects `prefers-reduced-motion` by keeping hover effects minimal (no transform, just color change)

Also enhance trust/stats cards on the landing page (`src/pages/Index.tsx`) with similar `whileHover` glow effects.

---

## Technical Details

### Files Modified
| File | Change |
|------|--------|
| `package.json` | Add `canvas-confetti` + `@types/canvas-confetti` |
| `src/components/ContributionModal.tsx` | Import confetti, fire burst on success state with gold/amber colors |
| `src/pages/Index.tsx` | Enhance `CountUp` with easing + decimal support; add `whileHover` glow to stats and trust cards |
| `src/components/CampaignCard.tsx` | Wrap in `motion.div` with `whileHover` translateY + boxShadow glow animation |

### Confetti Configuration
- Colors: `['#EAB308', '#F59E0B', '#FBBF24', '#FDE68A']` (amber/gold palette)
- Particle count: 80, spread: 70, origin from center of viewport
- Fires once on success state entry

### Card Hover Motion Config
- `whileHover`: `{ y: -4, boxShadow: "0 8px 30px hsl(43 96% 56% / 0.2)" }`
- `transition`: `{ type: "spring", stiffness: 300, damping: 20 }`

