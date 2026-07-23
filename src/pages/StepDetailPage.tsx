import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight, Check, Clock } from 'lucide-react'
import { InterviewQuestionsList } from '../components/InterviewQuestionsList'
import { questionsFromReflection } from '../data/interviewQuestions'
import {
  categoryLabels,
  getPathway,
  getStep,
  isIndustryPathway,
} from '../data/pathways'
import { useProgress } from '../hooks/useProgress'
import { useReflections } from '../hooks/useReflections'

const resourceLabels: Record<string, string> = {
  guide: 'Guide',
  tool: 'Tool',
  appointment: 'Appointment',
  event: 'Event',
  article: 'Article',
}

export function StepDetailPage() {
  const { pathwayId = '', stepId = '' } = useParams()
  const pathway = getPathway(pathwayId)
  const step = getStep(pathwayId, stepId)
  const { isComplete, toggleStep, careerPathwaysUnlocked, lifeDesignProgress } =
    useProgress()
  const { getReflection, saveReflection } = useReflections()
  const existing = step ? getReflection(step.id) : undefined

  const [experienceName, setExperienceName] = useState(
    existing?.experienceName ?? '',
  )
  const [liked, setLiked] = useState(existing?.liked ?? '')
  const [disliked, setDisliked] = useState(existing?.disliked ?? '')
  const [savedMsg, setSavedMsg] = useState(false)

  useEffect(() => {
    const reflection = step ? getReflection(step.id) : undefined
    setExperienceName(reflection?.experienceName ?? '')
    setLiked(reflection?.liked ?? '')
    setDisliked(reflection?.disliked ?? '')
  }, [step, getReflection])

  const liveReflection = useMemo(
    () => ({
      stepId: step?.id ?? stepId,
      pathwayId: pathway?.id ?? pathwayId,
      experienceName: experienceName.trim(),
      liked: liked.trim(),
      disliked: disliked.trim(),
      updatedAt: existing?.updatedAt ?? new Date().toISOString(),
    }),
    [
      step?.id,
      stepId,
      pathway?.id,
      pathwayId,
      experienceName,
      liked,
      disliked,
      existing?.updatedAt,
    ],
  )

  const interviewQuestions = useMemo(() => {
    if (!liked.trim() && !disliked.trim()) return []
    return questionsFromReflection(liveReflection).slice(0, 5)
  }, [liked, disliked, liveReflection])

  if (!pathway || !step) {
    return (
      <main className="page">
        <p>Step not found.</p>
        <Link to="/journey">Back to journey</Link>
      </main>
    )
  }

  if (isIndustryPathway(pathway.id) && !careerPathwaysUnlocked) {
    return (
      <main className="page">
        <Link to="/pathways" className="back-link">
          <ArrowLeft size={16} /> Pathways
        </Link>
        <p className="eyebrow">Locked</p>
        <h1 className="display" style={{ fontSize: '1.6rem' }}>
          Finish Life Design first
        </h1>
        <p className="muted">
          Industry pathway steps unlock at {lifeDesignProgress.unlockCount}/
          {lifeDesignProgress.total} Life Design milestones. You’re at{' '}
          {lifeDesignProgress.completed}/{lifeDesignProgress.total}.
        </p>
        <Link
          to="/pathways/life-design"
          className="btn btn-dark"
          style={{ marginTop: 16, display: 'inline-flex' }}
        >
          Continue Life Design
        </Link>
      </main>
    )
  }

  const done = isComplete(step.id)

  const onSaveReflection = () => {
    saveReflection({
      stepId: step.id,
      pathwayId: pathway.id,
      experienceName: experienceName.trim(),
      liked: liked.trim(),
      disliked: disliked.trim(),
    })
    if (!done && (liked.trim() || disliked.trim() || experienceName.trim())) {
      toggleStep(step.id)
    }
    setSavedMsg(true)
    window.setTimeout(() => setSavedMsg(false), 1600)
  }

  return (
    <main className="page">
      <Link to={`/pathways/${pathway.id}`} className="back-link">
        <ArrowLeft size={16} /> {pathway.name}
      </Link>

      <div className="meta-row" style={{ marginBottom: 10 }}>
        <span className="chip">{categoryLabels[step.category]}</span>
        <span className="chip">
          <Clock size={12} /> {step.suggestedTiming}
        </span>
        {step.classYears.map((year) => (
          <span key={year} className="chip-muted chip">
            {year}
          </span>
        ))}
      </div>

      <h1 className="display" style={{ fontSize: '1.75rem' }}>
        {step.title}
      </h1>
      <p className="muted" style={{ marginTop: 10 }}>
        {step.description}
      </p>

      <div className="insight-box">
        <strong>Why it matters</strong>
        <span className="muted" style={{ fontSize: '0.92rem' }}>
          {step.whyItMatters}
        </span>
      </div>

      <button
        type="button"
        className={`btn btn-block ${done ? 'btn-ghost' : 'btn-dark'}`}
        style={
          done
            ? {
                background: 'rgba(207,174,112,0.2)',
                color: 'var(--vu-black)',
                border: '1px solid var(--vu-gold)',
              }
            : undefined
        }
        onClick={() => toggleStep(step.id)}
      >
        <Check size={18} />
        {done ? 'Completed — tap to undo' : 'Mark milestone complete'}
      </button>

      {step.hasReflection ? (
        <section style={{ marginTop: 28 }}>
          <div className="section-head">
            <h2>Reflect on the experience</h2>
          </div>
          <p className="muted" style={{ marginTop: 0, marginBottom: 14 }}>
            Capture what fit and what didn’t. We’ll turn those notes into
            interview questions you can ask to test whether a future opportunity
            matches your preferences.
          </p>
          <div className="form">
            <div className="field">
              <label htmlFor="experienceName">What experience was this?</label>
              <input
                id="experienceName"
                value={experienceName}
                onChange={(e) => setExperienceName(e.target.value)}
                placeholder="e.g. Marketing internship, NYC trek, lab research"
              />
            </div>
            <div className="field">
              <label htmlFor="liked">What did you like?</label>
              <textarea
                id="liked"
                value={liked}
                onChange={(e) => setLiked(e.target.value)}
                placeholder="Pace, people, tasks, environment, impact…"
              />
            </div>
            <div className="field">
              <label htmlFor="disliked">What didn’t you like?</label>
              <textarea
                id="disliked"
                value={disliked}
                onChange={(e) => setDisliked(e.target.value)}
                placeholder="Be honest—misfits are useful data"
              />
            </div>
            <button
              type="button"
              className="btn btn-primary btn-block"
              onClick={onSaveReflection}
            >
              Save reflection
            </button>
            {savedMsg ? (
              <p className="muted" style={{ textAlign: 'center', margin: 0 }}>
                Reflection saved.
              </p>
            ) : null}
          </div>

          {interviewQuestions.length > 0 ? (
            <div style={{ marginTop: 22 }}>
              <div className="section-head">
                <h2>Ask this in interviews</h2>
              </div>
              <p className="muted" style={{ marginTop: 0, marginBottom: 12 }}>
                Based on what you liked and didn’t like—use these to get clarity
                on fit.
              </p>
              <InterviewQuestionsList questions={interviewQuestions} />
              <Link
                to="/values"
                className="linkish"
                style={{ display: 'inline-block', marginTop: 12 }}
              >
                See full values + interview cheat sheet →
              </Link>
            </div>
          ) : (
            <Link
              to="/values"
              className="linkish"
              style={{ display: 'inline-block', marginTop: 14 }}
            >
              Review your values & priorities →
            </Link>
          )}
        </section>
      ) : null}

      <div className="section-head" style={{ marginTop: 28 }}>
        <h2>Resources</h2>
      </div>
      <ul className="resource-list">
        {step.resources.map((resource) => {
          const internal = resource.href.startsWith('/')
          const body = (
            <>
              <span>
                <span className="chip" style={{ marginBottom: 6 }}>
                  {resourceLabels[resource.type]}
                </span>
                <br />
                {resource.label}
              </span>
              <ArrowUpRight size={18} />
            </>
          )
          return (
            <li key={resource.label} className="resource-item">
              {internal ? (
                <Link to={resource.href}>{body}</Link>
              ) : (
                <a href={resource.href} target="_blank" rel="noreferrer">
                  {body}
                </a>
              )}
            </li>
          )
        })}
      </ul>
    </main>
  )
}
