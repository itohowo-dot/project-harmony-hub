

# Fix 4 Remaining UI/UX Gaps

Gap #4 (wallet toasts) is already implemented -- `useWallet.ts` already fires `toast.success` on connect and `toast` on disconnect. That leaves 4 gaps to fix.

---

## 1. Share Button -- Clipboard Copy with Toast

**File:** `src/pages/CampaignDetail.tsx`

Add an `onClick` handler to the Share button that copies the current page URL to the clipboard and shows a success toast.

```tsx
<Button
  variant="ghost" size="sm"
  className="gap-1 text-xs text-muted-foreground"
  onClick={() => {
    navigator.clipboard.writeText(window.location.href);
    toast("Link copied to clipboard", { description: "Share it with your network!" });
  }}
>
  <Share2 className="h-3.5 w-3.5" /> Share
</Button>
```

Requires adding `import { toast } from "sonner"` to the file.

---

## 2. Footer Resource Links -- Placeholder Toasts

**File:** `src/components/layout/Footer.tsx`

Replace the static `<li>` elements in the Resources section with buttons that show a "Coming soon" toast on click, so users get feedback instead of nothing.

```tsx
{["Documentation", "Smart Contracts", "API Reference", "FAQ"].map((item) => (
  <li key={item}>
    <button
      onClick={() => toast(`${item} coming soon`, { description: "We're working on it!" })}
      className="hover:text-foreground transition-colors"
    >
      {item}
    </button>
  </li>
))}
```

Requires adding `import { toast } from "sonner"` to the file.

---

## 3. Campaign Image Upload Preview State

**File:** `src/pages/CreateCampaign.tsx`

Add state for a selected image file and preview URL. Replace the static placeholder div with a file input that shows a preview thumbnail when an image is selected, with a remove button.

- Add state: `const [imageFile, setImageFile] = useState<File | null>(null)`
- Add a hidden `<input type="file" accept="image/*">` triggered by clicking the upload area
- When a file is selected, create an object URL and display it as a preview
- Add a small "Remove" button overlay to clear the selection
- The upload area shows the preview image or the placeholder text

---

## 4. Post Update UI on Campaign Manage Page

**File:** `src/pages/CampaignManage.tsx`

Add a "Post Update" button to the Actions tab and a simple inline form (collapsible) with title + content fields and a submit button that shows a success toast.

- Add a `<Button>` with a `MessageSquarePlus` icon labeled "Post Update" to the actions grid
- When clicked, toggle a collapsible form below the grid with:
  - Title input
  - Content textarea  
  - "Publish Update" button that fires a toast and resets the form
- Import `MessageSquarePlus` from lucide-react, add `useState` for form visibility and field values

---

## Summary of Changes

| File | Change |
|------|--------|
| `src/pages/CampaignDetail.tsx` | Add clipboard copy + toast to Share button |
| `src/components/layout/Footer.tsx` | Add "coming soon" toasts to resource links |
| `src/pages/CreateCampaign.tsx` | Add image file input, preview state, and remove button |
| `src/pages/CampaignManage.tsx` | Add "Post Update" button and inline form in Actions tab |

