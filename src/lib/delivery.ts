import { createServerClient } from '@/lib/supabaseServer'
import { MODULES, type TrainingModule } from '@/data/modules'

const THREAT_LABEL: Record<string, string> = {
  critical: 'Critical priority',
  high:     'High priority',
  medium:   'Medium priority',
  low:      'Low priority',
}

const SECTOR_LABEL: Record<string, string> = {
  crypto:   'Crypto licensees',
  gambling: 'Gambling licensees',
  both:     'All Gibraltar licensees',
}

export interface DeliveryContent {
  module: TrainingModule
  headerText: string
  shortDescription: string
  topicPreview: string[]
  metaLine: string
  fallbackText: string
  trainingUrl: string
  progressUrl: string
  baseUrl: string
}

export function buildDeliveryContent(opts: { userName?: string; moduleId?: string }): DeliveryContent {
  const base     = process.env.NEXT_PUBLIC_APP_URL ?? 'https://www.conply.org'
  const moduleId = opts.moduleId ?? process.env.SLACK_MODULE_ID ?? 'aml-financial-crime'
  const module   = MODULES.find(m => m.id === moduleId) ?? MODULES[0]

  const headerText = opts.userName
    ? `${opts.userName}, your training is due`
    : `Today's compliance training`

  const shortDescription = module.description.length > 180
    ? module.description.slice(0, 180).trimEnd() + '…'
    : module.description

  const topicPreview = module.topics.slice(0, 3)

  const metaLine = [
    THREAT_LABEL[module.threatLevel] ?? module.threatLevel,
    `${module.durationMins} min`,
    SECTOR_LABEL[module.sector] ?? module.sector,
  ].join('  ·  ')

  return {
    module,
    headerText,
    shortDescription,
    topicPreview,
    metaLine,
    fallbackText: `${headerText}: ${module.title}`,
    trainingUrl: `${base}/train/${moduleId}`,
    progressUrl: `${base}/progress`,
    baseUrl: base,
  }
}

export async function logDelivery(opts: {
  teamMemberId?: string
  channel: 'slack' | 'teams'
  moduleId: string
  status: 'sent' | 'failed'
  errorMessage?: string
  messageTs?: string
}): Promise<void> {
  try {
    const supabase = createServerClient()
    await supabase.from('delivery_log').insert({
      team_member_id: opts.teamMemberId ?? null,
      channel:        opts.channel,
      module_id:      opts.moduleId,
      status:         opts.status,
      error_message:  opts.errorMessage ?? null,
      message_ts:     opts.messageTs ?? null,
    })
  } catch (err) {
    console.error('[delivery] Failed to write delivery_log:', err)
  }
}
