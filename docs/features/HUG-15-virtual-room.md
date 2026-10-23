# [HUG-15] Cozy Den Virtual Room & Room Customizer

| Metric | Details |
| :--- | :--- |
| **Issue Key** | HUG-15 |
| **Type** | Epic / Story |
| **Component** | `src/features/room`, `app/room`, `app/(tabs)/home.tsx` |
| **Priority** | High |
| **Phase** | Phase 3 (Unique Connection) |

---

## 1. User Story
> **As a** couple,  
> **I want to** build and furnish a shared tiny virtual cottage ("The Honey Den") where our two bears live,  
> **So that** our shared space grows and becomes more cozy as we log memories, exchange letters, and complete milestones together.

---

## 2. Feature Overview
- 2.5D Layered SVG/Skia living room containing floors, walls, windows showing day/night sky, fireplace, rugs, plants, and furniture.
- Drag-and-drop decorator mode powered by `react-native-gesture-handler`.
- Activity-Driven Unlock Engine:
  - Log 7 daily moods -> Unlock cozy potted monstera plant.
  - Send 10 love signals -> Unlock honey jar lamp.
  - Add 5 memories -> Unlock framed couple photo on wall.
- Realtime Presence: Partner's bear shows active reading/lounging state when partner is in the app, or leaves a tiny sticky note on the coffee table when away.

---

## 3. Visual & Aesthetic Requirements
- **Theme Palette:**
  - Wood & Den: Warm `cocoa` (`#6B4226`), honey pine floors
  - Wall: Soft sunny `cream` (`#FFF4E0`)
  - Fireplace Glow: Animated `honey` (`#F6B93B`) flicker
- **Art Direction:** Cohesive hand-drawn cottage aesthetic; crisp vector SVGs for zero pixelation.

---

## 4. Technical Implementation Steps
1. Create `room_items` table (`item_key`, `position` JSONB: `{x, y, layer}`).
2. Create `unlocks` table with server triggers evaluating milestone achievements.
3. Build `RoomCanvas` rendering layered SVG elements on a fixed coordinate plane.
4. Implement pan gesture handlers with boundary clamping for drag-and-drop editing.
5. Connect Supabase Presence channel `den-presence:{couple_id}` to toggle online light and bear idle poses.

---

## 5. Acceptance Criteria
- [ ] Both bears are rendered inside the cozy den.
- [ ] Users can enter edit mode, drag unlocked items, and save new positions.
- [ ] Saved room changes sync immediately to partner's view.
- [ ] Completing milestone activities unlocks new den furniture.
- [ ] Den window dynamically reflects partner's local time (daylight vs starlight).
