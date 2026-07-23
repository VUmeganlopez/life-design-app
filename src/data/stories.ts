import type { StudentStory } from './types'

export const summerActivityOptions = [
  'Internship or Academic Research',
  'Summer Job',
  'Medical Shadowing',
  'Summer Classes',
  'Volunteering',
  'Travel or Study Abroad',
  'Other',
] as const

export const seedStories: StudentStory[] = [
  {
    id: 'story-1',
    summerActivity: 'Internship or Academic Research',
    organization: 'Deloitte',
    story:
      'The biggest unlock wasn’t frameworks—it was learning to interview stakeholders with curiosity. Trying consulting as an experiment helped me learn what energizes me without locking into a forever identity.',
    photoUrl:
      'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80',
    pathwayId: 'consulting',
    createdAt: '2026-06-12T14:00:00.000Z',
  },
  {
    id: 'story-2',
    summerActivity: 'Internship or Academic Research',
    organization: 'Independent project',
    story:
      'Instead of waiting for the perfect internship, we built something students actually used. Having a demo on my phone made every career fair conversation concrete—and later helped me land a product internship.',
    photoUrl:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
    pathwayId: 'engineering-tech',
    createdAt: '2026-05-28T10:30:00.000Z',
  },
  {
    id: 'story-3',
    summerActivity: 'Medical Shadowing',
    organization: 'Vanderbilt University Medical Center',
    story:
      'Consistent clinical exposure helped me stop guessing about medicine. Reflecting afterward with HPAO turned a vague interest into a timeline I can actually follow.',
    photoUrl:
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    pathwayId: 'healthcare',
    createdAt: '2026-04-18T16:45:00.000Z',
  },
]
