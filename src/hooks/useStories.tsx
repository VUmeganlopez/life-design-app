import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { seedStories } from '../data/stories'
import type { StudentStory } from '../data/types'

const STORAGE_KEY = 'vandy-life-design-stories-v2'

function load(): StudentStory[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return seedStories
    const parsed = JSON.parse(raw) as StudentStory[]
    return parsed.length ? parsed : seedStories
  } catch {
    return seedStories
  }
}

type StoriesContextValue = {
  stories: StudentStory[]
  addStory: (story: Omit<StudentStory, 'id' | 'createdAt'>) => StudentStory
}

const StoriesContext = createContext<StoriesContextValue | null>(null)

export function StoriesProvider({ children }: { children: ReactNode }) {
  const [stories, setStories] = useState<StudentStory[]>(() => load())

  const addStory = useCallback(
    (story: Omit<StudentStory, 'id' | 'createdAt'>) => {
      const next: StudentStory = {
        ...story,
        id: `story-${crypto.randomUUID()}`,
        createdAt: new Date().toISOString(),
      }
      setStories((prev) => {
        const list = [next, ...prev]
        localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
        return list
      })
      return next
    },
    [],
  )

  const value = useMemo(() => ({ stories, addStory }), [stories, addStory])

  return (
    <StoriesContext.Provider value={value}>{children}</StoriesContext.Provider>
  )
}

export function useStories() {
  const ctx = useContext(StoriesContext)
  if (!ctx) throw new Error('useStories must be used within StoriesProvider')
  return ctx
}
