type Props = {
  light?: boolean
  subtitle?: string
}

export function BrandLockup({ light = false, subtitle = 'Career Center' }: Props) {
  return (
    <div className="brand-lockup" style={light ? { color: '#fff' } : undefined}>
      <div className="v-mark" aria-hidden>
        V
      </div>
      <div className="brand-text">
        <strong>Vanderbilt</strong>
        <span>{subtitle}</span>
      </div>
    </div>
  )
}
