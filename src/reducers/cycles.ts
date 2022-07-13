import { CycleAction, CyclesState } from '../contexts/CyclesContext/types'

export enum ActionTypes {
  START_NEW_CYCLE = 'START_NEW_CYCLE',
  FINISH = 'FINISH',
  INTERRUPT = 'INTERRUPT',
}

export function cyclesReducer(state: CyclesState, action: CycleAction) {
  switch (action.type) {
    case ActionTypes.START_NEW_CYCLE: {
      const actionCycle = action.payload?.data
      return {
        ...state,
        cycles: actionCycle ? [...state.cycles, actionCycle] : state.cycles,
        activeCycle: actionCycle,
      }
    }
    case ActionTypes.FINISH:
      return {
        ...state,
        activeCycle: undefined,
        cycles: state.cycles.map((cycle) => {
          if (cycle.id === state.activeCycle?.id) {
            return {
              ...cycle,
              finishedDate: new Date(),
            }
          }

          return cycle
        }),
      }
    case ActionTypes.INTERRUPT:
      return {
        ...state,
        activeCycle: undefined,
        cycles: state.cycles.map((cycle) => {
          if (cycle.id === state.activeCycle?.id) {
            return {
              ...cycle,
              interruptedDate: new Date(),
            }
          }

          return cycle
        }),
      }
    default:
      return state
  }
}
