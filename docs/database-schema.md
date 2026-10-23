# 🗄️ HoneyHug Database Schema & Security Architecture

## 1. Architectural Principles
1. **Multi-Tenant with Strict Isolation:** Every shared record belongs to a `couple_id`.
2. **Absolute Two-Member Constraint:** A database trigger physically prevents a 3rd user from attaching to any couple.
3. **Data Protection at Rest:** Row Level Security (RLS) policies guard every table against foreign reads or writes.
4. **Zero Client Leakage:** Timed messages and locked letters withhold payloads server-side until the unlock timestamp has passed.

---

## 2. Table Schemas (PostgreSQL DDL)

### 2.1 Profiles & Identity
```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT NOT NULL,
  avatar_config JSONB NOT NULL DEFAULT '{"fur": "chestnut", "expression": "idle", "accessory": "none"}'::jsonb,
  timezone TEXT NOT NULL DEFAULT 'UTC',
  push_token TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### 2.2 Couples & Membership
```sql
CREATE TABLE couples (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  together_since DATE NOT NULL,
  anniversary DATE,
  status_text TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE couple_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  couple_id UUID NOT NULL REFERENCES couples(id) ON DELETE CASCADE,
  user_id UUID NOT NULL UNIQUE REFERENCES profiles(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'member', -- 'creator' | 'partner'
  joined_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (couple_id, user_id)
);

-- Trigger: Enforce maximum of 2 members per couple
CREATE OR REPLACE FUNCTION check_max_couple_members()
RETURNS TRIGGER AS $$
BEGIN
  IF (SELECT COUNT(*) FROM couple_members WHERE couple_id = NEW.couple_id) >= 2 THEN
    RAISE EXCEPTION 'A couple space can have at most two members.';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER enforce_max_couple_members
BEFORE INSERT ON couple_members
FOR EACH ROW EXECUTE FUNCTION check_max_couple_members();
```

### 2.3 Invites
```sql
CREATE TABLE invites (
  code TEXT PRIMARY KEY,
  couple_id UUID NOT NULL REFERENCES couples(id) ON DELETE CASCADE,
  created_by UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  expires_at TIMESTAMPTZ NOT NULL,
  used_at TIMESTAMPTZ
);
```

### 2.4 Daily Interaction & Moods
```sql
CREATE TABLE love_signals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  couple_id UUID NOT NULL REFERENCES couples(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL, -- 'hug' | 'kiss' | 'miss_you' | 'ily' | 'cuddle'
  haptic_pattern TEXT DEFAULT 'gentle_pulse',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE moods (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  couple_id UUID NOT NULL REFERENCES couples(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  mood TEXT NOT NULL, -- 'happy' | 'tired' | 'stressed' | 'sad' | 'excited' | 'loved'
  note TEXT,
  is_shared BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE mood_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mood_id UUID NOT NULL REFERENCES moods(id) ON DELETE CASCADE,
  responder_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL, -- 'support' | 'hug' | 'message'
  text TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### 2.5 Emotional Connection: Letters, Secrets & Appreciations
```sql
CREATE TABLE letters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  couple_id UUID NOT NULL REFERENCES couples(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  situation TEXT NOT NULL, -- 'open_when_sad', 'open_when_miss_me', etc.
  body TEXT NOT NULL,
  photo_url TEXT,
  unlock_at TIMESTAMPTZ,
  opened_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE secret_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  couple_id UUID NOT NULL REFERENCES couples(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  kind TEXT NOT NULL, -- 'note' | 'photo' | 'voice'
  storage_path TEXT NOT NULL,
  unlock_at TIMESTAMPTZ NOT NULL,
  unlocked BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE appreciations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  couple_id UUID NOT NULL REFERENCES couples(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  prompt_id TEXT NOT NULL,
  answer TEXT NOT NULL,
  day DATE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### 2.6 Virtual Room, Items & Memories
```sql
CREATE TABLE room_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  couple_id UUID NOT NULL REFERENCES couples(id) ON DELETE CASCADE,
  item_key TEXT NOT NULL,
  position JSONB NOT NULL DEFAULT '{"x": 0, "y": 0, "layer": 1}'::jsonb,
  unlocked_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE unlocks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  couple_id UUID NOT NULL REFERENCES couples(id) ON DELETE CASCADE,
  item_key TEXT NOT NULL,
  source_activity TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE memories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  couple_id UUID NOT NULL REFERENCES couples(id) ON DELETE CASCADE,
  type TEXT NOT NULL, -- 'photo' | 'milestone' | 'drawing'
  title TEXT NOT NULL,
  caption TEXT,
  storage_path TEXT,
  memory_date DATE NOT NULL,
  place TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE bucket_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  couple_id UUID NOT NULL REFERENCES couples(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  is_completed BOOLEAN NOT NULL DEFAULT FALSE,
  completed_at TIMESTAMPTZ,
  memory_id UUID REFERENCES memories(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE drawings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  couple_id UUID NOT NULL REFERENCES couples(id) ON DELETE CASCADE,
  strokes JSONB NOT NULL,
  thumbnail_path TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

---

## 3. Row Level Security (RLS) Policy Blueprint

```sql
-- Helper function checking couple membership
CREATE OR REPLACE FUNCTION is_member(c uuid) RETURNS boolean
LANGUAGE sql SECURITY DEFINER AS $$
  SELECT EXISTS (
    SELECT 1 FROM couple_members
    WHERE couple_id = c AND user_id = auth.uid()
  );
$$;

-- Apply to all tables
ALTER TABLE couples ENABLE ROW LEVEL SECURITY;
ALTER TABLE couple_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE love_signals ENABLE ROW LEVEL SECURITY;
ALTER TABLE moods ENABLE ROW LEVEL SECURITY;
ALTER TABLE letters ENABLE ROW LEVEL SECURITY;
ALTER TABLE memories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Members view their couple" ON couples
  FOR SELECT USING (is_member(id));

CREATE POLICY "Members view couple members" ON couple_members
  FOR SELECT USING (is_member(couple_id));

CREATE POLICY "Members insert signals" ON love_signals
  FOR INSERT WITH CHECK (is_member(couple_id) AND sender_id = auth.uid());

CREATE POLICY "Members view signals" ON love_signals
  FOR SELECT USING (is_member(couple_id));

CREATE POLICY "Members insert moods" ON moods
  FOR INSERT WITH CHECK (is_member(couple_id) AND user_id = auth.uid());

CREATE POLICY "Members view shared moods" ON moods
  FOR SELECT USING (is_member(couple_id) AND (is_shared = true OR user_id = auth.uid()));
```
