'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Sparkles, Crown, ChevronRight } from 'lucide-react'
import { ConplyLogo } from '@/components/ui/ConplyLogo'
import { JurisdictionFlag } from '@/components/ui/JurisdictionFlag'
import { BOOKING_URL } from '@/lib/constants'

const LINKS = [
  { href: '/pricing', label: 'Pricing' },
  { href: '/blog',    label: 'Blog'    },
  { href: '/help',    label: 'Help'    },
]

type Jurisdiction = {
  slug:      'gibraltar' | 'luxembourg'
  label:     string
  regulator: string
}

const JURISDICTIONS: Jurisdiction[] = [
  { slug: 'gibraltar',  label: 'Gibraltar',  regulator: 'GFSC' },
  { slug: 'luxembourg', label: 'Luxembourg', regulator: 'CSSF' },
]

const TIERS = [
  { slug: 'pro',    label: 'Pro',    tag: 'Premium',  desc: 'Team-wide compliance training',                 icon: Sparkles, color: '#a78bfa' },
  { slug: 'genius', label: 'Genius', tag: 'Platinum', desc: 'Personalised learning journeys per user',       icon: Crown,    color: '#fbbf24' },
]

export function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [productsOpen, setProductsOpen] = useState(false)
  const [hoveredJx, setHoveredJx] = useState<'gibraltar' | 'luxembourg' | null>(null)

  const isActive = (href: string) =>
    href === pathname || pathname.startsWith(href + '/')

  const isProductsActive = pathname.startsWith('/products')

  return (
    <nav className="px-6 py-4 max-w-6xl mx-auto">
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center" onClick={() => setOpen(false)}>
          <ConplyLogo size="sm" />
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {/* Products dropdown — cascading */}
          <div
            className="relative"
            onMouseEnter={() => setProductsOpen(true)}
            onMouseLeave={() => { setProductsOpen(false); setHoveredJx(null) }}
          >
            <button
              className="text-sm px-3 py-2 rounded-lg transition-colors"
              style={{
                color: isProductsActive ? 'var(--text)' : 'var(--muted)',
                background: isProductsActive ? 'rgba(91,84,184,0.08)' : 'transparent',
              }}
            >
              Products
            </button>

            {productsOpen && (
              <div className="absolute top-full left-0 pt-3" style={{ zIndex: 50 }}>
                <div className="rounded-xl p-2 w-56"
                  style={{ background: 'var(--card-solid)', border: '1px solid var(--card-border)', boxShadow: '0 16px 48px -12px rgba(0,0,0,0.5)' }}>
                  {JURISDICTIONS.map(j => {
                    const active = hoveredJx === j.slug
                    return (
                      <div
                        key={j.slug}
                        onMouseEnter={() => setHoveredJx(j.slug)}
                        className="relative"
                      >
                        <div
                          className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors"
                          style={{ background: active ? 'rgba(91,84,184,0.1)' : 'transparent' }}
                        >
                          <div className="flex items-center gap-2.5">
                            <JurisdictionFlag slug={j.slug} className="w-5 h-auto flex-shrink-0" />
                            <div>
                              <div className="text-sm font-semibold" style={{ color: 'var(--text)' }}>
                                {j.label}
                              </div>
                              <div className="text-[10px]" style={{ color: 'var(--muted)', opacity: 0.7 }}>
                                {j.regulator}
                              </div>
                            </div>
                          </div>
                          <ChevronRight className="w-3.5 h-3.5" style={{ color: active ? 'var(--accent)' : 'var(--muted)', opacity: active ? 1 : 0.5 }} />
                        </div>

                        {/* Flyout aligned to this row */}
                        {active && (
                          <div
                            className="absolute top-0 rounded-xl p-2 w-72"
                            style={{
                              left: 'calc(100% + 8px)',
                              background: 'var(--card-solid)',
                              border: '1px solid var(--card-border)',
                              boxShadow: '0 16px 48px -12px rgba(0,0,0,0.5)',
                            }}
                          >
                            {TIERS.map(t => {
                              const href = `/products/${j.slug}/${t.slug}`
                              const Icon = t.icon
                              return (
                                <Link
                                  key={t.slug}
                                  href={href}
                                  onClick={() => { setProductsOpen(false); setHoveredJx(null) }}
                                  className="flex items-start gap-3 px-3 py-3 rounded-lg transition-colors"
                                  style={{ background: isActive(href) ? 'rgba(91,84,184,0.1)' : 'transparent' }}
                                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(91,84,184,0.08)')}
                                  onMouseLeave={e => (e.currentTarget.style.background = isActive(href) ? 'rgba(91,84,184,0.1)' : 'transparent')}
                                >
                                  <div
                                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                                    style={{ background: `${t.color}15`, border: `1px solid ${t.color}30` }}
                                  >
                                    <Icon className="w-4 h-4" style={{ color: t.color }} />
                                  </div>
                                  <div>
                                    <div className="flex items-center gap-2 mb-0.5">
                                      <span className="text-sm font-semibold" style={{ color: 'var(--text)' }}>
                                        {t.label}
                                      </span>
                                      <span
                                        className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded"
                                        style={{ background: `${t.color}20`, color: t.color }}
                                      >
                                        {t.tag}
                                      </span>
                                    </div>
                                    <p className="text-xs leading-relaxed" style={{ color: 'var(--muted)' }}>
                                      {t.desc}
                                    </p>
                                  </div>
                                </Link>
                              )
                            })}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>

          {LINKS.map(link => {
            const active = isActive(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm px-3 py-2 rounded-lg transition-colors"
                style={{
                  color: active ? 'var(--text)' : 'var(--muted)',
                  background: active ? 'rgba(91,84,184,0.08)' : 'transparent',
                }}
              >
                {link.label}
              </Link>
            )
          })}
          <Link
            href="/auth"
            className="text-sm px-3 py-2 rounded-lg transition-colors"
            style={{ color: 'var(--muted)' }}
          >
            Log in
          </Link>
          <div className="w-px h-5 mx-1" style={{ background: 'var(--border)' }} />
          <a
            href={BOOKING_URL} target="_blank" rel="noopener noreferrer"
            className="text-sm font-semibold px-4 py-2 rounded-lg transition-colors text-white ml-1"
            style={{ background: 'var(--brand)' }}
          >
            Book a demo
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
          {JURISDICTIONS.map(j => (
            <div key={j.slug} className="space-y-1">
              <div className="flex items-center gap-2.5 px-3 pt-3 pb-1">
                <JurisdictionFlag slug={j.slug} className="w-5 h-auto" />
                <p className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: 'var(--accent)' }}>
                  {j.label} · {j.regulator}
                </p>
              </div>
              {TIERS.map(t => {
                const href = `/products/${j.slug}/${t.slug}`
                const Icon = t.icon
                return (
                  <Link
                    key={t.slug}
                    href={href}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ml-2"
                    style={{
                      color: isActive(href) ? 'var(--text)' : 'var(--muted)',
                      background: isActive(href) ? 'rgba(91,84,184,0.1)' : 'transparent',
                    }}
                  >
                    <Icon className="w-4 h-4" style={{ color: t.color }} />
                    <span>{t.label}</span>
                    <span
                      className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ml-auto"
                      style={{ background: `${t.color}20`, color: t.color }}
                    >
                      {t.tag}
                    </span>
                  </Link>
                )
              })}
            </div>
          ))}

          <div className="h-px my-3" style={{ background: 'var(--border)' }} />

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
              href={BOOKING_URL} target="_blank" rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="block text-center px-4 py-2.5 rounded-lg text-sm font-semibold text-white transition-colors"
              style={{ background: 'var(--brand)' }}
            >
              Book a demo
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
