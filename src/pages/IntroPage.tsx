import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BrandLockup } from '../components/BrandLockup'
import { careerStats } from '../data/pathways'
import { useProgress } from '../hooks/useProgress'

export function IntroPage() {
  const navigate = useNavigate()
  const { markIntroSeen } = useProgress()
  const [step, setStep] = useState<1 | 2>(1)

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

          <div style={{ marginTop: 'auto', paddingTop: 48 }}>
            <button
              type="button"
              className="btn btn-primary btn-block"
              onClick={() => setStep(2)}
            >
              Continue
            </button>
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

          <button type="button" className="btn btn-primary btn-block" onClick={start}>
            Begin your journey
          </button>
          <button
            type="button"
            className="btn btn-ghost btn-block"
            style={{ marginTop: 10 }}
            onClick={() => setStep(1)}
          >
            Back
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
