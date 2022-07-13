import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  useState,
} from 'react'

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
  const [cyclesState, dispatch] = useReducer(cyclesReducer, {
    cycles: [],
    activeCycle: undefined,
  } as CyclesState)

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

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
