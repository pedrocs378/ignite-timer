import { produce } from 'immer'

import { CycleAction, CyclesState } from '../../contexts/CyclesContext/types'

import { ActionTypes } from './actions'

export function cyclesReducer(state: CyclesState, action: CycleAction) {
  switch (action.type) {
    case ActionTypes.START_NEW_CYCLE: {
      return produce(state, (draft) => {
        const actionCycle = action.payload?.data

        if (actionCycle) {
          draft.cycles.push(actionCycle)
          draft.activeCycle = actionCycle
        }
      })
    }
    case ActionTypes.FINISH: {
      const currentCycleIndex = state.cycles.findIndex((cycle) => {
        return cycle.id === state.activeCycle?.id
      })

      if (currentCycleIndex < 0) return state

      return produce(state, (draft) => {
        draft.activeCycle = undefined
        draft.cycles[currentCycleIndex].finishedDate = new Date()
      })
    }
    case ActionTypes.INTERRUPT: {
      const currentCycleIndex = state.cycles.findIndex((cycle) => {
        return cycle.id === state.activeCycle?.id
      })

      if (currentCycleIndex < 0) return state

      return produce(state, (draft) => {
        draft.activeCycle = undefined
        draft.cycles[currentCycleIndex].interruptedDate = new Date()
      })
    }
    default:
      return state
  }
}
