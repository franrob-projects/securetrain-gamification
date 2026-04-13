import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg:      '#0e0c1e',
        surface: '#1a1730',
        border2: '#2a2550',
        brand: {
          DEFAULT: '#5B54B8',
          hover:   '#7A74CC',
          dark:    '#3F3A8A',
        },
        muted:  '#a9a5c4',
        accent: '#9d97e8',
      },
      animation: {
        'badge-pop': 'badge-pop 0.4s cubic-bezier(0.34,1.56,0.64,1)',
        'slide-up':  'slide-up 0.35s ease-out',
        'shrink':    'shrink linear forwards',
      },
      keyframes: {
        'badge-pop': { '0%': { transform: 'scale(0)' }, '100%': { transform: 'scale(1)' } },
        'slide-up':  { '0%': { transform: 'translateY(100%)' }, '100%': { transform: 'translateY(0)' } },
        'shrink':    { '0%': { width: '100%' }, '100%': { width: '0%' } },
      },
    },
  },
  plugins: [],
}

export default config
