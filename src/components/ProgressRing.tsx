import type { CSSProperties } from 'react'

type Props = {
  completed: number
  total: number
  /** Pathway accent; defaults to Vanderbilt gold */
  accent?: string
  size?: number
}

export function ProgressRing({
  completed,
  total,
  accent,
  size = 72,
}: Props) {
  const stroke = size <= 56 ? 6 : 7
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const pct = total === 0 ? 0 : completed / total
  const offset = circumference * (1 - pct)
  const labelSize = size <= 56 ? 11 : 12

  return (
    <svg
      className="ring"
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
      aria-hidden
      style={
        accent
          ? ({ ['--ring-accent' as string]: accent } as CSSProperties)
          : undefined
      }
    >
      <circle
        className="ring-track"
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={stroke}
      />
      <circle
        className="ring-fill"
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={stroke}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
      />
      <text
        className="ring-label"
        x={size / 2}
        y={size / 2 + 4}
        style={{ fontSize: labelSize }}
      >
        {Math.round(pct * 100)}%
      </text>
    </svg>
  )
}
