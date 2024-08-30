import { ActionTypes } from './actions'
import { produce } from 'immer'

export interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CycleState {
  cycles: Cycle[]
  activeCycleId: string | null
}

export function cycleReducer (state: CycleState, action: any) {
  switch(action.type) {
  case ActionTypes.AddNewCycle:
    return produce(state, draft => {
      draft.cycles.push(action.payload.newCycle)
      draft.activeCycleId = action.payload.newCycle.id
    })

  case ActionTypes.InterruptCurrentCycle: {
    const currentCycleIndex = state.cycles.findIndex((cycle) => {
      return cycle.id === state.activeCycleId
    })

    if (currentCycleIndex < 0) {
      return state
    } 

    return produce(state, (draft) => {
      draft.activeCycleId = null
      draft.cycles[currentCycleIndex].interruptedDate = new Date()
    })
  }

  case ActionTypes.MarkCurrentCycleAsFinished: {
    const currentCycleIndex = state.cycles.findIndex((cycle) => {
      return cycle.id === state.activeCycleId
    })
  
    if (currentCycleIndex < 0) {
      return state
    } 
  
    return produce(state, (draft) => {
      draft.activeCycleId = null
      draft.cycles[currentCycleIndex].finishedDate = new Date()
    })
  }

  default: 
    return state
  }
}