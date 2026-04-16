import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: '/products/pro',    destination: '/products/gibraltar/pro',    permanent: true },
      { source: '/products/genius', destination: '/products/gibraltar/genius', permanent: true },
    ]
  },
}

export default nextConfig
