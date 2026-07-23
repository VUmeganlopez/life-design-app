import { useNavigate } from 'react-router-dom'
import { BrandLockup } from '../components/BrandLockup'
import { careerStats } from '../data/pathways'
import { useProgress } from '../hooks/useProgress'

export function IntroPage() {
  const navigate = useNavigate()
  const { markIntroSeen } = useProgress()

  const start = () => {
    markIntroSeen()
    navigate('/home')
  }

  return (
    <main className="page page--intro">
      <BrandLockup light subtitle="Career Center" />

      <p className="eyebrow" style={{ marginTop: 36 }}>
        For first-year Commodores
      </p>
      <h1 className="display" style={{ fontSize: '2.25rem', maxWidth: '12ch' }}>
        Welcome to Vanderbilt.
      </h1>
      <p style={{ opacity: 0.82, lineHeight: 1.6, marginTop: 14, maxWidth: '38ch' }}>
        Your time here is about more than classes and a diploma. The Career Center
        is here to support you beyond Vanderbilt—helping you build career readiness
        early and design a life with purpose, meaning, and momentum.
      </p>
      <p style={{ opacity: 0.7, lineHeight: 1.55, marginTop: 12, maxWidth: '38ch' }}>
        Start with Life Design Foundations—values, interests, and fit—then unlock
        industry pathways once you’ve built enough self-knowledge to choose with
        intention.
      </p>

      <div className="stat-grid">
        <p className="eyebrow" style={{ marginBottom: 0 }}>
          Where Commodores land
        </p>
        {careerStats.map((stat) => (
          <article key={stat.label} className="stat-card">
            <p className="stat-value">{stat.value}</p>
            <p className="stat-label">{stat.label}</p>
            <p className="stat-detail">{stat.detail}</p>
          </article>
        ))}
      </div>

      <button type="button" className="btn btn-primary btn-block" onClick={start}>
        Begin your first-year journey
      </button>
      <p style={{ textAlign: 'center', fontSize: '0.78rem', opacity: 0.55, marginTop: 14 }}>
        Vanderbilt Career Center · Life Design
      </p>
    </main>
  )
}
