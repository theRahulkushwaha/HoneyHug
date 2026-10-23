# [HUG-18] Same Sky & Astrological Connection

| Metric | Details |
| :--- | :--- |
| **Issue Key** | HUG-18 |
| **Type** | Story |
| **Component** | `src/features/sky`, `app/(tabs)/home.tsx` |
| **Priority** | Medium |
| **Phase** | Phase 3 (Unique Connection) |

---

## 1. User Story
> **As a** couple who may be in different cities or apart during the day,  
> **I want to** look at our "Same Sky" window showing our local weather, day/night cycles, and a shared night sky of stars,  
> **So that** we are reminded that no matter how far apart we are, we are living under the exact same sky.

---

## 2. Feature Overview
- Zero-cost weather engine: Coarse coordinates query **Open-Meteo** (no API key required, generous free tier).
- Solar & Lunar math: Computes sunrise, sunset, and exact moon phase on device via `suncalc`.
- Dual Sky Windows: Home tab shows two cottage windows with real weather effects (sunny rays, soft rain, drifting clouds).
- Couple Constellation: When both windows are in nighttime, a combined Skia night sky appears, featuring bright stars unlocked by relationship milestones.

---

## 3. Visual & Aesthetic Requirements
- **Theme Palette:**
  - Day Sky: Warm periwinkle and soft morning amber
  - Night Sky: Deep indigo `night` (`#2B2D52`) with twinkling diamond stars (`#FFF4E0`)
  - Cottage Window frames: Carved wooden `cocoa` (`#6B4226`)

---

## 4. Technical Implementation Steps
1. Request coarse location permission (`expo-location`) - only city-level precision is stored.
2. Query `https://api.open-meteo.com/v1/forecast` with hourly temperatures and weather codes.
3. Compute sun and moon illumination using `suncalc.getMoonIllumination`.
4. Render Skia particle system for gentle rain or floating stardust.

---

## 5. Acceptance Criteria
- [ ] Displays accurate city-level weather and current sky state for both partners.
- [ ] Moon phase matches current astronomical cycle.
- [ ] Location can be paused or toggled off at any time with a single tap.
- [ ] No commercial weather API keys or fees required.
