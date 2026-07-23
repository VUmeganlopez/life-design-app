import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { ExperienceReflection } from '../data/types'

const STORAGE_KEY = 'vandy-life-design-reflections-v1'

function load(): Record<string, ExperienceReflection> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    return JSON.parse(raw) as Record<string, ExperienceReflection>
  } catch {
    return {}
  }
}

type ReflectionsContextValue = {
  reflections: Record<string, ExperienceReflection>
  getReflection: (stepId: string) => ExperienceReflection | undefined
  saveReflection: (
    input: Omit<ExperienceReflection, 'updatedAt'>,
  ) => void
}

const ReflectionsContext = createContext<ReflectionsContextValue | null>(null)

export function ReflectionsProvider({ children }: { children: ReactNode }) {
  const [reflections, setReflections] = useState<
    Record<string, ExperienceReflection>
  >(() => load())

  const getReflection = useCallback(
    (stepId: string) => reflections[stepId],
    [reflections],
  )

  const saveReflection = useCallback(
    (input: Omit<ExperienceReflection, 'updatedAt'>) => {
      setReflections((prev) => {
        const next = {
          ...prev,
          [input.stepId]: {
            ...input,
            updatedAt: new Date().toISOString(),
          },
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
        return next
      })
    },
    [],
  )

  const value = useMemo(
    () => ({ reflections, getReflection, saveReflection }),
    [reflections, getReflection, saveReflection],
  )

  return (
    <ReflectionsContext.Provider value={value}>
      {children}
    </ReflectionsContext.Provider>
  )
}

export function useReflections() {
  const ctx = useContext(ReflectionsContext)
  if (!ctx) {
    throw new Error('useReflections must be used within ReflectionsProvider')
  }
  return ctx
}
