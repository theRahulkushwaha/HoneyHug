# [HUG-07] Settings, Biometric App Lock & Privacy

| Metric | Details |
| :--- | :--- |
| **Issue Key** | HUG-07 |
| **Type** | Story |
| **Component** | `src/features/settings`, `app/(tabs)/us.tsx` |
| **Priority** | High |
| **Phase** | Phase 1 (MVP) |

---

## 1. User Story
> **As a** privacy-conscious user,  
> **I want to** lock HoneyHug with biometric authentication (FaceID / Fingerprint) and customize notification quiet hours,  
> **So that** our intimate notes and photos stay strictly between us, even if my phone is unlocked by someone else.

---

## 2. Feature Overview
- Biometric App Lock using `expo-local-authentication` (FaceID, TouchID, Android Biometric Prompt).
- Configurable auto-lock delay (Immediate, After 1 minute, After 5 minutes).
- Granular notification preferences:
  - Love signal alerts (On / Off)
  - Daily mood check-in alerts (On / Off)
  - New letters & surprises (On / Off)
  - Quiet hours schedule (e.g., 11:00 PM – 7:00 AM)
- Account management: Sign out, update profile, export shared data JSON archive, and graceful couple disconnection.

---

## 3. Visual & Aesthetic Requirements
- **Theme Palette:**
  - Background: `cream` (`#FFF4E0`)
  - Settings Card: Clean white surface with `cocoa` icons and typography
  - Switches / Toggles: `honey` active fill (`#F6B93B`)
  - Destructive Actions: Soft muted coral (`dangerSoft` `#E57373`)

---

## 4. Technical Implementation Steps
1. Wire `expo-local-authentication` hook `authenticateAsync` to app foreground lifecycle listener in `_layout.tsx`.
2. Persist biometric lock state in `expo-secure-store`.
3. Build Settings UI in `app/(tabs)/us.tsx` with toggle sections.
4. Sync notification quiet hours and category preferences to `settings` Supabase table.
5. Create client-side export utility that bundles couple messages, dates, and media links into a readable JSON file.

---

## 5. Acceptance Criteria
- [ ] Enabling app lock triggers biometric prompt upon launching or returning to the app.
- [ ] Canceling biometric prompt keeps app behind a secure blur overlay.
- [ ] Quiet hours prevent non-urgent push notifications from triggering sound.
- [ ] Export data generates complete downloadable archive of user's notes and shared memories.
