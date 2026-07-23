import type { InterviewQuestion } from '../data/interviewQuestions'

const sourceLabel: Record<InterviewQuestion['source'], string> = {
  liked: 'From what you liked',
  disliked: 'From what you didn’t like',
  both: 'General fit check',
  values: 'From your values',
}

type Props = {
  questions: InterviewQuestion[]
  emptyHint?: string
}

export function InterviewQuestionsList({ questions, emptyHint }: Props) {
  if (questions.length === 0) {
    return emptyHint ? <div className="empty">{emptyHint}</div> : null
  }

  return (
    <div className="interview-q-list">
      {questions.map((q) => (
        <article key={q.id} className="interview-q-card">
          <div className="meta-row" style={{ marginBottom: 8 }}>
            <span className="chip">{q.theme}</span>
            <span className="chip-muted chip">{sourceLabel[q.source]}</span>
          </div>
          <p className="interview-q-text">“{q.question}”</p>
          <p className="muted" style={{ margin: 0, fontSize: '0.84rem' }}>
            {q.why}
          </p>
        </article>
      ))}
    </div>
  )
}
