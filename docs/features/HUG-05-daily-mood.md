# [HUG-05] Daily Mood Check-In & Calendar History

| Metric | Details |
| :--- | :--- |
| **Issue Key** | HUG-05 |
| **Type** | Story |
| **Component** | `src/features/mood`, `src/components/MoodPicker.tsx` |
| **Priority** | Medium |
| **Phase** | Phase 1 (MVP) |

---

## 1. User Story
> **As a** partner,  
> **I want to** log my daily emotional state using cute bear expressions, add an optional personal note, and decide whether to share it with my partner,  
> **So that** we can stay emotionally attuned and support each other without needing lengthy explanations.

---

## 2. Feature Overview
- 6 bear mood states:
  - 🌟 **Happy**: Sparkling bear, sunny yellow badge
  - 😴 **Tired**: Drooping eyelids, lavender badge
  - 🌪️ **Stressed**: Swirling eyebrows, warm amber badge
  - 🌧️ **Sad**: Umbrella / rain droplet, soft blue-gray badge
  - 🎉 **Excited**: Cheerful paws up, coral badge
  - 🥰 **Loved**: Rosy cheeks and floating heart, blush pink badge
- Privacy toggle: Each check-in has an explicit "Share with Partner" switch (defaults to ON, but allows completely private journaling).
- Partner Comfort Actions: When viewing partner's mood, one-tap actions allow sending quick care: "Send Hug", "Bring Coffee", or "Give Space".
- Monthly Mood Calendar: Minimalist dot grid displaying daily mood history.

---

## 3. Visual & Aesthetic Requirements
- **Theme Palette:**
  - Card background: `cream` (`#FFF4E0`) with subtle `cocoa` border
  - Calming accent: `moss` (`#8DB580`)
  - Love responses: `blush` (`#FF8FA3`)
- **Typography:** Friendly `Nunito` for notes, with gentle rounded tags.

---

## 4. Technical Implementation Steps
1. Build `MoodPicker` selector component with lively bear SVG face transitions.
2. Insert records into `moods` table (`couple_id`, `user_id`, `mood`, `note`, `is_shared`).
3. If `is_shared` is true, trigger Supabase push event to partner.
4. Implement `MoodCalendarView` aggregating month data with colored date indicators.
5. Create response modal storing entries in `mood_responses`.

---

## 5. Acceptance Criteria
- [ ] User can log mood with or without text notes.
- [ ] Private check-ins (`is_shared = false`) are never visible to the partner in queries or UI.
- [ ] Shared moods update partner's dashboard in realtime or via push.
- [ ] Partner can tap to send comforting response badge.
- [ ] Month calendar correctly plots daily emotional history.
