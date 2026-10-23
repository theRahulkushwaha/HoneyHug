# [HUG-16] Touch Together (Realtime Simultaneous Touch)

| Metric | Details |
| :--- | :--- |
| **Issue Key** | HUG-16 |
| **Type** | Story |
| **Component** | `src/features/touch`, `app/(tabs)/play.tsx` |
| **Priority** | High |
| **Phase** | Phase 3 (Unique Connection) |

---

## 1. User Story
> **As a** long-distance or separated couple,  
> **I want to** press and hold our phone screens simultaneously, feeling a shared pulsing vibration and seeing a glowing heart expand between us,  
> **So that** we experience an intimate, tangible sense of holding hands in real time.

---

## 2. Feature Overview
- Realtime touch synchronizer via Supabase Presence state `{ touching: boolean, timestamp: number }`.
- When both partners touch down within an active window:
  - Both screens erupt in an animated glowing Skia heart shader.
  - Continuous rhythmic haptic heartbeat pulses across both devices.
  - Duration counter tracks how many seconds the couple has held hands ("Touched together for 48s").
- Graceful network tolerance: Built-in 400ms visual latch so slight latency or touch slips don't abruptly break the emotional moment.

---

## 3. Visual & Aesthetic Requirements
- **Theme Palette:**
  - Ambient background: Deep `night` (`#2B2D52`)
  - Glowing Heart: Radiating `blush` (`#FF8FA3`) and `honey` (`#F6B93B`) halo
- **Haptic Design:** Dual heartbeat rhythm (`thump-thump` ... `thump-thump`) looping every 1.1s.

---

## 4. Technical Implementation Steps
1. Establish Supabase Realtime channel `touch-room:{couple_id}` using Presence.
2. Track press-in and press-out events via `GestureDetector(Gesture.Manual())`.
3. Build Skia glow shader component using `@shopify/react-native-skia`.
4. Orchestrate haptic interval using `expo-haptics` impact feedback.

---

## 5. Acceptance Criteria
- [ ] Single touch displays "Waiting for partner's touch...".
- [ ] Dual simultaneous touch triggers glowing heart within 300ms.
- [ ] Looping haptics fire rhythmically on both devices while holding.
- [ ] Releasing touch smoothly fades the heart and records session duration.
