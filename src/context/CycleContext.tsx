import { ReactNode, createContext, useReducer, useState, useEffect } from 'react'
import { Cycle, cycleReducer } from '../reducers/Cycle/reducer'
import { MarkCurrentCycleAsFinishedAction, addNewCycleAction, interrupCurrentCycleAction } from '../reducers/Cycle/actions'
import { differenceInSeconds } from 'date-fns'

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

export function CycleContextProvider({ children }: CycleContextProviderProps) {

  const [cycleState, dispatch] = useReducer(cycleReducer,
    {
      cycles: [],
      activeCycleId: null,
    },
    (initialState) => {
      const storedStateAsJSON = localStorage.getItem('ignite-timer:cycle-state-1.0.0')

      if (storedStateAsJSON) {
        return JSON.parse(storedStateAsJSON)
      }

      return initialState
    },
  )

  const { cycles, activeCycleId } = cycleState
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(
        new Date(),
        new Date(activeCycle.startDate),
      )
    }

    return 0
  })

  useEffect(() => {
    const stateJSON = JSON.stringify(cycleState)

    localStorage.setItem('ignite-timer:cycle-state-1.0.0', stateJSON)
  }, [cycleState])

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function markCurrentCycleAsFinished() {
    dispatch(MarkCurrentCycleAsFinishedAction())
  }

  function createNewCycle(data: CreateCycleData) {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    dispatch(addNewCycleAction(newCycle))

    setAmountSecondsPassed(0)
  }

  function interruptCurrentCycle() {
    dispatch(interrupCurrentCycleAction())
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