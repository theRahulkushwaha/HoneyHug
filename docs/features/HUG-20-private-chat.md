# [HUG-20] Private Chat & Ephemeral Voice Notes

| Metric | Details |
| :--- | :--- |
| **Issue Key** | HUG-20 |
| **Type** | Story |
| **Component** | `src/features/chat`, `app/(tabs)/love.tsx` |
| **Priority** | Medium |
| **Phase** | Phase 4 (Extended Intimacy) |

---

## 1. User Story
> **As a** couple,  
> **I want to** have a private chat space inside HoneyHug where we can exchange whisper messages and audio voice notes,  
> **So that** our sweet intimate moments don't get lost in cluttered WhatsApp or Telegram threads.

---

## 2. Feature Overview
- Intimate lightweight chat feed with typing indicators and bubble read receipts.
- Voice Notes: Record up to 60-second audio clips via `expo-av` with simple audio player.
- Storage optimization: Voice clips are stored in private bucket and auto-archived after 30 days to stay comfortably within the Supabase free tier.
- Bear stickers and reaction pills (bear hugs, paw prints).

---

## 3. Visual & Aesthetic Requirements
- **Theme Palette:**
  - My chat bubbles: `honey` (`#F6B93B`) with `cocoa` text
  - Partner chat bubbles: Pure white with soft `cream` border
  - Voice wave indicator: Animated `blush` bars
- **Typography:** Rounded Nunito with soft padding (14px).

---

## 4. Technical Implementation Steps
1. Create `messages` table in Supabase (`couple_id`, `sender_id`, `content`, `audio_url`, `created_at`).
2. Implement Supabase Realtime postgres changes listener on `messages`.
3. Build audio recorder utility with `expo-av`.
4. Upload audio files to `voice-notes` private bucket with signed URLs.

---

## 5. Acceptance Criteria
- [ ] Text messages appear in real time on both devices.
- [ ] Users can record, preview, and send voice notes.
- [ ] Audio plays back smoothly with progress scrubber.
- [ ] Storage auto-cleaning or manual clearing prevents quota exhaustion.
