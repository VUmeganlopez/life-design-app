export type ClassYear = 'First-Year' | 'Sophomore' | 'Junior' | 'Senior'

/** Destination focus within a pathway */
export type GoalTrack = 'employment' | 'continuing-education'

export type MilestoneCategory =
  | 'life-design'
  | 'academics'
  | 'materials'
  | 'interview'
  | 'networking'
  | 'timelines'
  | 'completion'

export type Resource = {
  label: string
  href: string
  type: 'guide' | 'tool' | 'appointment' | 'event' | 'article'
}

export type JourneyStep = {
  id: string
  title: string
  description: string
  suggestedTiming: string
  classYears: ClassYear[]
  resources: Resource[]
  whyItMatters: string
  category: MilestoneCategory
  /** When true, step detail shows liked / disliked reflection notes */
  hasReflection?: boolean
  /**
   * Which destination track(s) this step belongs to.
   * Omit or use both tracks for shared milestones.
   */
  tracks?: GoalTrack[]
}

export type Pathway = {
  id: string
  name: string
  tagline: string
  description: string
  accent: string
  steps: JourneyStep[]
  /** Foundation pathways are available immediately; industry pathways unlock later */
  kind?: 'foundation' | 'industry'
}

export type StudentStory = {
  id: string
  summerActivity: string
  organization: string
  story: string
  photoUrl: string
  pathwayId?: string
  createdAt: string
}

export type ExperienceReflection = {
  stepId: string
  pathwayId: string
  experienceName: string
  liked: string
  disliked: string
  updatedAt: string
}

export type ValuePriority = {
  id: string
  label: string
  description: string
}

/** 0 = not ranked, 1–5 where 1 is most important */
export type ValueRanks = Record<string, number>

export type ProgressState = {
  completedSteps: Record<string, string> // stepId -> ISO date
  selectedPathways: string[]
  /** Per-pathway destination: employment vs continuing education */
  pathwayTracks: Record<string, GoalTrack>
  introSeen: boolean
  /**
   * Once true, industry pathways stay unlocked even if Life Design
   * completion dips below 50% (better UX than re-locking).
   */
  careerPathwaysUnlocked?: boolean
}
