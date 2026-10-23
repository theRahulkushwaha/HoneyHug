# [HUG-10] Digital Love Gifts & Gift Shelf

| Metric | Details |
| :--- | :--- |
| **Issue Key** | HUG-10 |
| **Type** | Story |
| **Component** | `src/features/gifts`, `app/(tabs)/love.tsx` |
| **Priority** | Medium |
| **Phase** | Phase 2 (Emotional Depth) |

---

## 1. User Story
> **As a** partner,  
> **I want to** send cute virtual gifts (warm cup of cocoa, wild forest flowers, honey pot, lucky charm) with a personal note,  
> **So that** my partner experiences a fun gift unwrapping animation and can keep the gift on their virtual den shelf.

---

## 2. Feature Overview
- Catalog of 12+ illustrated SVG/Lottie gifts (Bouquet of Daisies, Steaming Honey Tea, Cozy Scarf, Teddy Bear, Starlight Jar).
- Custom ribbon color and gift card message composer.
- Interactive unwrapping animation: Recipient taps the bow to tear the wrapping paper.
- "Gift Shelf" in the virtual room where received gifts stay permanently displayed.

---

## 3. Visual & Aesthetic Requirements
- **Theme Palette:**
  - Wrapping Paper: `honey` with polka dots or `blush` with little hearts
  - Ribbon: `cocoa` or golden yellow
- **Animation:** Lottie unbox sequence with celebratory sparkles and chime audio effect.

---

## 4. Technical Implementation Steps
1. Add `gifts` table in Supabase (`sender_id`, `couple_id`, `type`, `message`, `opened_at`).
2. Build gift selection modal with gift previews and note editor.
3. Deliver push alert upon gift arrival: *"Rahul left a surprise gift on your doorstep 🎁"*.
4. Render 3D unboxing overlay upon tap, transitioning the item into `room_items`.

---

## 5. Acceptance Criteria
- [ ] Sender can select a gift item and attach a custom message.
- [ ] Recipient sees wrapped parcel with sender's name.
- [ ] Tapping plays unwrapping animation and displays the letter.
- [ ] Opened gifts automatically appear on the couple's den gift shelf.
