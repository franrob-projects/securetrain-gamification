# SecureTrain — Gamification Layer

> Streak tracking, badge unlocks, and a live team leaderboard — drop-in on top of the existing SecureTrain Next.js app.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![Supabase](https://img.shields.io/badge/Supabase-postgres-3ECF8E?style=flat-square&logo=supabase)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38BDF8?style=flat-square&logo=tailwindcss)

---

## What this adds

The core SecureTrain app handles the training modules. This layer sits on top and tracks *how* people are training — consistency, depth, and improvement over time.

```
User completes a module
        │
        ▼
  POST /api/progress
        │
        ├─▶ Save completion to Supabase
        ├─▶ Recalculate streak
        ├─▶ Evaluate badge conditions (badgeEngine.ts)
        ├─▶ Persist any newly earned badges
        └─▶ Return { score, streak, newBadges[] }
              │
              ▼
    BadgeUnlockToast fires if newBadges.length > 0
```

Three new surfaces in the UI:

| Surface | Route / Component | What it does |
|---|---|---|
| Streak widget | `<StreakWidget />` | Flame counter + milestone markers at 3, 7, 30 days |
| Badge showcase | `<BadgeShowcase />` | Full grid — earned, locked, filterable by tier |
| Leaderboard | `/leaderboard` | Live team rankings, risk score, streak, badge count |

---

## Badge system

13 badges across 4 tiers. The `badgeEngine.ts` evaluates all conditions on every completion — no manual wiring needed when you add new ones.

### Tiers

| Tier | Colour | What it signals |
|---|---|---|
| 🟤 Bronze | Orange | Getting started |
| ⚪ Silver | Slate | Building consistency |
| 🟡 Gold | Yellow | Module mastery |
| 🔵 Platinum | Cyan | Rare, long-term achievements |

### Full badge list

| Badge | Icon | Tier | How to earn |
|---|---|---|---|
| First Responder | 🛡️ | Bronze | Complete any module |
| On a Roll | 🔥 | Bronze | 3-day training streak |
| Zero Gaps | 🎯 | Silver | Score 100% on any module |
| Threat Hunter | 🔍 | Silver | Complete 5 modules |
| Red Alert Ready | 🚨 | Silver | Complete 3 critical-threat modules |
| Week Warrior | ⚡ | Silver | 7-day training streak |
| Phishing Ace | 🪝 | Gold | 100% on Wallet & Seed Phrase |
| Social Proof | 🕵️ | Gold | 100% on LinkedIn Social Engineering |
| Deepfake Detector | 🤖 | Gold | 100% on CEO Deepfake module |
| Chain Guardian | ⛓️ | Gold | Complete all crypto sector modules |
| House Always Wins | 🎲 | Gold | Complete all iGaming sector modules |
| Fully Armoured | ⚔️ | Platinum | Complete every available module |
| Unstoppable | 💎 | Platinum | 30-day training streak |

### Adding a badge

Open `src/data/badges.ts` and add a new entry. That's it — `badgeEngine.ts` picks it up automatically on the next completion.

```ts
{
  id: 'your-badge-id',
  name: 'Badge Name',
  description: 'What the user did to earn this',
  icon: '🏆',
  colour: 'text-emerald-400',
  tier: 'gold',
  condition: { type: 'completions_count', value: 10 },
}
```

Available condition types:

| Type | Triggers when |
|---|---|
| `first_completion` | User completes their first module |
| `perfect_score` | 100% on any module |
| `module_score` | Score ≥ threshold on a specific `moduleId` |
| `streak` | Active streak ≥ N days |
| `completions_count` | Total completions ≥ N |
| `sector_sweep` | All modules in `crypto` or `gambling` completed |
| `threat_level` | N critical-threat modules completed |

---

## Leaderboard & risk score

The leaderboard ranks by modules completed, then average score. Each user gets a **risk score** — a composite metric that goes down as training depth increases:

```sql
risk_score = MAX(0, 100 - (modules_completed × 8 + avg_score × 0.4))
```

A user who's completed 8 modules with 90% average scores has a risk score of ~22. Someone who's done nothing scores 100. Lower is better. The risk bar in the UI renders green (≤30), amber (31–60), or red (61+).

---

## Database schema

Four tables + one view, all in Supabase with RLS enabled:

```
users
  id (uuid, FK → auth.users)
  email, display_name, avatar_url
  sector: 'crypto' | 'gambling' | 'both'

completions
  id, user_id → users
  module_id (text)
  score (0–100)
  completed_at

streaks
  user_id → users          [PK]
  current_streak (int)
  longest_streak (int)
  last_activity (date)

user_badges
  id, user_id → users
  badge_id (text)
  earned_at
  UNIQUE(user_id, badge_id)

leaderboard                [view]
  Live-computed from all four tables above
```

A Postgres trigger (`on_auth_user_created`) automatically inserts rows into `users` and `streaks` when someone signs up — no manual setup per user.

---

## Setup

### 1. Install dependencies

```bash
npm install @supabase/supabase-js @supabase/ssr
```

### 2. Create a Supabase project

Go to [supabase.com](https://supabase.com), create a free project, and wait for it to provision.

### 3. Run the schema

In your Supabase dashboard → **SQL Editor** → **New query**, paste the contents of `supabase-schema.sql` and hit Run. This creates all tables, the leaderboard view, RLS policies, and the signup trigger.

### 4. Environment variables

Copy your keys from **Supabase → Project Settings → API** and add them to `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

The `.env.local.additions` file in this repo shows the exact variable names.

### 5. Copy source files

Merge the `src/` directory here into your existing `securetrain/src/`. No existing files are deleted — you're adding new ones and replacing two:

**New files:**
```
src/lib/supabase.ts
src/lib/supabaseServer.ts
src/lib/badgeEngine.ts
src/data/badges.ts
src/components/gamification/StreakWidget.tsx
src/components/gamification/BadgeShowcase.tsx
src/components/gamification/BadgeUnlockToast.tsx
src/app/api/progress/route.ts
src/app/api/leaderboard/route.ts
src/app/api/badges/route.ts
src/app/leaderboard/page.tsx
```

**Updated files** (streak + badge count wired in):
```
src/app/page.tsx
src/app/train/[moduleId]/page.tsx
```

### 6. Tailwind config

Add the two keyframe animations from `tailwind.config.additions.ts` into your existing `theme.extend`:

```ts
keyframes: {
  slideUp: {
    '0%':   { opacity: '0', transform: 'translateY(16px)' },
    '100%': { opacity: '1', transform: 'translateY(0)' },
  },
  shrink: {
    '0%':   { width: '100%' },
    '100%': { width: '0%' },
  },
},
animation: {
  slideUp: 'slideUp 0.4s ease-out',
  shrink:  'shrink 3s linear forwards',
},
```

These power the `BadgeUnlockToast` slide-in and its auto-dismiss progress bar.

### 7. Start the dev server

```bash
npm run dev
```

---

## API reference

### `POST /api/progress`

Called automatically when a user finishes a module. Saves the completion, recalculates streak, evaluates badges, and returns anything newly earned.

**Headers:** `Authorization: Bearer <supabase_access_token>`

**Body:**
```json
{ "moduleId": "crypto-wallet-phishing", "score": 94 }
```

**Response:**
```json
{
  "saved": true,
  "score": 94,
  "streak": 4,
  "newBadges": [
    { "id": "streak-3", "name": "On a Roll", "icon": "🔥", "tier": "bronze" }
  ]
}
```

### `GET /api/leaderboard`

Returns the full leaderboard view, ordered by modules completed then average score. Requires an authenticated session.

### `GET /api/badges`

Returns all badge definitions alongside the current user's earned badge IDs.

---

## File structure

```
securetrain-gamification/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── badges/route.ts
│   │   │   ├── leaderboard/route.ts
│   │   │   └── progress/route.ts
│   │   ├── leaderboard/page.tsx
│   │   ├── page.tsx                  ← updated
│   │   └── train/[moduleId]/page.tsx ← updated
│   ├── components/gamification/
│   │   ├── BadgeShowcase.tsx
│   │   ├── BadgeUnlockToast.tsx
│   │   └── StreakWidget.tsx
│   ├── data/
│   │   └── badges.ts                 ← edit here to add badges
│   └── lib/
│       ├── badgeEngine.ts
│       ├── supabase.ts               ← browser client
│       └── supabaseServer.ts         ← server client (API routes)
├── supabase-schema.sql
├── tailwind.config.additions.ts
├── package-additions.json
└── .env.local.additions
```
