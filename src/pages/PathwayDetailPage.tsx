import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Check, Lock } from 'lucide-react'
import {
  getPathway,
  groupStepsByCategory,
  isIndustryPathway,
  stepMatchesTrack,
  trackLabels,
} from '../data/pathways'
import type { GoalTrack } from '../data/types'
import { useProgress } from '../hooks/useProgress'

export function PathwayDetailPage() {
  const { pathwayId = '' } = useParams()
  const pathway = getPathway(pathwayId)
  const {
    isComplete,
    toggleStep,
    getPathwayTrack,
    setPathwayTrack,
    canAccessIndustryPathways,
    lifeDesignProgress,
  } = useProgress()

  if (!pathway) {
    return (
      <main className="page">
        <p>Pathway not found.</p>
        <Link to="/pathways">Back to pathways</Link>
      </main>
    )
  }

  const isFoundation = pathway.kind === 'foundation'
  const unlockPct = Math.round(lifeDesignProgress.unlockAt * 100)

  if (isIndustryPathway(pathway) && !canAccessIndustryPathways) {
    return (
      <main className="page">
        <Link to="/pathways" className="back-link">
          <ArrowLeft size={16} /> Pathways
        </Link>
        <div className="detail-hero">
          <p className="eyebrow" style={{ color: pathway.accent }}>
            <Lock size={14} style={{ verticalAlign: 'middle' }} /> Locked
          </p>
          <h1 className="display" style={{ fontSize: '1.9rem' }}>
            {pathway.name}
          </h1>
          <p className="muted">
            Complete at least {unlockPct}% of Life Design Foundations (
            {lifeDesignProgress.unlockCount}/{lifeDesignProgress.total}{' '}
            milestones) to open industry pathways. You’re at{' '}
            {lifeDesignProgress.completed}/{lifeDesignProgress.total}.
          </p>
          <Link
            to="/pathways/life-design"
            className="btn btn-dark"
            style={{ marginTop: 16, display: 'inline-flex' }}
          >
            Continue Life Design
          </Link>
        </div>
      </main>
    )
  }

  const track = getPathwayTrack(pathway.id)
  const visibleSteps = pathway.steps.filter((step) =>
    isFoundation ? true : stepMatchesTrack(step, track),
  )
  const grouped = groupStepsByCategory(visibleSteps)

  return (
    <main className="page">
      <Link to="/pathways" className="back-link">
        <ArrowLeft size={16} /> Pathways
      </Link>

      <div className="detail-hero">
        <p className="eyebrow" style={{ color: pathway.accent }}>
          {isFoundation ? 'Foundation' : 'Pathway'}
        </p>
        <h1 className="display" style={{ fontSize: '1.9rem' }}>
          {pathway.name}
        </h1>
        <p className="muted">{pathway.description}</p>
      </div>

      {!isFoundation ? (
        <>
          <div
            className="track-switch"
            role="group"
            aria-label="Destination focus"
          >
            {(Object.keys(trackLabels) as GoalTrack[]).map((option) => (
              <button
                key={option}
                type="button"
                className={`track-switch-btn${track === option ? ' active' : ''}`}
                aria-pressed={track === option}
                onClick={() => setPathwayTrack(pathway.id, option)}
              >
                {trackLabels[option]}
              </button>
            ))}
          </div>
          <p className="muted" style={{ marginTop: 10, fontSize: '0.85rem' }}>
            Milestones follow seven categories—from self-knowledge through
            offers or grad-school completion. Switch tracks to see employment vs
            continuing education steps.
          </p>
        </>
      ) : (
        <p className="muted" style={{ marginTop: 0, fontSize: '0.85rem' }}>
          Complete {lifeDesignProgress.unlockCount}/{lifeDesignProgress.total}{' '}
          of these foundation milestones ({unlockPct}%) to unlock industry
          pathways
          {canAccessIndustryPathways ? ' — already unlocked.' : '.'}
        </p>
      )}

      {grouped.map((group) => (
        <section key={group.category} style={{ marginTop: 22 }}>
          <div className="section-head">
            <h2 style={{ fontSize: '1.05rem' }}>{group.label}</h2>
          </div>
          <div className="step-list">
            {group.steps.map((step) => {
              const done = isComplete(step.id)
              const isShared =
                !step.tracks ||
                (step.tracks.includes('employment') &&
                  step.tracks.includes('continuing-education'))
              return (
                <div
                  key={step.id}
                  className={`step-card${done ? ' done' : ''}`}
                >
                  <button
                    type="button"
                    className={`check-btn${done ? ' done' : ''}`}
                    aria-label={done ? 'Mark incomplete' : 'Mark complete'}
                    onClick={() => toggleStep(step.id)}
                  >
                    {done ? <Check size={14} strokeWidth={3} /> : null}
                  </button>
                  <Link
                    to={`/pathways/${pathway.id}/steps/${step.id}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <div className="meta-row" style={{ marginBottom: 6 }}>
                      {!isFoundation ? (
                        <span className="chip">
                          {isShared ? 'Shared' : trackLabels[track]}
                        </span>
                      ) : null}
                      <span className="chip-muted chip">
                        {step.suggestedTiming}
                      </span>
                    </div>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </Link>
                </div>
              )
            })}
          </div>
        </section>
      ))}
    </main>
  )
}
