
# Premium Card Effect + Smooth Scroll Verification

## 1. Apply Premium Card Border to Featured Campaign Cards

Add the `premium-card` class to the featured campaign cards on the landing page. The `.premium-card` CSS with the rotating gradient border already exists in `index.css` -- it just needs to be applied.

### Changes

**`src/pages/Index.tsx`** (lines 326-334)
- Add `className="premium-card"` to the `motion.div` wrapper around each `CampaignCard` in the Featured Campaigns grid
- This activates the rotating conic-gradient border effect defined in the existing CSS

The wrapper becomes:
```tsx
<motion.div
  key={campaign.id}
  className="premium-card"
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ delay: i * 0.1 }}
>
  <CampaignCard campaign={campaign} />
</motion.div>
```

## 2. Smooth Scroll to "How It Works" -- Already Implemented

The Footer component already has full smooth-scroll behavior for the "How It Works" link:
- If on `/`, it scrolls directly to `#how-it-works`
- If on another page, it navigates to `/` first, then retries scrolling up to 3 times with 400ms intervals
- The `HowItWorksSection` already has `id="how-it-works"` on the section element

No changes needed for this feature -- it is fully functional.

## Files Changed

| File | Change |
|------|--------|
| `src/pages/Index.tsx` | Add `premium-card` class to featured campaign card wrappers |
