/* eslint-disable @next/next/no-img-element */
export function ConplyLogo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const height = size === 'sm' ? 28 : size === 'lg' ? 48 : 36
  // Source SVG viewBox is 672.132 × 208 → preserve aspect ratio
  const width = Math.round(height * (672.132 / 208))

  return (
    <img
      src="/conply-logo.svg"
      alt="Conply"
      width={width}
      height={height}
      style={{ display: 'block' }}
    />
  )
}
