import Link from 'next/link'
import { ConplyLogo } from '@/components/ui/ConplyLogo'

export function Nav() {
  return (
    <nav className="px-6 py-4 flex items-center justify-between max-w-6xl mx-auto">
      <Link href="/">
        <ConplyLogo size="sm" />
      </Link>
      <div className="flex items-center gap-6">
        <Link
          href="/pricing"
          className="text-sm transition-colors"
          style={{ color: 'var(--muted)' }}
        >
          Pricing
        </Link>
        <Link
          href="/blog"
          className="text-sm transition-colors"
          style={{ color: 'var(--muted)' }}
        >
          Blog
        </Link>
        <Link
          href="/help"
          className="text-sm transition-colors"
          style={{ color: 'var(--muted)' }}
        >
          Help
        </Link>
        <Link
          href="/auth"
          className="text-sm transition-colors"
          style={{ color: 'var(--muted)' }}
        >
          Log in
        </Link>
        <Link
          href="/auth"
          className="text-sm font-semibold px-4 py-2 rounded-lg transition-colors text-white"
          style={{ background: 'var(--brand)' }}
        >
          Request access
        </Link>
      </div>
    </nav>
  )
}
