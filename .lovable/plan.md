

# Drag-and-Drop Image Upload + Launch Confirmation Dialog

## 1. Drag-and-Drop Support for Image Upload

**File:** `src/pages/CreateCampaign.tsx`

Add `isDragging` state and drag event handlers (`onDragOver`, `onDragEnter`, `onDragLeave`, `onDrop`) to the upload area div. Extract a shared `processFile` helper from the existing `handleImageSelect` to reuse for both click-upload and drop.

### State addition
- `const [isDragging, setIsDragging] = useState(false);`

### Helper function
Extract file validation logic into a reusable function:
```
const processFile = (file: File) => {
  if (!file.type.startsWith("image/")) {
    toast.error("Please select an image file");
    return;
  }
  const url = URL.createObjectURL(file);
  setImagePreview(url);
};
```

### Upload area changes (lines 211-219)
Add drag event handlers and conditional styling to the placeholder div:
- `onDragOver`: prevent default, set `isDragging` to true
- `onDragEnter`: prevent default, set `isDragging` to true
- `onDragLeave`: set `isDragging` to false
- `onDrop`: prevent default, set `isDragging` to false, process the first dropped file
- Conditional classes: when `isDragging` is true, apply `border-primary bg-primary/10` instead of the default muted styles
- Update the text to say "Drop image here" when dragging

---

## 2. Confirmation Dialog Before Launch

**File:** `src/pages/CreateCampaign.tsx`

Wrap the "Launch Campaign" button with an `AlertDialog` so the user must confirm before the campaign goes live.

### Import addition
Add `AlertDialog`, `AlertDialogAction`, `AlertDialogCancel`, `AlertDialogContent`, `AlertDialogDescription`, `AlertDialogFooter`, `AlertDialogHeader`, `AlertDialogTitle`, `AlertDialogTrigger` from `@/components/ui/alert-dialog`.

### Change (lines 397-404)
Replace the plain `<Button onClick={handleLaunch}>` with:
```
<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button disabled={!canNext()} className="gap-1 glow-amber font-heading">
      Launch Campaign <Hexagon className="h-4 w-4" />
    </Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Launch your campaign?</AlertDialogTitle>
      <AlertDialogDescription>
        This will make your campaign live on BitHive.
        Once launched, your campaign details cannot be changed.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={handleLaunch}>
        Yes, Launch
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

---

## Summary

| Change | File | Lines affected |
|--------|------|---------------|
| Add `isDragging` state | `CreateCampaign.tsx` | Near line 48 |
| Add `processFile` helper | `CreateCampaign.tsx` | Near line 55 |
| Add drag handlers + visual feedback to upload div | `CreateCampaign.tsx` | Lines 211-219 |
| Import AlertDialog components | `CreateCampaign.tsx` | Line 1-14 |
| Wrap Launch button with AlertDialog | `CreateCampaign.tsx` | Lines 397-404 |

All changes are in a single file. No new dependencies needed.

