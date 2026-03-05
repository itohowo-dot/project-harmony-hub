

# Favorites/Bookmarking System

## Verification Results

The progress bar and dynamic meta tags are working correctly:
- Home: "BitHive — Fund the Future with Bitcoin"
- Explore: "Explore Campaigns | BitHive"
- Campaign Detail: "Decentralized Solar Grid for Rural Communities | BitHive"
- Progress bar animation visible during all route transitions

---

## Favorites System Plan

Since there's no backend/auth, favorites will be persisted in `localStorage`.

### 1. Create `useFavorites` hook — `src/hooks/useFavorites.ts`

A custom hook that manages favorite campaign IDs in localStorage:
- `favorites: string[]` — list of saved campaign IDs
- `toggleFavorite(id: string)` — add/remove
- `isFavorite(id: string)` — check status
- Syncs to `localStorage` key `"bithive-favorites"`

### 2. Add heart/bookmark button to Campaign Cards — `src/components/CampaignCard.tsx`

Add a small heart icon button in the top-left corner of the card image (opposite the status badge). Clicking toggles favorite state with a scale animation. Uses `e.preventDefault()` to avoid navigating via the parent `<Link>`.

### 3. Add heart button to Campaign Detail — `src/pages/CampaignDetail.tsx`

Add a "Save" / "Saved" button next to the existing "Share" and "Contract" action buttons below "Back This Project".

### 4. Add "Saved" tab to Explore page — `src/pages/Explore.tsx`

Add a new filter tab "Saved" alongside All/Active/Successful/Ending Soon. When selected, filters campaigns to only those in the user's favorites list. Shows an empty state if no favorites.

### 5. Add favorites count to Dashboard — `src/pages/Dashboard.tsx`

Add a 4th stat card showing the number of saved/bookmarked campaigns.

## Files

| File | Action |
|------|--------|
| `src/hooks/useFavorites.ts` | Create — localStorage-backed hook |
| `src/components/CampaignCard.tsx` | Add heart toggle button |
| `src/pages/CampaignDetail.tsx` | Add Save/Saved button |
| `src/pages/Explore.tsx` | Add "Saved" filter tab |
| `src/pages/Dashboard.tsx` | Add saved campaigns stat |

