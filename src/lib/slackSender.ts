import { WebClient } from '@slack/web-api'
import { buildDeliveryContent, logDelivery } from '@/lib/delivery'

function getSlackClient(): WebClient {
  const token = process.env.SLACK_BOT_TOKEN
  if (!token) throw new Error('SLACK_BOT_TOKEN is not set')
  return new WebClient(token)
}

export async function sendSlackReminder(opts: {
  userName?: string
  moduleId?: string
  channel?: string
  teamMemberId?: string
}): Promise<{ ok: boolean; error?: string; ts?: string }> {
  const channelId = opts.channel ?? process.env.SLACK_CHANNEL_ID
  if (!channelId) return { ok: false, error: 'No Slack channel configured' }

  const content = buildDeliveryContent({ userName: opts.userName, moduleId: opts.moduleId })

  const blocks = [
    {
      type: 'header' as const,
      text: { type: 'plain_text' as const, text: content.headerText, emoji: true },
    },
    {
      type: 'section' as const,
      text: {
        type: 'mrkdwn' as const,
        text: `*${content.module.title}*\n${content.shortDescription}`,
      },
    },
    {
      type: 'context' as const,
      elements: [{ type: 'mrkdwn' as const, text: content.metaLine }],
    },
    { type: 'divider' as const },
    {
      type: 'section' as const,
      text: {
        type: 'mrkdwn' as const,
        text: `*What you'll cover*\n${content.topicPreview.map(t => `  •  ${t}`).join('\n')}`,
      },
    },
    {
      type: 'actions' as const,
      elements: [
        {
          type: 'button' as const,
          text: { type: 'plain_text' as const, text: 'Start training', emoji: true },
          url: content.trainingUrl,
          style: 'primary' as const,
        },
        {
          type: 'button' as const,
          text: { type: 'plain_text' as const, text: 'View all modules', emoji: true },
          url: content.progressUrl,
        },
      ],
    },
    {
      type: 'context' as const,
      elements: [
        {
          type: 'plain_text' as const,
          text: 'Conply  ·  Compliance training, grounded in statute',
          emoji: true,
        },
      ],
    },
  ]

  try {
    const client = getSlackClient()
    const result = await client.chat.postMessage({
      channel:      channelId,
      text:         content.fallbackText,
      attachments:  [{ color: '#5B54B8', blocks }],
      unfurl_links: false,
      unfurl_media: false,
    })

    await logDelivery({
      teamMemberId: opts.teamMemberId,
      channel:      'slack',
      moduleId:     content.module.id,
      status:       'sent',
      messageTs:    result.ts,
    })

    return { ok: true, ts: result.ts }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('[slack] Failed to send reminder:', message)

    await logDelivery({
      teamMemberId: opts.teamMemberId,
      channel:      'slack',
      moduleId:     content.module.id,
      status:       'failed',
      errorMessage: message,
    })

    return { ok: false, error: message }
  }
}
