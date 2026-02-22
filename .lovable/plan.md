

# Speed Up Premium Card Border Rotation on Hover

## Change

**`src/index.css`** -- Add a hover rule that reduces the animation duration on `.premium-card::before`:

```css
.premium-card:hover::before {
  animation-duration: 1.5s;
}
```

The base rotation is `4s linear infinite`. On hover, reducing to `1.5s` creates a noticeable but smooth speed-up. Adding `transition` to the pseudo-element is not needed since `animation-duration` changes take effect on the next cycle naturally, and the continuous rotation makes this feel seamless.

## Files Changed

| File | Change |
|------|--------|
| `src/index.css` | Add `.premium-card:hover::before` rule with faster animation duration |

