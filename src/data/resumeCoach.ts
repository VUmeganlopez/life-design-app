export type ResumeCoachProfile = {
  pathwayId: string
  title: string
  focusAreas: string[]
  keywords: string[]
  sampleOpener: string
}

export const resumeCoachProfiles: Record<string, ResumeCoachProfile> = {
  'life-design': {
    pathwayId: 'life-design',
    title: 'First-Year Life Design',
    focusAreas: [
      'Clear education + activities section',
      'Quantified impact where possible',
      'Transferable skills (leadership, communication, analysis)',
      'One page, scannable bullets',
    ],
    keywords: [
      'leadership',
      'collaboration',
      'research',
      'project',
      'volunteer',
      'analysis',
    ],
    sampleOpener:
      'Paste your resume below and I’ll grade it for a strong first-year / exploratory Commodore resume—clarity, impact, and readiness for early opportunities.',
  },
  'finance-ib': {
    pathwayId: 'finance-ib',
    title: 'Finance and Investment Banking',
    focusAreas: [
      'Quantified results and analytical rigor',
      'Relevant coursework / technical skills',
      'Deal, markets, or business exposure',
      'Crisp, banker-style bullets',
    ],
    keywords: [
      'financial',
      'excel',
      'valuation',
      'analysis',
      'modeling',
      'markets',
      'revenue',
    ],
    sampleOpener:
      'Paste your resume and I’ll grade it for finance & investment banking—quant skills, polish, and markets/business signal.',
  },
  consulting: {
    pathwayId: 'consulting',
    title: 'Consulting',
    focusAreas: [
      'Leadership + analytical problem-solving',
      'Quantified outcomes (%, $, time saved)',
      'Structured bullet storytelling',
      'Case-relevant teamwork and client-facing clues',
    ],
    keywords: [
      'analysis',
      'strategy',
      'led',
      'improved',
      'stakeholder',
      'presentation',
      'excel',
    ],
    sampleOpener:
      'Paste your resume and I’ll grade it for consulting recruiting—impact bullets, leadership signal, and analyst-ready keywords.',
  },
  'engineering-tech': {
    pathwayId: 'engineering-tech',
    title: 'Engineering and Technology',
    focusAreas: [
      'Projects with tech stack + outcomes',
      'GitHub / portfolio links if relevant',
      'Impact metrics on shipped or built work',
      'Role clarity (engineering, SWE, product, data)',
    ],
    keywords: [
      'built',
      'python',
      'javascript',
      'react',
      'sql',
      'api',
      'engineering',
      'deployed',
    ],
    sampleOpener:
      'Paste your resume and I’ll grade it for engineering & technology—projects, stack, and technical impact.',
  },
  healthcare: {
    pathwayId: 'healthcare',
    title: 'Healthcare',
    focusAreas: [
      'Clinical / research hours and settings',
      'Patient-facing or lab contributions',
      'Scientific communication',
      'Consistent timeline of commitment',
    ],
    keywords: [
      'clinical',
      'research',
      'patient',
      'lab',
      'shadow',
      'volunteer',
      'health',
    ],
    sampleOpener:
      'Paste your resume and I’ll grade it for healthcare—clinical/research clarity and sustained commitment.',
  },
  'media-entertainment-sports': {
    pathwayId: 'media-entertainment-sports',
    title: 'Media, Entertainment and Sports',
    focusAreas: [
      'Creative or production credits with outcomes',
      'Portfolio / reel / clips when relevant',
      'Business, ops, or storytelling impact',
      'Evidence of hustle and real-world projects',
    ],
    keywords: [
      'produced',
      'media',
      'content',
      'sports',
      'entertainment',
      'campaign',
      'audience',
      'editing',
    ],
    sampleOpener:
      'Paste your resume and I’ll grade it for media, entertainment & sports—credits, projects, and industry signal.',
  },
  'education-policy-public': {
    pathwayId: 'education-policy-public',
    title: 'Education, Policy and Public Interest',
    focusAreas: [
      'Mission + community outcomes',
      'Sustained service, teaching, or advocacy',
      'Policy, research, or organizing impact',
      'Clear story of why this work matters',
    ],
    keywords: [
      'education',
      'policy',
      'community',
      'nonprofit',
      'advocacy',
      'teaching',
      'public',
    ],
    sampleOpener:
      'Paste your resume and I’ll grade it for education, policy & public interest—mission clarity and outcomes.',
  },
  'arts-culture-design': {
    pathwayId: 'arts-culture-design',
    title: 'Arts, Culture and Design',
    focusAreas: [
      'Portfolio-ready project descriptions',
      'Exhibitions, shows, publications, or shipped design',
      'Process + craft + collaboration',
      'Clear creative role on team projects',
    ],
    keywords: [
      'design',
      'art',
      'exhibit',
      'portfolio',
      'creative',
      'curated',
      'prototype',
      'studio',
    ],
    sampleOpener:
      'Paste your resume and I’ll grade it for arts, culture & design—portfolio signal, craft, and collaboration.',
  },
}

export function gradeResume(resumeText: string, profile: ResumeCoachProfile) {
  const text = resumeText.toLowerCase()
  const words = resumeText.trim().split(/\s+/).filter(Boolean).length
  const bullets = (resumeText.match(/^[•\-\*]/gm) || []).length
  const numbers = (resumeText.match(/\d+%|\$\d+|\d+\+/g) || []).length
  const keywordHits = profile.keywords.filter((k) => text.includes(k.toLowerCase()))

  let score = 52
  if (words >= 120) score += 8
  if (words >= 220) score += 6
  if (words > 550) score -= 8
  if (bullets >= 4) score += 8
  if (numbers >= 2) score += 10
  else if (numbers === 1) score += 4
  score += Math.min(18, keywordHits.length * 3)
  if (/education|vanderbilt|gpa/i.test(resumeText)) score += 4
  if (/experience|internship|project|research/i.test(resumeText)) score += 4
  score = Math.max(38, Math.min(96, score))

  const strengths: string[] = []
  const gaps: string[] = []

  if (numbers >= 2) {
    strengths.push('You’re using numbers—readers skim for quantified impact.')
  } else {
    gaps.push(
      'Add 2–3 metrics (%, $, users, hours, rankings) so impact is obvious in a 6-second skim.',
    )
  }

  if (keywordHits.length >= 3) {
    strengths.push(
      `Pathway keywords showing up: ${keywordHits.slice(0, 4).join(', ')}.`,
    )
  } else {
    gaps.push(
      `Weave in more ${profile.title}-relevant language naturally (e.g. ${profile.keywords
        .slice(0, 3)
        .join(', ')}).`,
    )
  }

  if (bullets >= 4) {
    strengths.push('Bullet structure looks scannable.')
  } else {
    gaps.push(
      'Use strong action-verb bullets (Led / Built / Analyzed / Designed) instead of dense paragraphs.',
    )
  }

  if (words > 500) {
    gaps.push('Likely too long for undergrad recruiting—aim for one page with tighter bullets.')
  } else if (words < 100) {
    gaps.push('There’s not enough content yet—add education, 2–3 experiences/projects, and skills.')
  } else {
    strengths.push('Length is in a workable range for a one-page undergrad resume.')
  }

  const focusTips = profile.focusAreas
    .slice(0, 3)
    .map((area, i) => `${i + 1}. ${area}`)

  const gradeLabel =
    score >= 85 ? 'Strong' : score >= 72 ? 'Solid — tighten it' : score >= 60 ? 'Developing' : 'Needs work'

  return {
    score,
    gradeLabel,
    strengths,
    gaps,
    keywordHits,
    focusTips,
  }
}
