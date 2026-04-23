'use client'
import { useMemo } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { isoWeek } from '@/lib/moduleRotation'

export interface CompletionEvent {
  created_at: string  // ISO timestamp
}

function startOfIsoWeek(date: Date): Date {
  const d = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()))
  const day = d.getUTCDay() || 7
  d.setUTCDate(d.getUTCDate() - (day - 1))
  return d
}

function shortLabel(d: Date): string {
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

export function CompletionsTrend({ events }: { events: CompletionEvent[] }) {
  const data = useMemo(() => {
    const weeks = 8
    const now = new Date()
    const thisMonday = startOfIsoWeek(now)
    const buckets: { week: string; weekStart: Date; count: number }[] = []

    for (let i = weeks - 1; i >= 0; i--) {
      const start = new Date(thisMonday)
      start.setUTCDate(thisMonday.getUTCDate() - i * 7)
      buckets.push({ week: `W${isoWeek(start)}`, weekStart: start, count: 0 })
    }

    for (const e of events) {
      const d = new Date(e.created_at)
      const eventMonday = startOfIsoWeek(d)
      const b = buckets.find(x => x.weekStart.getTime() === eventMonday.getTime())
      if (b) b.count++
    }

    return buckets.map(b => ({ week: b.week, label: shortLabel(b.weekStart), count: b.count }))
  }, [events])

  const total = data.reduce((a, b) => a + b.count, 0)

  return (
    <div className="rounded-xl p-5" style={{ background: 'var(--card)', border: '1px solid var(--card-border)' }}>
      <div className="flex items-end justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold mb-0.5" style={{ color: 'var(--text)' }}>Completions, last 8 weeks</h3>
          <p className="text-xs" style={{ color: 'var(--muted)' }}>
            {total} completed module{total === 1 ? '' : 's'} across your team
          </p>
        </div>
      </div>
      <div style={{ width: '100%', height: 180 }}>
        <ResponsiveContainer>
          <BarChart data={data} margin={{ top: 4, right: 8, left: -24, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(169,165,196,0.15)" vertical={false} />
            <XAxis dataKey="label" tick={{ fontSize: 10, fill: 'rgba(169,165,196,0.7)' }} tickLine={false} axisLine={false} />
            <YAxis allowDecimals={false} tick={{ fontSize: 10, fill: 'rgba(169,165,196,0.7)' }} tickLine={false} axisLine={false} width={30} />
            <Tooltip
              cursor={{ fill: 'rgba(91,84,184,0.08)' }}
              contentStyle={{
                background: 'var(--card)',
                border:     '1px solid var(--card-border)',
                borderRadius: 8,
                fontSize:   12,
                color:      'var(--text)',
              }}
              labelStyle={{ color: 'var(--muted)' }}
              formatter={(value) => {
                const n = typeof value === 'number' ? value : 0
                return [`${n} completion${n === 1 ? '' : 's'}`, '']
              }}
            />
            <Bar dataKey="count" fill="var(--brand)" radius={[4, 4, 0, 0]} maxBarSize={36} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
