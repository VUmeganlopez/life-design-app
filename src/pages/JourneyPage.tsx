import { Link } from 'react-router-dom'
import { Check } from 'lucide-react'
import {
  LIFE_DESIGN_ID,
  getAllSteps,
  groupStepsByCategory,
  isFoundationPathway,
  pathways,
  stepMatchesTrack,
  trackLabels,
} from '../data/pathways'
import { useProgress } from '../hooks/useProgress'

export function JourneyPage() {
  const {
    progress,
    isComplete,
    toggleStep,
    getPathwayTrack,
    canAccessIndustryPathways,
    lifeDesignProgress,
  } = useProgress()
  const steps = getAllSteps().filter((s) => {
    if (!progress.selectedPathways.includes(s.pathwayId)) return false
    if (isFoundationPathway(s.pathwayId)) return true
    return stepMatchesTrack(s, getPathwayTrack(s.pathwayId))
  })
  const completedCount = steps.filter((s) => isComplete(s.id)).length
  const unlockPct = Math.round(lifeDesignProgress.unlockAt * 100)

  const byPathway = pathways
    .filter((p) => progress.selectedPathways.includes(p.id))
    .map((p) => ({
      pathway: p,
      track: getPathwayTrack(p.id),
      steps: steps.filter((s) => s.pathwayId === p.id),
      foundation: isFoundationPathway(p),
    }))

  return (
    <main className="page">
      <p className="eyebrow">Milestone tracker</p>
      <h1 className="display" style={{ fontSize: '1.85rem' }}>
        Your life design journey
      </h1>
      <p className="muted" style={{ marginTop: 8 }}>
        Start with Life Design Foundations. Industry pathways unlock at{' '}
        {unlockPct}% ({lifeDesignProgress.unlockCount}/
        {lifeDesignProgress.total} milestones)
        {canAccessIndustryPathways
          ? ' — unlocked.'
          : ` — you’re at ${lifeDesignProgress.completed}/${lifeDesignProgress.total}.`}{' '}
        {completedCount} completed overall. Checking off steps helps you stay
        intentional—and helps the Career Center support you where you need it
        most.
      </p>

      {byPathway.map(({ pathway, track, steps: pathwaySteps, foundation }) => {
        const grouped = groupStepsByCategory(pathwaySteps)
        return (
          <section key={pathway.id} style={{ marginTop: 24 }}>
            <div className="section-head">
              <h2>{pathway.name}</h2>
              <Link className="linkish" to={`/pathways/${pathway.id}`}>
                Details
              </Link>
            </div>
            <p className="muted" style={{ marginTop: 0, fontSize: '0.85rem' }}>
              {foundation
                ? 'Foundation · available from day one'
                : `Showing: ${trackLabels[track]}`}
            </p>
            {grouped.map((group) => (
              <div key={group.category} style={{ marginTop: 14 }}>
                <p
                  className="eyebrow"
                  style={{ marginBottom: 8, fontSize: '0.72rem' }}
                >
                  {group.label}
                </p>
                <div className="step-list">
                  {group.steps.map((step) => {
                    const done = isComplete(step.id)
                    return (
                      <div
                        key={step.id}
                        className={`step-card${done ? ' done' : ''}`}
                      >
                        <button
                          type="button"
                          className={`check-btn${done ? ' done' : ''}`}
                          aria-label={
                            done ? 'Mark incomplete' : 'Mark complete'
                          }
                          onClick={() => toggleStep(step.id)}
                        >
                          {done ? <Check size={14} strokeWidth={3} /> : null}
                        </button>
                        <Link
                          to={`/pathways/${pathway.id}/steps/${step.id}`}
                          style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                          <div
                            className="meta-row"
                            style={{ marginBottom: 6 }}
                          >
                            <span className="chip">{step.suggestedTiming}</span>
                          </div>
                          <h3>{step.title}</h3>
                          <p>{step.description}</p>
                        </Link>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </section>
        )
      })}

      {!canAccessIndustryPathways ? (
        <div className="empty" style={{ marginTop: 24 }}>
          <Link
            to={`/pathways/${LIFE_DESIGN_ID}`}
            className="btn btn-dark btn-block"
          >
            Continue Life Design to unlock pathways
          </Link>
        </div>
      ) : null}
    </main>
  )
}
