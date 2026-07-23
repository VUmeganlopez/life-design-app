import type { StudentStory } from './types'

export const seedStories: StudentStory[] = [
  {
    id: 'story-1',
    name: 'Aisha K.',
    classYear: 'Class of 2028',
    major: 'Human & Organizational Development',
    summerActivity: 'Supported a healthcare strategy project as a summer analyst intern',
    organization: 'Deloitte',
    roleType: 'Internship',
    story:
      'The biggest unlock wasn’t frameworks—it was learning to interview stakeholders with curiosity. Trying consulting as an experiment helped me learn what energizes me without locking into a forever identity.',
    photoUrl:
      'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80',
    pathwayId: 'consulting',
    createdAt: '2026-06-12T14:00:00.000Z',
  },
  {
    id: 'story-2',
    name: 'Jordan M.',
    classYear: 'Class of 2028',
    major: 'Computer Science',
    summerActivity: 'Built and shipped a small campus productivity app with two friends',
    organization: 'Independent project',
    roleType: 'Personal project',
    story:
      'Instead of waiting for the perfect internship, we built something students actually used. Having a demo on my phone made every career fair conversation concrete—and later helped me land a product internship.',
    photoUrl:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
    pathwayId: 'engineering-tech',
    createdAt: '2026-05-28T10:30:00.000Z',
  },
  {
    id: 'story-3',
    name: 'Priya S.',
    classYear: 'Class of 2029',
    major: 'Medicine, Health & Society',
    summerActivity: 'Shadowed clinicians and volunteered in a patient support program',
    organization: 'Vanderbilt University Medical Center',
    roleType: 'Shadowing / clinical',
    story:
      'Consistent clinical exposure helped me stop guessing about medicine. Reflecting afterward with HPAO turned a vague interest into a timeline I can actually follow.',
    photoUrl:
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    pathwayId: 'healthcare',
    createdAt: '2026-04-18T16:45:00.000Z',
  },
]

export const roleTypes = [
  'Internship',
  'Research',
  'Volunteer',
  'Part-time job',
  'Shadowing / clinical',
  'Fellowship',
  'Personal project',
  'Other',
] as const
