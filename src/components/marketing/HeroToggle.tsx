'use client'
import { useState } from 'react'
import { JurisdictionFlag } from '@/components/ui/JurisdictionFlag'

type JurisdictionKey = 'gibraltar' | 'luxembourg'

const STAFF_SCENARIOS: Record<JurisdictionKey, {
  label: string
  module: string
  regulator: string
  question: string
  options: string[]
  correctIndex: number
  ref: string
}> = {
  gibraltar: {
    label:     'DLT / Crypto scenario',
    module:    'Module: AML',
    regulator: 'GFSC',
    question:
      'Sarah, the MLRO at a Gibraltar-licensed DLT firm, receives an internal report that a customer has made three large deposits from different bank accounts within 48 hours. What should she do first?',
    options: [
      'A. Contact the customer directly',
      'B. File an internal SAR and assess',
      'C. Freeze the account immediately',
      'D. Wait for the next scheduled review',
    ],
    correctIndex: 1,
    ref: 'Regulation reference: POCA 2015, Section 28 — Nominated officer reporting obligations.',
  },
  luxembourg: {
    label:     'CASP / MiCA scenario',
    module:    'Module: MiCA Travel Rule',
    regulator: 'CSSF',
    question:
      'Elise, Compliance Officer at a CSSF-authorised CASP, sees a €25,000 stablecoin transfer from a self-hosted wallet with no originator info attached. What must she do under MiCA Travel Rule obligations?',
    options: [
      'A. Flag the transaction and continue processing',
      'B. Suspend the transfer and apply Enhanced Due Diligence',
      'C. Report directly to the CRF without pausing',
      'D. Request retroactive originator info within 30 days',
    ],
    correctIndex: 1,
    ref: 'Regulation reference: MiCA (EU 2023/1114), Article 72 — Transfer of funds obligations for CASPs.',
  },
}

const TEAM = [
  { name: 'Sarah Mitchell',  role: 'MLRO',               sector: 'Crypto',  modules: 7, completed: 7,  status: 'Compliant' },
  { name: 'James Hernandez', role: 'Customer Support',    sector: 'iGaming', modules: 6, completed: 4,  status: 'In progress' },
  { name: 'Amira Osei',      role: 'Payments Lead',       sector: 'Both',    modules: 8, completed: 8,  status: 'Compliant' },
  { name: 'David Chen',      role: 'Compliance Analyst',  sector: 'Crypto',  modules: 7, completed: 2,  status: 'Overdue' },
  { name: 'Laura Vega',      role: 'Director',            sector: 'Both',    modules: 8, completed: 6,  status: 'In progress' },
]

export function HeroToggle() {
  const [tab, setTab] = useState<'staff' | 'admin'>('staff')
  const [jx,  setJx]  = useState<JurisdictionKey>('gibraltar')
  const scenario = STAFF_SCENARIOS[jx]

  return (
    <div>
      {/* Toggle */}
      <div className="flex justify-center mb-5">
        <div className="inline-flex rounded-lg p-0.5" style={{ background: 'rgba(46,42,82,0.5)', border: '1px solid rgba(46,42,82,0.6)' }}>
          <button
            onClick={() => setTab('staff')}
            className="px-4 py-1.5 rounded-md text-xs font-semibold transition-all"
            style={{
              background: tab === 'staff' ? 'var(--brand)' : 'transparent',
              color: tab === 'staff' ? '#fff' : 'var(--muted)',
            }}
          >
            Staff
          </button>
          <button
            onClick={() => setTab('admin')}
            className="px-4 py-1.5 rounded-md text-xs font-semibold transition-all"
            style={{
              background: tab === 'admin' ? 'var(--brand)' : 'transparent',
              color: tab === 'admin' ? '#fff' : 'var(--muted)',
            }}
          >
            Admin
          </button>
        </div>
      </div>

      {/* Card area */}
      <div className="lg:min-h-[370px]">
        {/* Staff view: scenario card with jurisdiction sub-toggle */}
        {tab === 'staff' && (
          <div className="rounded-xl p-4 sm:p-5 space-y-3 glow-md" style={{ background: 'var(--card)', border: '1px solid var(--card-border)' }}>
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="inline-flex rounded-md p-0.5" style={{ background: 'rgba(14,12,30,0.4)', border: '1px solid rgba(46,42,82,0.6)' }}>
                {(Object.keys(STAFF_SCENARIOS) as JurisdictionKey[]).map(k => {
                  const s = STAFF_SCENARIOS[k]
                  const active = jx === k
                  return (
                    <button
                      key={k}
                      onClick={() => setJx(k)}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded text-[10px] sm:text-xs font-semibold transition-all"
                      style={{
                        background: active ? 'rgba(91,84,184,0.18)' : 'transparent',
                        color:      active ? 'var(--text)' : 'var(--muted)',
                      }}
                    >
                      <JurisdictionFlag slug={k} className="w-4 h-auto" />
                      {s.regulator}
                    </button>
                  )
                })}
              </div>
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-full hidden sm:inline-block"
                style={{ background: 'rgba(91,84,184,0.12)', color: 'var(--accent)' }}>
                {scenario.module}
              </span>
            </div>
            <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--accent)' }}>
              {scenario.label}
            </p>
            <div className="rounded-lg p-3 sm:p-4" style={{ background: 'var(--bg)', border: '1px solid var(--card-border)' }}>
              <p className="text-xs sm:text-sm leading-relaxed mb-3" style={{ color: 'var(--text)' }}>
                {scenario.question}
              </p>
              <div className="space-y-1.5">
                {scenario.options.map((opt, i) => (
                  <div key={opt} className="px-3 py-1.5 rounded-lg text-xs"
                    style={{
                      background: i === scenario.correctIndex ? 'rgba(22,163,74,0.1)' : 'transparent',
                      border: `1px solid ${i === scenario.correctIndex ? 'rgba(22,163,74,0.4)' : 'rgba(46,42,82,0.4)'}`,
                      color: i === scenario.correctIndex ? '#4ade80' : 'var(--muted)',
                    }}>
                    {opt}
                  </div>
                ))}
              </div>
            </div>
            <p className="text-[10px] sm:text-xs" style={{ color: 'var(--muted)', opacity: 0.75 }}>
              {scenario.ref}
            </p>
          </div>
        )}

        {/* Admin view: compliance dashboard */}
        {tab === 'admin' && (
          <div className="rounded-xl p-4 sm:p-5 glow-md" style={{ background: 'var(--card)', border: '1px solid var(--card-border)' }}>
            <div className="flex items-center justify-between mb-4">
              <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--accent)' }}>
                Team compliance
              </p>
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-full"
                style={{ background: 'rgba(91,84,184,0.12)', color: 'var(--accent)' }}>
                5 staff
              </span>
            </div>

            {/* Scrollable table wrapper for mobile */}
            <div className="overflow-x-auto -mx-1">
              <div className="rounded-lg overflow-hidden min-w-[480px]" style={{ border: '1px solid var(--card-border)' }}>
                <div className="grid grid-cols-12 gap-0 px-3 py-2 text-[10px] font-semibold uppercase tracking-wider"
                  style={{ background: 'rgba(91,84,184,0.06)', color: 'var(--muted)', borderBottom: '1px solid var(--card-border)' }}>
                  <div className="col-span-3">Name</div>
                  <div className="col-span-3">Role</div>
                  <div className="col-span-2">Sector</div>
                  <div className="col-span-2">Progress</div>
                  <div className="col-span-2 text-right">Status</div>
                </div>

                {TEAM.map((m, i) => (
                  <div key={m.name} className="grid grid-cols-12 gap-0 px-3 py-2.5 items-center text-xs"
                    style={{
                      borderBottom: i < TEAM.length - 1 ? '1px solid var(--card-border)' : undefined,
                      background: 'var(--bg)',
                    }}>
                    <div className="col-span-3 font-medium truncate" style={{ color: 'var(--text)' }}>{m.name}</div>
                    <div className="col-span-3 truncate" style={{ color: 'var(--muted)' }}>{m.role}</div>
                    <div className="col-span-2">
                      <span className="text-[10px] font-medium px-1.5 py-0.5 rounded"
                        style={{ background: 'rgba(91,84,184,0.1)', color: 'var(--accent)' }}>
                        {m.sector}
                      </span>
                    </div>
                    <div className="col-span-2" style={{ color: 'var(--muted)' }}>
                      {m.completed}/{m.modules}
                    </div>
                    <div className="col-span-2 text-right">
                      <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded"
                        style={{
                          background:
                            m.status === 'Compliant' ? 'rgba(22,163,74,0.1)' :
                            m.status === 'Overdue' ? 'rgba(239,68,68,0.1)' :
                            'rgba(234,179,8,0.1)',
                          color:
                            m.status === 'Compliant' ? '#4ade80' :
                            m.status === 'Overdue' ? '#f87171' :
                            '#facc15',
                        }}>
                        {m.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
