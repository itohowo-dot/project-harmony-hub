

# Add File Size Validation to Campaign Image Upload

## Change

**File:** `src/pages/CreateCampaign.tsx`, lines 60-67

Add a 5MB file size check to the `processFile` function, right after the image type check.

### Updated `processFile` function:

```tsx
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const processFile = (file: File) => {
  if (!file.type.startsWith("image/")) {
    toast.error("Please select an image file");
    return;
  }
  if (file.size > MAX_FILE_SIZE) {
    toast.error("Image must be under 5MB");
    return;
  }
  const url = URL.createObjectURL(file);
  setImagePreview(url);
};
```

This covers both click-to-upload and drag-and-drop paths since both use `processFile`.

Single file, 4 lines added.

