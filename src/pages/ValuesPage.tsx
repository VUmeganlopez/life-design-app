import { Link } from 'react-router-dom'
import { InterviewQuestionsList } from '../components/InterviewQuestionsList'
import {
  questionsFromReflections,
  questionsFromTopValues,
} from '../data/interviewQuestions'
import { careerValues, rankLabels } from '../data/values'
import { pathways } from '../data/pathways'
import { useReflections } from '../hooks/useReflections'
import { useValues } from '../hooks/useValues'

export function ValuesPage() {
  const { ranks, setRank, clearRank, topValues } = useValues()
  const { reflections } = useReflections()
  const reflectionList = Object.values(reflections).sort((a, b) =>
    b.updatedAt.localeCompare(a.updatedAt),
  )

  const experienceQuestions = questionsFromReflections(reflectionList)
  const valueQuestions = questionsFromTopValues(topValues.map((v) => v.id))
  const interviewQuestions = [
    ...experienceQuestions,
    ...valueQuestions.filter(
      (vq) =>
        !experienceQuestions.some(
          (eq) => eq.question.toLowerCase() === vq.question.toLowerCase(),
        ),
    ),
  ].slice(0, 10)

  const cycleRank = (valueId: string) => {
    const current = ranks[valueId] ?? 0
    if (current >= 5) clearRank(valueId)
    else setRank(valueId, current + 1)
  }

  return (
    <main className="page">
      <p className="eyebrow">Know yourself</p>
      <h1 className="display" style={{ fontSize: '1.85rem' }}>
        Values & priorities
      </h1>
      <p className="muted" style={{ marginTop: 8 }}>
        Tap each value to rank how much it matters (1 = top priority). Your
        experience likes/dislikes shape interview questions so you can test
        whether a role actually fits.
      </p>

      {topValues.length > 0 ? (
        <div className="insight-box" style={{ marginTop: 18 }}>
          <strong>Your current top priorities</strong>
          <ol className="priority-list">
            {topValues.map((v) => (
              <li key={v.id}>
                <span className="priority-rank">{v.rank}</span>
                {v.label}
              </li>
            ))}
          </ol>
        </div>
      ) : (
        <div className="insight-box" style={{ marginTop: 18 }}>
          <strong>Start ranking</strong>
          <span className="muted" style={{ fontSize: '0.92rem' }}>
            Pick a few values below. You don’t need all twelve—focus on what
            resonates as a first-year.
          </span>
        </div>
      )}

      <div className="section-head" style={{ marginTop: 24 }}>
        <h2>What matters to you?</h2>
      </div>
      <div className="value-list">
        {careerValues.map((value) => {
          const rank = ranks[value.id] ?? 0
          return (
            <button
              key={value.id}
              type="button"
              className={`value-card${rank ? ' ranked' : ''}`}
              onClick={() => cycleRank(value.id)}
            >
              <div className="value-card-top">
                <span className={`rank-badge${rank ? ' on' : ''}`}>
                  {rank || '·'}
                </span>
                <div>
                  <strong>{value.label}</strong>
                  <p>{value.description}</p>
                </div>
              </div>
              <span className="value-hint">{rankLabels[rank]}</span>
            </button>
          )
        })}
      </div>

      <div className="section-head" style={{ marginTop: 28 }}>
        <h2>Questions to ask in interviews</h2>
      </div>
      <p className="muted" style={{ marginTop: 0 }}>
        Generated from what you liked and didn’t like in past experiences—plus
        your top values—so you can get clarity on fit before you say yes.
      </p>
      <InterviewQuestionsList
        questions={interviewQuestions}
        emptyHint="Save a reflection (liked / didn’t like) on an experiential learning step—or rank a few values—to unlock tailored interview questions."
      />

      <div className="section-head" style={{ marginTop: 28 }}>
        <h2>Experience clues</h2>
      </div>
      <p className="muted" style={{ marginTop: 0 }}>
        Likes and dislikes from experiential learning—these feed the interview
        questions above.
      </p>

      {reflectionList.length === 0 ? (
        <div className="empty">
          No reflections yet.{' '}
          <Link to="/journey" className="linkish">
            Complete an experiential learning step
          </Link>{' '}
          to capture what you liked and didn’t.
        </div>
      ) : (
        <div className="reflection-list">
          {reflectionList.map((item) => {
            const pathway = pathways.find((p) => p.id === item.pathwayId)
            return (
              <article key={item.stepId} className="reflection-card">
                <div className="meta-row" style={{ marginBottom: 8 }}>
                  {pathway ? (
                    <span className="chip-muted chip">{pathway.name}</span>
                  ) : null}
                </div>
                <h3>
                  {item.experienceName || 'Experiential learning reflection'}
                </h3>
                {item.liked ? (
                  <p>
                    <strong>Liked:</strong> {item.liked}
                  </p>
                ) : null}
                {item.disliked ? (
                  <p>
                    <strong>Didn’t like:</strong> {item.disliked}
                  </p>
                ) : null}
                <Link
                  className="linkish"
                  to={`/pathways/${item.pathwayId}/steps/${item.stepId}`}
                >
                  Edit reflection →
                </Link>
              </article>
            )
          })}
        </div>
      )}
    </main>
  )
}
