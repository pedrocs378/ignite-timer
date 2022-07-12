import { useEffect, useMemo, useState } from 'react'
import { differenceInSeconds } from 'date-fns'
import { useForm } from 'react-hook-form'
import { HandPalm, Play } from 'phosphor-react'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

import { Button } from '../../components/Button'

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

type Cycle = {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycle, setActiveCycle] = useState<Cycle | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  function handleCreateNewCycle(data: NewCycleFormData) {
    const newCycle: Cycle = {
      ...data,
      id: String(new Date().getTime()),
      startDate: new Date(),
    }

    setCycles((state) => [...state, newCycle])
    setActiveCycle(newCycle)

    reset()
    setAmountSecondsPassed(0)
  }

  function handleInterruptCycle() {
    setCycles((syclesState) => {
      return syclesState.map((cycle) => {
        if (cycle.id === activeCycle?.id) {
          return {
            ...cycle,
            interruptedDate: new Date(),
          }
        }

        return cycle
      })
    })

    setActiveCycle(null)
  }

  const countdown = useMemo(() => {
    const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
    const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

    const minutesAmount = Math.floor(currentSeconds / 60)
    const secondsAmount = currentSeconds % 60

    const minutes = String(minutesAmount).padStart(2, '0')
    const seconds = String(secondsAmount).padStart(2, '0')

    return {
      totalSeconds,
      seconds,
      minutes,
    }
  }, [activeCycle, amountSecondsPassed])

  useEffect(() => {
    if (activeCycle) {
      const interval = setInterval(() => {
        const secondsPassed = differenceInSeconds(
          new Date(),
          activeCycle.startDate,
        )

        if (secondsPassed > countdown.totalSeconds) {
          setCycles((syclesState) => {
            return syclesState.map((cycle) => {
              if (cycle.id === activeCycle?.id) {
                return {
                  ...cycle,
                  finishedDate: new Date(),
                }
              }

              return cycle
            })
          })

          setActiveCycle(null)
          clearInterval(interval)
        } else {
          setAmountSecondsPassed(secondsPassed)
        }
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [activeCycle, countdown.totalSeconds])

  useEffect(() => {
    if (activeCycle) {
      document.title = `${countdown.minutes}:${countdown.seconds}`
    }
  }, [activeCycle, countdown.minutes, countdown.seconds])

  const task = watch('task')
  const isSubmitDisabled = !task.trim()

  return (
    <S.HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
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
            <option value="Projeto 1" />
            <option value="Projeto 2" />
            <option value="Projeto 3" />
            <option value="Teste" />
          </datalist>

          <label htmlFor="minutesAmount">durante</label>
          <S.MinutesAmountInput
            id="minutesAmount"
            type="number"
            placeholder="00"
            step={5}
            min={1}
            max={60}
            required
            disabled={!!activeCycle}
            {...register('minutesAmount', { valueAsNumber: true })}
          />

          <span>minutos.</span>
        </S.FormContainer>

        <S.CountdownContainer>
          <span>{countdown.minutes[0]}</span>
          <span>{countdown.minutes[1]}</span>
          <S.Separator>:</S.Separator>
          <span>{countdown.seconds[0]}</span>
          <span>{countdown.seconds[1]}</span>
        </S.CountdownContainer>

        <Button
          type={activeCycle ? 'button' : 'submit'}
          disabled={!activeCycle && isSubmitDisabled}
          variant={activeCycle ? 'danger' : 'success'}
          onClick={activeCycle ? handleInterruptCycle : undefined}
        >
          {activeCycle ? <HandPalm size={24} /> : <Play size={24} />}
          {activeCycle ? 'Interromper' : 'Começar'}
        </Button>
      </form>
    </S.HomeContainer>
  )
}
