type Slug = 'gibraltar' | 'luxembourg'

export function JurisdictionFlag({ slug, className = 'w-5 h-auto' }: { slug: Slug; className?: string }) {
  if (slug === 'gibraltar') {
    return (
      <svg viewBox="0 0 24 15" xmlns="http://www.w3.org/2000/svg" className={className}
        style={{ borderRadius: 2, overflow: 'hidden', display: 'block' }}>
        <rect width="24" height="15" fill="#ffffff" />
        <rect y="10" width="24" height="5" fill="#da000c" />
        {/* Castle */}
        <g fill="#da000c" transform="translate(12, 6.2)">
          <rect x="-3.5" y="-0.4" width="7" height="3.6" />
          <rect x="-4" y="-1.6" width="1.8" height="1.4" />
          <rect x="2.2" y="-1.6" width="1.8" height="1.4" />
          <rect x="-0.9" y="-2.8" width="1.8" height="2.6" />
        </g>
        {/* Gold key */}
        <rect x="11.1" y="11.2" width="1.8" height="2.6" fill="#ffcd00" />
        <rect x="10.4" y="13.1" width="3.2" height="0.8" fill="#ffcd00" />
      </svg>
    )
  }
  // luxembourg
  return (
    <svg viewBox="0 0 24 15" xmlns="http://www.w3.org/2000/svg" className={className}
      style={{ borderRadius: 2, overflow: 'hidden', display: 'block' }}>
      <rect width="24" height="5"  y="0"  fill="#ed2939" />
      <rect width="24" height="5"  y="5"  fill="#ffffff" />
      <rect width="24" height="5"  y="10" fill="#00a1de" />
    </svg>
  )
}
