import Link from 'next/link'
import { ConplyLogo } from '@/components/ui/ConplyLogo'

const PRODUCT = [
  { label: 'Pro',             href: '/products/pro'    },
  { label: 'Genius',          href: '/products/genius' },
  { label: 'Pricing',         href: '/pricing'         },
  { label: 'How it works',    href: '/#how-it-works'   },
]

const RESOURCES = [
  { label: 'Blog',            href: '/blog'            },
  { label: 'Help & setup',    href: '/help'            },
  { label: 'Security',        href: '/help#security'   },
  { label: 'Log in',          href: '/auth'            },
]

const REGULATION = [
  'POCA 2015',
  'GFSC DLT Principles',
  'Gambling Act 2025',
  'Data Protection Act',
]

export function Footer() {
  return (
    <footer style={{ background: 'rgba(91,84,184,0.03)' }}>
      <div className="h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(91,84,184,0.4), transparent)' }} />
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-4">
              <ConplyLogo size="sm" />
            </div>
            <p className="text-xs leading-relaxed max-w-xs mb-5" style={{ color: 'var(--muted)' }}>
              AI-powered compliance training built for Gibraltar-regulated crypto and iGaming firms.
            </p>
            {/* Socials */}
            <div className="flex items-center gap-2">
              <a href="https://www.linkedin.com/company/conply" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                style={{ background: 'rgba(96,165,250,0.1)', border: '1px solid rgba(96,165,250,0.2)', color: '#60a5fa' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href="https://x.com/conply_gi" target="_blank" rel="noopener noreferrer" aria-label="X"
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                style={{ background: 'rgba(167,139,250,0.1)', border: '1px solid rgba(167,139,250,0.2)', color: '#a78bfa' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="mailto:francisroberts@live.com" aria-label="Email"
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                style={{ background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.2)', color: '#4ade80' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--text)' }}>
              Product
            </h3>
            <ul className="space-y-2.5">
              {PRODUCT.map(link => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm transition-colors"
                    style={{ color: 'var(--muted)' }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--text)' }}>
              Resources
            </h3>
            <ul className="space-y-2.5">
              {RESOURCES.map(link => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm transition-colors"
                    style={{ color: 'var(--muted)' }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Mapped to */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--text)' }}>
              Mapped to
            </h3>
            <ul className="space-y-2.5">
              {REGULATION.map(item => (
                <li key={item} className="text-sm" style={{ color: 'var(--muted)' }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t"
          style={{ borderColor: 'var(--border)' }}>
          <p className="text-xs" style={{ color: 'var(--muted)', opacity: 0.6 }}>
            &copy; {new Date().getFullYear()} Conply. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
