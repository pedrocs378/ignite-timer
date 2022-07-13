import { useFormContext } from 'react-hook-form'

import { useCycles } from '../../../../contexts/CyclesContext'

import * as S from './styles'

export function NewCycleForm() {
  const { register } = useFormContext()
  const { activeCycle, cycles } = useCycles()

  return (
    <S.FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <S.TaskInput
        id="task"
        list="task-suggestions"
        placeholder="Dê um nome para o seu projeto"
        disabled={!!activeCycle}
        {...register('task')}
      />

      <datalist id="task-suggestions">
        {cycles.map((cycle) => {
          return <option key={cycle.id} value={cycle.task} />
        })}
      </datalist>

      <label htmlFor="minutesAmount">durante</label>
      <S.MinutesAmountInput
        id="minutesAmount"
        type="number"
        placeholder="00"
        step={5}
        min={5}
        max={60}
        required
        disabled={!!activeCycle}
        {...register('minutesAmount', { valueAsNumber: true })}
      />

      <span>minutos.</span>
    </S.FormContainer>
  )
}
