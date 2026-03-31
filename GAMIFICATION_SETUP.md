# Gamification + Supabase — Setup Guide

## 1. Install new dependencies

```bash
npm install @supabase/supabase-js @supabase/ssr
```

## 2. Create a Supabase project

1. Go to https://supabase.com and create a free project
2. Wait for it to provision (~1 min)

## 3. Run the database schema

1. In your Supabase dashboard → **SQL Editor** → **New query**
2. Paste the contents of `supabase-schema.sql`
3. Click **Run**

This creates: `users`, `completions`, `streaks`, `user_badges` tables, the `leaderboard` view, RLS policies, and the auto-create user trigger.

## 4. Add environment variables

Copy your keys from: **Supabase dashboard → Project Settings → API**

Add to your `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

## 5. Copy new files into your project

Copy everything in `src/` into your existing `securetrain/src/`, merging folders.

The files you're **adding** (new):
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

The files you're **replacing** (updated versions):
```
src/app/page.tsx                        ← streak + badge count in header
src/app/train/[moduleId]/page.tsx       ← saves progress, shows badge toast
```

## 6. Update tailwind.config.ts

Merge `tailwind.config.additions.ts` into your `theme.extend`:

```ts
theme: {
  extend: {
    // ... your existing stuff ...
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
  }
}
```

## 7. Run the dev server

```bash
npm run dev
```

---

## What's now in your app

### Supabase tables
| Table | Purpose |
|---|---|
| `users` | Profiles, auto-created on signup |
| `completions` | Every module attempt with score |
| `streaks` | Current + longest streak per user |
| `user_badges` | Which badges each user has earned |
| `leaderboard` (view) | Live-computed rankings |

### New pages
- `/leaderboard` — ranked table with risk scores, streaks, badge counts

### New components
- `StreakWidget` — flame streak display with milestone dots
- `BadgeShowcase` — full badge grid with earned/locked/tier filters
- `BadgeUnlockToast` — animated pop-up when new badge earned post-module

### Badges (13 total)
| Badge | How to earn |
|---|---|
| 🛡️ First Responder | Complete any module |
| 🎯 Zero Gaps | Score 100% on any module |
| 🪝 Phishing Ace | 100% on Wallet & Seed Phrase module |
| 🕵️ Social Proof | 100% on LinkedIn Social Engineering |
| 🤖 Deepfake Detector | 100% on CEO Deepfake module |
| 🔥 On a Roll | 3-day streak |
| ⚡ Week Warrior | 7-day streak |
| 💎 Unstoppable | 30-day streak |
| 🔍 Threat Hunter | Complete 5 modules |
| ⚔️ Fully Armoured | Complete all modules |
| ⛓️ Chain Guardian | Complete all crypto modules |
| 🎲 House Always Wins | Complete all iGaming modules |
| 🚨 Red Alert Ready | Complete 3 critical-threat modules |

### Adding a new badge
Edit `src/data/badges.ts` — add an entry with a `condition` object.
The `badgeEngine.ts` evaluates all conditions after each completion.
No other changes needed.
