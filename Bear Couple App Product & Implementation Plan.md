# 🐻 Bear Couple App: Product & Implementation Plan

*Working name: **BearHug** (placeholder). React Native + Expo, built at zero cost, for exactly two people per shared space.*

---

## 1. Vision & Principles

BearHug is a private space for two people. The whole app is themed around two little bears (you and your partner) living in a cozy den that grows as your relationship does.

**Product principles**

- **Private by design.** Only two invited partners can ever see the shared space.
- **Consent first.** Location, mood and activity sharing are opt-in, pausable, and never hidden.
- **No pressure mechanics.** No streak penalties, no guilt reminders, no scores ranking love, no hidden tracking.
- **Symbolic, not pretend-scientific.** The heartbeat widget and "miss you meter" are playful signals, not measurements.
- **Complements messaging apps**, it does not try to replace WhatsApp or iMessage.
- **Zero running cost** for a two-person user base.

---

## 2. Zero-Cost Reality Check (Read This First)

Almost everything can be free. A few things cannot, and it is better to know now.

| Area | Free approach | Honest limitation |
| --- | --- | --- |
| Framework | React Native + **Expo** (open source) | None |
| Backend | **Supabase free tier** (Postgres, Auth, Realtime, Storage, Edge Functions) | Free projects are **paused after about a week of inactivity** (easy to resume; a tiny scheduled ping or regular use avoids it). Storage and DB quotas are small, so compress images. |
| Push notifications | **Expo Push Service** over FCM (Android) | iOS push needs a paid Apple Developer account |
| Builds | **EAS Build free plan** or local builds with Android Studio | The free plan has a limited number of builds per month and queue priority is low |
| Android distribution | Share the **APK directly** (sideload) | Google Play needs a one-time registration fee, so it is not strictly zero |
| iOS distribution | Expo Go for development and a free personal provisioning profile | Apps expire after 7 days, no TestFlight, no push, no widgets without a paid account |
| Widgets | Android widget via a community library | iOS widgets need native Swift code and a paid account |
| Weather / sky | **Open-Meteo** (free, no API key) | Rate limits are fine for two users |
| Music | Deep links to Spotify / YouTube Music / Apple Music | No synchronized playback (provider APIs and premium accounts required) |
| Animations | Lottie (free LottieFiles assets, check licenses), Reanimated, Skia | None |
| Art | Your own bear SVGs drawn in Figma/Inkscape, or CC0 assets | Do not use copyrighted characters |

**Recommendation:** go **Android-first** for the zero-cost path. If your partner uses iPhone, you can still run the app through Expo Go during development, but a stable iOS install, push and widgets will eventually need the $99/year Apple program. Plan for that as an optional future upgrade, not a blocker for the MVP.

> Note: free-tier limits and pricing change over time. Verify the current limits on the Supabase, Expo and Open-Meteo sites before you commit.

---

## 3. Tech Stack

**Mobile app**

- React Native with **Expo (managed workflow, development builds)** and **TypeScript**
- **Expo Router** for file-based navigation
- **TanStack Query** for server state, plus **Zustand** for small local state
- **react-native-reanimated** and **react-native-gesture-handler** for animations and touch
- **@shopify/react-native-skia** for the shared drawing canvas and the night sky
- **lottie-react-native** for hearts, hugs and kisses
- **expo-haptics**, **expo-notifications**, **expo-image-picker**, **expo-image-manipulator**, **expo-av** (voice notes), **expo-location**, **expo-secure-store**, **expo-local-authentication**
- **react-native-mmkv** for fast local storage and the offline outbox
- **react-native-svg** for bear avatars and room furniture

**Backend (Supabase)**

- **Auth:** email + password or magic link (Google sign-in is also free)
- **Postgres + Row Level Security (RLS)** for strict two-person access
- **Realtime:** Broadcast and Presence for Touch Together, drawing, online status
- **Storage:** private buckets with signed URLs for photos and voice notes
- **Edge Functions (Deno):** sending pushes, unlocking timed content
- **pg\_cron:** scheduled messages, unlock dates, daily prompts, reminders

**Tooling:** ESLint, Prettier, Jest + React Native Testing Library, GitHub (free), GitHub Actions for lint and tests (free tier).

---

## 4. 🐻 Bear Theme & Design System

**Concept:** a warm, hand-drawn forest cottage. Two bears, one honey-colored den.

**Palette**

| Token | Color | Use |
| --- | --- | --- |
| `honey` | #F6B93B | Primary actions, highlights |
| `cocoa` | #6B4226 | Text, bear outlines |
| `cream` | #FFF4E0 | Backgrounds |
| `blush` | #FF8FA3 | Hearts, love signals |
| `moss` | #8DB580 | Success, plants |
| `night` | #2B2D52 | Night sky, sleep mode |

**Typography:** a rounded friendly font such as *Nunito* or *Baloo 2* for UI, and a handwritten font such as *Caveat* for letters and notes (Google Fonts are free and available through `@expo-google-fonts`).

**Characters**

- Two customizable bears: fur color, ear shape, scarf, hat, glasses, outfit.
- Expression states: idle, happy, sleepy, sad, excited, loved, busy.
- Built as layered SVGs so customization is just swapping layers and tints (no heavy sprite sheets).

**Motion language:** soft bouncy springs, floating hearts, gentle breathing idle animation. Respect the OS "reduce motion" setting.

**Components to build first:** `BearAvatar`, `HoneyButton`, `PawCard`, `StickyNote`, `HeartBurst`, `BearTabBar`, `MoodPicker`, `LetterEnvelope`.

---

## 5. Navigation

Bottom tabs: **Home · Love · Play · Memories · Us**

| Tab | Contents |
| --- | --- |
| 🏠 Home | Relationship dashboard, virtual room, love button, mood check-in, widgets |
| 💌 Love | Letters, love signals, chat, daily appreciation, gifts, secret messages |
| 🎮 Play | Couple quiz, games, challenges, shared drawing, Touch Together |
| 📸 Memories | Photos, timeline, time capsules, bucket list, our song |
| 🫶 Us | Profiles, settings, relationship dates, privacy, preferences, account recovery |

---

## 6. Architecture

```
[ React Native app ]
   ├─ UI (Expo Router screens, bear components)
   ├─ Data layer (TanStack Query + MMKV cache + offline outbox)
   └─ Realtime layer (Supabase Broadcast / Presence)
          │
          ▼
[ Supabase ]
   ├─ Auth
   ├─ Postgres (RLS: every row belongs to a couple_id)
   ├─ Storage (private buckets, signed URLs)
   ├─ Edge Functions (push, unlocks)
   └─ pg_cron (scheduled jobs)
          │
          ▼
[ Expo Push Service → FCM ]  →  partner's phone
```

**Folder structure**

```
/app                  # Expo Router routes
  /(tabs)/home.tsx, love.tsx, play.tsx, memories.tsx, us.tsx
  /onboarding, /letters, /mood, /room, /draw ...
/src
  /components         # bear UI kit
  /features           # one folder per feature (api, hooks, screens)
  /lib                # supabase client, notifications, haptics, offline
  /theme              # colors, fonts, spacing
  /assets             # svg bears, lottie, sounds
/supabase
  /migrations         # SQL schema + RLS policies
  /functions          # edge functions
```

---

## 7. Data Model (Postgres)

Every shared table carries `couple_id`, and RLS ensures a user can only touch rows whose `couple_id` they belong to.

| Table | Key columns |
| --- | --- |
| `profiles` | id (= auth user id), display\_name, avatar\_config (jsonb), timezone, push\_token |
| `couples` | id, together\_since, anniversary, status\_text, created\_at |
| `couple_members` | couple\_id, user\_id, role, joined\_at (**max 2 rows per couple**, enforced by trigger) |
| `invites` | code, couple\_id, expires\_at, used\_at |
| `love_signals` | id, couple\_id, sender\_id, type (hug/kiss/miss\_you/ily/cuddle), haptic, created\_at |
| `moods` | id, couple\_id, user\_id, mood, note, created\_at |
| `mood_responses` | mood\_id, responder\_id, type (support/hug/message), text |
| `letters` | id, couple\_id, author\_id, situation (open\_when\_\*), body, unlock\_at, opened\_at |
| `secret_messages` | id, couple\_id, author\_id, kind (note/photo/voice), storage\_path, unlock\_at, trigger |
| `appreciations` | id, couple\_id, user\_id, prompt\_id, answer, day |
| `love_languages` | user\_id, ranking (jsonb) |
| `gifts` | id, couple\_id, sender\_id, type, message, opened\_at |
| `room_items` | id, couple\_id, item\_key, position (jsonb), unlocked\_at |
| `unlocks` | couple\_id, item\_key, source\_activity |
| `memories` | id, couple\_id, type, title, caption, storage\_path, date, song\_url, place |
| `drawings` | id, couple\_id, strokes (jsonb), thumbnail\_path |
| `bucket_items` | id, couple\_id, title, done\_at, memory\_id |
| `special_dates` | id, couple\_id, title, date, repeat, remind\_days\_before |
| `songs` | id, couple\_id, url, title, memory\_id, song\_of\_day |
| `settings` | user\_id, notification\_prefs (jsonb), sharing\_prefs (jsonb), quiet\_hours |

**Example RLS policy**

```sql
create function is_member(c uuid) returns boolean
language sql security definer as $$
  select exists (select 1 from couple_members
                 where couple_id = c and user_id = auth.uid());
$$;

alter table moods enable row level security;
create policy "couple members read" on moods
  for select using (is_member(couple_id));
create policy "author writes" on moods
  for insert with check (is_member(couple_id) and user_id = auth.uid());
```

---

## 8. Cross-Cutting Concerns

**Privacy & security**

- Pairing via a **single-use, expiring invite code**; a trigger blocks a third member from ever joining.
- RLS on every table; private storage buckets with short-lived signed URLs.
- Optional **app lock** with biometrics (`expo-local-authentication`).
- Locked letters and secret messages: the **server withholds the body until `unlock_at`** (enforced in a view or RPC, not just hidden in the UI).
- Journal entries default to private (`visibility = 'private'`) and are only shared by explicit action.
- Optional later upgrade: end-to-end encryption for letters and journals (libsodium). It makes recovery harder, so decide this early.

**Offline support**

- Drafts for letters and journals are saved to MMKV immediately.
- An **outbox queue** stores pending writes and flushes when connectivity returns (`@react-native-community/netinfo`).
- Use client-generated UUIDs and `updated_at` for simple last-write-wins sync.

**Notifications**

- Per-category toggles (love signals, mood, letters, reminders), quiet hours, and a global mute.
- Edge Function looks up the partner's push token and sends through Expo Push; it checks the receiver's preferences first.

**Account recovery**

- Standard email recovery for sign-in.
- Re-pairing: if a phone is lost, the user logs in and is automatically attached to the existing couple (membership is stored server-side).
- If end-to-end encryption is added, provide a printable **recovery key** at setup.
- Either partner can export their data and "leave" the space; leaving requires clear confirmation.

**Platform differences**

- Android: background pushes and a home-screen widget are practical.
- iOS: widgets need native Swift, background execution is restricted, and paid account is required for distribution and push.

---

## 9. Feature Specifications & Implementation

### 🏠 Home: Our Little World

**1. Relationship Dashboard**

- *What:* Days / months / years together, anniversary countdown, both avatars, "Together since…", daily love message or memory.
- *Build:* Compute durations on the client from `couples.together_since` (use `date-fns`). Daily message: pick from a bundled list of prompts or pull a random memory via an RPC seeded by the date so both phones show the same one.
- *Data:* `couples`, `special_dates`, `memories`.

**2. Our Virtual Room**

- *What:* A cozy tiny house with furniture, plants, photos, gifts and two bear characters; decorations unlock through shared activities; partner's bear shows online status or a left message.
- *Build:* Render the room as a layered SVG/Skia scene with a fixed grid. Items are `room_items` with `item_key` and `position`. Drag to place with Gesture Handler. Presence (online dot, "left a note") through Supabase Presence.
- *Unlock system:* a small rules table (e.g. "answer 7 appreciation prompts → unlock lamp") evaluated by a database trigger or Edge Function that inserts into `unlocks`.
- *Tip:* Limit to about 25 items in v1 and reuse a single sprite style.

**3. The Love Button**

- *What:* One tap sends Hug, Kiss, Miss You, ILY or Cuddle. Partner sees floating hearts and "Rahul is thinking about you ❤️". Optional haptics.
- *Build:* Insert a `love_signals` row. A database webhook or Edge Function sends an Expo push with the sender's name. On receive (foreground), listen to Realtime inserts and play the Lottie animation plus `Haptics.notificationAsync`. Add a gentle cooldown (for example 5 seconds) to avoid spam, never a penalty.
- *Haptic pattern per type:* custom vibration patterns using `Haptics` and `Vibration` on Android.

**4. Daily Mood Check-in**

- *What:* Choose happy, tired, stressed, sad, excited, loved; add a note; partner responds with support, a hug or a message; private mood history.
- *Build:* `MoodPicker` component with bear expressions. Insert into `moods`; the partner gets an optional push. A calendar-style history screen (month grid with mood colors) from a simple query. Sharing is optional: user can choose "share with partner" per entry.

### 💌 Love: Emotional Connection

**5. Open When Letters**

- Preset situations (miss me, sad, can't sleep, fighting, anniversary) plus custom ones.
- Letter composer with handwritten font, optional photo. Stored with `situation`, optionally `unlock_at`.
- Recipient sees sealed envelopes; tapping one marks `opened_at` and notifies the author (optional). Drafts work offline.

**6. Love Language**

- Short onboarding quiz, ranking the five languages (words, quality time, gifts, acts of service, physical affection).
- Each partner can see the other's ranking. A static **suggestion library** (JSON) maps each language to small gestures; "Suggest a gesture" picks one at random weighted by the partner's ranking. No AI required.

**7. Digital Love Gifts**

- Gift catalog (roses, hug, kiss, handwritten note, surprise card, custom) with Lottie animations and a personal message.
- Recipient unwraps a gift box animation; opened gifts are stored in a "gift shelf" in the room.

**8. Daily Appreciation**

- One prompt per day from a bundled list ("One thing I love about you today is…").
- Both answer; after both answer (or after the day ends) answers are revealed. Collected into a scrapbook view. Optional, never a streak counter.

**9. Secret Messages**

- Hide a note, photo or voice message with an unlock date or trigger (birthday, anniversary, specific time).
- Media uploaded to a private bucket; `pg_cron` flips a message to "available" and calls the push Edge Function. Client never receives the signed URL before unlock.

**10. Virtual Hug & Kiss**

- Press and hold to send a hug; partner gets a gentle vibration and animation.
- Two-person mode: both hold their buttons at the same time to complete a shared hug (shares the mechanism with Touch Together, below).

### 🫶 Unique Connection Features

**11. Touch Together**

- Both touch and hold; a shared heart appears and glows; releasing either ends it.
- *Build:* Supabase Realtime **Presence** state `{touching: true}`. When both partners' state is true, show the glowing Skia heart and run a looping haptic. Latency of a few hundred ms is normal; design the visual to feel forgiving.

**12. Heartbeat / Presence Widget**

- Android widget showing a shared heart, the day counter, and last signal time (using `react-native-android-widget` or a small native module).
- Keep it symbolic. Widget refresh is controlled by the OS, so data is updated when the app syncs or a push arrives. iOS widget is out of scope for the zero-cost path.

**13. Shared Drawing Canvas**

- Skia canvas; strokes are broadcast as small point batches over a Realtime channel and rendered by both.
- "Half-heart" mode: a guide outline for one partner to start and the other to finish.
- Save: serialize strokes to `drawings.strokes` and a PNG thumbnail to Storage, then attach to Memories.
- Conflict handling: each stroke has a unique id and author color, so no merge conflicts.

**14. Our Song**

- Save songs as links (Spotify, YouTube Music, Apple Music) with title and note; attach to memories; "song of the day" picked by either partner.
- "Open together": send a push with the link; each partner taps to open in their own app. True synchronized playback is not supported by providers without premium APIs.

**15. Same Sky**

- Opt-in location (coarse, city-level is enough). Fetch weather with **Open-Meteo**; compute sunrise/sunset and moon phase locally (e.g. `suncalc`).
- UI shows two small windows (day or night per location) and a shared night sky made with Skia, with stars unlocked by milestones.
- Privacy: store only coarse location, never a movement history, and provide a one-tap pause.

---

## 10. Additional Features from Your Shortlist

Your second document lists 40 more ideas. They are grouped here by how to build them so you can see the cost of each.

**Memories & Timeline (23–27)**

- **Our Story Timeline / Special Date Calendar:** one `timeline` screen unioning `memories` and `special_dates`; local notifications for reminders (`expo-notifications` scheduling, no server needed).
- **Private Shared Gallery:** Storage bucket, image compression to about 1600px and quality 0.7 before upload to protect the free quota; thumbnails; filters by date/event/mood.
- **Bucket List:** simple CRUD with "complete and attach memory".
- **Time Capsule:** same lock mechanism as Secret Messages with a long unlock date.

**Communication (28–36)**

- **Private Chat, voice notes, video messages:** Realtime table `messages`. Voice notes with `expo-av` (waveform is a stretch goal). **Video is heavy on the free storage quota**, so limit clips to 15 seconds and compress, or skip in v1.
- **Mood reactions, Our Language, Shared Notes:** light features on top of the chat/notes tables.
- **Scheduled Messages & Good Morning / Night:** `pg_cron` plus the push Edge Function; user chooses time in their own timezone.
- **Message in a Bottle:** random delayed note, a scheduled message with a random unlock time.

**Long-Distance (37–40)**

- **Distance Between Us:** haversine distance from coarse coordinates, both must opt in.
- **Next Meet Countdown:** a special date with a photo and note.
- **Sleep Together Mode:** a Skia night sky, ambient sounds (bundled royalty-free audio), a sleep timer; both can join the same "room" through Presence.
- **Virtual Date Night:** scheduled event plus shared countdown; synchronized experience limited to in-app activities (quiz, drawing).

**Cute & Personal (41–55)**

Most are small: Miss You Meter (manual signal), Love Jar (random pick from stored notes), Our Constellation (a star per milestone), Relationship Wrapped (a yearly SQL aggregate plus slides), Avatar Maker (the bear customizer), Secret Knock (record tap timing and replay as haptics), Our Plant (state grows with optional shared activities), Love Alarm, Random Memory (a daily local notification), Future Us (locked predictions), Our Place (saved places, text-only list in v1 to avoid map costs; open in the phone's Maps app), Widget Themes, Milestone Cards, Playlist of Moments, Custom Notifications.

**Healthy Relationship (56–63)**

These are mostly guided-prompt screens plus private/shared toggles: Gentle Conflict Reset, Repair Conversation (step-by-step prompts both can fill in), Appreciation Check-in, Relationship Goals, Boundaries & Preferences, Personal Space Mode (a status that replaces an expectation of instant reply), Consent-Based Sharing (central sharing settings that every feature reads), Private Journal (private by default).

> **Important:** do not add streak penalties, guilt-based reminders, hidden tracking, or love scores anywhere in the app.

---

## 11. Phased Roadmap

A realistic plan for one developer working part-time. Treat the durations as rough estimates.

**Phase 0: Setup (about 1 week)**

- Create the Expo TypeScript project, Supabase project, GitHub repo.
- Theme tokens, fonts, bear component kit, tab navigation.
- Auth screens, profile creation, **invite-code pairing**, RLS policies, tests for the "third person cannot join" rule.

**Phase 1: MVP, "Our Little World" (about 3–4 weeks)**

- Relationship dashboard and special dates
- Love Button with push + haptics + animation
- Daily mood check-in and history
- Open When Letters (with offline drafts)
- Settings: notification preferences, privacy, app lock
- *Goal:* both of you can install it and use it daily.

**Phase 2: Emotional depth (about 3–4 weeks)**

- Daily appreciation, love language, digital gifts, secret messages
- Memories: gallery, timeline, bucket list, time capsule
- Virtual hug and Our Song

**Phase 3: The unique features (about 4–5 weeks)**

- Virtual room with unlockable decorations
- Touch Together, shared drawing canvas
- Same Sky
- Android widget

**Phase 4: Extras & polish (ongoing)**

- Chat, voice notes, scheduled messages
- Healthy-relationship prompts, long-distance features
- Relationship Wrapped, avatar customization, accessibility and performance work

**Suggested order of risk:** build Realtime features (Touch Together, drawing) with a quick prototype early in Phase 1, because they decide whether your free-tier architecture feels good enough.

---

## 12. Staying Inside the Free Tier

- **Compress every image** before upload; set a max size per file and show your remaining space in Settings.
- **Avoid video** or keep it short, and delete old drawings' raw strokes once a PNG is saved if space gets tight.
- **Keep chat history lean** (text only; archive old messages to a local export).
- **Poll less, subscribe more:** use Realtime subscriptions only on screens that need them.
- **Prevent the inactivity pause:** open the app regularly, or add a free scheduled GitHub Action that makes a tiny request to your project once or twice a week.
- **Make a free backup:** a scheduled GitHub Action or a manual "Export our data" button that downloads JSON plus media.
- **Offline-first caching** (MMKV + TanStack Query persistence) reduces requests and makes the app feel faster.
- Check the Supabase usage dashboard monthly.

---

## 13. Testing & Quality

- Unit tests for date math (days together), unlock logic, and the outbox queue.
- **RLS tests** in SQL: a user in another couple must get zero rows from every table.
- Manual two-device test script for realtime features (Touch Together, drawing, love signals, push).
- Test on a low-end Android device and with airplane mode toggling.
- Accessibility: font scaling, contrast against the cream background, screen-reader labels on bear buttons, reduce-motion support.

---

## 14. Release (Zero-Cost Path)

1. `eas build --platform android --profile preview` (or a local Gradle build) to produce an **APK**.
2. Send the APK to your partner privately and install it (enabling installs from the chosen source).
3. For updates, use **EAS Update** (over-the-air JS updates) within its free limits, or just share a new APK.
4. When ready to go public later, the paid steps are the Google Play registration fee and the Apple Developer program.

---

## 15. Risks & Decisions to Make Early

| Decision | Options | Recommendation |
| --- | --- | --- |
| Partner's platform | Android / iPhone | If iPhone, accept limited features until you pay for an Apple account |
| End-to-end encryption | Off / On for letters+journal | Start off (simple recovery), add later with a recovery key |
| Backend | Supabase / Firebase | Supabase (SQL + RLS fits a two-person model, Realtime included) |
| Video | Include / skip | Skip in v1 |
| Art | Custom SVG / bought pack | Custom simple SVG bears for consistent theme and no licensing risk |
| Name & branding | BearHug is a placeholder | Check the name is not already used before publishing |

---

## 16. First Week Checklist

- [ ] Create Expo project with TypeScript and Expo Router
- [ ] Install fonts and define the theme tokens
- [ ] Draw or collect the base bear SVG with 3 expressions
- [ ] Create Supabase project and run the first migration (`profiles`, `couples`, `couple_members`, `invites`)
- [ ] Add RLS and the `is_member` function
- [ ] Build sign-up, profile, create-space and join-with-code flows
- [ ] Build the five-tab shell with placeholder screens
- [ ] Send your first push notification between two real devices

Once that list is done you have the foundation every other feature sits on.
