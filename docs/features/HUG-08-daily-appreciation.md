# [HUG-08] Daily Appreciation Prompts & Scrapbook

| Metric | Details |
| :--- | :--- |
| **Issue Key** | HUG-08 |
| **Type** | Story |
| **Component** | `src/features/love`, `app/(tabs)/love.tsx` |
| **Priority** | Medium |
| **Phase** | Phase 2 (Emotional Depth) |

---

## 1. User Story
> **As a** couple seeking deeper gratitude,  
> **I want to** answer one curated prompt each day about my partner (e.g., "One small thing you did recently that made me smile..."),  
> **So that** both our answers are unveiled simultaneously and archived into a warm couple scrapbook.

---

## 2. Feature Overview
- Daily bundled prompt from curated list (over 200 heartwarming questions).
- "Simultaneous Reveal" Mechanic: Neither partner can read the other's answer until they have both submitted theirs (or until midnight expires).
- No streak pressure: No streak counters, no warnings, no broken hearts if a day is skipped.
- Appreciation Scrapbook: Visual archive where past answers can be re-read and filtered by month.

---

## 3. Visual & Aesthetic Requirements
- **Theme Palette:**
  - Prompt Container: `creamCard` with warm `honey` pin icon
  - Typography: `Caveat` handwritten font for answers
  - Revealed Answers: Two parallel sticky notes in `honey` and `blush` tints

---

## 4. Technical Implementation Steps
1. Add `appreciations` table schema with unique composite index `(couple_id, user_id, day)`.
2. Secure SQL View / RPC: Return partner's answer ONLY when `EXISTS(SELECT 1 FROM appreciations WHERE couple_id = c AND user_id = auth.uid() AND day = current_day)` OR `day < current_day`.
3. Build prompt card in `app/(tabs)/love.tsx`.
4. Render flip animation on double-submission.

---

## 5. Acceptance Criteria
- [ ] User can submit answer to today's prompt.
- [ ] Partner's answer remains masked until user submits their own.
- [ ] Once both submit, both answers are revealed with heart celebration.
- [ ] Past answers are accessible in the Appreciation Scrapbook.
