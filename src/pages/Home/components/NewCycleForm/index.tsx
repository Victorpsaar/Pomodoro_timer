import { useContext } from 'react'
import { CycleContext } from '../../../../context/CycleContext'

import { FormContainer, MinutesInput, TaskInput } from './styles'
import { useFormContext } from 'react-hook-form'

export function NewCycleForm() {
  const { activeCycle } = useContext(CycleContext)
  const { register } = useFormContext()
  
  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput type="text"
        disabled={!!activeCycle}
        list="task-suggestions" id="task" 
        placeholder="Dê um nome para o projeto"
        {...register('task')}
      />

      <datalist id="task-suggestions">
        <option value="Projeto 1"></option>
        <option value="Projeto 2"></option>
        <option value="Projeto 3"></option>
        <option value="React"></option>
      </datalist>

      <label htmlFor="minutesAmount">Durante</label>
      <MinutesInput 
        type="number"
        id="minutesAmount" 
        placeholder="00" 
        disabled={!!activeCycle}
        step={5}
        min={5}
        max={60}
        {...register('minutesAmount', {valueAsNumber: true })}
      />

      <span>minutos.</span>
    </FormContainer>
  )
}