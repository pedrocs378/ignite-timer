import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  useState,
} from 'react'

import { ActionTypes, cyclesReducer } from '../../reducers/cycles'

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
    dispatch({
      type: ActionTypes.FINISH,
    })
  }, [])

  const markCurrentCycleAsInterrupted = useCallback(() => {
    dispatch({
      type: ActionTypes.INTERRUPT,
    })
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

    dispatch({
      type: ActionTypes.START_NEW_CYCLE,
      payload: {
        data: newCycle,
      },
    })

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
