import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? 'https://www.conply.org'),
  title: {
    template: '%s | Conply',
    default: 'Conply | Gibraltar & Luxembourg Compliance Training',
  },
  description: 'AI-powered compliance training for Gibraltar and Luxembourg regulated firms. Grounded in POCA 2015, GFSC Principles, MiCA, CSSF, and more. Delivered in Slack or Microsoft Teams.',
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    siteName: 'Conply',
    url: process.env.NEXT_PUBLIC_APP_URL ?? 'https://www.conply.org',
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
