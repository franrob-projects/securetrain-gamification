// Merge these into your existing tailwind.config.ts → theme.extend

const additions = {
  keyframes: {
    slideUp: {
      '0%':   { opacity: '0', transform: 'translateY(16px)' },
      '100%': { opacity: '1', transform: 'translateY(0)' },
    },
    shrink: {
      '0%':   { width: '100%' },
      '100%': { width: '0%' },
    },
  },
  animation: {
    slideUp: 'slideUp 0.4s ease-out',
    shrink:  'shrink 3s linear forwards',
  },
}
