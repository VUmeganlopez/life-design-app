import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BrandLockup } from '../components/BrandLockup'
import { careerStats } from '../data/pathways'
import { useProgress } from '../hooks/useProgress'

const WELCOME_DWELL_MS = 3300

export function IntroPage() {
  const navigate = useNavigate()
  const { markIntroSeen } = useProgress()
  const [step, setStep] = useState<1 | 2>(1)

  useEffect(() => {
    if (step !== 1) return
    const timer = window.setTimeout(() => setStep(2), WELCOME_DWELL_MS)
    return () => window.clearTimeout(timer)
  }, [step])

  const start = () => {
    markIntroSeen()
    navigate('/home')
  }

  return (
    <main className="page page--intro">
      <BrandLockup light subtitle="Career Center" />

      {step === 1 ? (
        <div className="intro-panel" key="welcome">
          <p className="eyebrow" style={{ marginTop: 48 }}>
            Vanderbilt Career Center
          </p>
          <h1 className="display" style={{ fontSize: '2.4rem', maxWidth: '11ch' }}>
            Welcome to Vanderbilt.
          </h1>
          <p
            className="intro-tagline"
            style={{
              opacity: 0.88,
              lineHeight: 1.45,
              marginTop: 18,
              maxWidth: '22ch',
              fontFamily: 'var(--font-display)',
              fontSize: '1.35rem',
            }}
          >
            Build a career with meaning—starting now.
          </p>
          <div className="intro-dots" aria-hidden>
            <span className="intro-dot active" />
            <span className="intro-dot" />
          </div>
        </div>
      ) : (
        <div className="intro-panel" key="story">
          <p className="eyebrow" style={{ marginTop: 36 }}>
            Your journey starts here
          </p>
          <p
            style={{
              opacity: 0.88,
              lineHeight: 1.6,
              marginTop: 12,
              maxWidth: '38ch',
              fontSize: '1.05rem',
            }}
          >
            Your time here is about more than classes and a diploma. The Career
            Center is here to support you beyond Vanderbilt—helping you build
            career readiness early and design a life with purpose, meaning, and
            momentum.
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

          <div className="intro-dots" aria-hidden>
            <span className="intro-dot" />
            <span className="intro-dot active" />
          </div>

          <button type="button" className="btn btn-primary btn-block" onClick={start}>
            Begin your journey
          </button>
        </div>
      )}

      <p
        style={{
          textAlign: 'center',
          fontSize: '0.78rem',
          opacity: 0.55,
          marginTop: 14,
        }}
      >
        Vanderbilt Career Center · Life Design
      </p>
    </main>
  )
}
