# [HUG-21] Sleep Together Mode & Ambient Soundscape

| Metric | Details |
| :--- | :--- |
| **Issue Key** | HUG-21 |
| **Type** | Story |
| **Component** | `src/features/sleep`, `app/sleep` |
| **Priority** | Low |
| **Phase** | Phase 4 (Extended Intimacy) |

---

## 1. User Story
> **As a** long-distance couple winding down for bed,  
> **I want to** enter a shared "Sleep Together" space with dim starlight and calming ambient nature sounds,  
> **So that** we fall asleep feeling each other's cozy presence side-by-side in our digital bed.

---

## 2. Feature Overview
- Low-light dimming mode: Screen automatically dims to ultra-dark deep indigo `night` (`#2B2D52`) with OLED-friendly blacks.
- Bundled royalty-free audio generator (gentle forest rain, crackling cabin fireplace, soft nocturnal crickets, distant lo-fi stream).
- Shared Presence room: Shows both bears tucked under blankets sleeping.
- Sleep timer: Automatically turns off audio after 30, 45, or 60 minutes to preserve battery.

---

## 3. Visual & Aesthetic Requirements
- **Theme Palette:**
  - Background: Deepest midnight `night` (`#1A1B35`)
  - Stars: Subtle shimmering stardust (`#FFF4E0` 40% alpha)
  - Bears: Two bears tucked into a moss-green quilt with gentle chest breathing animation

---

## 4. Technical Implementation Steps
1. Bundle seamless looping audio clips in `assets/sounds/`.
2. Connect to Supabase Presence channel `sleep-room:{couple_id}`.
3. Manage audio playback lifecycle via `expo-av` with automatic audio ducking and sleep timer.
4. Keep screen awake at minimum brightness using `expo-keep-awake`.

---

## 5. Acceptance Criteria
- [ ] Users can enter Sleep mode and choose an ambient soundscape.
- [ ] Partner's arrival in sleep mode displays their bear tucked into bed.
- [ ] Configured sleep timer smoothly fades audio and sleeps the screen.
- [ ] Offline playable using bundled audio files.
