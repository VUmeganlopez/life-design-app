import type {
  ClassYear,
  GoalTrack,
  JourneyStep,
  MilestoneCategory,
  Pathway,
  Resource,
} from './types'

const ALL_YEARS: ClassYear[] = ['First-Year', 'Sophomore', 'Junior', 'Senior']
const BOTH: GoalTrack[] = ['employment', 'continuing-education']

export const categoryLabels: Record<MilestoneCategory, string> = {
  'life-design': 'Life design / self-knowledge',
  academics: 'Academics & credentials',
  materials: 'Application materials',
  interview: 'Interview & assessment prep',
  networking: 'Networking & industry exposure',
  timelines: 'Timelines & milestones',
  completion: 'Job search / Grad school completion',
}

export const categoryOrder: MilestoneCategory[] = [
  'life-design',
  'academics',
  'materials',
  'interview',
  'networking',
  'timelines',
  'completion',
]

function step(partial: JourneyStep): JourneyStep {
  return partial
}

function careerCenter(): Resource {
  return {
    label: 'Career Center advising',
    href: 'https://vanderbilt.edu/career',
    type: 'appointment',
  }
}

/** Shared + track-specific milestones aligned to the employment vs grad-school framework */
function buildPathwaySteps(options: {
  id: string
  name: string
  flavor: string
  academicsEmp: string
  academicsEdu: string
  interviewEmp: string
  interviewEdu: string
  networkEmp: string
  networkEdu: string
}): JourneyStep[] {
  const { id, name } = options

  return [
    // 1. Life design / self-knowledge
    step({
      id: `${id}-ld-values`,
      category: 'life-design',
      title: 'Clarify values, interests, and destination fit',
      description: `Use values work and early ${name} exploration to decide whether you’re leaning employment, continuing education, or still testing both.`,
      suggestedTiming: 'Weeks 1–4 after choosing this pathway',
      classYears: ALL_YEARS,
      tracks: BOTH,
      whyItMatters:
        'Self-knowledge keeps you from optimizing for the wrong finish line—job search vs grad school.',
      resources: [
        { label: 'Your Values & priorities', href: '/values', type: 'tool' },
        careerCenter(),
      ],
    }),
    step({
      id: `${id}-ld-emp`,
      category: 'life-design',
      title: 'Test job vs. grad-school fit for this field',
      description: `Write a short “why employment in ${name} now” note—what you’d learn on the job that school wouldn’t give you yet.`,
      suggestedTiming: 'After 1–2 informational chats',
      classYears: ALL_YEARS,
      tracks: ['employment'],
      whyItMatters:
        'A clear “why work first” story strengthens applications and interviews.',
      resources: [careerCenter()],
    }),
    step({
      id: `${id}-ld-edu`,
      category: 'life-design',
      title: 'Explore program types and why grad school',
      description: `Map program types connected to ${name} (masters, professional school, certificates) and draft your “why further education” rationale.`,
      suggestedTiming: 'As soon as you lean toward more school',
      classYears: ALL_YEARS,
      tracks: ['continuing-education'],
      whyItMatters:
        'Admissions readers look for a purposeful “why this degree now”—not default prestige.',
      resources: [
        {
          label: 'Graduate school advising',
          href: 'https://vanderbilt.edu/career',
          type: 'appointment',
        },
      ],
    }),

    // 2. Academics & credentials
    step({
      id: `${id}-acad-emp`,
      category: 'academics',
      title: 'Map major requirements, skills, and certifications',
      description: options.academicsEmp,
      suggestedTiming: 'Each semester—update as you declare / change plans',
      classYears: ALL_YEARS,
      tracks: ['employment'],
      whyItMatters:
        'Employers skim for credible skills and coursework that match the role.',
      resources: [
        {
          label: 'Academic advising + Career Center',
          href: 'https://vanderbilt.edu/career',
          type: 'appointment',
        },
      ],
    }),
    step({
      id: `${id}-acad-edu`,
      category: 'academics',
      title: 'Track prerequisites and standardized tests',
      description: options.academicsEdu,
      suggestedTiming: '9–24 months before application cycles',
      classYears: ALL_YEARS,
      tracks: ['continuing-education'],
      whyItMatters:
        'Missed prereqs or late exams (MCAT, LSAT, GRE, GMAT, etc.) can cost a full cycle.',
      resources: [
        {
          label: 'Prereq & test planning resources',
          href: 'https://vanderbilt.edu/career',
          type: 'guide',
        },
      ],
    }),

    // 3. Application materials
    step({
      id: `${id}-mat-emp`,
      category: 'materials',
      title: 'Build resume, LinkedIn, portfolio, and cover letters',
      description: `Create employment-ready materials for ${name}. Keep a master resume, LinkedIn, and (if relevant) portfolio samples ready to tailor.`,
      suggestedTiming: 'Before fairs, outreach, and applications',
      classYears: ALL_YEARS,
      tracks: ['employment'],
      whyItMatters:
        'Strong materials turn networking conversations into interviews.',
      resources: [
        {
          label: `Resume Coach · grade for ${name}`,
          href: `/resume-coach/${id}`,
          type: 'tool',
        },
        {
          label: 'Career Center resume review',
          href: 'https://vanderbilt.edu/career',
          type: 'appointment',
        },
      ],
    }),
    step({
      id: `${id}-mat-edu`,
      category: 'materials',
      title: 'Draft CV, personal statement, and writing samples',
      description: `Build continuing-education materials for ${name}: academic CV, personal statement drafts, and writing samples where programs require them.`,
      suggestedTiming: '3–6 months before first deadlines',
      classYears: ['Sophomore', 'Junior', 'Senior'],
      tracks: ['continuing-education'],
      whyItMatters:
        'Grad applications are narrative-heavy—early drafts create room for feedback.',
      resources: [
        {
          label: `Resume/CV Coach · ${name}`,
          href: `/resume-coach/${id}`,
          type: 'tool',
        },
        {
          label: 'Personal statement resources',
          href: 'https://vanderbilt.edu/career',
          type: 'guide',
        },
      ],
    }),

    // 4. Interview & assessment prep
    step({
      id: `${id}-int-emp`,
      category: 'interview',
      title: 'Prepare behavioral, case, and technical interviews',
      description: options.interviewEmp,
      suggestedTiming: '2–6 weeks before interview season',
      classYears: ['Sophomore', 'Junior', 'Senior'],
      tracks: ['employment'],
      whyItMatters:
        'Interview formats differ by industry—reps beat cramming the night before.',
      resources: [
        {
          label: 'Mock interview appointments',
          href: 'https://vanderbilt.edu/career',
          type: 'appointment',
        },
        {
          label: 'Questions to ask (from your values)',
          href: '/values',
          type: 'tool',
        },
      ],
    }),
    step({
      id: `${id}-int-edu`,
      category: 'interview',
      title: 'Prep program interviews, MMIs, and faculty conversations',
      description: options.interviewEdu,
      suggestedTiming: 'Before interview invites and campus visits',
      classYears: ['Junior', 'Senior'],
      tracks: ['continuing-education'],
      whyItMatters:
        'Admissions interviews and MMIs reward reflection and fit—not only credentials.',
      resources: [
        {
          label: 'Interview prep advising',
          href: 'https://vanderbilt.edu/career',
          type: 'appointment',
        },
        { label: 'Your interview question sheet', href: '/values', type: 'tool' },
      ],
    }),

    // 5. Networking & industry exposure
    step({
      id: `${id}-net-emp`,
      category: 'networking',
      title: 'Attend employer events and alumni chats',
      description: options.networkEmp,
      suggestedTiming: 'Ongoing; intensify before recruiting windows',
      classYears: ALL_YEARS,
      tracks: ['employment'],
      whyItMatters:
        'Employer events and alumni turn anonymous applications into conversations.',
      resources: [
        {
          label: 'Career Center events',
          href: 'https://vanderbilt.edu/career',
          type: 'event',
        },
        {
          label: 'Informational interview guide',
          href: 'https://vanderbilt.edu/career',
          type: 'guide',
        },
      ],
    }),
    step({
      id: `${id}-net-edu`,
      category: 'networking',
      title: 'Build research mentors and clinical/research exposure',
      description: options.networkEdu,
      suggestedTiming: 'Start early; deepen before application year',
      classYears: ALL_YEARS,
      tracks: ['continuing-education'],
      whyItMatters:
        'Mentors and sustained exposure power letters, statements, and program fit.',
      resources: [
        {
          label: 'Research & experiential advising',
          href: 'https://vanderbilt.edu/career',
          type: 'appointment',
        },
      ],
    }),
    step({
      id: `${id}-experience`,
      category: 'networking',
      title: 'Complete an experiential learning opportunity',
      description: `Do an internship, trek, research experience, job shadow, Immersion project, or similar experience${options.flavor}. Capture what you liked and didn’t—then use those notes for interview questions.`,
      suggestedTiming: 'First meaningful summer or Immersion window',
      classYears: ALL_YEARS,
      tracks: BOTH,
      hasReflection: true,
      whyItMatters:
        'Experience is data for both job search and grad-school narratives.',
      resources: [
        {
          label: 'Handshake experiential opportunities',
          href: 'https://vanderbilt.joinhandshake.com',
          type: 'tool',
        },
        careerCenter(),
      ],
    }),

    // 6. Timelines & milestones
    step({
      id: `${id}-time-emp`,
      category: 'timelines',
      title: 'Map recruiting cycles and internship windows',
      description: `Build a calendar for ${name} recruiting: fall/spring cycles, internship deadlines, and follow-up cadence.`,
      suggestedTiming: 'Start of each academic year',
      classYears: ALL_YEARS,
      tracks: ['employment'],
      whyItMatters:
        'Employment pipelines are calendar-driven—late means missing a season.',
      resources: [
        {
          label: 'Handshake deadlines & events',
          href: 'https://vanderbilt.joinhandshake.com',
          type: 'tool',
        },
      ],
    }),
    step({
      id: `${id}-time-edu`,
      category: 'timelines',
      title: 'Build a multi-year application timeline',
      description: `Plot application deadlines, test dates, letter requests, and draft milestones for ${name}-related programs across multiple years if needed.`,
      suggestedTiming: 'Junior year planning (earlier for some professional schools)',
      classYears: ['Sophomore', 'Junior', 'Senior'],
      tracks: ['continuing-education'],
      whyItMatters:
        'Grad school is multi-year planning—deadlines compound across exams, letters, and essays.',
      resources: [
        {
          label: 'Application timeline worksheet',
          href: 'https://vanderbilt.edu/career',
          type: 'guide',
        },
      ],
    }),

    // 7. Job search / Grad school completion
    step({
      id: `${id}-comp-emp`,
      category: 'completion',
      title: 'Navigate offers, negotiation, and workplace readiness',
      description: `Compare offers using your values and experience reflections. Prep for onboarding—professional norms, first-90-day goals, and workplace readiness for ${name}.`,
      suggestedTiming: 'Offer season and pre-start',
      classYears: ['Junior', 'Senior'],
      tracks: ['employment'],
      whyItMatters:
        'Saying yes well matters as much as getting the offer—fit and readiness compound.',
      resources: [
        {
          label: 'Offer & negotiation advising',
          href: 'https://vanderbilt.edu/career',
          type: 'appointment',
        },
        { label: 'Values & interview questions', href: '/values', type: 'tool' },
      ],
    }),
    step({
      id: `${id}-comp-edu`,
      category: 'completion',
      title: 'Complete committee letters, research, and program-fit checks',
      description: `Finish remaining application pieces for ${name}: committee letters where required, research summaries, and a final program-fit comparison before you commit.`,
      suggestedTiming: 'Application submission through decision season',
      classYears: ['Junior', 'Senior'],
      tracks: ['continuing-education'],
      whyItMatters:
        'The last mile—letters, research proof, and fit—often decides admits.',
      resources: [
        {
          label: 'HPAO / graduate application support',
          href: 'https://vanderbilt.edu/career',
          type: 'appointment',
        },
      ],
    }),
  ]
}

function buildIndustryPathway(options: {
  id: string
  name: string
  tagline: string
  description: string
  accent: string
  flavor: string
  academicsEmp: string
  academicsEdu: string
  interviewEmp: string
  interviewEdu: string
  networkEmp: string
  networkEdu: string
}): Pathway {
  return {
    id: options.id,
    name: options.name,
    tagline: options.tagline,
    description: options.description,
    accent: options.accent,
    kind: 'industry',
    steps: buildPathwaySteps({
      id: options.id,
      name: options.name,
      flavor: options.flavor,
      academicsEmp: options.academicsEmp,
      academicsEdu: options.academicsEdu,
      interviewEmp: options.interviewEmp,
      interviewEdu: options.interviewEdu,
      networkEmp: options.networkEmp,
      networkEdu: options.networkEdu,
    }),
  }
}

export const LIFE_DESIGN_ID = 'life-design'
export const CAREER_PATHWAY_UNLOCK_RATIO = 0.5

const lifeDesignPathway: Pathway = {
  id: LIFE_DESIGN_ID,
  name: 'First-Year Life Design',
  tagline: 'Know yourself before you specialize',
  description:
    'Foundation milestones for every first-year—values, exploration, and early career habits. Complete about half to unlock industry pathways.',
  accent: '#CFAE70',
  kind: 'foundation',
  steps: [
    {
      id: 'ld-values',
      category: 'life-design',
      title: 'Complete a values & interests check-in',
      description:
        'Clarify what energizes you, what you value, and whether you’re curious about jobs, more school, or both.',
      suggestedTiming: 'Weeks 1–3 of your first semester',
      classYears: ['First-Year', 'Sophomore'],
      whyItMatters:
        'Self-knowledge is the compass for every pathway that comes next.',
      resources: [
        { label: 'Your Values & priorities', href: '/values', type: 'tool' },
        {
          label: 'Book a career advising appointment',
          href: 'https://vanderbilt.edu/career',
          type: 'appointment',
        },
      ],
    },
    {
      id: 'ld-odyssey',
      category: 'life-design',
      title: 'Draft three life design “odyssey” plans',
      description:
        'Sketch three plausible futures—including one wild-card. Compare energy, risk, and whether each path leans employment or continuing education.',
      suggestedTiming: 'By midterms of your first year',
      classYears: ['First-Year', 'Sophomore'],
      whyItMatters:
        'Multiple futures reduce pressure to pick forever and surface transferable skills.',
      resources: [
        {
          label: 'Life Design workshop calendar',
          href: 'https://vanderbilt.edu/career',
          type: 'event',
        },
      ],
    },
    {
      id: 'ld-academics',
      category: 'academics',
      title: 'Review major requirements and skills you want to build',
      description:
        'Meet academic advising and note courses or skills that unlock internships and/or grad-school prerequisites later.',
      suggestedTiming: 'First advising cycle',
      classYears: ['First-Year', 'Sophomore'],
      whyItMatters:
        'Academics are credentials for both employment and continuing education.',
      resources: [
        {
          label: 'Career + academic advising',
          href: 'https://vanderbilt.edu/career',
          type: 'appointment',
        },
      ],
    },
    {
      id: 'ld-resume',
      category: 'materials',
      title: 'Build a first-draft resume',
      description:
        'Create a one-page resume and run it through Resume Coach, then get a Career Center review when you can.',
      suggestedTiming: 'Before your first fair or application',
      classYears: ['First-Year', 'Sophomore', 'Junior'],
      whyItMatters:
        'A reviewed resume is the baseline for Handshake, referrals, and early apps.',
      resources: [
        {
          label: 'Resume Coach · First-Year Life Design',
          href: `/resume-coach/${LIFE_DESIGN_ID}`,
          type: 'tool',
        },
        {
          label: 'Career Center resume review',
          href: 'https://vanderbilt.edu/career',
          type: 'appointment',
        },
      ],
    },
    {
      id: 'ld-informational',
      category: 'networking',
      title: 'Conduct 3 informational interviews',
      description:
        'Talk with alumni, professionals, or graduate students. Ask about day-to-day work and whether they recommend jobs vs more school first.',
      suggestedTiming: 'Within your first two semesters',
      classYears: ['First-Year', 'Sophomore', 'Junior'],
      whyItMatters:
        'Real conversations beat job descriptions—and build your network.',
      resources: [
        {
          label: 'Informational interview guide',
          href: 'https://vanderbilt.edu/career',
          type: 'guide',
        },
      ],
    },
    {
      id: 'ld-experience',
      category: 'networking',
      title: 'Complete an experiential learning opportunity',
      description:
        'Do an internship, trek, research experience, job shadow, Immersion project, or similar. Capture what you liked and didn’t.',
      suggestedTiming: 'First summer or Immersion Vanderbilt window',
      classYears: ['First-Year', 'Sophomore', 'Junior'],
      hasReflection: true,
      whyItMatters:
        'Experience is data for both career and graduate-school decisions.',
      resources: [
        {
          label: 'Handshake experiential opportunities',
          href: 'https://vanderbilt.joinhandshake.com',
          type: 'tool',
        },
      ],
    },
    {
      id: 'ld-fair',
      category: 'timelines',
      title: 'Attend a career fair or employer event',
      description:
        'Practice introducing yourself, collect 2–3 follow-ups, and treat the fair as research on industries and timelines.',
      suggestedTiming: 'Each academic year',
      classYears: ALL_YEARS,
      whyItMatters:
        'Events reveal recruiting calendars and turn curiosity into contacts.',
      resources: [
        {
          label: 'Upcoming Career Center events',
          href: 'https://vanderbilt.edu/career',
          type: 'event',
        },
      ],
    },
    {
      id: 'ld-pathway-pick',
      category: 'completion',
      title: 'Choose an industry pathway to explore next',
      description:
        'Once you’ve built a foundation, select at least one industry pathway and set employment vs continuing education.',
      suggestedTiming: 'After ~50% of Life Design milestones',
      classYears: ['First-Year', 'Sophomore'],
      whyItMatters:
        'Specialization works better after a little self-knowledge and exposure.',
      resources: [
        { label: 'Browse industry pathways', href: '/pathways', type: 'tool' },
      ],
    },
  ],
}

export const careerStats = [
  {
    value: '90.5%',
    label: 'Employed or in graduate school',
    detail: 'Undergraduate Class of 2025 first destinations',
  },
  {
    value: '$85K',
    label: 'Median starting income',
    detail: 'Full-time U.S. employment',
  },
  {
    value: '97%',
    label: 'Knowledge rate',
    detail: 'Share of graduates with a known outcome',
  },
] as const

export const pathways: Pathway[] = [
  lifeDesignPathway,
  buildIndustryPathway({
    id: 'finance-ib',
    name: 'Finance and Investment Banking',
    tagline: 'Markets, deals, and financial analysis',
    description:
      'Prepare for investment banking, markets, asset management, corporate finance, and related roles—or graduate study in business and finance.',
    accent: '#ECB748',
    flavor: ' in banking, markets, corporate finance, or a related role',
    academicsEmp:
      'Align coursework (accounting, finance, economics, Excel/modeling) and note any certifications or skills benchmarks recruiters expect.',
    academicsEdu:
      'Plan MBA/masters prerequisites and tests (e.g. GMAT/GRE) if you’re targeting business graduate programs after experience or directly.',
    interviewEmp:
      'Practice behavioral stories plus technical/markets screens common in IB and finance recruiting.',
    interviewEdu:
      'Prep for graduate program interviews and faculty conversations about your academic and professional goals.',
    networkEmp:
      'Use employer events, alumni, and programs like Vandy 2 Wall Street; complete informational interviews across firms and desks.',
    networkEdu:
      'Connect with research mentors, alumni in grad programs, and faculty who can speak to your analytical preparation.',
  }),
  buildIndustryPathway({
    id: 'consulting',
    name: 'Consulting',
    tagline: 'Problem-solving across industries',
    description:
      'Build case skills, networking habits, and internship readiness for consulting—or plan for graduate programs that deepen strategy and analytics.',
    accent: '#8BA18E',
    flavor: ' in consulting, strategy, or related problem-solving work',
    academicsEmp:
      'Track major requirements and skills benchmarks (analysis, Excel, presentations) that show up in consulting resumes.',
    academicsEdu:
      'Map prerequisites and tests (GMAT/GRE) for MBA or specialized masters if that’s your longer path.',
    interviewEmp:
      'Build a weekly case + behavioral practice habit before recruiting interviews.',
    interviewEdu:
      'Prepare for program interviews and faculty conversations that probe problem-solving and leadership growth.',
    networkEmp:
      'Attend employer events, coffee chats, and alumni outreach across target firms.',
    networkEdu:
      'Seek research or project mentors who can later support graduate applications.',
  }),
  buildIndustryPathway({
    id: 'engineering-tech',
    name: 'Engineering and Technology',
    tagline: 'Build systems, products, and technical craft',
    description:
      'Pursue software, engineering, product, data, and technical roles—or continuing education in engineering, CS, and related graduate programs.',
    accent: '#B3C9CD',
    flavor: ' in engineering, software, product, data, or a research lab',
    academicsEmp:
      'Map major requirements, project portfolio milestones, and technical skills benchmarks employers expect.',
    academicsEdu:
      'Plan graduate prerequisites and tests (GRE where required) for MS/PhD or related programs.',
    interviewEmp:
      'Practice behavioral plus technical screens (coding, systems, product sense) for your target role type.',
    interviewEdu:
      'Prep for faculty conversations and graduate admissions interviews about research interests.',
    networkEmp:
      'Use employer events, hackathons, alumni, and informational interviews across companies and roles.',
    networkEdu:
      'Build research mentors and lab/project exposure that strengthen graduate applications.',
  }),
  buildIndustryPathway({
    id: 'healthcare',
    name: 'Healthcare',
    tagline: 'Clinical care, health systems, and life sciences',
    description:
      'Coordinate clinical exposure, health careers, and biotech interest—alongside employment paths or continuing education (including health professions).',
    accent: '#946E24',
    flavor: ' in clinical care, public health, biotech, or health research',
    academicsEmp:
      'Align major requirements and skills for health industry roles (ops, research, biotech, public health employment).',
    academicsEdu:
      'Track professional-school prerequisites and standardized tests (MCAT and others) with HPAO guidance when relevant.',
    interviewEmp:
      'Practice behavioral interviews for health-sector employment and internship roles.',
    interviewEdu:
      'Prep for program interviews, MMIs, and faculty conversations common in health professions admissions.',
    networkEmp:
      'Attend employer events and alumni chats across hospitals, startups, payers, and health orgs.',
    networkEdu:
      'Build clinical/research exposure and mentors who can support letters and program fit.',
  }),
  buildIndustryPathway({
    id: 'media-entertainment-sports',
    name: 'Media, Entertainment and Sports',
    tagline: 'Storytelling, production, and the business of culture',
    description:
      'Explore media, entertainment, and sports industries—agencies, studios, teams, and startups—or graduate programs in journalism, film, sports management, and more.',
    accent: '#CFAE70',
    flavor: ' in media, entertainment, sports, or creative production',
    academicsEmp:
      'Identify skills benchmarks and portfolio credentials (editing, production, analytics, writing) tied to your target role.',
    academicsEdu:
      'Map prerequisites and materials for journalism, film, sports management, or related graduate programs.',
    interviewEmp:
      'Practice behavioral interviews and portfolio walkthroughs for industry roles.',
    interviewEdu:
      'Prep for program interviews and faculty/creative conversations about your body of work.',
    networkEmp:
      'Use employer events, alumni, treks (e.g. Vandy in Hollywood), and informational interviews.',
    networkEdu:
      'Find creative/research mentors and sustained projects that strengthen graduate applications.',
  }),
  buildIndustryPathway({
    id: 'education-policy-public',
    name: 'Education, Policy and Public Interest',
    tagline: 'Schools, government, nonprofits, and civic impact',
    description:
      'Build experience in education, policy, and public interest—toward employment in mission-driven orgs or continuing education in policy, law, education, and related fields.',
    accent: '#777777',
    flavor:
      ' with a school, nonprofit, government office, campaign, or public-interest organization',
    academicsEmp:
      'Track major requirements and skills for education, policy, nonprofit, and public-sector roles.',
    academicsEdu:
      'Plan prerequisites and tests (LSAT, GRE, etc.) for law, MPP/MPA, teaching credentials, or related programs.',
    interviewEmp:
      'Practice behavioral interviews for mission-driven and public-sector employers.',
    interviewEdu:
      'Prep for program interviews and faculty conversations (including law/policy school formats).',
    networkEmp:
      'Attend employer events, alumni chats, and informational interviews across orgs and agencies.',
    networkEdu:
      'Build research mentors, policy exposure, and sustained service that support applications and letters.',
  }),
  buildIndustryPathway({
    id: 'arts-culture-design',
    name: 'Arts, Culture and Design',
    tagline: 'Creative practice, cultural institutions, and design careers',
    description:
      'Develop a portfolio and professional path across arts, culture, museums, and design—or prepare for MFA and other continuing education routes.',
    accent: '#8BA18E',
    flavor: ' in arts, cultural institutions, studios, or design practice',
    academicsEmp:
      'Define skills benchmarks and portfolio milestones for studio, design, museum, or creative-industry roles.',
    academicsEdu:
      'Map MFA and related program prerequisites, portfolio requirements, and any tests.',
    interviewEmp:
      'Practice interviews and portfolio reviews for creative and cultural employers.',
    interviewEdu:
      'Prep for program interviews and faculty conversations about your creative trajectory.',
    networkEmp:
      'Use employer events, alumni, gallery/studio visits, and informational interviews.',
    networkEdu:
      'Cultivate mentors and exhibition/research experiences that strengthen graduate applications.',
  }),
]

export function getPathway(id: string) {
  return pathways.find((p) => p.id === id)
}

export function getStep(pathwayId: string, stepId: string) {
  const pathway = getPathway(pathwayId)
  return pathway?.steps.find((s) => s.id === stepId)
}

export function getAllSteps() {
  return pathways.flatMap((p) =>
    p.steps.map((step) => ({ ...step, pathwayId: p.id, pathwayName: p.name })),
  )
}

export function stepMatchesTrack(
  step: JourneyStep,
  track: GoalTrack,
): boolean {
  if (!step.tracks || step.tracks.length === 0) return true
  return step.tracks.includes(track)
}

export const trackLabels: Record<GoalTrack, string> = {
  employment: 'Seeking employment',
  'continuing-education': 'Seeking continuing education',
}

export function groupStepsByCategory(steps: JourneyStep[]) {
  return categoryOrder
    .map((category) => ({
      category,
      label: categoryLabels[category],
      steps: steps.filter((s) => s.category === category),
    }))
    .filter((group) => group.steps.length > 0)
}

export function isIndustryPathway(pathwayOrId: string | Pathway) {
  const pathway =
    typeof pathwayOrId === 'string' ? getPathway(pathwayOrId) : pathwayOrId
  return pathway?.kind === 'industry'
}

export function isFoundationPathway(pathwayOrId: string | Pathway) {
  const pathway =
    typeof pathwayOrId === 'string' ? getPathway(pathwayOrId) : pathwayOrId
  return pathway?.kind === 'foundation'
}

export function getLifeDesignPathway() {
  return lifeDesignPathway
}

export function getLifeDesignProgress(
  completedSteps: Record<string, string>,
) {
  const foundation = getLifeDesignPathway()
  const total = foundation?.steps.length ?? 0
  const completed =
    foundation?.steps.filter((s) => completedSteps[s.id]).length ?? 0
  const ratio = total === 0 ? 0 : completed / total
  return {
    completed,
    total,
    ratio,
    unlockAt: CAREER_PATHWAY_UNLOCK_RATIO,
    unlockCount: Math.ceil(total * CAREER_PATHWAY_UNLOCK_RATIO),
  }
}

export function meetsCareerPathwayUnlock(
  completedSteps: Record<string, string>,
) {
  return getLifeDesignProgress(completedSteps).ratio >= CAREER_PATHWAY_UNLOCK_RATIO
}
