import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'

export type Cycle = {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

type CyclesContextData = {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  amountSecondsPassed: number

  markCurrentCycleAsFinished: () => void
  markCurrentCycleAsInterrupted: () => void
  changeSecondsPassed: (value: number) => void
  startNewCycle: (newCycle: Cycle) => void
}

type CyclesProviderProps = {
  children?: React.ReactNode
}

const CyclesContext = createContext({} as CyclesContextData)

export function CyclesProvider({ children }: CyclesProviderProps) {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycle, setActiveCycle] = useState<Cycle | undefined>()
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const markCurrentCycleAsFinished = useCallback(() => {
    setCycles((syclesState) => {
      return syclesState.map((cycle) => {
        if (cycle.id === activeCycle?.id) {
          return {
            ...cycle,
            finishedDate: new Date(),
          }
        }

        return cycle
      })
    })

    setActiveCycle(undefined)
  }, [activeCycle?.id])

  const markCurrentCycleAsInterrupted = useCallback(() => {
    setCycles((syclesState) => {
      return syclesState.map((cycle) => {
        if (cycle.id === activeCycle?.id) {
          return {
            ...cycle,
            interruptedDate: new Date(),
          }
        }

        return cycle
      })
    })

    setActiveCycle(undefined)
  }, [activeCycle?.id])

  const changeSecondsPassed = useCallback((value: number) => {
    setAmountSecondsPassed(value)
  }, [])

  const startNewCycle = useCallback((newCycle: Cycle) => {
    setCycles((state) => [...state, newCycle])
    setActiveCycle(newCycle)
    setAmountSecondsPassed(0)
  }, [])

  const valueMemo: CyclesContextData = useMemo(() => {
    return {
      cycles,
      setCycles,
      activeCycle,
      setActiveCycle,

      markCurrentCycleAsFinished,
      markCurrentCycleAsInterrupted,
      changeSecondsPassed,
      startNewCycle,

      amountSecondsPassed,
      setAmountSecondsPassed,
    }
  }, [
    activeCycle,
    cycles,
    amountSecondsPassed,
    markCurrentCycleAsFinished,
    markCurrentCycleAsInterrupted,
    changeSecondsPassed,
    startNewCycle,
  ])

  return (
    <CyclesContext.Provider value={valueMemo}>
      {children}
    </CyclesContext.Provider>
  )
}

export function useCycles() {
  return useContext(CyclesContext)
}
