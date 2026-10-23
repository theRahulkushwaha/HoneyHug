# [HUG-09] Love Languages Quiz & Gesture Generator

| Metric | Details |
| :--- | :--- |
| **Issue Key** | HUG-09 |
| **Type** | Story |
| **Component** | `src/features/love-languages`, `app/(tabs)/love.tsx` |
| **Priority** | Low |
| **Phase** | Phase 2 (Emotional Depth) |

---

## 1. User Story
> **As a** partner,  
> **I want to** rank my primary love languages and browse surprise gesture suggestions tailored to my partner's top love language,  
> **So that** I know how to show affection in the exact way my partner feels most cherished.

---

## 2. Feature Overview
- 5 Love Languages ranking questionnaire (Words of Affirmation, Quality Time, Receiving Gifts, Acts of Service, Physical Touch).
- Side-by-side comparison screen showing both partners' ranked dimensions.
- "Suggest a Sweet Gesture" generator: Randomly picks actionable, low-cost ideas from a bundled JSON library weighted toward partner's #1 and #2 languages.

---

## 3. Visual & Aesthetic Requirements
- **Theme Palette:**
  - Bar charts: Soft pastel gradients (`blush`, `honey`, `moss`, `cocoaLight`)
  - Gesture card: Honey card with subtle paw stamp
- **Typography:** Rounded Nunito with cheerful badge icons.

---

## 4. Technical Implementation Steps
1. Store rankings in `love_languages` table as JSONB.
2. Build 10-question comparison survey with drag-to-rank interface.
3. Bundle `gestures.json` containing 150+ thoughtful ideas categorized by language.
4. Implement weighted random picker on the client with zero external API calls.

---

## 5. Acceptance Criteria
- [ ] Users can take or re-take the love language ranking.
- [ ] Both rankings display cleanly with descriptive tips.
- [ ] Tapping "Suggest Gesture" returns an actionable, partner-aligned gesture.
