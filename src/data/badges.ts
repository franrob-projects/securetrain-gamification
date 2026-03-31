export interface BadgeDefinition {
  id: string
  name: string
  description: string
  icon: string          // emoji for now — swap for SVG later
  colour: string        // tailwind colour class
  tier: 'bronze' | 'silver' | 'gold' | 'platinum'
  condition: BadgeCondition
}

export interface BadgeCondition {
  type:
    | 'first_completion'       // complete any module
    | 'module_score'           // score >= threshold on specific module
    | 'perfect_score'          // 100% on any module
    | 'streak'                 // maintain streak for N days
    | 'completions_count'      // complete N modules total
    | 'sector_sweep'           // complete all modules in a sector
    | 'threat_level'           // complete N critical modules
    | 'speed_run'              // complete a module in under X minutes
  value?: number               // threshold (score, streak days, count)
  moduleId?: string            // specific module (for module_score)
  sector?: 'crypto' | 'gambling'
}

export const BADGES: BadgeDefinition[] = [
  // ── Onboarding ──────────────────────────────────────────────
  {
    id: 'first-blood',
    name: 'First Responder',
    description: 'Complete your first training module',
    icon: '🛡️',
    colour: 'text-blue-400',
    tier: 'bronze',
    condition: { type: 'first_completion' },
  },

  // ── Score-based ──────────────────────────────────────────────
  {
    id: 'perfect-score',
    name: 'Zero Gaps',
    description: 'Score 100% on any module',
    icon: '🎯',
    colour: 'text-green-400',
    tier: 'silver',
    condition: { type: 'perfect_score' },
  },
  {
    id: 'phishing-ace',
    name: 'Phishing Ace',
    description: 'Score 100% on the Wallet & Seed Phrase module',
    icon: '🪝',
    colour: 'text-sky-400',
    tier: 'gold',
    condition: { type: 'module_score', value: 100, moduleId: 'crypto-wallet-phishing' },
  },
  {
    id: 'social-proof',
    name: 'Social Proof',
    description: 'Score 100% on the LinkedIn Social Engineering module',
    icon: '🕵️',
    colour: 'text-purple-400',
    tier: 'gold',
    condition: { type: 'module_score', value: 100, moduleId: 'gambling-mgm-style-social-eng' },
  },
  {
    id: 'deepfake-detector',
    name: 'Deepfake Detector',
    description: 'Score 100% on the CEO Deepfake module',
    icon: '🤖',
    colour: 'text-pink-400',
    tier: 'gold',
    condition: { type: 'module_score', value: 100, moduleId: 'both-deepfake-ceo' },
  },

  // ── Streak-based ─────────────────────────────────────────────
  {
    id: 'streak-3',
    name: 'On a Roll',
    description: 'Train 3 days in a row',
    icon: '🔥',
    colour: 'text-orange-400',
    tier: 'bronze',
    condition: { type: 'streak', value: 3 },
  },
  {
    id: 'streak-7',
    name: 'Week Warrior',
    description: 'Maintain a 7-day training streak',
    icon: '⚡',
    colour: 'text-amber-400',
    tier: 'silver',
    condition: { type: 'streak', value: 7 },
  },
  {
    id: 'streak-30',
    name: 'Unstoppable',
    description: '30-day training streak — the rarest badge',
    icon: '💎',
    colour: 'text-cyan-400',
    tier: 'platinum',
    condition: { type: 'streak', value: 30 },
  },

  // ── Completion milestones ─────────────────────────────────────
  {
    id: 'five-modules',
    name: 'Threat Hunter',
    description: 'Complete 5 training modules',
    icon: '🔍',
    colour: 'text-violet-400',
    tier: 'silver',
    condition: { type: 'completions_count', value: 5 },
  },
  {
    id: 'all-modules',
    name: 'Fully Armoured',
    description: 'Complete every available module',
    icon: '⚔️',
    colour: 'text-yellow-400',
    tier: 'platinum',
    condition: { type: 'completions_count', value: 8 },
  },

  // ── Sector sweeps ────────────────────────────────────────────
  {
    id: 'crypto-sweep',
    name: 'Chain Guardian',
    description: 'Complete all crypto sector modules',
    icon: '⛓️',
    colour: 'text-sky-400',
    tier: 'gold',
    condition: { type: 'sector_sweep', sector: 'crypto' },
  },
  {
    id: 'gambling-sweep',
    name: 'House Always Wins',
    description: 'Complete all iGaming sector modules',
    icon: '🎲',
    colour: 'text-orange-400',
    tier: 'gold',
    condition: { type: 'sector_sweep', sector: 'gambling' },
  },

  // ── Critical threat mastery ───────────────────────────────────
  {
    id: 'critical-x3',
    name: 'Red Alert Ready',
    description: 'Complete 3 critical-threat modules',
    icon: '🚨',
    colour: 'text-red-400',
    tier: 'silver',
    condition: { type: 'threat_level', value: 3 },
  },
]

export const BADGE_TIER_ORDER = ['bronze', 'silver', 'gold', 'platinum'] as const

export function getBadgeById(id: string): BadgeDefinition | undefined {
  return BADGES.find(b => b.id === id)
}

export const TIER_STYLES = {
  bronze:   { bg: 'bg-orange-950/40',  border: 'border-orange-800/40',  text: 'text-orange-400',  label: 'Bronze' },
  silver:   { bg: 'bg-slate-800/60',   border: 'border-slate-600/40',   text: 'text-slate-300',   label: 'Silver' },
  gold:     { bg: 'bg-yellow-950/40',  border: 'border-yellow-800/40',  text: 'text-yellow-400',  label: 'Gold' },
  platinum: { bg: 'bg-cyan-950/40',    border: 'border-cyan-800/40',    text: 'text-cyan-300',    label: 'Platinum' },
}
