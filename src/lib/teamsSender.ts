import { buildDeliveryContent, logDelivery } from '@/lib/delivery'

export async function sendTeamsReminder(opts: {
  userName?: string
  moduleId?: string
  webhookUrl?: string
  teamMemberId?: string
}): Promise<{ ok: boolean; error?: string }> {
  const webhook = opts.webhookUrl ?? process.env.TEAMS_WEBHOOK_URL
  if (!webhook) return { ok: false, error: 'No Teams webhook URL configured (set TEAMS_WEBHOOK_URL)' }

  const content = buildDeliveryContent({ userName: opts.userName, moduleId: opts.moduleId })

  const card = {
    type: 'message',
    attachments: [
      {
        contentType: 'application/vnd.microsoft.card.adaptive',
        contentUrl: null,
        content: {
          $schema: 'http://adaptivecards.io/schemas/adaptive-card.json',
          type: 'AdaptiveCard',
          version: '1.4',
          body: [
            {
              type: 'TextBlock',
              text: content.headerText,
              size: 'Large',
              weight: 'Bolder',
              wrap: true,
            },
            {
              type: 'TextBlock',
              text: content.module.title,
              weight: 'Bolder',
              spacing: 'Small',
              wrap: true,
            },
            {
              type: 'TextBlock',
              text: content.shortDescription,
              wrap: true,
              size: 'Small',
              color: 'Default',
            },
            {
              type: 'FactSet',
              facts: [
                { title: 'Priority', value: content.module.threatLevel.charAt(0).toUpperCase() + content.module.threatLevel.slice(1) },
                { title: 'Duration', value: `${content.module.durationMins} minutes` },
              ],
            },
            {
              type: 'TextBlock',
              text: '**What you\'ll cover**',
              spacing: 'Medium',
              wrap: true,
            },
            ...content.topicPreview.map(topic => ({
              type: 'TextBlock' as const,
              text: `• ${topic}`,
              wrap: true,
              spacing: 'None' as const,
              size: 'Small' as const,
            })),
          ],
          actions: [
            {
              type: 'Action.OpenUrl',
              title: 'Start training',
              url: content.trainingUrl,
              style: 'positive',
            },
            {
              type: 'Action.OpenUrl',
              title: 'View all modules',
              url: content.progressUrl,
            },
          ],
        },
      },
    ],
  }

  try {
    const res = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(card),
    })

    if (!res.ok) {
      const text = await res.text().catch(() => res.statusText)
      throw new Error(`Teams webhook returned ${res.status}: ${text}`)
    }

    await logDelivery({
      teamMemberId: opts.teamMemberId,
      channel:      'teams',
      moduleId:     content.module.id,
      status:       'sent',
    })

    return { ok: true }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('[teams] Failed to send reminder:', message)

    await logDelivery({
      teamMemberId: opts.teamMemberId,
      channel:      'teams',
      moduleId:     content.module.id,
      status:       'failed',
      errorMessage: message,
    })

    return { ok: false, error: message }
  }
}
