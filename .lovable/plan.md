

# Accessibility: Keyboard Navigation and ARIA Labels

## Overview

After auditing every interactive component and page, here are the specific accessibility gaps and fixes needed. The changes are grouped by component/page.

---

## 1. Form Labels -- CreateCampaign.tsx and ContributionModal.tsx

**Problem:** Plain `<label>` elements are not linked to their inputs via `htmlFor`/`id` pairs. Screen readers cannot associate labels with controls.

**Fix:** Add unique `id` attributes to each `Input`/`Textarea`/`Select` and matching `htmlFor` on labels.

- `CreateCampaign.tsx`: Campaign Title, Description, Category, Funding Goal, Campaign Duration labels (lines 190, 201, 213, 277, 289)
- `ContributionModal.tsx`: Amount label (line 66)

---

## 2. Duration Selector -- CreateCampaign.tsx

**Problem:** The 4 duration buttons (7/14/30/60 days) are visually a radio group but have no ARIA semantics. Screen readers see them as generic buttons with no grouping or selection state.

**Fix:** Wrap in a `div` with `role="radiogroup"` and `aria-labelledby` pointing to the "Campaign Duration" label. Each button gets `role="radio"` and `aria-checked`.

---

## 3. Custom Tab Bars -- Dashboard.tsx, Explore.tsx

**Problem:** The "My Campaigns / My Contributions" tabs in Dashboard and "All / Active / Successful / Ending Soon" tabs in Explore use plain `<button>` elements with no `role="tablist"` / `role="tab"` / `aria-selected` semantics.

**Fix:** Add `role="tablist"` to the container `div`, `role="tab"` and `aria-selected` to each button.

---

## 4. Image Upload Area -- CreateCampaign.tsx

**Problem:** The drag-and-drop upload zone is a `div` with `onClick` but no keyboard support. It cannot be focused or activated with Enter/Space.

**Fix:** Add `role="button"`, `tabIndex={0}`, `aria-label="Upload campaign image"`, and an `onKeyDown` handler that triggers the file input on Enter/Space.

---

## 5. Remove Image Button -- CreateCampaign.tsx

**Problem:** The "X" button to remove the uploaded image has no accessible label.

**Fix:** Add `aria-label="Remove image"`.

---

## 6. Icon-Only Buttons Missing Labels

**Problem:** Several icon-only buttons lack `aria-label`:
- Dashboard "View" button (Eye icon, line 213)
- Milestone "Delete" button (Trash2 icon, line 357 in CreateCampaign)
- ContributionModal "View on Explorer" button (has text, OK)

**Fix:** Add `aria-label` to each icon-only button.

---

## 7. Navigation `aria-current` -- Header.tsx, MobileNav.tsx

**Problem:** Active nav links don't communicate current page to assistive technology.

**Fix:** Add `aria-current="page"` when the link is active.

---

## 8. Campaign Card Accessible Name -- CampaignCard.tsx

**Problem:** The wrapping `<Link>` has no accessible label; screen readers will read all card text as the link name, which is noisy.

**Fix:** Add `aria-label={campaign.title}` to the Link element.

---

## 9. Landmark and Region Labels

**Problem:** Sections like "Featured Campaigns", "How It Works", "Trust Indicators" on Index.tsx are semantic `<section>` elements without `aria-label` or `aria-labelledby`.

**Fix:** Add `aria-label` or `aria-labelledby` to key sections on Index.tsx for easier landmark navigation.

---

## 10. Footer Navigation

**Problem:** Footer `<ul>` lists of links have no `aria-label` on the `<nav>` wrapper -- and there's no `<nav>` wrapper at all.

**Fix:** Wrap footer link groups in `<nav aria-label="Footer navigation">`.

---

## 11. Milestone Progress Bar -- CreateCampaign.tsx

**Problem:** The milestone allocation bar (line 337-344) has no `role="progressbar"` or ARIA attributes.

**Fix:** Add `role="progressbar"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, and `aria-label`.

---

## 12. Step Progress Indicator -- CreateCampaign.tsx

**Problem:** The 4-step progress indicator has no ARIA semantics. Screen readers can't tell which step the user is on.

**Fix:** Add `aria-label="Form progress"` to the stepper, and `aria-current="step"` on the active step.

---

## Technical Summary

| # | Change | File(s) | Complexity |
|---|--------|---------|------------|
| 1 | Link form labels to inputs | `CreateCampaign.tsx`, `ContributionModal.tsx` | Low |
| 2 | Duration radio group ARIA | `CreateCampaign.tsx` | Low |
| 3 | Tab ARIA for custom tabs | `Dashboard.tsx`, `Explore.tsx` | Low |
| 4 | Upload zone keyboard support | `CreateCampaign.tsx` | Low |
| 5 | Remove image aria-label | `CreateCampaign.tsx` | Low |
| 6 | Icon-only button labels | `Dashboard.tsx`, `CreateCampaign.tsx` | Low |
| 7 | aria-current on nav links | `Header.tsx`, `MobileNav.tsx` | Low |
| 8 | Campaign card link label | `CampaignCard.tsx` | Low |
| 9 | Section landmark labels | `Index.tsx` | Low |
| 10 | Footer nav wrapper | `Footer.tsx` | Low |
| 11 | Milestone progress bar ARIA | `CreateCampaign.tsx` | Low |
| 12 | Step indicator ARIA | `CreateCampaign.tsx` | Low |

All changes are frontend-only, no new dependencies required. Every fix is a small attribute addition or minor structural tweak.

