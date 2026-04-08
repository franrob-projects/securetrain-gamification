import { Loader2 } from 'lucide-react'

export function Spinner({ className = '', size }: { className?: string; size?: string }) {
  const s = size === 'lg' ? 'w-8 h-8' : 'w-5 h-5'
  return <Loader2 className={`animate-spin ${s} ${className}`} />
}
