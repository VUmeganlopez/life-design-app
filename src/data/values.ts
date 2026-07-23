import type { ValuePriority } from './types'

export const careerValues: ValuePriority[] = [
  {
    id: 'impact',
    label: 'Impact & purpose',
    description: 'Work that helps people, communities, or a mission you believe in.',
  },
  {
    id: 'learning',
    label: 'Learning & growth',
    description: 'Roles where you stretch skills and keep getting better.',
  },
  {
    id: 'challenge',
    label: 'Intellectual challenge',
    description: 'Hard problems, analysis, and work that keeps your mind engaged.',
  },
  {
    id: 'people',
    label: 'People & collaboration',
    description: 'Teams, mentoring, client work, or relationships that energize you.',
  },
  {
    id: 'autonomy',
    label: 'Autonomy & ownership',
    description: 'Freedom to decide how you work and own meaningful projects.',
  },
  {
    id: 'balance',
    label: 'Lifestyle & balance',
    description: 'Predictable hours, energy left for life outside work, or flexible schedules.',
  },
  {
    id: 'compensation',
    label: 'Compensation & security',
    description: 'Pay, benefits, and financial stability that match your goals.',
  },
  {
    id: 'creativity',
    label: 'Creativity & expression',
    description: 'Building, designing, writing, or inventing something original.',
  },
  {
    id: 'prestige',
    label: 'Recognition & prestige',
    description: 'Visible achievement, brand-name employers, or competitive fields.',
  },
  {
    id: 'stability',
    label: 'Stability & structure',
    description: 'Clear expectations, reliable paths, and less day-to-day uncertainty.',
  },
  {
    id: 'leadership',
    label: 'Leadership & influence',
    description: 'Guiding people, shaping decisions, or building something bigger than yourself.',
  },
  {
    id: 'location',
    label: 'Place & mobility',
    description: 'Where you live, travel expectations, or staying near community that matters.',
  },
]

export const rankLabels = [
  'Tap to rank',
  'Top priority',
  'Very important',
  'Important',
  'Somewhat important',
  'Nice to have',
] as const
