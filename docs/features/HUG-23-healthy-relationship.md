# [HUG-23] Healthy Relationship Prompts & Conflict Reset

| Metric | Details |
| :--- | :--- |
| **Issue Key** | HUG-23 |
| **Type** | Story |
| **Component** | `src/features/healthy-relationship`, `app/(tabs)/us.tsx` |
| **Priority** | Medium |
| **Phase** | Phase 4 (Extended Intimacy) |

---

## 1. User Story
> **As a** conscious couple,  
> **I want to** have gentle tools like "Gentle Conflict Reset" and "Personal Space Mode",  
> **So that** we can navigate disagreements with empathy, establish healthy emotional boundaries, and never feel trapped by guilt or pressure.

---

## 2. Feature Overview
- **Gentle Conflict Reset:** A step-by-step de-escalation wizard with prompt cards:
  - *"How I am feeling right now without blame..."*
  - *"What I understand you might be feeling..."*
  - *"One thing we both agree on and love about each other..."*
- **Personal Space Mode:** A temporary status button ("Recharging in the den 🌿") that sets a cozy non-intrusive status, preventing guilt or expectations of immediate replies.
- **Strict Anti-Guilt Rules:** No streaks, no broken hearts, no ranking scores of affection anywhere in the codebase.
- **Private Relationship Journal:** Individual reflective journal entries default to private (`is_shared = false`) unless explicitly unlocked.

---

## 3. Visual & Aesthetic Requirements
- **Theme Palette:**
  - Calming forest green: `moss` (`#8DB580`)
  - Warm earth background: `cream` (`#FFF4E0`)
  - Grounded text: `cocoa` (`#6B4226`)
- **Aesthetic:** Gentle, spacious padding with tranquil botanical illustrations.

---

## 4. Technical Implementation Steps
1. Add `conflict_resets` table (`couple_id`, `initiator_id`, `step_answers` JSONB, `resolved_at`).
2. Add `status_mode` to `profiles` with quick presets (Available, Recharging, Cozy Time).
3. Build step-by-step wizard UI with calm transitions.
4. Hook up private journal storage with local MMKV caching.

---

## 5. Acceptance Criteria
- [ ] Users can trigger a Gentle Conflict Reset session with structured prompts.
- [ ] Personal Space Mode updates partner's screen with gentle status and silences urgent pings.
- [ ] No streak counters or penalties exist anywhere in the app.
- [ ] Journals remain 100% private unless deliberately shared.
