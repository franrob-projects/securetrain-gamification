'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ConplyLogo } from '@/components/ui/ConplyLogo'

const LINKS = [
  { href: '/pricing', label: 'Pricing' },
  { href: '/blog',    label: 'Blog'    },
  { href: '/help',    label: 'Help'    },
]

export function Nav() {
  const pathname = usePathname()

  const isActive = (href: string) =>
    href === pathname || pathname.startsWith(href + '/')

  return (
    <nav className="px-6 py-4 flex items-center justify-between max-w-6xl mx-auto">
      <Link href="/" className="flex items-center">
        <ConplyLogo size="sm" />
      </Link>
      <div className="flex items-center gap-6">
        {LINKS.map(link => {
          const active = isActive(link.href)
          return (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm transition-colors relative"
              style={{ color: active ? 'var(--text)' : 'var(--muted)' }}
            >
              {link.label}
              {active && (
                <span
                  className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full"
                  style={{ background: 'var(--brand)' }}
                />
              )}
            </Link>
          )
        })}
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
