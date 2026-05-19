'use client'
import { useState } from 'react'
import Link from 'next/link'
import { MODULES } from '@/data/modules'
import { ComplianceMatrix } from '@/components/admin/ComplianceMatrix'
import { DeliverySettings } from '@/components/admin/DeliverySettings'
import { ConplyLogo } from '@/components/ui/ConplyLogo'
import { ThreatBadge } from '@/components/ui/ThreatBadge'
import { SectorBadge } from '@/components/ui/SectorBadge'
import { clearDemoCompletions } from '@/lib/demoMode'
import { Clock, ExternalLink, Play, RotateCw } from 'lucide-react'
import { formatDuration } from '@/lib/utils'

export default function DemoPage() {
  const [tab, setTab] = useState<'modules' | 'team' | 'delivery'>('team')
  const resetDemo = () => {
    clearDemoCompletions()
    window.location.reload()
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <nav className="px-6 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid var(--border)' }}>
        <Link href="/"><ConplyLogo /></Link>
        <div className="flex items-center gap-3">
          <button onClick={resetDemo}
            title="Clear any modules you completed during this demo"
            className="inline-flex items-center gap-1.5 text-xs transition-colors"
            style={{ color: 'var(--muted)' }}>
            <RotateCw className="w-3 h-3" /> Reset demo
          </button>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: 'rgba(91,84,184,0.15)', color: 'var(--accent)', border: '1px solid rgba(91,84,184,0.3)' }}>
            Live demo
          </span>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-10">
        {/* Demo intro banner with CTA into the training UI */}
        <div className="mb-8 rounded-xl px-6 py-5 flex flex-col md:flex-row md:items-center justify-between gap-4"
          style={{ background: 'linear-gradient(135deg, rgba(91,84,184,0.10), rgba(91,84,184,0.04))', border: '1px solid rgba(91,84,184,0.25)' }}>
          <div>
            <h1 className="text-xl font-bold mb-1" style={{ color: 'var(--text)' }}>Conply — admin dashboard demo</h1>
            <p className="text-sm" style={{ color: 'var(--muted)' }}>
              Browse a populated team of 20 employees, watch a live Slack/Teams sample land, then try a training module yourself.
            </p>
          </div>
          <Link href={`/train/${MODULES[0].id}`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white whitespace-nowrap transition-colors"
            style={{ background: 'var(--brand)' }}>
            <Play className="w-4 h-4" />
            Try a training module
          </Link>
        </div>

        {/* Tabs — same as the real admin page */}
        <div className="flex gap-1 mb-8 p-1 rounded-lg w-fit" style={{ background: 'var(--surface)' }}>
          {(['modules', 'team', 'delivery'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className="px-4 py-1.5 rounded text-sm font-medium capitalize transition-all"
              style={tab === t
                ? { background: 'var(--brand)', color: '#fff' }
                : { color: 'var(--muted)' }}>
              {t === 'modules' ? `Modules (${MODULES.length})` : t === 'team' ? 'Team Compliance' : 'Delivery'}
            </button>
          ))}
        </div>

        {tab === 'modules' && (
          <div>
            <p className="text-xs mb-5" style={{ color: 'var(--muted)' }}>
              All modules available to your team. Module assignment is based on each member&apos;s sector.
            </p>
            <div className="space-y-3">
              {MODULES.map(m => (
                <Link key={m.id} href={`/train/${m.id}`}
                  className="block rounded-xl p-5 flex flex-col sm:flex-row sm:items-center gap-4 transition-colors hover:opacity-90"
                  style={{ background: 'var(--card)', border: '1px solid var(--card-border)' }}>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <h3 className="text-sm font-semibold" style={{ color: 'var(--text)' }}>{m.title}</h3>
                      <ExternalLink className="w-3 h-3" style={{ color: 'var(--muted)' }} />
                    </div>
                    <p className="text-xs leading-relaxed line-clamp-2" style={{ color: 'var(--muted)' }}>{m.description}</p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <SectorBadge sector={m.sector} />
                    <ThreatBadge level={m.threatLevel} />
                    <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--muted)' }}>
                      <Clock className="w-3 h-3" /> {formatDuration(m.durationMins)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {tab === 'team' && <ComplianceMatrix />}

        {tab === 'delivery' && <DeliverySettings />}
      </main>
    </div>
  )
}
