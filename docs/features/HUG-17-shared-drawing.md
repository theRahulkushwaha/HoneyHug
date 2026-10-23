# [HUG-17] Shared Skia Drawing Canvas

| Metric | Details |
| :--- | :--- |
| **Issue Key** | HUG-17 |
| **Type** | Story |
| **Component** | `src/features/draw`, `app/draw` |
| **Priority** | High |
| **Phase** | Phase 3 (Unique Connection) |

---

## 1. User Story
> **As a** creative couple,  
> **I want to** doodle together on a shared live canvas, complete half-drawn hearts, and save our doodles into our memories,  
> **So that** we can leave spontaneous visual love notes for each other.

---

## 2. Feature Overview
- Realtime vector stroke synchronization using `@shopify/react-native-skia` and Supabase Broadcast channels.
- Author-colored strokes: Each partner has a distinct signature brush color (e.g., Honey Gold vs Rosy Blush).
- "Half-Heart Challenge" template: Canvas provides a dashed outline for one partner to draw the left side and the other to finish the right side.
- Save to Memory: Serializes canvas strokes into PNG thumbnail stored in Supabase private bucket and adds an entry to `drawings` and `memories`.

---

## 3. Visual & Aesthetic Requirements
- **Theme Palette:**
  - Canvas surface: Soft sketchbook paper texture with `cream` tint
  - Color Palette: 8 curated warm pastel pigments (Honey, Blush, Cocoa, Moss, Lavender, Sky, Tangerine, Charcoal)
- **UI:** Minimal floating pill toolbar with Undo, Clear, Stroke Width, and Save Paw.

---

## 4. Technical Implementation Steps
1. Capture multi-touch points via Skia `Canvas` and `useTouchHandler`.
2. Chunk stroke points and broadcast over `drawing-room:{couple_id}` channel in 30ms batches.
3. Store persistent drawings in `drawings` table (`strokes` JSONB).
4. Export image locally using `Skia.Image.makeImageFromView` and upload compressed thumbnail.

---

## 5. Acceptance Criteria
- [ ] Both partners can draw simultaneously with real-time vector path updates.
- [ ] No race conditions or stroke clipping between concurrent artists.
- [ ] Undo only undoes the local user's most recent stroke.
- [ ] Saving exports a clean PNG into the couple's memory album.
