# [HUG-04] The Instant Love Button & Haptic Bursts

| Metric | Details |
| :--- | :--- |
| **Issue Key** | HUG-04 |
| **Type** | Story |
| **Component** | `src/features/love-signals`, `src/components/HoneyButton.tsx` |
| **Priority** | High |
| **Phase** | Phase 1 (MVP) |

---

## 1. User Story
> **As a** partner throughout the day,  
> **I want to** tap a dedicated Love Button to instantly send a Hug, Kiss, Miss You, I Love You, or Cuddle,  
> **So that** my partner feels my warmth and thoughts immediately via custom haptics and floating animations.

---

## 2. Feature Overview
- Floating Honey Button with multi-option fan-out or quick-tap default (Hug).
- 5 signal types:
  1. `hug`: Warm sustained vibration + bear hug Lottie
  2. `kiss`: Light flutter taps + kissing hearts
  3. `miss_you`: Gentle double-pulse + longing bear expression
  4. `ily`: Heartbeat rhythm + sparkling burst
  5. `cuddle`: Soft slow rhythm
- Low-latency delivery: Realtime Broadcast if partner is active in the app; Edge Function push notification if app is in background.
- Respectful 5-second gentle cooldown to avoid accidental spam (no punitive error messages).

---

## 3. Visual & Aesthetic Requirements
- **Theme Palette:**
  - Love Button: Glowing `honey` (`#F6B93B`) with 3D drop shadow
  - Signal Badges: `blush` (`#FF8FA3`) and `cream` (`#FFF4E0`)
- **Animation:** Full-screen particle burst of floating hearts and honey pots via `lottie-react-native` and `react-native-reanimated`.

---

## 4. Technical Implementation Steps
1. Create `love_signals` row in Supabase with `sender_id`, `couple_id`, `type`, and `haptic_pattern`.
2. Simultaneously broadcast signal over active Supabase Realtime channel `couple-signals:{couple_id}`.
3. Hook up foreground listener in root layout to trigger `Haptics.impactAsync()` and overlay `HeartBurst`.
4. Trigger Supabase Edge Function to deliver Expo Push Notification to partner's device if they are backgrounded.

---

## 5. Acceptance Criteria
- [ ] Tapping any signal sends payload in under 200ms when both users are online.
- [ ] Foreground device displays visual Lottie animation and vibrates with distinct pattern.
- [ ] Backgrounded partner receives notification: *"Rahul sent you a warm Hug 🐻❤️"*.
- [ ] 5-second gentle cooldown prevents accidental duplicate taps.
