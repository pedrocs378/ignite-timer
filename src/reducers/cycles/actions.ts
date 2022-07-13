import { Cycle } from '../../contexts/CyclesContext/types'

export enum ActionTypes {
  START_NEW_CYCLE = 'START_NEW_CYCLE',
  FINISH = 'FINISH',
  INTERRUPT = 'INTERRUPT',
}

export function addNewCycleAction(newCycle: Cycle) {
  return {
    type: ActionTypes.START_NEW_CYCLE,
    payload: {
      data: newCycle,
    },
  }
}

export function finishCycleAction() {
  return {
    type: ActionTypes.FINISH,
  }
}

export function interruptCycleAction() {
  return {
    type: ActionTypes.INTERRUPT,
  }
}
