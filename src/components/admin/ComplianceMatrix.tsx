'use client'
import { useState, useEffect, useRef } from 'react'
import { CheckCircle2, XCircle, Minus, Bell, Plus } from 'lucide-react'
import { createClient } from '@/lib/supabase'
import { AddTeamMemberForm } from './AddTeamMemberForm'

type UserSector = 'crypto' | 'gambling' | 'both'
type ComplianceStatus = 'compliant' | 'in-progress' | 'overdue'

interface TeamMember {
  id: string
  name: string
  role: string
  sector: UserSector
  completions: Record<string, string> // moduleId -> 'YYYY-MM-DD'
}

const MATRIX_MODULES = [
  { id: 'aml-financial-crime',              label: 'AML',      sector: 'both'     },
  { id: 'dlt-regulatory-principles',        label: 'DLT',      sector: 'crypto'   },
  { id: 'responsible-gambling',             label: 'RG',       sector: 'gambling' },
  { id: 'senior-manager-responsibilities',  label: 'Sr. Mgr',  sector: 'both'     },
  { id: 'sanctions-poca',                   label: 'Sanctions', sector: 'both'    },
  { id: 'market-integrity',                 label: 'Market',   sector: 'crypto'   },
  { id: 'kyc-cdd',                          label: 'KYC',      sector: 'both'     },
  { id: 'data-protection-gdpr',             label: 'Data Prot.', sector: 'both'   },
] as const

const TEAM: TeamMember[] = [
  {
    id: '1', name: 'Sarah Chen', role: 'MLRO', sector: 'both',
    completions: { 'aml-financial-crime': '2026-01-15', 'dlt-regulatory-principles': '2026-01-18', 'responsible-gambling': '2026-01-20', 'senior-manager-responsibilities': '2026-01-22', 'sanctions-poca': '2026-01-25', 'market-integrity': '2026-01-28', 'kyc-cdd': '2026-02-01', 'data-protection-gdpr': '2026-02-04' },
  },
  {
    id: '2', name: 'James Meredith', role: 'Director', sector: 'both',
    completions: { 'aml-financial-crime': '2026-01-10', 'dlt-regulatory-principles': '2026-01-14', 'responsible-gambling': '2026-01-16', 'senior-manager-responsibilities': '2026-01-18', 'sanctions-poca': '2026-01-20', 'market-integrity': '2026-01-22', 'kyc-cdd': '2026-01-25', 'data-protection-gdpr': '2026-01-28' },
  },
  {
    id: '3', name: 'Riya Patel', role: 'Compliance Analyst', sector: 'both',
    completions: { 'aml-financial-crime': '2026-02-05', 'dlt-regulatory-principles': '2026-02-08', 'responsible-gambling': '2026-02-10', 'senior-manager-responsibilities': '2026-02-12', 'sanctions-poca': '2026-02-14', 'market-integrity': '2026-02-16', 'kyc-cdd': '2026-02-18', 'data-protection-gdpr': '2026-02-20' },
  },
  {
    id: '4', name: 'Priya Singh', role: 'Compliance Analyst', sector: 'crypto',
    completions: { 'aml-financial-crime': '2026-01-20', 'dlt-regulatory-principles': '2026-01-22', 'senior-manager-responsibilities': '2026-01-25', 'sanctions-poca': '2026-01-28', 'market-integrity': '2026-02-01', 'kyc-cdd': '2026-02-04', 'data-protection-gdpr': '2026-02-07' },
  },
  {
    id: '5', name: 'Emma Thompson', role: 'Director', sector: 'both',
    completions: { 'aml-financial-crime': '2026-01-12', 'dlt-regulatory-principles': '2026-01-15', 'responsible-gambling': '2026-01-17', 'senior-manager-responsibilities': '2026-01-19', 'sanctions-poca': '2026-01-21', 'market-integrity': '2026-01-23', 'kyc-cdd': '2026-01-26', 'data-protection-gdpr': '2026-01-29' },
  },
  {
    id: '6', name: 'Aisha Kamara', role: 'MLRO', sector: 'gambling',
    completions: { 'aml-financial-crime': '2026-02-10', 'responsible-gambling': '2026-02-13', 'senior-manager-responsibilities': '2026-02-16', 'sanctions-poca': '2026-02-19', 'kyc-cdd': '2026-02-22', 'data-protection-gdpr': '2026-02-25' },
  },
  {
    id: '7', name: 'Charlotte Mills', role: 'Payments', sector: 'both',
    completions: { 'aml-financial-crime': '2026-03-01', 'dlt-regulatory-principles': '2026-03-04', 'responsible-gambling': '2026-03-06', 'senior-manager-responsibilities': '2026-03-08', 'sanctions-poca': '2026-03-10', 'market-integrity': '2026-03-12', 'kyc-cdd': '2026-03-14', 'data-protection-gdpr': '2026-03-16' },
  },
  {
    id: '8', name: 'Fatima Al-Hassan', role: 'Customer Support', sector: 'gambling',
    completions: { 'aml-financial-crime': '2026-03-05', 'responsible-gambling': '2026-03-08', 'senior-manager-responsibilities': '2026-03-10', 'sanctions-poca': '2026-03-12', 'kyc-cdd': '2026-03-14', 'data-protection-gdpr': '2026-03-16' },
  },
  {
    id: '9', name: 'Hannah Pierce', role: 'Director', sector: 'both',
    completions: { 'aml-financial-crime': '2026-01-08', 'dlt-regulatory-principles': '2026-01-11', 'responsible-gambling': '2026-01-13', 'senior-manager-responsibilities': '2026-01-15', 'sanctions-poca': '2026-01-17', 'market-integrity': '2026-01-19', 'kyc-cdd': '2026-01-21', 'data-protection-gdpr': '2026-01-23' },
  },
  {
    id: '10', name: 'Jasmine Lee', role: 'Compliance Analyst', sector: 'both',
    completions: { 'aml-financial-crime': '2026-04-01', 'dlt-regulatory-principles': '2026-04-03', 'responsible-gambling': '2026-04-05', 'senior-manager-responsibilities': '2026-04-07', 'sanctions-poca': '2026-04-08', 'market-integrity': '2026-04-09', 'kyc-cdd': '2026-04-09', 'data-protection-gdpr': '2026-04-09' },
  },
  {
    id: '11', name: 'Mei Zhang', role: 'Senior Manager', sector: 'crypto',
    completions: { 'aml-financial-crime': '2026-02-20', 'dlt-regulatory-principles': '2026-02-22', 'senior-manager-responsibilities': '2026-02-24', 'sanctions-poca': '2026-02-26', 'market-integrity': '2026-02-28', 'kyc-cdd': '2026-03-02', 'data-protection-gdpr': '2026-03-04' },
  },
  {
    id: '12', name: 'Roberto Silva', role: 'Payments', sector: 'gambling',
    completions: { 'aml-financial-crime': '2026-03-18', 'responsible-gambling': '2026-03-20', 'senior-manager-responsibilities': '2026-03-22', 'sanctions-poca': '2026-03-24', 'kyc-cdd': '2026-03-26', 'data-protection-gdpr': '2026-03-28' },
  },
  {
    id: '13', name: 'Ben Hartley', role: 'Software Engineer', sector: 'crypto',
    completions: { 'aml-financial-crime': '2026-04-07', 'dlt-regulatory-principles': '2026-04-07' },
  },
  {
    id: '14', name: 'George Lawson', role: 'Compliance Analyst', sector: 'gambling',
    completions: { 'aml-financial-crime': '2026-03-30', 'responsible-gambling': '2026-04-02', 'senior-manager-responsibilities': '2026-04-07' },
  },
  {
    id: '15', name: 'Tom Walsh', role: 'Software Engineer', sector: 'both',
    completions: { 'aml-financial-crime': '2026-02-15', 'dlt-regulatory-principles': '2026-02-18', 'responsible-gambling': '2026-02-20', 'senior-manager-responsibilities': '2026-02-22', 'sanctions-poca': '2026-02-24' },
  },
  {
    id: '16', name: 'Lucia Fernandez', role: 'Customer Support', sector: 'crypto',
    completions: { 'aml-financial-crime': '2026-03-25', 'kyc-cdd': '2026-03-28' },
  },
  {
    id: '17', name: 'Marcus Webb', role: 'Software Engineer', sector: 'both',
    completions: {},
  },
  {
    id: '18', name: 'Oliver Grant', role: 'Senior Manager', sector: 'gambling',
    completions: {},
  },
  {
    id: '19', name: 'David Kim', role: 'Payments', sector: 'crypto',
    completions: {},
  },
  {
    id: '20', name: 'Kevin Murphy', role: 'Customer Support', sector: 'both',
    completions: {},
  },
]

function isRequired(moduleSector: string, userSector: UserSector): boolean {
  if (moduleSector === 'both') return true
  if (userSector === 'both') return true
  return moduleSector === userSector
}

function getRequiredModules(userSector: UserSector) {
  return MATRIX_MODULES.filter(m => isRequired(m.sector, userSector))
}

function getStatus(member: TeamMember): ComplianceStatus {
  const required = getRequiredModules(member.sector)
  const done = required.filter(m => member.completions[m.id])
  if (done.length === required.length) return 'compliant'
  if (done.length === 0) return 'overdue'
  return 'in-progress'
}

function formatDate(iso: string) {
  const [, m, d] = iso.split('-')
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  return `${parseInt(d)} ${months[parseInt(m) - 1]}`
}

const THIS_WEEK_CUTOFF = '2026-04-07'

function StatusBadge({ status }: { status: ComplianceStatus }) {
  const styles: Record<ComplianceStatus, { color: string; bg: string; label: string }> = {
    compliant:    { color: '#16a34a', bg: 'rgba(22,163,74,0.12)',    label: 'Compliant'    },
    'in-progress': { color: '#d97706', bg: 'rgba(217,119,6,0.12)',   label: 'In Progress'  },
    overdue:      { color: '#dc2626', bg: 'rgba(220,38,38,0.12)',    label: 'Overdue'      },
  }
  const s = styles[status]
  return (
    <span className="text-xs font-medium px-2 py-0.5 rounded-full whitespace-nowrap"
      style={{ color: s.color, background: s.bg }}>
      {s.label}
    </span>
  )
}

function SectorLabel({ sector }: { sector: UserSector }) {
  const map: Record<UserSector, { label: string; color: string }> = {
    crypto:  { label: 'Crypto',  color: '#7A74CC' },
    gambling: { label: 'iGaming', color: '#9d97e8' },
    both:    { label: 'Both',    color: '#8b87a8'  },
  }
  const s = map[sector]
  return <span className="text-xs" style={{ color: s.color }}>{s.label}</span>
}

type Toast = { type: 'success' | 'error'; message: string } | null

interface ApiTeamMember {
  id:         string
  email:      string
  name:       string
  job_title:  string | null
  sector:     UserSector
  user_id:    string | null
  invited_at: string
  completions: { module_id: string; created_at: string }[]
}

// Convert an ApiTeamMember into the same TeamMember shape used by the matrix
function toTeamMember(api: ApiTeamMember): TeamMember {
  const completions: Record<string, string> = {}
  for (const c of api.completions) {
    const dateOnly = c.created_at.slice(0, 10)
    if (!completions[c.module_id] || dateOnly > completions[c.module_id]) {
      completions[c.module_id] = dateOnly
    }
  }
  return {
    id:     api.id,
    name:   api.name,
    role:   api.job_title ?? '—',
    sector: api.sector,
    completions,
  }
}

export function ComplianceMatrix() {
  const [toast, setToast]         = useState<Toast>(null)
  const [pendingId, setPending]   = useState<string | null>(null)
  const [realMembers, setReal]    = useState<TeamMember[] | null>(null)
  const [showAddForm, setShowAdd] = useState(false)
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Clean up toast timer on unmount
  useEffect(() => () => { if (toastTimer.current) clearTimeout(toastTimer.current) }, [])

  const fetchMembers = async () => {
    try {
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) return
      const res = await fetch('/api/admin/team', {
        headers: { 'Authorization': 'Bearer ' + session.access_token },
      })
      if (!res.ok) return
      const json = await res.json() as { members: ApiTeamMember[] }
      setReal(json.members.map(toTeamMember))
    } catch {
      // Silent fail — falls back to seed data
    }
  }

  useEffect(() => { fetchMembers() }, [])

  const sendReminder = async (member: TeamMember) => {
    setPending(member.id)
    try {
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        setToast({ type: 'error', message: 'You need to be signed in.' })
        return
      }
      const required = getRequiredModules(member.sector)
      const nextModule = required.find(m => !member.completions[m.id]) ?? required[0]
      const res = await fetch('/api/slack/remind', {
        method: 'POST',
        headers: {
          'Content-Type':  'application/json',
          'Authorization': 'Bearer ' + session.access_token,
        },
        body: JSON.stringify({ userName: member.name, moduleId: nextModule.id }),
      })
      if (!res.ok) throw new Error('Request failed')
      setToast({ type: 'success', message: `Reminder sent to ${member.name}` })
    } catch {
      setToast({ type: 'error', message: `Could not send reminder to ${member.name}` })
    } finally {
      setPending(null)
      toastTimer.current = setTimeout(() => setToast(null), 3000)
    }
  }

  // Use real members if any have been added, else fall back to seed data
  const isRealData    = realMembers !== null && realMembers.length > 0
  const displayTeam   = isRealData ? realMembers : TEAM

  const statuses = displayTeam.map(getStatus)
  const compliantCount   = statuses.filter(s => s === 'compliant').length
  const overdueCount     = statuses.filter(s => s === 'overdue').length
  const thisWeekCount    = displayTeam.reduce((acc, m) =>
    acc + Object.values(m.completions).filter(d => d >= THIS_WEEK_CUTOFF).length, 0)

  return (
    <div>
      {/* Seed data banner — full width when present */}
      {!isRealData && (
        <div className="mb-5 px-4 py-3 rounded-lg flex items-center gap-2 text-xs"
          style={{ background: 'rgba(217,119,6,0.10)', color: '#d97706', border: '1px solid rgba(217,119,6,0.25)' }}>
          <span className="text-base leading-none">⚠</span>
          <span>Showing seed data. Click <strong>Add team member</strong> to start tracking real users.</span>
        </div>
      )}

      {/* Toolbar row */}
      <div className="flex items-end justify-between mb-6 gap-4 flex-wrap">
        <div>
          <h2 className="text-lg font-semibold mb-1" style={{ color: 'var(--text)' }}>Team compliance</h2>
          <p className="text-xs" style={{ color: 'var(--muted)' }}>
            {displayTeam.length} {displayTeam.length === 1 ? 'team member' : 'team members'} · {isRealData ? 'live data' : 'demo data'}
          </p>
        </div>
        <button onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-colors"
          style={{ background: 'var(--brand)' }}>
          <Plus className="w-4 h-4" />
          Add team member
        </button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Team members',        value: displayTeam.length, color: 'var(--text)'  },
          { label: 'Fully compliant',      value: compliantCount,    color: '#16a34a'      },
          { label: 'Overdue',              value: overdueCount,      color: '#dc2626'      },
          { label: 'Completions this week', value: thisWeekCount,    color: 'var(--accent)' },
        ].map(card => (
          <div key={card.label} className="rounded-xl px-5 py-4"
            style={{ background: 'var(--card)', border: '1px solid var(--card-border)' }}>
            <div className="text-3xl font-bold mb-1" style={{ color: card.color }}>{card.value}</div>
            <div className="text-xs" style={{ color: 'var(--muted)' }}>{card.label}</div>
          </div>
        ))}
      </div>

      {/* Compliance matrix */}
      <div className="rounded-lg overflow-x-auto" style={{ border: '1px solid var(--border)' }}>
        <table className="text-sm border-collapse" style={{ minWidth: '900px', width: '100%' }}>
          <thead>
            <tr style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
              <th className="px-4 py-3 text-left font-medium" style={{ color: 'var(--text)', minWidth: '150px' }}>Name</th>
              <th className="px-4 py-3 text-left font-medium" style={{ color: 'var(--muted)', minWidth: '130px' }}>Role</th>
              <th className="px-4 py-3 text-left font-medium" style={{ color: 'var(--muted)', minWidth: '70px' }}>Sector</th>
              {MATRIX_MODULES.map(m => (
                <th key={m.id} className="px-2 py-3 text-center font-medium" style={{ color: 'var(--muted)', minWidth: '66px' }}>
                  <span className="text-xs">{m.label}</span>
                </th>
              ))}
              <th className="px-4 py-3 text-center font-medium" style={{ color: 'var(--muted)', minWidth: '50px' }}>%</th>
              <th className="px-4 py-3 text-center font-medium" style={{ color: 'var(--muted)', minWidth: '130px' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {displayTeam.map((member, i) => {
              const status   = getStatus(member)
              const required = getRequiredModules(member.sector)
              const done     = required.filter(m => member.completions[m.id])
              const pct      = Math.round((done.length / required.length) * 100)

              return (
                <tr key={member.id} style={{ borderTop: '1px solid var(--border)' }}>
                  <td className="px-4 py-3 font-medium" style={{ color: 'var(--text)' }}>{member.name}</td>
                  <td className="px-4 py-3" style={{ color: 'var(--muted)' }}>{member.role}</td>
                  <td className="px-4 py-3"><SectorLabel sector={member.sector} /></td>
                  {MATRIX_MODULES.map(m => {
                    const req  = isRequired(m.sector, member.sector)
                    const date = member.completions[m.id]
                    return (
                      <td key={m.id} className="px-2 py-2 text-center">
                        {!req ? (
                          <Minus className="w-3 h-3 mx-auto" style={{ color: 'rgba(139,135,168,0.25)' }} />
                        ) : date ? (
                          <div className="flex flex-col items-center gap-0.5">
                            <CheckCircle2 className="w-3.5 h-3.5" style={{ color: '#16a34a' }} />
                            <span style={{ fontSize: '9px', color: 'rgba(139,135,168,0.7)' }}>{formatDate(date)}</span>
                          </div>
                        ) : (
                          <XCircle className="w-3.5 h-3.5 mx-auto" style={{ color: '#dc2626', opacity: 0.65 }} />
                        )}
                      </td>
                    )
                  })}
                  <td className="px-4 py-3 text-center text-sm font-semibold"
                    style={{ color: pct === 100 ? '#16a34a' : pct > 0 ? '#d97706' : '#dc2626' }}>
                    {pct}%
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <StatusBadge status={status} />
                      {status === 'overdue' && (
                        <button
                          onClick={() => sendReminder(member)}
                          disabled={pendingId === member.id}
                          title={`Send Slack reminder to ${member.name}`}
                          className="p-1 rounded transition-colors disabled:opacity-50"
                          style={{ color: 'var(--accent)' }}
                          onMouseOver={e => (e.currentTarget.style.background = 'rgba(91,84,184,0.15)')}
                          onMouseOut={e => (e.currentTarget.style.background = 'transparent')}
                        >
                          <Bell className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Toast */}
      {toast && (
        <div
          className="fixed bottom-6 right-6 px-4 py-3 rounded-lg text-sm font-medium shadow-lg z-50"
          style={{
            background:  toast.type === 'success' ? 'rgba(22,163,74,0.95)' : 'rgba(220,38,38,0.95)',
            color:       '#fff',
            border:      `1px solid ${toast.type === 'success' ? 'rgba(22,163,74,1)' : 'rgba(220,38,38,1)'}`,
          }}
        >
          {toast.message}
        </div>
      )}

      <p className="mt-3 text-xs" style={{ color: 'rgba(139,135,168,0.5)' }}>
        RG = Responsible Gambling · SM = Senior Manager · Click the bell icon next to overdue users to send a Slack reminder
      </p>

      {showAddForm && (
        <AddTeamMemberForm
          onClose={() => setShowAdd(false)}
          onAdded={() => fetchMembers()}
        />
      )}
    </div>
  )
}
