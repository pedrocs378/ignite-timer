export type StartNewCycleData = {
  task: string
  minutesAmount: number
}

export type Cycle = {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

export type CyclesContextData = {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  amountSecondsPassed: number

  markCurrentCycleAsFinished: () => void
  markCurrentCycleAsInterrupted: () => void
  changeSecondsPassed: (value: number) => void
  startNewCycle: (data: StartNewCycleData) => void
}

export type CyclesProviderProps = {
  children?: React.ReactNode
}

export type CycleActionTypes = 'START_NEW_CYCLE' | 'INTERRUPT' | 'FINISH'

export type CycleAction = {
  type: CycleActionTypes
  payload?: {
    data: Cycle
  }
}

export type CyclesState = {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
}
