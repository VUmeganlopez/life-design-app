import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Send } from 'lucide-react'
import { getPathway } from '../data/pathways'
import { gradeResume, resumeCoachProfiles } from '../data/resumeCoach'

type ChatMessage = {
  id: string
  role: 'assistant' | 'user'
  content: string
}

function formatGradeReply(
  pathwayName: string,
  result: ReturnType<typeof gradeResume>,
) {
  const strengths = result.strengths.map((s) => `• ${s}`).join('\n')
  const gaps = result.gaps.map((g) => `• ${g}`).join('\n')
  const focus = result.focusTips.map((t) => `• ${t}`).join('\n')

  return `**Resume grade for ${pathwayName}**

**Score: ${result.score}/100 — ${result.gradeLabel}**

**What’s working**
${strengths || '• Keep building a clearer base of experiences and skills.'}

**Optimize next**
${gaps || '• Minor polish—then get a Career Center human review.'}

**Pathway checklist**
${focus}

This is a prototype coach (mocked ChatGPT). Use it to iterate, then book a Career Center resume review before big applications.`
}

export function ResumeCoachPage() {
  const { pathwayId = 'consulting' } = useParams()
  const pathway = getPathway(pathwayId)
  const profile =
    resumeCoachProfiles[pathwayId] ?? resumeCoachProfiles.consulting
  const pathwayName = pathway?.name ?? profile.title

  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        content: `Hi — I’m **Vandy Resume Coach** (ChatGPT-style prototype) tuned for **${pathwayName}**.

${profile.sampleOpener}

Paste your resume text, or ask a question like “How should I frame campus leadership for this pathway?”`,
      },
    ])
    setInput('')
  }, [pathwayId, pathwayName, profile.sampleOpener])

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  const send = (event?: FormEvent) => {
    event?.preventDefault()
    const text = input.trim()
    if (!text || typing) return

    const userMsg: ChatMessage = {
      id: `u-${crypto.randomUUID()}`,
      role: 'user',
      content: text,
    }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setTyping(true)

    window.setTimeout(() => {
      const looksLikeResume =
        text.length > 180 ||
        /education|experience|gpa|bachelor|project|skills/i.test(text)

      let reply: string
      if (looksLikeResume) {
        reply = formatGradeReply(pathwayName, gradeResume(text, profile))
      } else {
        reply = `For **${pathwayName}**, prioritize:
${profile.focusAreas.map((f) => `• ${f}`).join('\n')}

Useful keywords to earn honestly: ${profile.keywords.slice(0, 6).join(', ')}.

Paste your full resume when you’re ready and I’ll give you a pathway-specific grade and rewrite tips.

*(Mocked ChatGPT prototype — not a live OpenAI connection.)*`
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `a-${crypto.randomUUID()}`,
          role: 'assistant',
          content: reply,
        },
      ])
      setTyping(false)
    }, 900 + Math.random() * 700)
  }

  return (
    <main className="page page--coach">
      <header className="coach-header">
        <Link
          to={pathway ? `/pathways/${pathway.id}` : '/pathways'}
          className="back-link"
          style={{ marginBottom: 0 }}
        >
          <ArrowLeft size={16} /> Back
        </Link>
        <div className="coach-brand">
          <div className="coach-avatar" aria-hidden>
            AI
          </div>
          <div>
            <strong>Vandy Resume Coach</strong>
            <span>ChatGPT-style prototype · {pathwayName}</span>
          </div>
        </div>
      </header>

      <div className="coach-thread">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`coach-bubble coach-bubble--${msg.role}`}
          >
            {msg.content.split('\n').map((line, i) => (
              <p
                key={`${msg.id}-${i}`}
                dangerouslySetInnerHTML={{
                  __html: line
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    .replace(/^$/, '&nbsp;'),
                }}
              />
            ))}
          </div>
        ))}
        {typing ? (
          <div className="coach-bubble coach-bubble--assistant coach-typing">
            <span />
            <span />
            <span />
          </div>
        ) : null}
        <div ref={endRef} />
      </div>

      <form className="coach-composer" onSubmit={send}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste resume text or ask a question…"
          rows={3}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              send()
            }
          }}
        />
        <button
          type="submit"
          className="btn btn-primary coach-send"
          disabled={!input.trim() || typing}
          aria-label="Send"
        >
          <Send size={18} />
        </button>
      </form>
      <p className="coach-disclaimer">
        Prototype mock · Not affiliated with OpenAI · Pair with Career Center review
      </p>
    </main>
  )
}
