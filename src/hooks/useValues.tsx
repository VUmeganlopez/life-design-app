import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { careerValues } from '../data/values'
import type { ValueRanks } from '../data/types'

const STORAGE_KEY = 'vandy-life-design-values-v1'

function load(): ValueRanks {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    return JSON.parse(raw) as ValueRanks
  } catch {
    return {}
  }
}

type ValuesContextValue = {
  ranks: ValueRanks
  setRank: (valueId: string, rank: number) => void
  clearRank: (valueId: string) => void
  rankedValues: { id: string; label: string; description: string; rank: number }[]
  topValues: { id: string; label: string; description: string; rank: number }[]
}

const ValuesContext = createContext<ValuesContextValue | null>(null)

export function ValuesProvider({ children }: { children: ReactNode }) {
  const [ranks, setRanks] = useState<ValueRanks>(() => load())

  const persist = useCallback((next: ValueRanks) => {
    setRanks(next)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  }, [])

  const setRank = useCallback(
    (valueId: string, rank: number) => {
      persist({ ...ranks, [valueId]: rank })
    },
    [persist, ranks],
  )

  const clearRank = useCallback(
    (valueId: string) => {
      const next = { ...ranks }
      delete next[valueId]
      persist(next)
    },
    [persist, ranks],
  )

  const rankedValues = useMemo(
    () =>
      careerValues
        .map((v) => ({ ...v, rank: ranks[v.id] ?? 0 }))
        .filter((v) => v.rank > 0)
        .sort((a, b) => a.rank - b.rank),
    [ranks],
  )

  const topValues = useMemo(
    () => rankedValues.filter((v) => v.rank <= 3),
    [rankedValues],
  )

  const value = useMemo(
    () => ({ ranks, setRank, clearRank, rankedValues, topValues }),
    [ranks, setRank, clearRank, rankedValues, topValues],
  )

  return (
    <ValuesContext.Provider value={value}>{children}</ValuesContext.Provider>
  )
}

export function useValues() {
  const ctx = useContext(ValuesContext)
  if (!ctx) throw new Error('useValues must be used within ValuesProvider')
  return ctx
}
