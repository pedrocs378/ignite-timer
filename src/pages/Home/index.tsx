import { FormProvider, useForm } from 'react-hook-form'
import { HandPalm, Play } from 'phosphor-react'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

import { useCycles } from '../../contexts/CyclesContext'

import { Button } from '../../components/Button'
import { NewCycleForm } from './components/NewCycleForm'
import { Countdown } from './components/Countdown'

import * as S from './styles'

type NewCycleValidationSchema = {
  task: zod.ZodString
  minutesAmount: zod.ZodNumber
}

const newCycleFormValidationSchema = zod.object<NewCycleValidationSchema>({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(1, 'O valor precisa ser maior ou igual a 1')
    .max(60, 'O valor precisa ser menor ou igual a 60'),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {
  const { activeCycle, startNewCycle, markCurrentCycleAsInterrupted } =
    useCycles()

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const { handleSubmit, watch, reset } = newCycleForm

  function handleCreateNewCycle(data: NewCycleFormData) {
    startNewCycle(data)

    reset()
  }

  const task = watch('task')
  const isSubmitDisabled = !task.trim()

  return (
    <S.HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>

        <Countdown />

        <Button
          type={activeCycle ? 'button' : 'submit'}
          disabled={!activeCycle && isSubmitDisabled}
          variant={activeCycle ? 'danger' : 'success'}
          onClick={activeCycle ? markCurrentCycleAsInterrupted : undefined}
        >
          {activeCycle ? <HandPalm size={24} /> : <Play size={24} />}
          {activeCycle ? 'Interromper' : 'Começar'}
        </Button>
      </form>
    </S.HomeContainer>
  )
}
