import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  LIFE_DESIGN_ID,
  getLifeDesignProgress,
  isIndustryPathway,
  meetsCareerPathwayUnlock,
} from '../data/pathways'
import type { GoalTrack, ProgressState } from '../data/types'

const STORAGE_KEY = 'vandy-life-design-progress-v5'

const defaultState: ProgressState = {
  completedSteps: {},
  selectedPathways: [LIFE_DESIGN_ID],
  pathwayTracks: {},
  introSeen: false,
  careerPathwaysUnlocked: false,
}

function ensureLifeDesignSelected(selected: string[]) {
  if (selected.includes(LIFE_DESIGN_ID)) return selected
  return [LIFE_DESIGN_ID, ...selected]
}

function withUnlockFlag(state: ProgressState): ProgressState {
  const selectedPathways = ensureLifeDesignSelected(state.selectedPathways)
  const alreadyUnlocked = Boolean(state.careerPathwaysUnlocked)
  const careerPathwaysUnlocked =
    alreadyUnlocked || meetsCareerPathwayUnlock(state.completedSteps)
  return { ...state, selectedPathways, careerPathwaysUnlocked }
}

function load(): ProgressState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultState
    return withUnlockFlag({ ...defaultState, ...JSON.parse(raw) })
  } catch {
    return defaultState
  }
}

function save(state: ProgressState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

type ProgressContextValue = {
  progress: ProgressState
  markIntroSeen: () => void
  clearIntroSeen: () => void
  toggleStep: (stepId: string) => void
  isComplete: (stepId: string) => boolean
  togglePathway: (pathwayId: string) => void
  getPathwayTrack: (pathwayId: string) => GoalTrack
  setPathwayTrack: (pathwayId: string, track: GoalTrack) => void
  completedCount: number
  /** Industry pathways stay unlocked once the 50% Life Design threshold is met */
  careerPathwaysUnlocked: boolean
  lifeDesignProgress: {
    completed: number
    total: number
    ratio: number
    unlockAt: number
    unlockCount: number
  }
  canAccessIndustryPathways: boolean
}

const ProgressContext = createContext<ProgressContextValue | null>(null)

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<ProgressState>(() => load())

  const update = useCallback((recipe: (p: ProgressState) => ProgressState) => {
    setProgress((p) => {
      const next = withUnlockFlag(recipe(p))
      save(next)
      return next
    })
  }, [])

  const markIntroSeen = useCallback(() => {
    update((p) => ({ ...p, introSeen: true }))
  }, [update])

  const clearIntroSeen = useCallback(() => {
    update((p) => ({ ...p, introSeen: false }))
  }, [update])

  const toggleStep = useCallback(
    (stepId: string) => {
      update((p) => {
        const next = { ...p.completedSteps }
        if (next[stepId]) delete next[stepId]
        else next[stepId] = new Date().toISOString()
        return { ...p, completedSteps: next }
      })
    },
    [update],
  )

  const isComplete = useCallback(
    (stepId: string) => Boolean(progress.completedSteps[stepId]),
    [progress.completedSteps],
  )

  const togglePathway = useCallback(
    (pathwayId: string) => {
      update((p) => {
        if (pathwayId === LIFE_DESIGN_ID) return p

        const unlocked =
          Boolean(p.careerPathwaysUnlocked) ||
          meetsCareerPathwayUnlock(p.completedSteps)
        const selected = new Set(ensureLifeDesignSelected(p.selectedPathways))
        const tracks = { ...p.pathwayTracks }

        if (selected.has(pathwayId)) {
          selected.delete(pathwayId)
          delete tracks[pathwayId]
        } else {
          if (isIndustryPathway(pathwayId) && !unlocked) return p
          selected.add(pathwayId)
          if (!tracks[pathwayId]) tracks[pathwayId] = 'employment'
        }

        return {
          ...p,
          selectedPathways: Array.from(selected),
          pathwayTracks: tracks,
          careerPathwaysUnlocked: unlocked,
        }
      })
    },
    [update],
  )

  const getPathwayTrack = useCallback(
    (pathwayId: string): GoalTrack =>
      progress.pathwayTracks[pathwayId] ?? 'employment',
    [progress.pathwayTracks],
  )

  const setPathwayTrack = useCallback(
    (pathwayId: string, track: GoalTrack) => {
      update((p) => ({
        ...p,
        pathwayTracks: { ...p.pathwayTracks, [pathwayId]: track },
      }))
    },
    [update],
  )

  const lifeDesignProgress = useMemo(
    () => getLifeDesignProgress(progress.completedSteps),
    [progress.completedSteps],
  )

  const careerPathwaysUnlocked = Boolean(progress.careerPathwaysUnlocked)

  const value = useMemo(
    () => ({
      progress,
      markIntroSeen,
      clearIntroSeen,
      toggleStep,
      isComplete,
      togglePathway,
      getPathwayTrack,
      setPathwayTrack,
      completedCount: Object.keys(progress.completedSteps).length,
      careerPathwaysUnlocked,
      lifeDesignProgress,
      canAccessIndustryPathways: careerPathwaysUnlocked,
    }),
    [
      progress,
      markIntroSeen,
      clearIntroSeen,
      toggleStep,
      isComplete,
      togglePathway,
      getPathwayTrack,
      setPathwayTrack,
      careerPathwaysUnlocked,
      lifeDesignProgress,
    ],
  )

  return (
    <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
  )
}

export function useProgress() {
  const ctx = useContext(ProgressContext)
  if (!ctx) throw new Error('useProgress must be used within ProgressProvider')
  return ctx
}
