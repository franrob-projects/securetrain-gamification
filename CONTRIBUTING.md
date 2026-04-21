# Contributing to Conply

Thanks for your interest in contributing! Conply is a compliance training platform built as an open-source side project. Contributions of all kinds are welcome.

## Ways to contribute

- **Bug reports** — found something broken? Open an issue.
- **Feature ideas** — have an idea for a new module, jurisdiction, or integration? Open an issue tagged `enhancement`.
- **Code** — pick up an open issue, fork the repo, and open a PR.
- **Regulation content** — if you know Gibraltar or Luxembourg compliance law and can improve the regulation seed data, that's incredibly valuable.
- **Design** — UI/UX improvements, accessibility fixes, or mobile polish.

## Getting started

```bash
git clone https://github.com/franrob-projects/conply.git
cd conply
npm install
cp .env.example .env.local
# Fill in your Supabase + Anthropic keys
npm run dev
```

You'll need:
- A [Supabase](https://supabase.com) project (free tier works)
- An [Anthropic API key](https://console.anthropic.com) for scenario generation
- Optionally, a Slack bot token for testing delivery

## Pull request guidelines

- Keep PRs focused on one thing
- Run `npx tsc --noEmit` before submitting (must pass with zero errors)
- If you're adding a new feature, describe what it does and why in the PR description
- Screenshots are helpful for UI changes

## Project structure

See the [README](README.md#project-structure) for a full map of the codebase.

## Code style

- TypeScript throughout, strict mode
- Tailwind CSS for styling (no CSS modules)
- Server Components by default, `'use client'` only when needed
- Inline styles for dynamic values, Tailwind for static layout

## Questions?

Open a discussion or reach out at [cal.com/conply/30min](https://cal.com/conply/30min).
