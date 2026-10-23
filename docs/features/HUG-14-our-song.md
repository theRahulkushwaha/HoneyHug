# [HUG-14] Our Song & Deep-Linked Music Moments

| Metric | Details |
| :--- | :--- |
| **Issue Key** | HUG-14 |
| **Type** | Story |
| **Component** | `src/features/music`, `app/(tabs)/memories.tsx` |
| **Priority** | Low |
| **Phase** | Phase 2 (Emotional Depth) |

---

## 1. User Story
> **As a** music-loving couple,  
> **I want to** pin "Our Song", declare a "Song of the Day", and deep-link to Spotify/Apple Music/YouTube Music,  
> **So that** we can share the soundtrack of our relationship with zero API licensing fees.

---

## 2. Feature Overview
- Zero-cost deep link approach: Saves track title, artist, personal note, and streaming URLs.
- "Listen Together" action: Sends partner a push alert with a 1-tap link opening their preferred native music app.
- "Song of the Day": Daily pinned soundtrack card at the top of the Memories tab.
- Attach specific songs to photo memories or timeline milestones.

---

## 3. Visual & Aesthetic Requirements
- **Theme Palette:**
  - Vinyl Player Card: Dark `night` (`#2B2D52`) with spinning gold record animation
  - Typography: `honey` title and `cream` artist text
- **Motion:** Rotating vinyl disc with animated tone-arm when active.

---

## 4. Technical Implementation Steps
1. Add `songs` table (`couple_id`, `title`, `artist`, `spotify_url`, `apple_url`, `note`, `song_of_day`).
2. Implement deep linking with `Linking.canOpenURL` and `Linking.openURL`.
3. Build spinning vinyl card component with Reanimated `withRepeat`.
4. Add push broadcast for "Rahul wants to listen to 'Golden Hour' with you 🎵".

---

## 5. Acceptance Criteria
- [ ] Users can save and pin songs with custom notes.
- [ ] Tapping open launches the native Spotify/Apple Music app directly to the track.
- [ ] "Listen Together" notification delivers link cleanly to partner.
- [ ] Spinning vinyl visual responds to user tap.
