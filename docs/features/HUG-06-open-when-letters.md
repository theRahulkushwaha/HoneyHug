# [HUG-06] Open When Letters

| Metric | Details |
| :--- | :--- |
| **Issue Key** | HUG-06 |
| **Type** | Story |
| **Component** | `src/features/letters`, `app/letters` |
| **Priority** | High |
| **Phase** | Phase 1 (MVP) |

---

## 1. User Story
> **As a** loving partner,  
> **I want to** write and schedule heartfelt "Open When..." letters with handwritten styling,  
> **So that** my partner has comforting words from me waiting for specific emotional moments (when they are sad, can't sleep, or miss me).

---

## 2. Feature Overview
- Preset situational categories:
  - 🌧️ *Open when you are sad*
  - 🌙 *Open when you can't sleep*
  - 🥺 *Open when you miss me*
  - ⚡ *Open when we had a disagreement*
  - 🎂 *Open on your special day*
  - ✏️ *Custom situation...*
- Handwritten Letter Editor utilizing Google Font **Caveat** with optional attached photo.
- Sealed wax-stamp envelope UI in recipient's letter shelf.
- Offline drafting: Incomplete letters are stored in MMKV drafts automatically.
- Read receipt: Author receives a warm notification when the letter is first unsealed.

---

## 3. Visual & Aesthetic Requirements
- **Theme Palette:**
  - Letter Paper: Textured `cream` (`#FFF4E0`) with faint ruled margins
  - Ink: Deep `cocoa` (`#6B4226`)
  - Wax Stamp: Deep `honey` (`#F6B93B`) or `blush` (`#FF8FA3`)
- **Animation:** Envelope flap fold animation unveiling the paper note with realistic sound/haptic.

---

## 4. Technical Implementation Steps
1. Create `letters` table schema in Supabase with RLS policies.
2. Build `LetterComposer` with `Caveat` font and character counter.
3. Compress attached photo via `expo-image-manipulator` before uploading to `letters` private bucket.
4. Render letter shelf in `app/(tabs)/love.tsx` grouping unread vs read letters.
5. Update `opened_at` timestamp on first tap and trigger author notification.

---

## 5. Acceptance Criteria
- [ ] Users can compose, draft offline, and publish letters with situational tags.
- [ ] Unopened letters appear sealed with situational prompt visible.
- [ ] Tapping unopened letter plays unsealing animation and sets `opened_at`.
- [ ] Offline outbox guarantees letter delivery once network reconnects.
