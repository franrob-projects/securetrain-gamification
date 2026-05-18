'use client'
import { useEffect, useState } from 'react'
import { CheckCircle2, XCircle, Save, Send, Trash2, AlertTriangle, HelpCircle, Zap, RotateCw } from 'lucide-react'
import { createClient } from '@/lib/supabase'
import { useDemoMode, useDemoRoute, demoDeliveryLogs, isDemoLogId } from '@/lib/demoMode'
import { MODULES } from '@/data/modules'

type Channel = 'slack' | 'teams'

interface ApiMember {
  id:               string
  email:            string
  name:             string
  sector:           'crypto' | 'gambling' | 'both'
  delivery_channel: Channel | null
  slack_user_id:    string | null
  teams_user_id:    string | null
}

interface Diagnostics {
  slack:     { botToken: boolean; channelId: boolean }
  teams:     { webhook: boolean }
  anthropic: { apiKey: boolean }
  cron:      { secret: boolean }
}

interface DeliveryLog {
  id:             string
  team_member_id: string | null
  channel:        Channel
  module_id:      string
  status:         'pending' | 'sent' | 'failed'
  error_message:  string | null
  delivered_at:   string
  member_name:    string | null
  member_email:   string | null
}

interface MemberDraft {
  delivery_channel: Channel
  slack_user_id:    string
  teams_user_id:    string
}

function toDraft(m: ApiMember): MemberDraft {
  return {
    delivery_channel: m.delivery_channel ?? 'slack',
    slack_user_id:    m.slack_user_id ?? '',
    teams_user_id:    m.teams_user_id ?? '',
  }
}

function moduleLabel(id: string): string {
  return MODULES.find(m => m.id === id)?.title ?? id
}

function relativeTime(iso: string): string {
  const ms = Date.now() - new Date(iso).getTime()
  const mins = Math.round(ms / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hours = Math.round(mins / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.round(hours / 24)
  if (days < 30) return `${days}d ago`
  return new Date(iso).toLocaleDateString()
}

export function DeliverySettings() {
  const demoMode = useDemoMode()
  const isDemoRoute = useDemoRoute()
  const [members, setMembers] = useState<ApiMember[] | null>(null)
  const [drafts, setDrafts]   = useState<Record<string, MemberDraft>>({})
  const [saving, setSaving]   = useState<string | null>(null)
  const [sending, setSending] = useState<string | null>(null)
  const [testing, setTesting] = useState<'slack' | 'teams' | null>(null)
  const [retrying, setRetrying] = useState<string | null>(null)
  const [removing, setRemoving] = useState<string | null>(null)
  const [confirmRemove, setConfirmRemove] = useState<ApiMember | null>(null)
  const [diag, setDiag]       = useState<Diagnostics | null>(null)
  const [logs, setLogs]       = useState<DeliveryLog[] | null>(null)
  const [statusFilter, setStatusFilter] = useState<'all' | 'sent' | 'failed'>('all')
  const [channelFilter, setChannelFilter] = useState<'all' | 'slack' | 'teams'>('all')
  const [toast, setToast]     = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  const getSession = async () => {
    const supabase = createClient()
    const { data: { session } } = await supabase.auth.getSession()
    return session
  }

  const fetchAll = async () => {
    const session = await getSession()
    if (!session) return
    const headers = { 'Authorization': 'Bearer ' + session.access_token }
    const [teamRes, logRes, diagRes] = await Promise.all([
      fetch('/api/admin/team',         { headers }),
      fetch('/api/admin/delivery-log', { headers }),
      fetch('/api/admin/diagnostics',  { headers }),
    ])
    if (teamRes.ok) {
      const json = await teamRes.json() as { members: ApiMember[] }
      setMembers(json.members)
      const initialDrafts: Record<string, MemberDraft> = {}
      for (const m of json.members) initialDrafts[m.id] = toDraft(m)
      setDrafts(initialDrafts)
    }
    if (logRes.ok) {
      const json = await logRes.json() as { logs: DeliveryLog[] }
      setLogs(json.logs)
    }
    if (diagRes.ok) {
      setDiag(await diagRes.json() as Diagnostics)
    }
  }

  useEffect(() => {
    // On the public /demo route there's no session — short-circuit with
    // empty arrays so demoDeliveryLogs() and seed members render.
    if (isDemoRoute) {
      setMembers([])
      setLogs([])
      return
    }
    fetchAll()
  }, [isDemoRoute])

  const updateDraft = (id: string, patch: Partial<MemberDraft>) => {
    setDrafts(d => ({ ...d, [id]: { ...d[id], ...patch } }))
  }

  const isDirty = (m: ApiMember): boolean => {
    const d = drafts[m.id]
    if (!d) return false
    return (
      d.delivery_channel !== (m.delivery_channel ?? 'slack') ||
      d.slack_user_id    !== (m.slack_user_id ?? '') ||
      d.teams_user_id    !== (m.teams_user_id ?? '')
    )
  }

  const testChannel = async (channel: 'slack' | 'teams') => {
    setTesting(channel)
    try {
      // On /demo there's no session — hit the public sample endpoint instead.
      if (isDemoRoute) {
        const res = await fetch('/api/demo/sample', {
          method:  'POST',
          headers: { 'Content-Type': 'application/json' },
          body:    JSON.stringify({ channel }),
        })
        const json = await res.json().catch(() => ({}))
        if (!res.ok) throw new Error(json.error ?? `${channel} sample failed`)
        setToast({ type: 'success', message: `${channel === 'slack' ? 'Slack' : 'Teams'} sample sent` })
        return
      }
      const session = await getSession()
      if (!session) return
      const res = await fetch(`/api/${channel}/remind`, {
        method:  'POST',
        headers: {
          'Content-Type':  'application/json',
          'Authorization': 'Bearer ' + session.access_token,
        },
        body: JSON.stringify({ userName: 'Test (admin)' }),
      })
      const json = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(json.error ?? `${channel} test failed`)
      setToast({ type: 'success', message: `${channel === 'slack' ? 'Slack' : 'Teams'} test sent` })
      fetchAll()
    } catch (e) {
      setToast({ type: 'error', message: e instanceof Error ? e.message : `${channel} test failed` })
    } finally {
      setTesting(null)
      setTimeout(() => setToast(null), 3500)
    }
  }

  const retry = async (log: DeliveryLog) => {
    // Demo log entries have no real team_member_id — short-circuit with a
    // success toast so the retry button still looks responsive on camera.
    if (isDemoLogId(log.id)) {
      setRetrying(log.id)
      setTimeout(() => {
        setRetrying(null)
        setToast({ type: 'success', message: `Retried ${log.member_name ?? 'delivery'}` })
        setTimeout(() => setToast(null), 3000)
      }, 600)
      return
    }
    if (!log.team_member_id) return
    const session = await getSession()
    if (!session) return
    setRetrying(log.id)
    try {
      const res = await fetch(`/api/admin/team/${log.team_member_id}/send`, {
        method:  'POST',
        headers: {
          'Content-Type':  'application/json',
          'Authorization': 'Bearer ' + session.access_token,
        },
        body: JSON.stringify({ moduleId: log.module_id }),
      })
      const json = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(json.error ?? 'Retry failed')
      setToast({ type: 'success', message: `Retried ${log.member_name ?? 'delivery'}` })
      fetchAll()
    } catch (e) {
      setToast({ type: 'error', message: e instanceof Error ? e.message : 'Retry failed' })
    } finally {
      setRetrying(null)
      setTimeout(() => setToast(null), 3000)
    }
  }

  const sendNow = async (m: ApiMember) => {
    const session = await getSession()
    if (!session) return
    setSending(m.id)
    try {
      const res = await fetch(`/api/admin/team/${m.id}/send`, {
        method:  'POST',
        headers: {
          'Content-Type':  'application/json',
          'Authorization': 'Bearer ' + session.access_token,
        },
        body: JSON.stringify({}),
      })
      const json = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(json.error ?? 'Send failed')
      setToast({ type: 'success', message: `Sent to ${m.name} via ${json.channel ?? m.delivery_channel ?? 'slack'}` })
      fetchAll()
    } catch (e) {
      setToast({ type: 'error', message: e instanceof Error ? e.message : 'Send failed' })
    } finally {
      setSending(null)
      setTimeout(() => setToast(null), 3500)
    }
  }

  const remove = async (m: ApiMember) => {
    const session = await getSession()
    if (!session) return
    setRemoving(m.id)
    try {
      const res = await fetch(`/api/admin/team/${m.id}`, {
        method:  'DELETE',
        headers: { 'Authorization': 'Bearer ' + session.access_token },
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.error ?? 'Remove failed')
      }
      setMembers(prev => prev?.filter(x => x.id !== m.id) ?? null)
      setToast({ type: 'success', message: `Removed ${m.name}` })
    } catch (e) {
      setToast({ type: 'error', message: e instanceof Error ? e.message : 'Remove failed' })
    } finally {
      setRemoving(null)
      setConfirmRemove(null)
      setTimeout(() => setToast(null), 3000)
    }
  }

  const save = async (m: ApiMember) => {
    const session = await getSession()
    if (!session) return
    setSaving(m.id)
    try {
      const d = drafts[m.id]
      const res = await fetch(`/api/admin/team/${m.id}`, {
        method:  'PATCH',
        headers: {
          'Content-Type':  'application/json',
          'Authorization': 'Bearer ' + session.access_token,
        },
        body: JSON.stringify({
          delivery_channel: d.delivery_channel,
          slack_user_id:    d.slack_user_id,
          teams_user_id:    d.teams_user_id,
        }),
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.error ?? 'Save failed')
      }
      setMembers(prev => prev?.map(x => x.id === m.id
        ? { ...x, delivery_channel: d.delivery_channel, slack_user_id: d.slack_user_id || null, teams_user_id: d.teams_user_id || null }
        : x
      ) ?? null)
      setToast({ type: 'success', message: `Saved ${m.name}` })
    } catch (e) {
      setToast({ type: 'error', message: e instanceof Error ? e.message : 'Save failed' })
    } finally {
      setSaving(null)
      setTimeout(() => setToast(null), 3000)
    }
  }

  // In demo mode, merge fake entries in front of any real logs so the
  // Delivery tab looks like a populated customer account.
  const displayLogs: DeliveryLog[] | null = logs === null
    ? null
    : demoMode
      ? [...logs, ...demoDeliveryLogs()].sort((a, b) =>
          b.delivered_at.localeCompare(a.delivered_at))
      : logs

  const filteredLogs = (displayLogs ?? []).filter(l =>
    (statusFilter  === 'all' || l.status  === statusFilter) &&
    (channelFilter === 'all' || l.channel === channelFilter)
  )

  const stats = (() => {
    if (!displayLogs) return { sent: 0, failed: 0, slack: 0, teams: 0 }
    const cutoff = Date.now() - 7 * 24 * 60 * 60 * 1000
    const recent = displayLogs.filter(l => new Date(l.delivered_at).getTime() >= cutoff)
    return {
      sent:   recent.filter(l => l.status === 'sent').length,
      failed: recent.filter(l => l.status === 'failed').length,
      slack:  recent.filter(l => l.channel === 'slack').length,
      teams:  recent.filter(l => l.channel === 'teams').length,
    }
  })()

  if (members === null) {
    return <p className="text-sm" style={{ color: 'var(--muted)' }}>Loading delivery settings...</p>
  }

  const missingTeams = diag && !diag.teams.webhook
  const missingSlack = diag && (!diag.slack.botToken || !diag.slack.channelId)
  const usingTeamsAnywhere = members.some(m => (m.delivery_channel ?? 'slack') === 'teams')

  return (
    <div className="space-y-10">
      {/* Env warnings */}
      {(missingSlack || (missingTeams && usingTeamsAnywhere)) && (
        <div className="rounded-lg px-4 py-3 text-xs flex items-start gap-2"
          style={{ background: 'rgba(217,119,6,0.10)', color: '#d97706', border: '1px solid rgba(217,119,6,0.25)' }}>
          <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <div className="space-y-1">
            {missingSlack && (
              <div>
                Slack is missing credentials (<code>SLACK_BOT_TOKEN</code> and/or <code>SLACK_CHANNEL_ID</code>). Slack-routed members will fail until these are set.
              </div>
            )}
            {missingTeams && usingTeamsAnywhere && (
              <div>
                Teams webhook is not configured (<code>TEAMS_WEBHOOK_URL</code>). {members.filter(m => m.delivery_channel === 'teams').length} member(s) are routed to Teams — their sends will fail until you add the webhook in Vercel env.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Stats */}
      <div>
        <div className="flex items-end justify-between flex-wrap gap-4 mb-5">
          <div>
            <h2 className="text-lg font-semibold mb-1" style={{ color: 'var(--text)' }}>Delivery history</h2>
            <p className="text-xs" style={{ color: 'var(--muted)' }}>Last 7 days across Slack + Teams</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => testChannel('slack')}
              disabled={testing !== null || (diag ? !diag.slack.botToken || !diag.slack.channelId : false)}
              title="Send a test training message to the Slack channel"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-opacity disabled:opacity-30"
              style={{ background: 'var(--card)', color: 'var(--text)', border: '1px solid var(--card-border)' }}>
              <Zap className="w-3.5 h-3.5" />
              {testing === 'slack' ? 'Testing...' : 'Test Slack'}
            </button>
            <button
              onClick={() => testChannel('teams')}
              disabled={testing !== null || (diag ? !diag.teams.webhook : false)}
              title={diag && !diag.teams.webhook ? 'Set TEAMS_WEBHOOK_URL first' : 'Send a test training card to the Teams channel'}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-opacity disabled:opacity-30"
              style={{ background: 'var(--card)', color: 'var(--text)', border: '1px solid var(--card-border)' }}>
              <Zap className="w-3.5 h-3.5" />
              {testing === 'teams' ? 'Testing...' : 'Test Teams'}
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Sent',        value: stats.sent,   color: '#16a34a',       border: 'rgba(22,163,74,0.15)' },
            { label: 'Failed',      value: stats.failed, color: '#dc2626',       border: 'rgba(220,38,38,0.15)' },
            { label: 'Slack sends', value: stats.slack,  color: 'var(--accent)', border: 'var(--card-border)'   },
            { label: 'Teams sends', value: stats.teams,  color: 'var(--accent)', border: 'var(--card-border)'   },
          ].map(c => (
            <div key={c.label} className="rounded-xl px-5 py-5"
              style={{ background: 'var(--card)', border: `1px solid ${c.border}` }}>
              <div className="text-3xl font-extrabold mb-1 tracking-tight" style={{ color: c.color }}>{c.value}</div>
              <div className="text-xs font-medium" style={{ color: 'var(--muted)' }}>{c.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Per-member delivery prefs */}
      <div>
        <h2 className="text-lg font-semibold mb-1" style={{ color: 'var(--text)' }}>Per-member channel</h2>
        <p className="text-xs mb-5 flex items-center gap-1.5" style={{ color: 'var(--muted)' }}>
          Choose where each person receives training. Slack DMs the <code>slack_user_id</code> if set, otherwise falls back to the default channel.
          <a href="https://api.slack.com/methods/users.lookupByEmail"
            target="_blank" rel="noopener noreferrer"
            title="How to find a Slack user ID — users.lookupByEmail or Slack admin profile"
            style={{ color: 'var(--accent)' }}>
            <HelpCircle className="w-3.5 h-3.5" />
          </a>
        </p>
        {members.length === 0 ? (
          <div className="rounded-xl px-5 py-6 text-sm" style={{ background: 'var(--card)', border: '1px solid var(--card-border)', color: 'var(--muted)' }}>
            No team members yet. Add some from the Team Compliance tab.
          </div>
        ) : (
          <div className="rounded-xl overflow-x-auto" style={{ border: '1px solid var(--border)' }}>
            <table className="text-sm border-collapse w-full" style={{ minWidth: '720px' }}>
              <thead>
                <tr style={{ background: 'rgba(91,84,184,0.06)', borderBottom: '1px solid var(--border)' }}>
                  <th className="px-4 py-3.5 text-left font-semibold text-xs uppercase tracking-wider" style={{ color: 'var(--accent)' }}>Member</th>
                  <th className="px-4 py-3.5 text-left font-semibold text-xs uppercase tracking-wider" style={{ color: 'var(--muted)' }}>Channel</th>
                  <th className="px-4 py-3.5 text-left font-semibold text-xs uppercase tracking-wider" style={{ color: 'var(--muted)' }}>Slack user ID</th>
                  <th className="px-4 py-3.5 text-left font-semibold text-xs uppercase tracking-wider" style={{ color: 'var(--muted)' }}>Teams user ID</th>
                  <th className="px-4 py-3.5"></th>
                </tr>
              </thead>
              <tbody>
                {members.map((m, i) => {
                  const d = drafts[m.id] ?? toDraft(m)
                  const dirty = isDirty(m)
                  return (
                    <tr key={m.id} style={{ borderTop: '1px solid var(--border)', background: i % 2 === 0 ? 'transparent' : 'rgba(91,84,184,0.02)' }}>
                      <td className="px-4 py-3">
                        <div className="font-medium" style={{ color: 'var(--text)' }}>{m.name}</div>
                        <div className="text-xs" style={{ color: 'var(--muted)' }}>{m.email}</div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1 p-0.5 rounded-md w-fit" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
                          {(['slack', 'teams'] as const).map(c => (
                            <button key={c}
                              onClick={() => updateDraft(m.id, { delivery_channel: c })}
                              className="px-3 py-1 rounded text-xs font-medium capitalize transition-colors"
                              style={d.delivery_channel === c
                                ? { background: 'var(--brand)', color: '#fff' }
                                : { color: 'var(--muted)' }}>
                              {c === 'teams' ? 'Teams' : 'Slack'}
                            </button>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          value={d.slack_user_id}
                          onChange={e => updateDraft(m.id, { slack_user_id: e.target.value })}
                          placeholder="U012ABC3DE"
                          className="w-full max-w-[160px] px-2.5 py-1.5 rounded text-xs outline-none font-mono"
                          style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text)' }}
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          value={d.teams_user_id}
                          onChange={e => updateDraft(m.id, { teams_user_id: e.target.value })}
                          placeholder="optional"
                          className="w-full max-w-[160px] px-2.5 py-1.5 rounded text-xs outline-none font-mono"
                          style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text)' }}
                        />
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => sendNow(m)}
                            disabled={dirty || sending === m.id}
                            title={dirty ? 'Save changes first' : `Send training now to ${m.name}`}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-opacity disabled:opacity-30"
                            style={{ background: 'rgba(91,84,184,0.12)', color: 'var(--accent)', border: '1px solid rgba(91,84,184,0.3)' }}>
                            <Send className="w-3 h-3" />
                            {sending === m.id ? 'Sending...' : 'Send now'}
                          </button>
                          <button
                            onClick={() => save(m)}
                            disabled={!dirty || saving === m.id}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold text-white transition-opacity disabled:opacity-30"
                            style={{ background: 'var(--brand)' }}>
                            <Save className="w-3 h-3" />
                            {saving === m.id ? 'Saving...' : 'Save'}
                          </button>
                          <button
                            onClick={() => setConfirmRemove(m)}
                            disabled={removing === m.id}
                            title={`Remove ${m.name}`}
                            className="p-1.5 rounded-md transition-colors disabled:opacity-30"
                            style={{ color: '#dc2626' }}
                            onMouseOver={e => (e.currentTarget.style.background = 'rgba(220,38,38,0.12)')}
                            onMouseOut={e => (e.currentTarget.style.background = 'transparent')}>
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Log */}
      <div>
        <div className="flex items-end justify-between gap-4 flex-wrap mb-5">
          <div>
            <h2 className="text-lg font-semibold mb-1" style={{ color: 'var(--text)' }}>Recent deliveries</h2>
            <p className="text-xs" style={{ color: 'var(--muted)' }}>
              {displayLogs ? `${filteredLogs.length} of ${displayLogs.length}` : '0'} events from delivery_log
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex gap-1 p-0.5 rounded-md" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
              {(['all', 'sent', 'failed'] as const).map(s => (
                <button key={s} onClick={() => setStatusFilter(s)}
                  className="px-2.5 py-1 rounded text-xs font-medium capitalize transition-colors"
                  style={statusFilter === s
                    ? { background: 'var(--brand)', color: '#fff' }
                    : { color: 'var(--muted)' }}>
                  {s}
                </button>
              ))}
            </div>
            <div className="flex gap-1 p-0.5 rounded-md" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
              {(['all', 'slack', 'teams'] as const).map(c => (
                <button key={c} onClick={() => setChannelFilter(c)}
                  className="px-2.5 py-1 rounded text-xs font-medium capitalize transition-colors"
                  style={channelFilter === c
                    ? { background: 'var(--brand)', color: '#fff' }
                    : { color: 'var(--muted)' }}>
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>
        {displayLogs && filteredLogs.length === 0 ? (
          <div className="rounded-xl px-5 py-6 text-sm" style={{ background: 'var(--card)', border: '1px solid var(--card-border)', color: 'var(--muted)' }}>
            No delivery events yet. The cron runs weekdays at 09:00.
          </div>
        ) : (
          <div className="rounded-xl overflow-x-auto" style={{ border: '1px solid var(--border)' }}>
            <table className="text-sm border-collapse w-full" style={{ minWidth: '720px' }}>
              <thead>
                <tr style={{ background: 'rgba(91,84,184,0.06)', borderBottom: '1px solid var(--border)' }}>
                  <th className="px-4 py-3 text-left font-semibold text-xs uppercase tracking-wider" style={{ color: 'var(--muted)' }}>When</th>
                  <th className="px-4 py-3 text-left font-semibold text-xs uppercase tracking-wider" style={{ color: 'var(--muted)' }}>Recipient</th>
                  <th className="px-4 py-3 text-left font-semibold text-xs uppercase tracking-wider" style={{ color: 'var(--muted)' }}>Channel</th>
                  <th className="px-4 py-3 text-left font-semibold text-xs uppercase tracking-wider" style={{ color: 'var(--muted)' }}>Module</th>
                  <th className="px-4 py-3 text-left font-semibold text-xs uppercase tracking-wider" style={{ color: 'var(--muted)' }}>Status</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.slice(0, 50).map((l, i) => (
                  <tr key={l.id} style={{ borderTop: '1px solid var(--border)', background: i % 2 === 0 ? 'transparent' : 'rgba(91,84,184,0.02)' }}>
                    <td className="px-4 py-2.5 text-xs" style={{ color: 'var(--muted)' }}>{relativeTime(l.delivered_at)}</td>
                    <td className="px-4 py-2.5" style={{ color: 'var(--text)' }}>
                      {l.member_name ?? <span style={{ color: 'var(--muted)' }}>(broadcast)</span>}
                    </td>
                    <td className="px-4 py-2.5 text-xs capitalize" style={{ color: 'var(--muted)' }}>{l.channel}</td>
                    <td className="px-4 py-2.5 text-xs" style={{ color: 'var(--muted)' }}>{moduleLabel(l.module_id)}</td>
                    <td className="px-4 py-2.5">
                      {l.status === 'sent' ? (
                        <span className="inline-flex items-center gap-1 text-xs" style={{ color: '#16a34a' }}>
                          <CheckCircle2 className="w-3.5 h-3.5" /> sent
                        </span>
                      ) : l.status === 'failed' ? (
                        <span className="inline-flex items-center gap-1 text-xs" style={{ color: '#dc2626' }} title={l.error_message ?? ''}>
                          <XCircle className="w-3.5 h-3.5" /> failed
                        </span>
                      ) : (
                        <span className="text-xs" style={{ color: 'var(--muted)' }}>pending</span>
                      )}
                    </td>
                    <td className="px-4 py-2.5 text-right">
                      {l.status === 'failed' && l.team_member_id && (
                        <button
                          onClick={() => retry(l)}
                          disabled={retrying === l.id}
                          title={`Retry sending ${moduleLabel(l.module_id)} to ${l.member_name ?? 'member'}`}
                          className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium transition-colors disabled:opacity-30"
                          style={{ color: 'var(--accent)' }}
                          onMouseOver={e => (e.currentTarget.style.background = 'rgba(91,84,184,0.12)')}
                          onMouseOut={e => (e.currentTarget.style.background = 'transparent')}>
                          <RotateCw className={`w-3 h-3 ${retrying === l.id ? 'animate-spin' : ''}`} />
                          Retry
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {confirmRemove && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{ background: 'rgba(14,12,30,0.75)' }}
          onClick={() => !removing && setConfirmRemove(null)}>
          <div className="rounded-2xl w-full max-w-sm p-6"
            style={{ background: 'var(--card)', border: '1px solid var(--card-border)' }}
            onClick={e => e.stopPropagation()}>
            <h3 className="text-base font-semibold mb-2" style={{ color: 'var(--text)' }}>
              Remove {confirmRemove.name}?
            </h3>
            <p className="text-xs mb-5" style={{ color: 'var(--muted)' }}>
              This removes them from the team list. Their past completions and delivery log entries are preserved. This cannot be undone.
            </p>
            <div className="flex items-center gap-2 justify-end">
              <button onClick={() => setConfirmRemove(null)}
                disabled={removing === confirmRemove.id}
                className="px-3 py-2 text-xs rounded-md transition-colors"
                style={{ color: 'var(--muted)' }}>
                Cancel
              </button>
              <button onClick={() => remove(confirmRemove)}
                disabled={removing === confirmRemove.id}
                className="px-3 py-2 text-xs font-semibold rounded-md text-white disabled:opacity-50"
                style={{ background: '#dc2626' }}>
                {removing === confirmRemove.id ? 'Removing...' : 'Remove'}
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className="fixed bottom-6 right-6 px-4 py-3 rounded-lg text-sm font-medium shadow-lg z-50"
          style={{
            background: toast.type === 'success' ? 'rgba(22,163,74,0.95)' : 'rgba(220,38,38,0.95)',
            color: '#fff',
            border: `1px solid ${toast.type === 'success' ? 'rgba(22,163,74,1)' : 'rgba(220,38,38,1)'}`,
          }}>
          {toast.message}
        </div>
      )}
    </div>
  )
}
