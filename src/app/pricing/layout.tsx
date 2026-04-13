import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Per-user pricing for Gibraltar compliance training. Starter, Growth, and Scale plans for crypto and iGaming firms.',
}

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
