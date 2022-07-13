import { useEffect, useMemo } from 'react'
import { differenceInSeconds } from 'date-fns'

import { useCycles } from '../../../../contexts/CyclesContext'

import * as S from './styles'

export function Countdown() {
  const {
    activeCycle,
    amountSecondsPassed,
    changeSecondsPassed,
    markCurrentCycleAsFinished,
  } = useCycles()

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
          new Date(activeCycle.startDate),
        )

        if (secondsPassed > countdown.totalSeconds) {
          markCurrentCycleAsFinished()

          clearInterval(interval)
        } else {
          changeSecondsPassed(secondsPassed)
        }
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [
    activeCycle,
    countdown.totalSeconds,
    markCurrentCycleAsFinished,
    changeSecondsPassed,
  ])

  useEffect(() => {
    if (activeCycle) {
      document.title = `${countdown.minutes}:${countdown.seconds} | Ignite Timer`
    } else {
      document.title = 'Ignite Timer'
    }
  }, [activeCycle, countdown.minutes, countdown.seconds])

  return (
    <S.CountdownContainer>
      <span>{countdown.minutes[0]}</span>
      <span>{countdown.minutes[1]}</span>
      <S.Separator>:</S.Separator>
      <span>{countdown.seconds[0]}</span>
      <span>{countdown.seconds[1]}</span>
    </S.CountdownContainer>
  )
}
