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
    <footer className="border-t mt-24" style={{ borderColor: 'var(--border)', background: 'rgba(91,84,184,0.03)' }}>
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
          <a href="mailto:francisroberts@live.com" className="text-xs transition-colors" style={{ color: 'var(--muted)' }}>
            francisroberts@live.com
          </a>
        </div>
      </div>
    </footer>
  )
}
