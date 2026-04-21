import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Per-user pricing for Gibraltar and Luxembourg compliance training. Pro and Genius plans for regulated firms.',
}

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
