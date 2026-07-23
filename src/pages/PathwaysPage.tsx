import { Link } from 'react-router-dom'
import { Lock } from 'lucide-react'
import {
  isIndustryPathway,
  pathways,
  stepMatchesTrack,
  trackLabels,
} from '../data/pathways'
import { useProgress } from '../hooks/useProgress'

export function PathwaysPage() {
  const {
    progress,
    togglePathway,
    isComplete,
    getPathwayTrack,
    setPathwayTrack,
    canAccessIndustryPathways,
    lifeDesignProgress,
  } = useProgress()

  const unlockPct = Math.round(lifeDesignProgress.unlockAt * 100)

  return (
    <main className="page">
      <p className="eyebrow">Career pathways</p>
      <h1 className="display" style={{ fontSize: '1.85rem' }}>
        Start with Life Design
      </h1>
      <p className="muted" style={{ marginTop: 8 }}>
        First-Year Life Design is available from day one. Industry pathways
        unlock at {unlockPct}% of those milestones (
        {lifeDesignProgress.unlockCount}/{lifeDesignProgress.total}). For each
        industry path, choose <strong>employment</strong> or{' '}
        <strong>continuing education</strong>.
      </p>

      <div
        className={`unlock-banner${canAccessIndustryPathways ? ' unlocked' : ''}`}
        style={{ marginTop: 16 }}
        role="status"
      >
        {canAccessIndustryPathways ? (
          <>
            <p className="eyebrow" style={{ margin: 0 }}>
              Pathways unlocked
            </p>
            <p style={{ margin: '4px 0 0', fontSize: '0.92rem' }}>
              You reached {lifeDesignProgress.unlockCount}/
              {lifeDesignProgress.total} Life Design milestones. Industry
              pathways stay available.
            </p>
          </>
        ) : (
          <>
            <p className="eyebrow" style={{ margin: 0 }}>
              Unlock progress
            </p>
            <p style={{ margin: '4px 0 0', fontSize: '0.92rem' }}>
              {lifeDesignProgress.completed}/{lifeDesignProgress.total} Life
              Design milestones — unlock pathways at {unlockPct}% (
              {lifeDesignProgress.unlockCount}/{lifeDesignProgress.total})
            </p>
          </>
        )}
      </div>

      <div className="pathway-list" style={{ marginTop: 20 }}>
        {pathways.map((pathway) => {
          const isFoundation = pathway.kind === 'foundation'
          const industry = isIndustryPathway(pathway.id)
          const locked = industry && !canAccessIndustryPathways
          const selected = progress.selectedPathways.includes(pathway.id)
          const track = getPathwayTrack(pathway.id)
          const visible = pathway.steps.filter((s) =>
            isFoundation ? true : stepMatchesTrack(s, track),
          )
          const done = visible.filter((s) => isComplete(s.id)).length

          return (
            <article
              key={pathway.id}
              className={`pathway-card${selected ? ' selected' : ''}${locked ? ' locked' : ''}`}
              style={{ ['--accent' as string]: pathway.accent }}
            >
              <div className="toggle-row">
                <p
                  className="eyebrow"
                  style={{ color: pathway.accent, margin: 0 }}
                >
                  {isFoundation
                    ? `Foundation · ${done}/${visible.length}`
                    : locked
                      ? 'Locked'
                      : selected
                        ? `${done}/${visible.length} milestones`
                        : 'Not selected'}
                </p>
                <button
                  type="button"
                  className={`toggle${selected ? ' on' : ''}`}
                  aria-pressed={selected}
                  aria-label={
                    isFoundation
                      ? `${pathway.name} stays selected`
                      : locked
                        ? `${pathway.name} locked until Life Design progress`
                        : `${selected ? 'Remove' : 'Add'} ${pathway.name}`
                  }
                  disabled={isFoundation || locked}
                  onClick={() => {
                    if (isFoundation || locked) return
                    togglePathway(pathway.id)
                  }}
                />
              </div>
              <h2 className="display" style={{ fontSize: '1.25rem', margin: 0 }}>
                {pathway.name}
              </h2>
              <p className="muted" style={{ margin: 0, fontSize: '0.9rem' }}>
                {pathway.description}
              </p>

              {locked ? (
                <p className="lock-hint">
                  <Lock size={14} aria-hidden />
                  Complete {lifeDesignProgress.unlockCount}/
                  {lifeDesignProgress.total} Life Design milestones to unlock
                </p>
              ) : null}

              {selected && !isFoundation && !locked ? (
                <div
                  className="track-switch track-switch--compact"
                  role="group"
                  aria-label={`Destination for ${pathway.name}`}
                >
                  {(
                    Object.keys(trackLabels) as Array<
                      keyof typeof trackLabels
                    >
                  ).map((option) => (
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
              ) : null}

              {locked ? (
                <span
                  className="linkish linkish--disabled"
                  aria-disabled="true"
                >
                  Open pathway →
                </span>
              ) : (
                <Link
                  to={`/pathways/${pathway.id}`}
                  className="linkish"
                  style={{ marginTop: 4 }}
                >
                  Open pathway →
                </Link>
              )}
            </article>
          )
        })}
      </div>
    </main>
  )
}
