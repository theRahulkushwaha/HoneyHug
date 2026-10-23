# [HUG-11] Secret Timed Messages & Time Capsules

| Metric | Details |
| :--- | :--- |
| **Issue Key** | HUG-11 |
| **Type** | Story |
| **Component** | `src/features/secrets`, `app/(tabs)/love.tsx` |
| **Priority** | Medium |
| **Phase** | Phase 2 (Emotional Depth) |

---

## 1. User Story
> **As a** romantic partner,  
> **I want to** seal a surprise note, photo, or voice memo locked until an exact future date (such as their birthday, our anniversary, or midnight on New Year's),  
> **So that** anticipation builds, and the message is revealed automatically when the moment arrives.

---

## 2. Feature Overview
- Support for 3 media kinds: Text Note, Compressed Photo, and Voice Note.
- Future unlock selector with quick presets (Tomorrow Morning, In 1 Week, Next Anniversary, Custom Date).
- **Server-Enforced Secrecy:** Client queries do NOT return the message body or storage URL until `unlock_at <= NOW()`. A locked placeholder indicator is returned instead.
- Automated unlock push notification via Supabase pg_cron + Edge Function.

---

## 3. Visual & Aesthetic Requirements
- **Theme Palette:**
  - Locked Capsule: Rich `night` (`#2B2D52`) with golden `honey` lock and countdown timer
  - Unlocked State: Shimmering `blush` glow with opening burst
- **Typography:** Digital countdown timer in monospace Nunito.

---

## 4. Technical Implementation Steps
1. Create `secret_messages` table with `unlock_at`, `kind`, and `storage_path`.
2. Secure with SQL View:
   ```sql
   CREATE VIEW view_couple_secrets AS
   SELECT id, couple_id, author_id, kind, unlock_at,
     CASE WHEN unlock_at <= NOW() THEN storage_path ELSE NULL END as storage_path,
     CASE WHEN unlock_at <= NOW() THEN true ELSE false END as is_unlocked
   FROM secret_messages;
   ```
3. Set up `pg_cron` worker or Edge Function to query newly unlocked secrets every hour and fire push notifications.

---

## 5. Acceptance Criteria
- [ ] User can lock a message or photo to a future date.
- [ ] Recipient sees locked capsule with live countdown clock.
- [ ] Media URL is strictly withheld by the database prior to `unlock_at`.
- [ ] Once unlocked, recipient receives push alert and can view contents.
