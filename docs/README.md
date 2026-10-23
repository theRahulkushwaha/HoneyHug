# 🐻 HoneyHug Documentation Hub

Welcome to the **HoneyHug** comprehensive documentation suite. This folder contains all architectural blueprints, design system guidelines, database schemas, and Jira-style feature tickets for building the HoneyHug application.

---

## 📚 Table of Contents

### 1. System Architecture & Foundation
- [Architecture & Tech Stack](file:///c:/Users/thera/OneDrive/Documents/Projects/HoneyHug/docs/architecture.md) - System topology, Expo Router structure, TanStack Query + Zustand state machine, offline outbox, and Supabase integration.
- [Design System & Theme Tokens](file:///c:/Users/thera/OneDrive/Documents/Projects/HoneyHug/docs/design-system.md) - Forest cottage theme, 6 core color tokens, typography scales, bear avatar layers, animation physics, and reusable UI components.
- [Database Schema & RLS Policies](file:///c:/Users/thera/OneDrive/Documents/Projects/HoneyHug/docs/database-schema.md) - PostgreSQL schema, `couple_members` max-2 trigger, row-level security functions, storage policies, and scheduled jobs.

---

### 2. Feature Tickets (Jira-Style Specifications)
Each feature ticket details the **User Story**, **Feature Overview**, **UI/UX & Color Tokens**, **Data Model**, **Technical Implementation Steps**, **Edge Cases & Error Handling**, and **Acceptance Criteria**.

#### Phase 0: Identity & Pairing
- **[HUG-01: User Authentication & Profile Setup](file:///c:/Users/thera/OneDrive/Documents/Projects/HoneyHug/docs/features/HUG-01-auth-and-profile.md)** - Supabase email/magic-link auth, profile initialization, bear avatar customization, and push token registration.
- **[HUG-02: Couple Pairing & Invite Code Engine](file:///c:/Users/thera/OneDrive/Documents/Projects/HoneyHug/docs/features/HUG-02-couple-pairing.md)** - 6-character cryptographic invite codes, single-use validation, database 2-person cap enforcement, and shared den creation.

#### Phase 1: Home & Daily Signals (MVP)
- **[HUG-03: Relationship Dashboard & Milestone Counter](file:///c:/Users/thera/OneDrive/Documents/Projects/HoneyHug/docs/features/HUG-03-relationship-dashboard.md)** - Real-time days/months/years together counter, anniversary countdown, synchronized daily memory/prompt, and dual bear avatars.
- **[HUG-04: The Instant Love Button & Haptic Bursts](file:///c:/Users/thera/OneDrive/Documents/Projects/HoneyHug/docs/features/HUG-04-love-button.md)** - One-tap love signals (Hug, Kiss, Miss You, ILY, Cuddle), full-screen Lottie bursts, low-latency Supabase Broadcast, and vibration patterns.
- **[HUG-05: Daily Mood Check-In & Calendar History](file:///c:/Users/thera/OneDrive/Documents/Projects/HoneyHug/docs/features/HUG-05-daily-mood.md)** - 6 bear emotion states, optional privacy toggle per entry, partner comfort responses, and monthly color-coded mood calendar.
- **[HUG-06: Open When Letters](file:///c:/Users/thera/OneDrive/Documents/Projects/HoneyHug/docs/features/HUG-06-open-when-letters.md)** - Timed/situational letters, handwritten Caveat typography, sealed wax envelope animations, offline drafting in MMKV, and read receipt signals.
- **[HUG-07: Settings, Biometric App Lock & Privacy](file:///c:/Users/thera/OneDrive/Documents/Projects/HoneyHug/docs/features/HUG-07-settings-and-privacy.md)** - Category-level push toggles, quiet hours, FaceID/Fingerprint biometric lock via `expo-local-authentication`, and graceful data export.

#### Phase 2: Emotional Depth & Memories
- **[HUG-08: Daily Appreciation Prompts & Scrapbook](file:///c:/Users/thera/OneDrive/Documents/Projects/HoneyHug/docs/features/HUG-08-daily-appreciation.md)** - Daily curated couple prompts, simultaneous reveal mechanic (no bias), and archival in the couple scrapbook.
- **[HUG-09: Love Languages Quiz & Gesture Generator](file:///c:/Users/thera/OneDrive/Documents/Projects/HoneyHug/docs/features/HUG-09-love-languages.md)** - Interactive 5-dimension ranking, partner language visibility, and zero-cost offline weighted gesture suggestion engine.
- **[HUG-10: Digital Love Gifts & Gift Shelf](file:///c:/Users/thera/OneDrive/Documents/Projects/HoneyHug/docs/features/HUG-10-digital-gifts.md)** - Interactive 3D unwrapping experience, animated digital gifts (flowers, treats, cards), and virtual den shelf placement.
- **[HUG-11: Secret Timed Messages & Time Capsules](file:///c:/Users/thera/OneDrive/Documents/Projects/HoneyHug/docs/features/HUG-11-secret-messages.md)** - Server-enforced time-lock RPC/view, encrypted/private bucket storage, trigger conditions (dates/anniversaries), and pg_cron unlock dispatch.
- **[HUG-12: Shared Memory Timeline & Optimized Gallery](file:///c:/Users/thera/OneDrive/Documents/Projects/HoneyHug/docs/features/HUG-12-memories-gallery.md)** - Infinite-scroll couple timeline, client-side image compression (sub-1600px quality 0.7 to protect free storage limits), and milestone tags.
- **[HUG-13: Couple Bucket List](file:///c:/Users/thera/OneDrive/Documents/Projects/HoneyHug/docs/features/HUG-13-bucket-list.md)** - Shared dream checklist, progress states, category tags, and completion conversion into visual memories.
- **[HUG-14: Our Song & Deep-Linked Music Moments](file:///c:/Users/thera/OneDrive/Documents/Projects/HoneyHug/docs/features/HUG-14-our-song.md)** - Spotify/Apple Music/YouTube Music deep links, "Listen Together" push notifications, and "Song of the Day" player card.

#### Phase 3: Unique Connection & Realtime Interaction
- **[HUG-15: Cozy Den Virtual Room & Room Customizer](file:///c:/Users/thera/OneDrive/Documents/Projects/HoneyHug/docs/features/HUG-15-virtual-room.md)** - Interactive 2.5D layered SVG/Skia living room, drag-and-drop grid placement with Gesture Handler, activity milestone unlock triggers, and live presence indicator.
- **[HUG-16: Touch Together (Realtime Simultaneous Touch)](file:///c:/Users/thera/OneDrive/Documents/Projects/HoneyHug/docs/features/HUG-16-touch-together.md)** - Low-latency dual-touch detection via Supabase Presence, synchronized glowing Skia heart shader, and looped pulsing haptic engine.
- **[HUG-17: Shared Skia Drawing Canvas](file:///c:/Users/thera/OneDrive/Documents/Projects/HoneyHug/docs/features/HUG-17-shared-drawing.md)** - Multi-touch vector stroke broadcasting, half-heart collaborative mode, color pickers, and export to PNG memory storage.
- **[HUG-18: Same Sky & Astrological Connection](file:///c:/Users/thera/OneDrive/Documents/Projects/HoneyHug/docs/features/HUG-18-same-sky.md)** - Zero-cost weather via Open-Meteo, client-calculated sun/moon phases (`suncalc`), dual-city sky windows, and milestone constellations.
- **[HUG-19: Android Heartbeat Widget](file:///c:/Users/thera/OneDrive/Documents/Projects/HoneyHug/docs/features/HUG-19-android-widget.md)** - Native glanceable home-screen widget, symbolic heartbeat pulse, together counter, and background sync.

#### Phase 4: Extended Intimacy & Long-Distance Modes
- **[HUG-20: Private Chat & Ephemeral Voice Notes](file:///c:/Users/thera/OneDrive/Documents/Projects/HoneyHug/docs/features/HUG-20-private-chat.md)** - Lightweight realtime messaging, voice clips recorded via `expo-av`, and zero-clutter local archiving.
- **[HUG-21: Sleep Together Mode & Ambient Soundscape](file:///c:/Users/thera/OneDrive/Documents/Projects/HoneyHug/docs/features/HUG-21-sleep-together.md)** - Ambient forest rain/fire sound generator, shared presence room, night-sky screen dimmer, and gentle sleep timers.
- **[HUG-22: Long-Distance Distance Radar & Next Meet Countdown](file:///c:/Users/thera/OneDrive/Documents/Projects/HoneyHug/docs/features/HUG-22-distance-and-meet.md)** - Coarse Haversine distance calculator (privacy-preserving), trip countdowns, and flight/travel milestone cards.
- **[HUG-23: Healthy Relationship Prompts & Conflict Reset](file:///c:/Users/thera/OneDrive/Documents/Projects/HoneyHug/docs/features/HUG-23-healthy-relationship.md)** - Gentle repair conversation templates, "Personal Space" toggle, guided reflection, and zero-streak guilt-free mechanics.

---

## 🛠️ Key Product Principles Matrix
1. **Consent First**: Location is coarse and opt-in; moods and journals have individual privacy controls.
2. **Zero Pressure**: No streak counters, no penalties, no competitive metrics.
3. **Zero-Cost Sustainability**: Aggressive client image compression, lazy realtime subscriptions, and serverless compute within Supabase free tier.
