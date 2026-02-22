
# Search with Autocomplete + Highlighted Matching Text

## Overview

Replace the plain text input on the Explore page with an autocomplete dropdown that shows matching campaign suggestions as the user types, with the matching portion of text highlighted in amber.

## How It Works

1. User types in the search input
2. A dropdown appears below showing up to 6 matching campaigns (filtered from `MOCK_CAMPAIGNS`)
3. Each suggestion shows the campaign title and category, with the matching substring highlighted
4. Clicking a suggestion navigates to that campaign's detail page
5. Pressing Enter or clicking away applies the search as a filter (existing behavior)
6. Keyboard navigation (arrow keys + Enter) supported for accessibility

## Implementation

### New Component: `src/components/SearchAutocomplete.tsx`

A self-contained search component that:
- Accepts all campaigns from `MOCK_CAMPAIGNS` and filters by title/description matching the query
- Uses a Popover (from existing `@radix-ui/react-popover`) anchored to the input for the dropdown
- Shows each suggestion as a clickable row with:
  - Campaign title with matched text wrapped in `<mark>` styled with amber background
  - Category badge in muted text
- Closes dropdown when input is empty, on blur (with delay for click), or on Escape
- Calls `onSearchChange(value)` to keep the parent filter in sync
- Calls `onSelect(campaignId)` to navigate on suggestion click
- Debounces filtering to avoid jank (150ms)

### Highlight Helper

A small utility function `highlightMatch(text: string, query: string)` that splits the text around the query match and returns React nodes with the match wrapped in a styled `<span>` (amber background, rounded).

### Changes to `src/pages/Explore.tsx`

- Replace the current `<Input>` search field with `<SearchAutocomplete>`
- Pass `onSearchChange` to update the existing `search` state
- Pass `onSelect` to navigate to `/campaign/:id` using `useNavigate`
- No other changes needed -- the grid filtering continues to work via the existing `useCampaigns` hook

## Technical Details

### Dropdown Styling
- `bg-popover border border-border/50 rounded-lg shadow-lg` matching the app's card style
- `max-h-[320px] overflow-y-auto` with ScrollArea for long lists
- Each item: `px-3 py-2.5 hover:bg-accent rounded-md cursor-pointer transition-colors`
- Active keyboard-selected item: `bg-accent`

### Highlight Markup
```tsx
function highlightMatch(text: string, query: string) {
  if (!query) return text;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <span className="bg-primary/20 text-primary font-semibold rounded-sm px-0.5">
        {text.slice(idx, idx + query.length)}
      </span>
      {text.slice(idx + query.length)}
    </>
  );
}
```

### Keyboard Navigation
- Arrow Up/Down cycles through suggestions
- Enter on a highlighted suggestion navigates to that campaign
- Enter with no selection applies the text as a filter (existing behavior)
- Escape closes the dropdown

### Animation
- Dropdown entrance: `framer-motion` with `opacity: 0 -> 1` and `y: -4 -> 0` (subtle slide-in)
- Each suggestion item staggers in with 30ms delay

## Files Changed

| File | Change |
|------|--------|
| `src/components/SearchAutocomplete.tsx` | **New** -- autocomplete input with dropdown, highlight, keyboard nav |
| `src/pages/Explore.tsx` | Replace `<Input>` with `<SearchAutocomplete>`, add `useNavigate` |
