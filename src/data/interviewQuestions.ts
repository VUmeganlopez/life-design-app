import type { ExperienceReflection } from './types'

export type InterviewQuestion = {
  id: string
  question: string
  why: string
  source: 'liked' | 'disliked' | 'both' | 'values'
  theme: string
}

type ThemeRule = {
  id: string
  label: string
  patterns: RegExp[]
  likedQuestion: string
  dislikedQuestion: string
  whyLiked: string
  whyDisliked: string
}

const themeRules: ThemeRule[] = [
  {
    id: 'pace',
    label: 'Pace & intensity',
    patterns: [
      /\b(fast[- ]?paced|slow|pace|intense|busy|urgency|deadline|crunch|calm)\b/i,
    ],
    likedQuestion:
      'How would you describe the day-to-day pace here—and what does a typical busy week look like for this role?',
    dislikedQuestion:
      'When deadlines spike, how does the team protect focus time—or is constant urgency the norm?',
    whyLiked: 'You liked a certain pace; confirm this role matches it.',
    whyDisliked: 'You disliked the pace somewhere; pressure-test whether this culture repeats it.',
  },
  {
    id: 'people',
    label: 'People & culture',
    patterns: [
      /\b(people|team|manager|mentor|colleagues|culture|collaborat|alone|isolation|supportive|toxic)\b/i,
    ],
    likedQuestion:
      'What does collaboration look like on this team, and how do new people get mentorship in the first 90 days?',
    dislikedQuestion:
      'How does the team handle conflict or feedback—and what support exists if someone feels stuck?',
    whyLiked: 'People energized you before; ask how community shows up here.',
    whyDisliked: 'People dynamics drained you; listen for how this workplace actually works.',
  },
  {
    id: 'autonomy',
    label: 'Autonomy & ownership',
    patterns: [
      /\b(autonomy|ownership|independen|micromanag|freedom|agency|trust|directive|control)\b/i,
    ],
    likedQuestion:
      'How much ownership do interns or early-career people get over projects, and how are decisions made?',
    dislikedQuestion:
      'Where do managers set direction versus where do individual contributors choose their approach?',
    whyLiked: 'Ownership mattered to you; check how real it is in this role.',
    whyDisliked: 'Lack of autonomy bothered you; clarify expectations early.',
  },
  {
    id: 'impact',
    label: 'Impact & meaning',
    patterns: [
      /\b(impact|meaning|purpose|mission|help(ing)?|difference|meaningful|busywork|pointless)\b/i,
    ],
    likedQuestion:
      'What outcomes would someone in this role influence in the first six months?',
    dislikedQuestion:
      'Which parts of the work feel most directly connected to the mission—and which are more administrative?',
    whyLiked: 'Impact mattered; ask for concrete examples, not slogans.',
    whyDisliked: 'Low-impact work frustrated you; surface how time is really spent.',
  },
  {
    id: 'learning',
    label: 'Learning & growth',
    patterns: [
      /\b(learn|growth|develop|mentor|training|skills|stagnat|repetitive|challenge)\b/i,
    ],
    likedQuestion:
      'How do people in this role keep learning—formal training, stretch projects, or mentorship?',
    dislikedQuestion:
      'What happens when someone outgrows their first set of tasks—how do responsibilities evolve?',
    whyLiked: 'Growth energized you; confirm a path to keep stretching.',
    whyDisliked: 'Stagnation was a red flag; probe development intentionally.',
  },
  {
    id: 'balance',
    label: 'Hours & lifestyle',
    patterns: [
      /\b(balance|hours|weekend|evening|burnout|flexible|remote|hybrid|travel|commute|overtime)\b/i,
    ],
    likedQuestion:
      'What do working hours and flexibility usually look like for this team across a normal month?',
    dislikedQuestion:
      'How often do people work nights or weekends, and is travel or after-hours work expected?',
    whyLiked: 'Lifestyle fit mattered; get specifics beyond “we value balance.”',
    whyDisliked: 'Hours or travel drained you; ask for honest norms.',
  },
  {
    id: 'worktype',
    label: 'Type of work',
    patterns: [
      /\b(meetings|emails|coding|writing|research|client|analysis|creative|hands[- ]?on|desk|lab|field)\b/i,
    ],
    likedQuestion:
      'If you mapped a typical week, what percentage is meetings versus deep work versus client- or stakeholder-facing time?',
    dislikedQuestion:
      'Which tasks take the most time in this role that candidates are often surprised by?',
    whyLiked: 'Certain task types fit you; verify the real mix.',
    whyDisliked: 'Task mix was a misfit before; dig into the surprise work.',
  },
  {
    id: 'feedback',
    label: 'Feedback & recognition',
    patterns: [
      /\b(feedback|recognition|praise|review|appreciat|invisible|credit)\b/i,
    ],
    likedQuestion:
      'How often do people get feedback here, and what does strong performance look like in the first few months?',
    dislikedQuestion:
      'How is credit shared on team projects, and how are contributions recognized?',
    whyLiked: 'Clear feedback helped you thrive; ask how it’s structured.',
    whyDisliked: 'Feeling unseen hurt; listen for recognition practices.',
  },
  {
    id: 'structure',
    label: 'Structure & clarity',
    patterns: [
      /\b(structure|clarity|ambigu|chaotic|organized|process|expectations|unclear)\b/i,
    ],
    likedQuestion:
      'How clearly are goals and success metrics defined for someone starting in this role?',
    dislikedQuestion:
      'Where is ambiguity highest in the first 90 days—and how do managers help people navigate it?',
    whyLiked: 'Structure helped you; confirm onboarding clarity.',
    whyDisliked: 'Chaos or vagueness was hard; ask how ambiguity is handled.',
  },
  {
    id: 'compensation',
    label: 'Comp & advancement',
    patterns: [
      /\b(pay|salary|compensat|promotion|advancement|raise|benefits|money)\b/i,
    ],
    likedQuestion:
      'How does the organization think about growth and advancement for early-career talent?',
    dislikedQuestion:
      'What does the path from this role to the next level typically look like in timeline and expectations?',
    whyLiked: 'Advancement or fairness mattered; get a concrete picture.',
    whyDisliked: 'Compensation or mobility frustrated you; ask directly and politely.',
  },
]

const fallbackQuestions: InterviewQuestion[] = [
  {
    id: 'fallback-day',
    question:
      'Could you walk me through a realistic day or week in this role—including the less glamorous parts?',
    why: 'A concrete week reveals whether the work matches what you’ve liked (and avoided) before.',
    source: 'both',
    theme: 'Day-to-day fit',
  },
  {
    id: 'fallback-success',
    question:
      'What does success look like at 30, 60, and 90 days for someone in this seat?',
    why: 'Clear success criteria help you compare this opportunity to past experiences.',
    source: 'both',
    theme: 'Expectations',
  },
  {
    id: 'fallback-team',
    question:
      'What kinds of people tend to thrive on this team—and who tends to struggle?',
    why: 'Honest “thrive / struggle” answers surface culture fit faster than marketing language.',
    source: 'both',
    theme: 'Culture fit',
  },
]

function detectThemes(text: string): ThemeRule[] {
  if (!text.trim()) return []
  return themeRules.filter((rule) =>
    rule.patterns.some((pattern) => pattern.test(text)),
  )
}

export function questionsFromReflection(
  reflection: ExperienceReflection,
): InterviewQuestion[] {
  const likedThemes = detectThemes(reflection.liked)
  const dislikedThemes = detectThemes(reflection.disliked)
  const questions: InterviewQuestion[] = []
  const seen = new Set<string>()

  for (const theme of likedThemes) {
    const id = `${reflection.stepId}-liked-${theme.id}`
    if (seen.has(theme.id)) continue
    seen.add(theme.id)
    questions.push({
      id,
      question: theme.likedQuestion,
      why: theme.whyLiked,
      source: 'liked',
      theme: theme.label,
    })
  }

  for (const theme of dislikedThemes) {
    const id = `${reflection.stepId}-disliked-${theme.id}`
    if (seen.has(`dis-${theme.id}`)) continue
    // Prefer disliked framing if theme already covered from liked—still useful alternate
    if (seen.has(theme.id)) {
      questions.push({
        id,
        question: theme.dislikedQuestion,
        why: theme.whyDisliked,
        source: 'disliked',
        theme: theme.label,
      })
    } else {
      seen.add(theme.id)
      questions.push({
        id,
        question: theme.dislikedQuestion,
        why: theme.whyDisliked,
        source: 'disliked',
        theme: theme.label,
      })
    }
  }

  // If they wrote reflections but themes didn’t match keywords, still give tailored generics
  if (
    questions.length === 0 &&
    (reflection.liked.trim() || reflection.disliked.trim())
  ) {
    const label = reflection.experienceName || 'your past experience'
    return [
      {
        id: `${reflection.stepId}-custom-like`,
        question: reflection.liked.trim()
          ? `In my last experience (${label}), I especially valued: “${trimQuote(reflection.liked)}.” How does that show up in this role or team?`
          : fallbackQuestions[0].question,
        why: 'Bring your likes into the room so the interviewer can confirm or redirect.',
        source: 'liked',
        theme: 'Your preferences',
      },
      {
        id: `${reflection.stepId}-custom-dislike`,
        question: reflection.disliked.trim()
          ? `Something that didn’t fit me before was: “${trimQuote(reflection.disliked)}.” How does this team handle that kind of situation?`
          : fallbackQuestions[1].question,
        why: 'Naming a past misfit helps you hear whether this opportunity repeats it.',
        source: 'disliked',
        theme: 'Your preferences',
      },
      fallbackQuestions[2],
    ]
  }

  return questions
}

function trimQuote(text: string, max = 110) {
  const clean = text.trim().replace(/\s+/g, ' ')
  return clean.length > max ? `${clean.slice(0, max - 1)}…` : clean
}

export function questionsFromReflections(
  reflections: ExperienceReflection[],
): InterviewQuestion[] {
  const all = reflections.flatMap(questionsFromReflection)
  const unique: InterviewQuestion[] = []
  const seenQuestions = new Set<string>()

  for (const q of all) {
    const key = q.question.toLowerCase()
    if (seenQuestions.has(key)) continue
    seenQuestions.add(key)
    unique.push(q)
  }

  if (unique.length === 0) return []

  // Cap for a usable interview cheat sheet
  return unique.slice(0, 8)
}

export function questionsFromTopValues(
  valueIds: string[],
): InterviewQuestion[] {
  const map: Record<string, InterviewQuestion> = {
    impact: {
      id: 'val-impact',
      question:
        'Where does this role create the most tangible impact—and how is that impact measured?',
      why: 'Impact is one of your top values.',
      source: 'values',
      theme: 'Impact & purpose',
    },
    learning: {
      id: 'val-learning',
      question:
        'What learning opportunities are built into the first year of this role?',
      why: 'Learning & growth is one of your top values.',
      source: 'values',
      theme: 'Learning & growth',
    },
    balance: {
      id: 'val-balance',
      question:
        'What do sustainable working hours look like on this team in practice?',
      why: 'Lifestyle & balance is one of your top values.',
      source: 'values',
      theme: 'Lifestyle & balance',
    },
    people: {
      id: 'val-people',
      question:
        'How would you describe the interpersonal culture—and how do teammates support each other?',
      why: 'People & collaboration is one of your top values.',
      source: 'values',
      theme: 'People & collaboration',
    },
    autonomy: {
      id: 'val-autonomy',
      question:
        'How much latitude does someone in this role have to shape their work?',
      why: 'Autonomy & ownership is one of your top values.',
      source: 'values',
      theme: 'Autonomy & ownership',
    },
    challenge: {
      id: 'val-challenge',
      question:
        'What are the hardest problems someone in this role is expected to tackle?',
      why: 'Intellectual challenge is one of your top values.',
      source: 'values',
      theme: 'Intellectual challenge',
    },
  }

  return valueIds.map((id) => map[id]).filter(Boolean).slice(0, 3)
}
