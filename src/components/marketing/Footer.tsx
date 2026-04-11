import Link from 'next/link'
import { ConplyLogo } from '@/components/ui/ConplyLogo'

const PRODUCT = [
  { label: 'How it works',      href: '/#how-it-works' },
  { label: 'Pricing',           href: '/pricing'       },
  { label: 'Modules',           href: '/pricing#modules' },
]

const RESOURCES = [
  { label: 'Blog',              href: '/blog'          },
  { label: 'Help & setup',      href: '/help'          },
  { label: 'Log in',            href: '/auth'          },
]

const LEGAL = [
  { label: 'Privacy policy',    href: '/privacy'       },
  { label: 'Terms of service',  href: '/terms'         },
  { label: 'Security',          href: '/help#security' },
]

const REGULATION = [
  { label: 'POCA 2015' },
  { label: 'GFSC DLT Principles' },
  { label: 'Gambling Act 2025' },
  { label: 'Data Protection Act' },
]

export function Footer() {
  return (
    <footer className="mt-24" style={{ background: 'rgba(91,84,184,0.03)' }}>
      {/* Gradient top border */}
      <div className="h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(91,84,184,0.4), transparent)' }} />
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="mb-4">
              <ConplyLogo size="sm" />
            </div>
            <p className="text-xs leading-relaxed max-w-xs" style={{ color: 'var(--muted)' }}>
              AI-powered compliance training built for Gibraltar-regulated crypto and iGaming firms.
            </p>
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

          {/* Legal */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--text)' }}>
              Legal
            </h3>
            <ul className="space-y-2.5">
              {LEGAL.map(link => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm transition-colors"
                    style={{ color: 'var(--muted)' }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Regulation */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--text)' }}>
              Mapped to
            </h3>
            <ul className="space-y-2.5">
              {REGULATION.map(item => (
                <li key={item.label} className="text-sm" style={{ color: 'var(--muted)' }}>
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t flex items-center justify-between flex-wrap gap-4"
          style={{ borderColor: 'var(--border)' }}>
          <p className="text-xs" style={{ color: 'rgba(139,135,168,0.7)' }}>
            © {new Date().getFullYear()} ConPly. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {/* Social links — update hrefs when accounts are live */}
            <a href="#" aria-label="LinkedIn" className="transition-colors" style={{ color: 'var(--muted)' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a href="#" aria-label="YouTube" className="transition-colors" style={{ color: 'var(--muted)' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
            <a href="#" aria-label="X" className="transition-colors" style={{ color: 'var(--muted)' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="#" aria-label="GitHub" className="transition-colors" style={{ color: 'var(--muted)' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
            </a>
            <a href="mailto:francisroberts@live.com" className="text-xs transition-colors" style={{ color: 'var(--muted)' }}>
              francisroberts@live.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
