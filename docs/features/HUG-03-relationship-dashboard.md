# [HUG-03] Relationship Dashboard & Milestone Counter

| Metric | Details |
| :--- | :--- |
| **Issue Key** | HUG-03 |
| **Type** | Story |
| **Component** | `src/features/dashboard`, `app/(tabs)/home.tsx` |
| **Priority** | High |
| **Phase** | Phase 1 (MVP) |

---

## 1. User Story
> **As a** paired couple,  
> **I want to** see our "Days Together" milestone counter, upcoming anniversary, both our bear avatars, and a daily shared prompt,  
> **So that** every time we open the app, we are greeted with a warm reflection of our relationship journey.

---

## 2. Feature Overview
- Client-side date calculations from `couples.together_since` using `date-fns` (total days, breakdown in years, months, and days).
- Upcoming special milestone countdown (e.g., "1000 days in 42 days", "Next Anniversary in 3 months").
- Interactive Bear Avatars for both partners side-by-side on a cozy porch with live status indications.
- Synchronized Daily Love Prompt / Memory of the Day, mathematically seeded by today's date so both partners see the identical prompt without extra backend queries.

---

## 3. Visual & Aesthetic Requirements
- **Theme Palette:**
  - Background: `cream` (`#FFF4E0`)
  - Milestone Hero Card: Soft glassmorphic cream with `honey` highlight border
  - Days Counter: `cocoa` (`#6B4226`) bold typography
  - Floating Hearts: Subtle `blush` (`#FF8FA3`)
- **Physics & Motion:** Gentle spring bounce on card touch; soft breathing animation for the two idle bears.

---

## 4. Technical Implementation Steps
1. Fetch couple data using TanStack Query `useCoupleData()`.
2. Compute day diffs with `date-fns/differenceInDays` and `intervalToDuration`.
3. Build `RelationshipHeroCard` component with toggle between "Total Days" and "Years, Months, Days".
4. Render dual `BearAvatar` instances linked to partner profiles with current expression state.
5. Implement deterministic daily prompt selection:
   ```typescript
   const promptIndex = Math.floor(new Date().getTime() / 86400000) % PROMPT_LIBRARY.length;
   ```

---

## 5. Acceptance Criteria
- [ ] Days together counter calculates accurately across time zones.
- [ ] Both bear avatars render correctly according to each user's chosen custom options.
- [ ] Anniversary countdown updates daily.
- [ ] Offline caching via MMKV displays dashboard instantly on cold start.
