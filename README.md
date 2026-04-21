# Conply

A full-stack compliance training platform I built as a side project to sharpen my skills across the modern web stack. The idea: what if compliance training for crypto and iGaming firms wasn't painful? What if it was AI-generated, grounded in real regulation, and delivered where people already work (Slack, Teams)?

This is a working product at [conply.org](https://www.conply.org), but it's also a playground where I've been learning and experimenting with tools I find interesting.

## What it does

- **AI-generated training scenarios** grounded in actual Gibraltar and Luxembourg regulation (POCA 2015, GFSC Principles, MiCA, CSSF circulars)
- **Delivered via Slack and Microsoft Teams** with branded cards and one-click training links
- **Audit-ready PDF records** for every completed module (the thing regulators actually ask for)
- **Admin dashboard** with a compliance matrix showing who's trained, who's overdue, and who needs a nudge
- **RAG pipeline** that retrieves real regulation text and feeds it to the AI so scenarios cite specific sections of law

## Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 15 (App Router, Server Components) |
| Language | TypeScript |
| Database | Supabase (Postgres + Auth + Row Level Security) |
| AI | Anthropic Claude API (scenario generation via RAG) |
| Slack | @slack/web-api (Block Kit messages, bot integration) |
| Teams | Adaptive Cards via Incoming Webhooks |
| Deployment | Vercel (Fluid Compute, Cron Jobs) |
| Styling | Tailwind CSS |
| PDF generation | jsPDF |
| Charts | Recharts |
| Blog | MDX with remark |
| Animations | Framer Motion |

## Architecture

```
Regulation sources (POCA, GFSC, MiCA, CSSF, etc.)
        |
        v
  Vector embeddings (Supabase pgvector)
        |
        v
  RAG retrieval → Claude API → AI-generated scenarios
        |
        v
  Delivered via Slack / Teams (Vercel Cron, 09:00 Mon-Fri)
        |
        v
  User completes training → score recorded → PDF available
        |
        v
  Admin dashboard (compliance matrix, team management)
```

## Key things I learned building this

- **Supabase Row Level Security** for multi-tenant data isolation without a backend auth layer
- **RAG with pgvector** for grounding AI output in source documents (regulation text)
- **Slack Block Kit** and **Teams Adaptive Cards** for rich bot messaging
- **Next.js App Router** patterns: Server Components, route handlers, middleware auth
- **Vercel Cron Jobs** for scheduled delivery without managing infrastructure
- **jsPDF** for generating compliance certificates client-side

## Running locally

```bash
# Clone and install
git clone https://github.com/franrob-projects/securetrain-gamification.git
cd securetrain-gamification
npm install

# Set up environment variables
cp .env.example .env.local
# Fill in: Supabase URL/keys, Anthropic API key, Slack bot token

# Run Supabase migrations
# (paste the SQL files from supabase/migrations/ into the Supabase SQL editor)

# Start dev server
npm run dev
```

## Environment variables

| Variable | What it's for |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key (client-side auth) |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server-side, bypasses RLS) |
| `ANTHROPIC_API_KEY` | Claude API for scenario generation |
| `SLACK_BOT_TOKEN` | Slack bot token (xoxb-...) |
| `SLACK_CHANNEL_ID` | Default Slack channel for training delivery |
| `TEAMS_WEBHOOK_URL` | Microsoft Teams Incoming Webhook URL |
| `CRON_SECRET` | Auth token for Vercel cron endpoints |
| `NEXT_PUBLIC_APP_URL` | Base URL (https://www.conply.org) |

## Project structure

```
src/
  app/                    # Next.js App Router pages + API routes
    api/
      deliver/            # Unified delivery cron (Slack + Teams)
      scenario/           # AI scenario generation (Claude + RAG)
      slack/remind/       # Slack-specific delivery endpoint
      teams/remind/       # Teams-specific delivery endpoint
      admin/              # Team management APIs
    products/             # Gibraltar + Luxembourg product pages
    train/[moduleId]/     # Training UI (scenarios, scoring, PDF)
    admin/                # Admin dashboard
    blog/                 # MDX blog
  components/
    training/             # ScenarioPlayer, scoring UI
    admin/                # ComplianceMatrix, team management
    marketing/            # Nav, Footer, HeroToggle
    ui/                   # Shared components (logos, badges, flags)
  lib/
    delivery.ts           # Shared delivery content builder + logging
    slackSender.ts        # Slack message formatting + sending
    teamsSender.ts        # Teams Adaptive Card formatting + sending
    retrieval.ts          # RAG: vector similarity search
    supabase.ts           # Client-side Supabase client
    supabaseServer.ts     # Server-side Supabase client (service role)
  data/
    modules.ts            # Training module definitions
    regulation-seed.ts    # Regulation text chunks for RAG
supabase/
  migrations/             # Database schema + delivery tracking
content/
  blog/                   # MDX blog posts
public/
  logos/                  # Brand assets (Slack, Teams, regulation logos)
```

## License

MIT. Do whatever you want with it.

## About me

I'm Francis, a developer based in Gibraltar. This project is a mix of things I care about: making compliance less tedious, building with modern tools, and shipping something that actually works end-to-end. If you're into crypto compliance or full-stack development, feel free to reach out.

[conply.org](https://www.conply.org) | [Book a chat](https://cal.com/conply/30min)
