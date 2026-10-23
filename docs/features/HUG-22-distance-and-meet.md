# [HUG-22] Long-Distance Distance Radar & Next Meet Countdown

| Metric | Details |
| :--- | :--- |
| **Issue Key** | HUG-22 |
| **Type** | Story |
| **Component** | `src/features/distance`, `app/(tabs)/home.tsx` |
| **Priority** | Low |
| **Phase** | Phase 4 (Extended Intimacy) |

---

## 1. User Story
> **As a** long-distance couple,  
> **I want to** see the symbolic distance between us and an active countdown to the exact day and hour we meet next,  
> **So that** the physical miles between us feel smaller and we have an exciting date to look forward to.

---

## 2. Feature Overview
- Privacy-Preserving Haversine Distance: Computes physical distance (e.g., "1,240 km between our paws") using coarse coordinates; never logs location history or paths.
- "Next Meet" Countdown: Configurable target date with photo banner, flight/train details, and real-time days/hours/minutes timer.
- Milestone Celebrations: "Single-digit days left!" notification and celebratory bear hug badge.

---

## 3. Visual & Aesthetic Requirements
- **Theme Palette:**
  - Distance Badge: Curved `creamCard` with honey compass needle
  - Countdown Banner: `honey` (`#F6B93B`) ribbon with `cocoa` numbers
- **Typography:** Bold numbers with cheerful captions.

---

## 4. Technical Implementation Steps
1. Compute spherical distance locally using Haversine formula on coarse coordinates.
2. Store next meet timestamp and notes in `special_dates` table.
3. Compute remaining interval using `date-fns/intervalToDuration`.
4. Trigger local scheduled push notification 24 hours and 1 hour before reunion.

---

## 5. Acceptance Criteria
- [ ] Distance displays accurately between opted-in partner locations.
- [ ] Location can be toggled off at any time, which hides distance cleanly.
- [ ] Countdown updates live down to the minute.
- [ ] Reunion date triggers celebration badge when counter reaches zero.
