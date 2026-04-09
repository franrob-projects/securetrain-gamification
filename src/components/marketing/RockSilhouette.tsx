import type { CSSProperties } from 'react'

export function RockSilhouette({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg
      viewBox="0 0 1440 420"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMax meet"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="rockGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2d2858" stopOpacity={0.6} />
          <stop offset="50%" stopColor="#1e1a40" stopOpacity={0.75} />
          <stop offset="100%" stopColor="#0e0c1e" stopOpacity={1} />
        </linearGradient>
        <linearGradient id="edgeGlow" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#5B54B8" stopOpacity={0.3} />
          <stop offset="40%" stopColor="#5B54B8" stopOpacity={0.08} />
          <stop offset="100%" stopColor="#5B54B8" stopOpacity={0} />
        </linearGradient>
        <clipPath id="rockClip">
          <rect width="1440" height="420" />
        </clipPath>
      </defs>
      <path
        d="M 0,420 L 0,400 L 40,398 L 100,396 L 160,393 L 220,390 L 270,385 L 310,378 L 340,368 L 360,355 L 372,340 L 380,322 L 386,305 L 390,288 L 392,272 L 393,258 L 392,244 L 390,230 L 388,218 L 386,205 L 384,193 L 382,180 L 378,166 L 373,152 L 367,138 L 360,124 L 352,110 L 344,97 L 335,84 L 326,72 L 317,61 L 308,50 L 300,41 L 293,33 L 287,26 L 281,20 L 276,15 L 272,11 L 268,8 L 265,6 L 262,5 L 259,5 L 256,6 L 253,9 L 250,13 L 247,18 L 244,25 L 242,32 L 240,40 L 238,49 L 236,58 L 234,68 L 232,79 L 231,90 L 230,102 L 228,116 L 227,130 L 226,143 L 226,155 L 228,167 L 230,178 L 233,190 L 238,202 L 244,215 L 250,227 L 257,237 L 263,246 L 268,254 L 270,262 L 268,268 L 264,272 L 258,275 L 252,276 L 246,278 L 244,283 L 248,290 L 255,295 L 264,299 L 273,302 L 283,305 L 294,308 L 308,312 L 324,317 L 340,322 L 358,328 L 376,335 L 396,342 L 418,349 L 442,355 L 468,361 L 498,366 L 530,371 L 565,375 L 602,378 L 642,381 L 684,383 L 728,385 L 775,387 L 824,389 L 876,390 L 930,391 L 988,392 L 1050,393 L 1116,394 L 1186,395 L 1260,396 L 1340,397 L 1440,398 L 1440,420 Z"
        fill="url(#rockGrad)"
        clipPath="url(#rockClip)"
      />
      <path
        d="M 165,393 C 220,388 275,380 320,368 C 345,358 365,342 380,320 C 388,305 392,280 392,258 C 391,230 385,200 375,170 C 362,138 345,108 325,80 C 310,58 292,38 275,18 C 270,12 265,6 262,5 C 258,4 254,8 250,14 C 244,24 238,42 233,62 C 228,84 226,110 226,138 C 226,158 230,178 236,198 C 244,220 256,240 268,256 C 270,262 268,270 260,276 C 252,280 248,286 252,294 C 260,305 280,310 308,314"
        fill="none"
        stroke="url(#edgeGlow)"
        strokeWidth={2}
        clipPath="url(#rockClip)"
      />
    </svg>
  )
}
