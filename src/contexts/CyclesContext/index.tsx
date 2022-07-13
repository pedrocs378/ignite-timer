import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react'
import { differenceInSeconds } from 'date-fns'

import { cyclesReducer } from '../../reducers/cycles/reducer'
import {
  addNewCycleAction,
  finishCycleAction,
  interruptCycleAction,
} from '../../reducers/cycles/actions'

import {
  Cycle,
  CyclesState,
  CyclesContextData,
  CyclesProviderProps,
  StartNewCycleData,
} from './types'

const CyclesContext = createContext({} as CyclesContextData)

export function CyclesProvider({ children }: CyclesProviderProps) {
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycle: undefined,
    } as CyclesState,
    (arg) => {
      const storagedState = localStorage.getItem(
        '@ignite-timer:cyclesState-1.0.0',
      )

      if (storagedState) {
        return JSON.parse(storagedState) as CyclesState
      }

      return arg
    },
  )

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (cyclesState.activeCycle) {
      return differenceInSeconds(
        new Date(),
        new Date(cyclesState.activeCycle.startDate),
      )
    }

    return 0
  })

  const markCurrentCycleAsFinished = useCallback(() => {
    dispatch(finishCycleAction())
  }, [])

  const markCurrentCycleAsInterrupted = useCallback(() => {
    dispatch(interruptCycleAction())
  }, [])

  const changeSecondsPassed = useCallback((value: number) => {
    setAmountSecondsPassed(value)
  }, [])

  const startNewCycle = useCallback((data: StartNewCycleData) => {
    const newCycle: Cycle = {
      ...data,
      id: String(new Date().getTime()),
      startDate: new Date(),
    }

    dispatch(addNewCycleAction(newCycle))

    setAmountSecondsPassed(0)
  }, [])

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState)

    localStorage.setItem('@ignite-timer:cyclesState-1.0.0', stateJSON)
  }, [cyclesState])

  const valueMemo: CyclesContextData = useMemo(() => {
    return {
      cycles: cyclesState.cycles,
      activeCycle: cyclesState.activeCycle,
      amountSecondsPassed,

      markCurrentCycleAsFinished,
      markCurrentCycleAsInterrupted,
      changeSecondsPassed,
      startNewCycle,
    }
  }, [
    cyclesState,
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
