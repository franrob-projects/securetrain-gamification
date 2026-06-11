// Post a sample training reminder to the configured Slack channel for demos.
// The button on the message links to /train/<module>?demo=1 so anyone in the
// channel can click through without an account.
//
// Usage:
//   npx tsx scripts/send-demo-slack.ts [moduleId]

import { config as loadEnv } from 'dotenv'
loadEnv({ path: '.env.local' })

import { sendSlackReminder } from '@/lib/slackSender'
import { buildDeliveryContent } from '@/lib/delivery'

async function main() {
  const moduleId = process.argv[2] ?? process.env.SLACK_MODULE_ID

  if (!process.env.SLACK_BOT_TOKEN || !process.env.SLACK_CHANNEL_ID) {
    console.error('Missing SLACK_BOT_TOKEN or SLACK_CHANNEL_ID in .env.local')
    process.exit(1)
  }

  const preview = buildDeliveryContent({ moduleId, demoMode: true })
  console.log(`Posting "${preview.module.title}" to channel ${process.env.SLACK_CHANNEL_ID}`)
  console.log(`Training URL: ${preview.trainingUrl}`)

  const result = await sendSlackReminder({ moduleId, demoMode: true })
  if (!result.ok) {
    console.error('Slack send failed:', result.error)
    process.exit(1)
  }

  console.log(`\nSent (ts=${result.ts}). Click the "Start training" button in Slack.`)
  console.log(`Then open ${process.env.NEXT_PUBLIC_APP_URL ?? 'https://www.conply.org'}/admin to see the dashboard.`)
}

main()
