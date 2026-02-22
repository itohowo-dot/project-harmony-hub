
# Add Glow Intensification on Hover to Premium Cards

## Mobile Verification Result
All landing page sections look clean on mobile (390px):
- Hero: subtitle wraps naturally, CTAs are full-width and tappable
- Stats: stacked vertically with proper spacing
- Featured Campaigns: single-column cards with rotating borders
- How It Works: steps stack cleanly
- Trust Indicators: cards stack with good padding
- CTA: centered, readable, well-spaced

No mobile issues found.

## Glow Enhancement

Add a glowing box-shadow on hover to the `.premium-card` class, creating a warm amber glow that intensifies when the user hovers. This complements the existing `scale(1.02)` and faster border rotation.

### Changes

**File: `src/index.css`** -- Update `.premium-card` and `.premium-card:hover`

Add a `box-shadow` transition to the base state and an amber glow `box-shadow` on hover:

```css
.premium-card {
  position: relative;
  isolation: isolate;
  border-radius: var(--radius);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.premium-card:hover {
  transform: scale(1.02);
  box-shadow: 0 0 20px hsl(43 96% 56% / 0.25), 0 0 60px hsl(43 96% 56% / 0.1);
}
```

Also add a light-mode override to keep the glow subtler on light backgrounds:

```css
:root:not(.dark) .premium-card:hover {
  box-shadow: 0 0 15px hsl(43 96% 46% / 0.2), 0 0 40px hsl(43 96% 46% / 0.08);
}
```

This is a single-file, 3-line addition that layers on top of the existing hover effects.
