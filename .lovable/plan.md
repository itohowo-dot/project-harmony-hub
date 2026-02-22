

# Remaining UI/UX Polish Items

Beyond backend, error handling, and testing (which you'll handle), here are the gaps to reach production quality:

---

## 1. Missing `<meta>` tags and SEO per page

Currently there's a single `<title>` in `index.html`. Each route should have its own page title (e.g., "Explore Campaigns | BitHive", "Solar Grid Campaign | BitHive"). Use `document.title` or a small helper in each page component.

**Files:** All page components (`Index.tsx`, `Explore.tsx`, `CampaignDetail.tsx`, `CreateCampaign.tsx`, `Dashboard.tsx`, `CampaignManage.tsx`, `NotFound.tsx`)

---

## 2. No skip-to-content link for accessibility

Screen reader and keyboard users have no way to skip past the header navigation. Add a visually-hidden "Skip to main content" link at the top of the layout.

**File:** `src/components/layout/PageWrapper.tsx` -- add a skip link before `<Header />` and an `id="main-content"` on the `<main>` element.

---

## 3. Campaign detail sidebar stacking on mobile

On mobile (390px), the sidebar with the funding progress, "Back This Project" button, etc. renders below the tabs content. The user has to scroll past the full story/milestones/backers/updates to reach the CTA. The funding card should appear above or at least have a sticky mobile CTA bar.

**File:** `src/pages/CampaignDetail.tsx` -- reorder the grid on mobile so the sidebar summary appears first, or add a sticky bottom "Back This Project" bar on mobile.

---

## 4. No loading/empty states on the Explore page for zero results

When filters produce zero results, there's an empty state. But the message is generic. It should suggest clearing filters or broadening the search.

**File:** `src/pages/Explore.tsx` -- enhance the empty state with a "Clear filters" button.

---

## 5. Wallet state is not shared across components

Each component calling `useWallet()` gets its own independent state. If you connect the wallet in the header, the `CreateCampaign` or `CampaignDetail` pages won't know about it. This should use React Context.

**File:** Create `src/contexts/WalletContext.tsx` with a provider, wrap the app in `App.tsx`, and update `useWallet` to consume context.

---

## 6. "Contract" button on campaign detail does nothing

The "Contract" button next to "Share" has no onClick handler -- it's a dead button.

**File:** `src/pages/CampaignDetail.tsx` -- add a toast or link behavior similar to the footer resource links.

---

## 7. No 404 handling for invalid campaign IDs

Navigating to `/campaign/999` shows "Campaign not found" but with no back-navigation guidance beyond a single button. It should match the `NotFound` page style.

**File:** `src/pages/CampaignDetail.tsx` -- improve the not-found fallback.

---

## 8. Form state lost on browser back/forward

If a user fills out the Create Campaign form, navigates away, and comes back, all form state is lost. Consider persisting to `sessionStorage`.

**File:** `src/pages/CreateCampaign.tsx` -- add `sessionStorage` persistence for form fields.

---

## Technical Details

| # | Change | File(s) | Complexity |
|---|--------|---------|------------|
| 1 | Dynamic page titles | All 7 page files | Low |
| 2 | Skip-to-content link | `PageWrapper.tsx` | Low |
| 3 | Mobile CTA bar for campaign detail | `CampaignDetail.tsx` + CSS | Medium |
| 4 | Better empty state with "clear filters" | `Explore.tsx` | Low |
| 5 | Wallet context provider | New context file + `App.tsx` + `useWallet.ts` + `Header.tsx` | Medium |
| 6 | Fix dead "Contract" button | `CampaignDetail.tsx` | Low |
| 7 | Better campaign not-found state | `CampaignDetail.tsx` | Low |
| 8 | Form persistence via sessionStorage | `CreateCampaign.tsx` | Medium |

All changes are frontend-only and require no new dependencies.

