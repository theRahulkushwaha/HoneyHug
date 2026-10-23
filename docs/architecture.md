# 🏗️ HoneyHug Architecture & System Design

## 1. System Overview
HoneyHug is built for a 1-to-1 couple connection model with **zero monthly infrastructure costs**. The architecture prioritizes data privacy, offline resilience, and snappy realtime interaction using React Native (Expo) and Supabase.

```
┌─────────────────────────────────────────────────────────────┐
│                    Mobile Client (Expo)                     │
│  ┌──────────────────────┐        ┌──────────────────────┐  │
│  │ Expo Router (Routes) │        │  Bear UI Components  │  │
│  └──────────┬───────────┘        └──────────┬───────────┘  │
│             │                               │              │
│             ▼                               ▼              │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ State Machine: TanStack Query + Zustand (Auth/Prefs)  │  │
│  └──────────┬───────────────────────────────┬────────────┘  │
│             │                               │              │
│             ▼                               ▼              │
│  ┌──────────────────────┐        ┌──────────────────────┐  │
│  │ MMKV Storage Cache   │        │ NetInfo Outbox Sync  │  │
│  └──────────────────────┘        └──────────────────────┘  │
└─────────────┬───────────────────────────────┬───────────────┘
              │ HTTPS Rest / Signed URLs      │ WebSocket Presence/Broadcast
              ▼                               ▼
┌─────────────────────────────────────────────────────────────┐
│                     Supabase Backend                        │
│  ┌──────────────────────┐        ┌──────────────────────┐  │
│  │  Postgres DB + RLS   │◄───────┤  Realtime Engine     │  │
│  │  (couple_id scoped)  │        │  (Presence/Channels) │  │
│  └──────────┬───────────┘        └──────────────────────┘  │
│             │                                               │
│             ▼                                               │
│  ┌──────────────────────┐        ┌──────────────────────┐  │
│  │ Private Storage      │        │ Edge Functions (Deno)│  │
│  │ (Compressed media)   │        │ (Push notification)  │  │
│  └──────────────────────┘        └──────────┬───────────┘  │
└─────────────────────────────────────────────┼───────────────┘
                                              │
                                              ▼
                             ┌─────────────────────────────────┐
                             │    Expo Push Service (FCM)      │
                             └────────────────┬────────────────┘
                                              │
                                              ▼
                                    Partner's Device
```

---

## 2. Directory Layout
```
/
├── app/                        # Expo Router file-based screens
│   ├── _layout.tsx             # Root layout: Fonts, AuthProvider, QueryClient
│   ├── (auth)/                 # Unauthenticated flow
│   │   ├── sign-in.tsx
│   │   ├── sign-up.tsx
│   │   ├── onboarding.tsx
│   │   └── pair-code.tsx
│   ├── (tabs)/                 # Main authenticated 5-tab hub
│   │   ├── _layout.tsx         # BearTabBar custom navigation
│   │   ├── home.tsx            # Relationship dashboard & virtual room
│   │   ├── love.tsx            # Letters, appreciations, gifts, secrets
│   │   ├── play.tsx            # Games, Touch Together, shared drawing
│   │   ├── memories.tsx        # Timeline, gallery, bucket list, our song
│   │   └── us.tsx              # Settings, date records, privacy
│   ├── letters/                # Letter reader & composer modal
│   ├── room/                   # Full-screen interactive den editor
│   ├── draw/                   # Full-screen Skia collaborative canvas
│   └── modals/                 # Shared sheet modals (mood, prompt)
├── src/
│   ├── components/             # Reusable Bear UI kit
│   │   ├── BearAvatar.tsx
│   │   ├── HoneyButton.tsx
│   │   ├── PawCard.tsx
│   │   ├── StickyNote.tsx
│   │   ├── HeartBurst.tsx
│   │   ├── MoodPicker.tsx
│   │   └── LetterEnvelope.tsx
│   ├── features/               # Feature-specific hooks, services & types
│   │   ├── auth/
│   │   ├── couple/
│   │   ├── dashboard/
│   │   ├── room/
│   │   ├── love-signals/
│   │   ├── mood/
│   │   ├── letters/
│   │   ├── memories/
│   │   ├── realtime/
│   │   └── settings/
│   ├── lib/                    # Core infrastructural singletons
│   │   ├── supabase.ts         # Supabase client configured with SecureStore
│   │   ├── storage.ts          # MMKV storage instance
│   │   ├── notifications.ts    # Expo notifications registration & listeners
│   │   ├── haptics.ts          # Custom vibration & haptic patterns
│   │   ├── imageCompressor.ts  # Client image downscaling & compression
│   │   └── outbox.ts           # Offline mutation queue processor
│   ├── theme/                  # Design tokens, typography & constants
│   │   ├── colors.ts
│   │   ├── typography.ts
│   │   ├── spacing.ts
│   │   └── animations.ts
│   └── assets/                 # SVGs, sound clips, and Lottie animations
├── supabase/
│   ├── migrations/             # SQL DDL & RLS policies
│   └── functions/              # Edge functions (push dispatcher, unlock worker)
├── docs/                       # Specifications & Jira feature tickets
├── .env.local                  # Local environment configuration
└── app.json                    # Expo configuration
```

---

## 3. Core Technical Decisions

### 3.1 State Management Architecture
- **Server Cache:** `TanStack Query (React Query)` handles all remote data queries and mutations. Queries are persisted to local MMKV for instant launch rendering when offline.
- **Client Session & UI State:** `Zustand` manages light local state (e.g., active pairing status, active room drag item, sound toggle).
- **Secure Tokens:** `expo-secure-store` stores sensitive Supabase auth session tokens.

### 3.2 Offline & Outbox Engine
- When a user writes a letter, creates a mood entry, or updates a bucket list item offline:
  1. Entry is written immediately to local MMKV state for instant optimistic UI display.
  2. The operation is serialized into an **Outbox Queue** in MMKV.
  3. When `NetInfo.addEventListener` detects an active internet connection, the outbox flushes items in chronological order with client-generated UUIDs (preserving original timestamps).

### 3.3 Zero-Cost Image Strategy
- Mobile camera photos are frequently 5MB–15MB, which would burn through Supabase's 1GB free storage tier within weeks.
- Before any photo is uploaded:
  - Resized using `expo-image-manipulator` to a maximum dimension of 1600px width/height.
  - Compressed to JPEG quality `0.7` (typical file size drops to ~180KB–300KB).
  - WebP is favored where platform support allows.

### 3.4 Strict Two-User Scoping (RLS Security Model)
- Every shared table has a foreign key to `couple_id`.
- Supabase Row Level Security runs the `is_member(couple_id)` security definer function:
```sql
CREATE OR REPLACE FUNCTION is_member(c uuid) RETURNS boolean
LANGUAGE sql SECURITY DEFINER AS $$
  SELECT EXISTS (
    SELECT 1 FROM couple_members
    WHERE couple_id = c AND user_id = auth.uid()
  );
$$;
```
- Unauthorized 3rd parties or users from different couples receive `0 rows` regardless of query attempts.
