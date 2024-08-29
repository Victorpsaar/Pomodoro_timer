import { ReactNode, createContext, useReducer, useState } from "react";

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CreateCycleData {
  task: string
  minutesAmount: number
}

interface CycleContext {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  markCurrentCycleAsFinished: () => void 
  setSecondsPassed: (seconds: number) => void
  createNewCycle: (data: CreateCycleData) => void
  interruptCurrentCycle: () => void
}

export const CycleContext = createContext({} as CycleContext)

interface CycleContextProviderProps {
  children?: ReactNode
}

interface CycleState {
  cycles: Cycle[]
  activeCycleId: string | null
}

export function CycleContextProvider({ children }: CycleContextProviderProps) {

  const [cycleState, dispatch] = useReducer((state: CycleState, action: any) => {
    switch(action.type) {
      case 'AddNewCycle':
        return {
          ...state,
          cycles: [...state.cycles, action.payload.newCycle],
          activeCycleId: action.payload.newCycle.id,
        }

      case 'InterruptCurrentCycle':
        return {
          ...state,
          cycles: state.cycles.map((cycle) => {
            if (cycle.id === state.activeCycleId) {
              return { ...cycle, finishedDate: new Date() }
            } else {
              return cycle
            }
          }),
          activeCycleId: null
        }

      case 'MarkCurrentCycleAsFinished':
        return {
          ...state,
          cycles: state.cycles.map((cycle) => {
            if (cycle.id === state.activeCycleId) {
              return { ...cycle, finishedDate: new Date() }
            } else {
              return cycle
            }
          }),
          activeCycleId: null
        }

      default: 
        return state
    }
  },
  {
    cycles: [],
    activeCycleId: null,
  },
)

  const { cycles, activeCycleId } = cycleState

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function markCurrentCycleAsFinished() {
    dispatch({
      type: 'MarkCurrentCycleAsFinished',
      payload: {
        activeCycleId,
      }
    })
  }

  function createNewCycle(data: CreateCycleData) {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    dispatch({
      type: 'AddNewCycle',
      payload: {
        newCycle,
      }
    })
    setAmountSecondsPassed(0)
  }

  function interruptCurrentCycle() {
    dispatch({
      type: 'InterrupCurrentCycle',
      payload: {
        activeCycleId,
      }
    })
  }

  return (
    <CycleContext.Provider 
      value={{ 
      cycles,
      activeCycle,
      activeCycleId,
      amountSecondsPassed,
      markCurrentCycleAsFinished,
      setSecondsPassed,
      createNewCycle,
      interruptCurrentCycle,
    }}>
      { children }
    </CycleContext.Provider>
  )
}