# 🎨 HoneyHug Design System & Bear Theme

## 1. Aesthetic Identity
The HoneyHug visual language is inspired by a warm, hand-drawn cottage nestled in a sunlit pine forest. The interface rejects generic corporate mobile styles in favor of rounded, organic geometry, soft paper textures, gentle bouncy springs, and playful honey accents.

---

## 2. Color Palette & Design Tokens

| Token Name | Hex Code | HSL Equivalent | Primary Usage |
| :--- | :--- | :--- | :--- |
| `honey` | `#F6B93B` | `hsl(40, 91%, 60%)` | Primary interactive buttons, love accents, badges, notification pings |
| `cocoa` | `#6B4226` | `hsl(24, 48%, 28%)` | Primary typography, bear outlines, deep borders, card headers |
| `cream` | `#FFF4E0` | `hsl(39, 100%, 94%)`| Primary app background, modal canvas, letter paper background |
| `blush` | `#FF8FA3` | `hsl(349, 100%, 78%)`| Floating hearts, love button glows, kiss signals, intimate moments |
| `moss` | `#8DB580` | `hsl(105, 27%, 61%)` | Success confirmations, plant items, connected status, calm mood |
| `night` | `#2B2D52` | `hsl(237, 31%, 25%)` | Sleep Together mode, celestial skies, deep contrast badges |

### Extended Utility Tones
- `honeyDark`: `#DF9E1F` (Hover / pressed state for primary buttons)
- `cocoaLight`: `#A57451` (Secondary subtitles, timestamps, inactive icons)
- `creamCard`: `#FFFFFF` with 80% opacity and subtle cream border for glassmorphic cards
- `dangerSoft`: `#E57373` (Gentle cancellation / disconnect confirmations)

---

## 3. Typography Hierarchy

HoneyHug uses a dual-type system to distinguish functional app navigation from emotional handwritten notes.

1. **Primary Interface:** `Nunito` or `Baloo 2` (via `@expo-google-fonts/nunito`)
   - `Title 1` (Hero): 28px / Bold (700) / Tracking: -0.5px
   - `Title 2` (Headers): 22px / SemiBold (600)
   - `Headline`: 18px / SemiBold (600)
   - `Body`: 15px / Regular (400) / Line height: 22px
   - `Caption / Micro`: 12px / Medium (500)
2. **Emotional & Handwritten Moments:** `Caveat` (via `@expo-google-fonts/caveat`)
   - `Love Note Large`: 24px / SemiBold (600) / Line height: 32px
   - `Love Note Normal`: 19px / Medium (500) / Line height: 26px
   - Used in: "Open When" letter bodies, sticky notes, daily appreciation answers, love jar slips.

---

## 4. Bear Avatar Character Specifications

### 4.1 Layered SVG Architecture
To avoid heavy raster sprite sheets and ensure crisp rendering at any screen density, each bear is rendered as layered SVG paths:
1. `BaseBodyLayer`: Torso, belly patch, paws.
2. `HeadLayer`: Muzzle, cheeks, nose, and expressive eyes.
3. `FurTint`: Color tint (`#A0633B` chestnut, `#D49B6A` caramel, `#E8D5C4` polar cream, `#4A3528` espresso).
4. `Expressions`: Idle (gentle smile), Happy (closed crescent eyes, blushing cheeks), Sleepy (drooping eyelids, tiny zzz's), Sad (watery eyes), Loved (floating hearts in eyes), Excited (sparkle eyes, open mouth).
5. `AccessoriesLayer`: Hats (beanie, flower crown), Scarves (winter knit, red bandana), Glasses (round specs, sunglasses).

---

## 5. Motion & Physics Language

- **Spring Dynamics:** Soft bouncy springs using `react-native-reanimated`:
  ```typescript
  export const SPRING_GENTLE = {
    damping: 15,
    stiffness: 120,
    mass: 0.8,
  };
  export const SPRING_BOUNCY = {
    damping: 10,
    stiffness: 180,
    mass: 1.0,
  };
  ```
- **Heart Bursts:** Floating particle bursts radiating outward with randomized parabolic trajectories and alpha fading.
- **Breathing Idle:** Bears in the room have a subtle 3.5s vertical pulse (`scaleY: 1.0` -> `scaleY: 1.03`) evoking lifelike breathing.
- **Accessibility:** All animations strictly observe `AccessibilityInfo.isReduceMotionEnabled()`.

---

## 6. Core Component Catalog

| Component | Description | Default Props |
| :--- | :--- | :--- |
| `<BearAvatar />` | Layered SVG customizable character | `size: 'sm' \| 'md' \| 'lg'`, `expression`, `customization` |
| `<HoneyButton />` | Warm pill button with 3D depressed effect | `variant: 'primary' \| 'secondary' \| 'ghost'`, `icon`, `haptic` |
| `<PawCard />` | Rounded card container with cream fill & cocoa border | `elevated?: boolean`, `padding?: 'sm' \| 'md' \| 'lg'` |
| `<StickyNote />` | Tilted paper note with Caveat typography | `color: 'honey' \| 'blush' \| 'cream'`, `rotation?: number` |
| `<HeartBurst />` | Full-screen Lottie & particle overlay | `onAnimationEnd`, `intensity: 1..5` |
| `<LetterEnvelope />`| Sealed wax-stamp envelope with tap-to-open fold | `isOpened: boolean`, `situation: string` |
| `<BearTabBar />` | Curved organic bottom navigation bar | `activeTab`, `onTabPress`, `unreadBadge` |
| `<MoodPicker />` | 6-bear carousel with immediate haptic response | `selectedMood`, `onSelectMood` |
