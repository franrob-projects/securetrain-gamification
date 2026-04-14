'use client'

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const data = [
  { stage: 'Onboarding',    traditional: 12, conply: 18 },
  { stage: 'Month 1',       traditional: 28, conply: 52 },
  { stage: 'Month 3',       traditional: 38, conply: 78 },
  { stage: 'Audit Ready',   traditional: 45, conply: 100 },
]

const annotations = [
  { idx: 1, label: '52% compliant' },
  { idx: 2, label: '78% compliant' },
  { idx: 3, label: '100% audit-ready' },
]

function CustomDot(props: any) {
  const { cx, cy, index, dataKey } = props
  if (dataKey !== 'conply') return null
  const annotation = annotations.find(a => a.idx === index)
  if (!annotation) return null

  return (
    <g>
      <circle cx={cx} cy={cy} r={8} fill="rgba(34,197,94,0.2)" />
      <circle cx={cx} cy={cy} r={4} fill="#22c55e" />
      <text
        x={cx}
        y={cy - 16}
        fill="#4ade80"
        fontSize={11}
        fontWeight={600}
        textAnchor="middle"
      >
        {annotation.label}
      </text>
    </g>
  )
}

export function ComplianceChart() {
  return (
    <div className="rounded-xl p-4 sm:p-6" style={{ background: 'rgba(14,12,30,0.8)', border: '1px solid var(--card-border)' }}>
      {/* Legend */}
      <div className="flex gap-5 justify-end mb-5 text-xs">
        <span className="flex items-center gap-2" style={{ color: 'var(--muted)' }}>
          <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: 'rgba(169,165,196,0.5)' }} />
          Traditional e-learning
        </span>
        <span className="flex items-center gap-2" style={{ color: '#4ade80' }}>
          <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: '#22c55e' }} />
          Conply
        </span>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={data} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="conplyGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22c55e" stopOpacity={0.2} />
              <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(46,42,82,0.4)"
            vertical={false}
          />
          <XAxis
            dataKey="stage"
            tick={{ fill: '#a9a5c4', fontSize: 11 }}
            axisLine={{ stroke: 'rgba(46,42,82,0.4)' }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: '#a9a5c4', fontSize: 10 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v: number) => `${v}%`}
          />

          {/* Traditional line (subtle) */}
          <Area
            type="monotone"
            dataKey="traditional"
            stroke="rgba(169,165,196,0.4)"
            strokeWidth={2}
            strokeDasharray="4 4"
            fill="none"
            dot={false}
          />

          {/* Conply line (green) */}
          <Area
            type="monotone"
            dataKey="conply"
            stroke="#22c55e"
            strokeWidth={2}
            fill="url(#conplyGradient)"
            dot={<CustomDot />}
            activeDot={false}
          />

          <Tooltip
            contentStyle={{
              background: 'var(--bg)',
              border: '1px solid rgba(46,42,82,0.6)',
              borderRadius: 8,
              color: '#fff',
              fontSize: 12,
            }}
            formatter={(value, name) => [
              `${value}%`,
              name === 'conply' ? 'Conply' : 'Traditional',
            ]}
            labelStyle={{ color: 'var(--muted)', marginBottom: 4 }}
          />
        </AreaChart>
      </ResponsiveContainer>

      {/* Stats bar */}
      <div className="mt-4 pt-4 grid grid-cols-2 gap-4" style={{ borderTop: '1px solid var(--card-border)' }}>
        <div className="flex items-center gap-3">
          <div className="w-2 h-8 rounded-full" style={{ background: '#22c55e' }} />
          <div>
            <div className="text-lg font-bold" style={{ color: '#4ade80' }}>100%</div>
            <div className="text-[10px] uppercase tracking-wider" style={{ color: 'var(--muted)' }}>Conply at audit</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-2 h-8 rounded-full" style={{ background: 'rgba(169,165,196,0.3)' }} />
          <div>
            <div className="text-lg font-bold" style={{ color: 'var(--muted)' }}>45%</div>
            <div className="text-[10px] uppercase tracking-wider" style={{ color: 'var(--muted)', opacity: 0.6 }}>Traditional at audit</div>
          </div>
        </div>
      </div>
    </div>
  )
}
