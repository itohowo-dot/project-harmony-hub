
# Route-Based Code Splitting with React.lazy and Suspense

## Overview
Replace static imports of all page components in `src/App.tsx` with `React.lazy()` dynamic imports, wrapped in a `Suspense` boundary with a branded loading fallback.

## Changes

### 1. Create Loading Fallback Component
**New file**: `src/components/LoadingFallback.tsx`
- A centered spinner/shimmer with the BitHive logo or a simple amber pulsing hexagon
- Matches the dark theme (bg-background, amber accent)
- Minimal footprint since it loads in the main bundle

### 2. Update `src/App.tsx`
- Replace all 7 static page imports with `React.lazy(() => import(...))`:
  - `Index`, `Explore`, `CampaignDetail`, `CreateCampaign`, `Dashboard`, `CampaignManage`, `NotFound`
- Wrap `<Routes>` in `<Suspense fallback={<LoadingFallback />}>`
- Keep all other imports (QueryClient, Toaster, etc.) as static since they're needed immediately

### Before/After

**Before:**
```typescript
import Index from "./pages/Index";
import Explore from "./pages/Explore";
// ... 5 more static imports
```

**After:**
```typescript
import { lazy, Suspense } from "react";
import { LoadingFallback } from "./components/LoadingFallback";

const Index = lazy(() => import("./pages/Index"));
const Explore = lazy(() => import("./pages/Explore"));
// ... 5 more lazy imports

// In JSX:
<Suspense fallback={<LoadingFallback />}>
  <Routes>...</Routes>
</Suspense>
```

## Technical Notes
- All page components already use `export default`, which is required for `React.lazy`
- Vite automatically creates separate chunks for each lazy import
- The loading fallback stays in the main bundle (tiny component)
- No changes needed to any page components themselves
