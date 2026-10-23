# [HUG-01] User Authentication & Profile Setup

| Metric | Details |
| :--- | :--- |
| **Issue Key** | HUG-01 |
| **Type** | Story |
| **Component** | `src/features/auth`, `app/(auth)` |
| **Priority** | High |
| **Phase** | Phase 0 (Foundation) |

---

## 1. User Story
> **As a** new or returning user,  
> **I want to** sign up securely with my email or magic link, configure my bear avatar, and save my profile,  
> **So that** my identity and preferences are established before I create or join a shared couple space.

---

## 2. Feature Overview
- Email + password and passwordless magic link support using Supabase Auth.
- Bear avatar configuration during onboarding (selecting fur tint: chestnut, caramel, polar, espresso; initial accessory and name).
- Automated creation of a record in `profiles` keyed by `auth.users.id`.
- Automated push notification token extraction and registration via `expo-notifications`.

---

## 3. Visual & Aesthetic Requirements
- **Theme Palette:**
  - Background: `cream` (`#FFF4E0`)
  - Primary button: `honey` (`#F6B93B`) with `cocoa` text (`#6B4226`)
  - Accent / Focus: `blush` (`#FF8FA3`)
- **Typography:** Rounded `Nunito` for input fields and action buttons.
- **Bear Integration:** The BearAvatar dynamically previews fur and expressions as the user toggles options in real time.

---

## 4. Technical Implementation Steps
1. Configure `supabase-js` client with `expo-secure-store` for session persistence.
2. Build `app/(auth)/sign-in.tsx` and `app/(auth)/sign-up.tsx` forms.
3. Build `app/(auth)/onboarding.tsx` for custom name input and avatar selection.
4. Hook up `expo-notifications` token fetch and update `profiles.push_token`.
5. Implement Zustand `useAuthStore` to track `session`, `profile`, and `isLoading`.

---

## 5. Acceptance Criteria
- [ ] Users can sign up or log in using valid email credentials.
- [ ] A row is created in `public.profiles` with the selected avatar configuration and display name.
- [ ] Push token is obtained (on physical Android/iOS device) and persisted to the profile.
- [ ] Session persists across app restarts using `expo-secure-store`.
- [ ] Screen renders seamlessly within HoneyHug cream/honey design system.
