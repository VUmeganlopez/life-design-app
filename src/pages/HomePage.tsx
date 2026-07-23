import { Link } from 'react-router-dom'
import { BrandLockup } from '../components/BrandLockup'
import { ProgressRing } from '../components/ProgressRing'
import {
  LIFE_DESIGN_ID,
  getAllSteps,
  getLifeDesignPathway,
  isFoundationPathway,
  pathways,
  stepMatchesTrack,
} from '../data/pathways'
import { useProgress } from '../hooks/useProgress'

export function HomePage() {
  const {
    progress,
    isComplete,
    getPathwayTrack,
    canAccessIndustryPathways,
    lifeDesignProgress,
  } = useProgress()
  const selected = pathways.filter((p) =>
    progress.selectedPathways.includes(p.id),
  )
  const relevantSteps = getAllSteps().filter((s) => {
    if (!progress.selectedPathways.includes(s.pathwayId)) return false
    if (isFoundationPathway(s.pathwayId)) return true
    return stepMatchesTrack(s, getPathwayTrack(s.pathwayId))
  })
  const total = relevantSteps.length
  const completedCount = relevantSteps.filter((s) => isComplete(s.id)).length
  const nextSteps = relevantSteps.filter((s) => !isComplete(s.id)).slice(0, 3)
  const lifeDesign = getLifeDesignPathway()
  const unlockPct = Math.round(lifeDesignProgress.unlockAt * 100)
  const industrySelected = selected.filter((p) => !isFoundationPathway(p))

  return (
    <main className="page">
      <BrandLockup subtitle="Life Design Journey" />

      <div className="progress-banner" style={{ marginTop: 20 }}>
        <ProgressRing completed={completedCount} total={total || 1} />
        <div>
          <p className="eyebrow" style={{ marginBottom: 4 }}>
            Your progress
          </p>
          <h1 className="display" style={{ fontSize: '1.45rem', color: '#fff' }}>
            {completedCount} of {total} milestones
          </h1>
          <p style={{ margin: '6px 0 0', opacity: 0.7, fontSize: '0.88rem' }}>
            {canAccessIndustryPathways
              ? 'Life Design unlocked your industry pathways—keep building momentum.'
              : `Start with Life Design. Unlock industry pathways at ${unlockPct}% (${lifeDesignProgress.unlockCount}/${lifeDesignProgress.total}).`}
          </p>
        </div>
      </div>

      {!canAccessIndustryPathways ? (
        <div className="unlock-banner" style={{ marginTop: 14 }} role="status">
          <p className="eyebrow" style={{ margin: 0 }}>
            Pathway unlock
          </p>
          <p style={{ margin: '4px 0 0', fontSize: '0.92rem' }}>
            {lifeDesignProgress.completed}/{lifeDesignProgress.total} Life Design
            milestones — unlock pathways at {unlockPct}%
          </p>
          <Link
            to={`/pathways/${LIFE_DESIGN_ID}`}
            className="linkish"
            style={{ marginTop: 8, display: 'inline-block' }}
          >
            Continue Life Design →
          </Link>
        </div>
      ) : null}

      <div className="section-head">
        <h2>Up next</h2>
        <Link className="linkish" to="/journey">
          View all
        </Link>
      </div>

      {nextSteps.length === 0 ? (
        <div className="empty">
          You’re caught up for now.
          {canAccessIndustryPathways
            ? ' Explore another pathway or share a story with other Commodores.'
            : ' Keep checking off Life Design milestones to unlock industry pathways.'}
        </div>
      ) : (
        <div className="step-list">
          {nextSteps.map((step) => (
            <Link
              key={step.id}
              className="step-card"
              to={`/pathways/${step.pathwayId}/steps/${step.id}`}
            >
              <div className="check-btn" aria-hidden />
              <div>
                <div className="meta-row" style={{ marginBottom: 6 }}>
                  <span className="chip-muted chip">{step.pathwayName}</span>
                  <span className="chip">{step.suggestedTiming}</span>
                </div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </Link>
          ))}
        </div>
      )}

      <div className="section-head" style={{ marginTop: 28 }}>
        <h2>Your pathways</h2>
        <Link className="linkish" to="/pathways">
          Manage
        </Link>
      </div>
      <div className="pathway-list">
        <Link
          to={`/pathways/${LIFE_DESIGN_ID}`}
          className="pathway-card"
          style={{ ['--accent' as string]: lifeDesign.accent }}
        >
          <p className="eyebrow" style={{ color: lifeDesign.accent }}>
            {lifeDesignProgress.completed}/{lifeDesignProgress.total} complete ·
            Foundation
          </p>
          <h3 className="display" style={{ fontSize: '1.2rem', margin: 0 }}>
            {lifeDesign.name}
          </h3>
          <p className="muted" style={{ margin: 0, fontSize: '0.9rem' }}>
            {lifeDesign.tagline}
          </p>
        </Link>

        {industrySelected.map((pathway) => {
          const track = getPathwayTrack(pathway.id)
          const visible = pathway.steps.filter((s) =>
            stepMatchesTrack(s, track),
          )
          const done = visible.filter((s) => isComplete(s.id)).length
          return (
            <Link
              key={pathway.id}
              to={`/pathways/${pathway.id}`}
              className="pathway-card"
              style={{ ['--accent' as string]: pathway.accent }}
            >
              <p className="eyebrow" style={{ color: pathway.accent }}>
                {done}/{visible.length} complete
              </p>
              <h3 className="display" style={{ fontSize: '1.2rem', margin: 0 }}>
                {pathway.name}
              </h3>
              <p className="muted" style={{ margin: 0, fontSize: '0.9rem' }}>
                {pathway.tagline}
              </p>
            </Link>
          )
        })}

        {!canAccessIndustryPathways ? (
          <div className="empty">
            Industry pathways unlock at {unlockPct}% of Life Design (
            {lifeDesignProgress.unlockCount}/{lifeDesignProgress.total}).
          </div>
        ) : industrySelected.length === 0 ? (
          <div className="empty">
            <Link to="/pathways" className="btn btn-dark btn-block">
              Browse industry pathways
            </Link>
          </div>
        ) : null}
      </div>
    </main>
  )
}
