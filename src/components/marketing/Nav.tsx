'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { ConplyLogo } from '@/components/ui/ConplyLogo'
import { CONTACT_EMAIL } from '@/lib/constants'

const LINKS = [
  { href: '/pricing', label: 'Pricing' },
  { href: '/blog',    label: 'Blog'    },
  { href: '/help',    label: 'Help'    },
]

export function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const isActive = (href: string) =>
    href === pathname || pathname.startsWith(href + '/')

  return (
    <nav className="px-6 py-4 max-w-6xl mx-auto">
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center" onClick={() => setOpen(false)}>
          <ConplyLogo size="sm" />
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
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
          <a
            href={CONTACT_EMAIL}
            className="text-sm font-semibold px-4 py-2 rounded-lg transition-colors text-white"
            style={{ background: 'var(--brand)' }}
          >
            Get in touch
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-1"
          style={{ color: 'var(--muted)' }}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden pt-6 pb-2 space-y-1">
          {LINKS.map(link => {
            const active = isActive(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block px-3 py-2.5 rounded-lg text-sm transition-colors"
                style={{
                  color: active ? 'var(--text)' : 'var(--muted)',
                  background: active ? 'rgba(91,84,184,0.1)' : 'transparent',
                }}
              >
                {link.label}
              </Link>
            )
          })}
          <Link
            href="/auth"
            onClick={() => setOpen(false)}
            className="block px-3 py-2.5 rounded-lg text-sm transition-colors"
            style={{ color: 'var(--muted)' }}
          >
            Log in
          </Link>
          <div className="pt-3">
            <a
              href={CONTACT_EMAIL}
              onClick={() => setOpen(false)}
              className="block text-center px-4 py-2.5 rounded-lg text-sm font-semibold text-white transition-colors"
              style={{ background: 'var(--brand)' }}
            >
              Get in touch
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
