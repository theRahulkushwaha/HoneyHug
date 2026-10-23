# [HUG-19] Android Heartbeat Widget

| Metric | Details |
| :--- | :--- |
| **Issue Key** | HUG-19 |
| **Type** | Story |
| **Component** | `src/features/widget`, `android/` |
| **Priority** | Medium |
| **Phase** | Phase 3 (Unique Connection) |

---

## 1. User Story
> **As an** Android user,  
> **I want to** place a HoneyHug widget on my phone's home screen,  
> **So that** I can glance at our relationship day counter, partner's latest mood, and tap a quick button to send a hug without even opening the app.

---

## 2. Feature Overview
- Android Home Screen Widget (2x2 and 4x2 sizes) built using `react-native-android-widget`.
- Displays:
  - Total days together ("Day 482 together 🐻🍯")
  - Partner's current bear mood avatar and status
  - Last love signal received ("Rahul sent a Kiss 10m ago")
  - Quick action button: "Send Quick Hug" directly from home screen.
- Synchronized when app opens, closes, or when a high-priority push notification arrives.

---

## 3. Visual & Aesthetic Requirements
- **Theme Palette:**
  - Widget background: Curved card in `cream` (`#FFF4E0`) with subtle `honey` accent line
  - Text & Accents: `cocoa` (`#6B4226`) and `blush` (`#FF8FA3`)
- **Aesthetic:** Feels like an organic cozy sticky note on the Android desktop.

---

## 4. Technical Implementation Steps
1. Install and configure `react-native-android-widget`.
2. Define widget layout with Glance-like declarative components.
3. Hook `registerWidgetTask` to trigger background data sync on push receipt.
4. Add deep link handler for widget touch events redirecting into `app/(tabs)/home`.

---

## 5. Acceptance Criteria
- [ ] Widget can be pinned to Android home screen.
- [ ] Reflects live days counter and partner's last known mood.
- [ ] Quick-action button registers hug signal without crashing.
- [ ] Complies with Android background battery optimization policies.
