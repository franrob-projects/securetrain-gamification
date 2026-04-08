import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SecureTrain — Gibraltar Compliance',
  description: 'AI-powered compliance training for Gibraltar-regulated firms',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
