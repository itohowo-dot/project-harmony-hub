

# Social Meta Tags + Global Loading Progress Bar

## 1. Dynamic Meta Tags Hook — `src/hooks/usePageMeta.ts` (new)

Create a `usePageMeta` hook that sets `<meta>` tags dynamically via DOM manipulation (since this is a SPA with no SSR). It will:
- Set `og:title`, `og:description`, `og:image`, `og:url`, `og:type`
- Set `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`
- Clean up on unmount (restore defaults)
- Replace the existing `usePageTitle` calls with this more comprehensive hook

Interface:
```ts
usePageMeta({ title, description, image?, url? })
```

## 2. Wire Meta Tags Into Pages

- **CampaignDetail.tsx**: Call `usePageMeta` with campaign title, story excerpt, and imageUrl
- **Index.tsx**: Default branding meta
- **Explore.tsx**: "Explore Campaigns" meta
- **CreateCampaign.tsx**: "Create a Campaign" meta
- **Dashboard.tsx**: "Dashboard" meta

The hook internally calls `usePageTitle` logic (setting `document.title`) so existing behavior is preserved.

## 3. Route Transition Progress Bar — `src/components/RouteProgressBar.tsx` (new)

Create a thin animated progress bar fixed at the top of the viewport (like YouTube/GitHub style). It:
- Listens to route changes via `useLocation` from react-router-dom
- On route change: animates width from 0% → 80% quickly, then pauses, then completes to 100% and fades out
- Uses Framer Motion for smooth animation
- Styled with the primary amber gradient, 2-3px height, `z-50` fixed positioning

## 4. Integrate Progress Bar — `src/App.tsx`

Add `<RouteProgressBar />` inside `<BrowserRouter>` (needs access to router context).

## Files

| File | Action |
|------|--------|
| `src/hooks/usePageMeta.ts` | Create — dynamic OG/Twitter meta hook |
| `src/components/RouteProgressBar.tsx` | Create — top loading bar |
| `src/App.tsx` | Add RouteProgressBar |
| `src/pages/CampaignDetail.tsx` | Use usePageMeta |
| `src/pages/Index.tsx` | Use usePageMeta |
| `src/pages/Explore.tsx` | Use usePageMeta |
| `src/pages/CreateCampaign.tsx` | Use usePageMeta |
| `src/pages/Dashboard.tsx` | Use usePageMeta |
| `src/hooks/usePageTitle.ts` | Keep as-is (usePageMeta calls it internally) |

