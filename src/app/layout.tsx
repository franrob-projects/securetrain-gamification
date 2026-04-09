import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? 'https://conply.gi'),
  title: {
    template: '%s — ConPly',
    default: 'ConPly — Gibraltar Compliance Training',
  },
  description: 'AI-powered, role-specific compliance training for Gibraltar-regulated crypto and iGaming firms. Mapped to POCA 2015, GFSC principles, and the Gambling Act 2025.',
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    siteName: 'ConPly',
    url: process.env.NEXT_PUBLIC_APP_URL ?? 'https://conply.gi',
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
