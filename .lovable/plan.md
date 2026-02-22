

# Parallax Tilt Effect on Dashboard Mockup

## Overview

Add a mouse-tracking tilt effect to the hero dashboard mockup card so it subtly rotates in 3D as the user moves their cursor over it, creating a premium floating-card feel. The effect is disabled on touch devices (mobile) since there's no mouse cursor.

## How It Works

- Track mouse position relative to the card center
- Apply a CSS `perspective` + `rotateX`/`rotateY` transform based on cursor offset
- Use `framer-motion`'s `useMotionValue` and `useSpring` for smooth, springy interpolation
- On mouse leave, spring back to neutral (0, 0)
- A subtle glare/shine overlay shifts with the tilt for extra depth

## Changes

### `src/components/HeroDashboardMockup.tsx`

1. Add mouse event tracking to the outer wrapper div:
   - `onMouseMove` calculates normalized cursor position (-1 to 1) relative to card center
   - `onMouseLeave` resets values to 0

2. Use `useMotionValue` + `useSpring` for `rotateX` and `rotateY`:
   - Max rotation: 8 degrees (subtle but noticeable)
   - Spring config: `stiffness: 150, damping: 20` for a smooth, slightly bouncy feel

3. Wrap the card in a `motion.div` with:
   - `style={{ rotateX, rotateY, transformPerspective: 800 }}`
   - `transformStyle: "preserve-3d"` for proper 3D rendering

4. Add a glare overlay inside the card:
   - A semi-transparent gradient `div` with `pointer-events-none`
   - Its `background-position` shifts based on mouse position via `useTransform`
   - Creates a subtle light reflection that moves with the tilt

5. On mobile/touch devices: skip the effect entirely (no `onMouseMove` handler, no transform) using the existing `use-mobile` hook or a simple media query check

## Technical Details

### Mouse Tracking Logic
```typescript
const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
  const rect = e.currentTarget.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const normalizedX = (e.clientX - centerX) / (rect.width / 2); // -1 to 1
  const normalizedY = (e.clientY - centerY) / (rect.height / 2); // -1 to 1
  rotateXMotion.set(-normalizedY * 8); // Invert Y for natural tilt
  rotateYMotion.set(normalizedX * 8);
};
```

### Spring Values
```typescript
const rotateXMotion = useMotionValue(0);
const rotateYMotion = useMotionValue(0);
const rotateX = useSpring(rotateXMotion, { stiffness: 150, damping: 20 });
const rotateY = useSpring(rotateYMotion, { stiffness: 150, damping: 20 });
```

### Glare Overlay
A gradient div positioned absolutely inside the card:
- `bg-[radial-gradient(circle_at_var(--glare-x)_var(--glare-y),white/8%,transparent_60%)]`
- CSS custom properties `--glare-x` and `--glare-y` updated via `useTransform` from the motion values
- Adds a subtle light sheen that follows the cursor

### Mobile Handling
- Use the existing `useIsMobile()` hook
- When mobile, skip attaching mouse handlers and don't apply the perspective transform
- The card renders normally without any tilt on touch devices

## Files Changed

| File | Change |
|------|--------|
| `src/components/HeroDashboardMockup.tsx` | Add mouse-tracking tilt with `useMotionValue`/`useSpring`, glare overlay, mobile guard |

