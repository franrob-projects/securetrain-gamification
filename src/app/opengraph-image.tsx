import { ImageResponse } from 'next/og'
import { readFile } from 'fs/promises'
import { join } from 'path'

export const runtime = 'nodejs'
export const alt = 'Conply | AI-powered compliance training for Gibraltar and Luxembourg'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  const iconBytes = await readFile(join(process.cwd(), 'src/app/icon.png'))
  const iconSrc = `data:image/png;base64,${iconBytes.toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          width:           '100%',
          height:          '100%',
          display:         'flex',
          flexDirection:   'column',
          justifyContent:  'center',
          padding:         '80px',
          background:      'radial-gradient(circle at 20% 30%, #2a2550 0%, #0e0c1e 60%)',
          color:           '#ffffff',
          fontFamily:      'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          <img src={iconSrc} width={120} height={120} style={{ borderRadius: 24 }} />
          <div style={{ fontSize: 96, fontWeight: 700, letterSpacing: '-0.03em' }}>Conply</div>
        </div>

        <div
          style={{
            marginTop: 48,
            fontSize:  54,
            fontWeight: 600,
            lineHeight: 1.15,
            maxWidth:  1000,
            letterSpacing: '-0.02em',
          }}
        >
          Compliance training, grounded in statute.
        </div>

        <div
          style={{
            marginTop: 28,
            fontSize:  28,
            color:     '#a9a5c4',
            maxWidth:  1000,
            lineHeight: 1.4,
          }}
        >
          AI scenarios from POCA, GFSC, MiCA, CSSF. Gibraltar and Luxembourg. Delivered in Slack &amp; Microsoft Teams. Audit-ready PDF records.
        </div>

        <div
          style={{
            marginTop: 'auto',
            display:   'flex',
            alignItems: 'center',
            gap:       16,
            fontSize:  22,
            color:     '#9d97e8',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          <div style={{ width: 40, height: 2, background: '#5B54B8' }} />
          www.conply.org
        </div>
      </div>
    ),
    size,
  )
}
