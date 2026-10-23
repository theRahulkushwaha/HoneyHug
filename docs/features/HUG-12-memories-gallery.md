# [HUG-12] Shared Memory Timeline & Optimized Gallery

| Metric | Details |
| :--- | :--- |
| **Issue Key** | HUG-12 |
| **Type** | Story |
| **Component** | `src/features/memories`, `app/(tabs)/memories.tsx` |
| **Priority** | High |
| **Phase** | Phase 2 (Emotional Depth) |

---

## 1. User Story
> **As a** couple with precious moments,  
> **I want to** build a chronological timeline and photo gallery of our milestones, trips, and memories,  
> **So that** we can look back on our shared journey without worrying about running out of free cloud storage space.

---

## 2. Feature Overview
- Unified chronological timeline displaying memories, photos, milestones, and special dates.
- Memory composer: Title, date picker, location caption, tagged category, and photo upload.
- **Aggressive Zero-Cost Image Optimizer:** Every image selected via `expo-image-picker` is automatically resized to max 1600px width/height and compressed to JPEG quality 0.7 before upload, reducing 10MB images to under 250KB.
- Grid & Timeline toggles with month headers and search/filter chips.

---

## 3. Visual & Aesthetic Requirements
- **Theme Palette:**
  - Card: `creamCard` with rounded corners (16px) and subtle border
  - Date markers: `honey` pills with `cocoa` typography
  - Milestone icons: `moss` for growth, `blush` for romantic dates
- **Motion:** Parallax scroll effect on timeline photos.

---

## 4. Technical Implementation Steps
1. Build `lib/imageCompressor.ts` using `expo-image-manipulator`.
2. Create `memories` table in Supabase and private `memories` storage bucket with signed URLs.
3. Build `TimelineScreen` with `FlashList` for high-performance 60fps scrolling.
4. Implement lightbox modal for high-res photo viewing and zooming.

---

## 5. Acceptance Criteria
- [ ] Users can add memories with dates, titles, and photos.
- [ ] Uploaded images are compressed client-side prior to network transfer.
- [ ] Memories render in smooth chronological order with date headers.
- [ ] Storage quota usage is tracked and displayed in Settings.
