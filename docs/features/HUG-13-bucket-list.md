# [HUG-13] Couple Bucket List

| Metric | Details |
| :--- | :--- |
| **Issue Key** | HUG-13 |
| **Type** | Story |
| **Component** | `src/features/bucket-list`, `app/(tabs)/memories.tsx` |
| **Priority** | Medium |
| **Phase** | Phase 2 (Emotional Depth) |

---

## 1. User Story
> **As an** adventurous couple,  
> **I want to** curate a shared bucket list of places to travel, foods to try, and activities to do,  
> **So that** when we complete one, we can mark it done and attach a photo memory directly to it.

---

## 2. Feature Overview
- Shared bucket list with categories: Travel ✈️, Food 🍜, Cozy Dates ☕, Adventures 🏔️, Wild Dreams 🌟.
- Quick add modal with optimistic updates.
- Completion celebration: Checking an item triggers a confetti burst and offers a "Attach a Photo Memory" prompt.
- Filter between "Things to Do" and "Completed Memories".

---

## 3. Visual & Aesthetic Requirements
- **Theme Palette:**
  - Checkboxes: Custom bear paw stamp checkbox that fills with `honey` when checked
  - Card background: `cream` with subtle rounded border
  - Category Badges: Soft tones (`moss`, `blush`, `night`)

---

## 4. Technical Implementation Steps
1. Add `bucket_items` table with foreign key `memory_id` linking to `memories`.
2. Implement TanStack Query hooks with optimistic updates for toggle completion.
3. Link completion workflow directly into memory photo composer.
4. Persist to MMKV for immediate offline creation and checking.

---

## 5. Acceptance Criteria
- [ ] Either partner can add, edit, or delete bucket list items.
- [ ] Completing an item updates the partner's device in realtime.
- [ ] Users can attach an existing or new photo memory to a completed item.
- [ ] Offline edits sync automatically when internet is restored.
