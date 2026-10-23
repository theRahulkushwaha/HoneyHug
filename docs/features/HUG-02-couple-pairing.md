# [HUG-02] Couple Pairing & Invite Code Engine

| Metric | Details |
| :--- | :--- |
| **Issue Key** | HUG-02 |
| **Type** | Story |
| **Component** | `src/features/couple`, `app/(auth)/pair-code.tsx` |
| **Priority** | Blocker |
| **Phase** | Phase 0 (Foundation) |

---

## 1. User Story
> **As an** onboarded user,  
> **I want to** generate a 6-character invite code or enter my partner's code,  
> **So that** we are permanently and privately paired in our shared honey den, with a guarantee that no third person can ever access our space.

---

## 2. Feature Overview
- Generates a human-friendly 6-character alphanumeric code (e.g., `HUG882`) with a 48-hour expiration window.
- Code sharing via native system sheet (`Share.share`).
- Partner enters code -> Database checks validity, creates `couple_members` record, and marks invite as used in a single atomic SQL transaction.
- **Strict Constraint Enforcement:** Database trigger blocks any 3rd user from attaching to the same `couple_id`.

---

## 3. Visual & Aesthetic Requirements
- **Theme Palette:**
  - Card background: `creamCard` (`#FFFFFF` 80% opacity)
  - Code digits: `cocoa` (`#6B4226`) in large, bold monospaced or rounded styling
  - Primary button: `honey` (`#F6B93B`)
- **Animations:** Gentle celebration confetti or heart burst when pairing successfully completes, transitioning into the main 5-tab den.

---

## 4. Technical Implementation Steps
1. Create PostgreSQL function `join_couple_with_code(code_input text)` running as `SECURITY DEFINER` to validate and insert atomically.
2. Build UI screen `pair-code.tsx` containing dual options: "Create our Den" and "I have a Partner's Code".
3. Add native share trigger with customizable honey-themed message: *"Join me in our little HoneyHug den! Here is our code: XYZ123 🐻🍯"*.
4. On join confirmation, refresh `useCoupleStore` and redirect route to `/(tabs)/home`.

---

## 5. Acceptance Criteria
- [ ] Creator receives a 6-character code that can be copied or shared.
- [ ] Partner can input code, which successfully links both users under one `couple_id`.
- [ ] Expired or invalid codes display a clear, gentle error message.
- [ ] Database prevents any third account from joining an already paired couple.
- [ ] Upon successful pairing, both users navigate to the 5-tab application shell.
