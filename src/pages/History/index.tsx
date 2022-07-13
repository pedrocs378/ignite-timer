import { useMemo } from 'react'
import { formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import { useCycles } from '../../contexts/CyclesContext'
import { Cycle } from '../../contexts/CyclesContext/types'

import * as S from './styles'

type CycleStatus = 'interrupted' | 'finished' | 'in_progress'

const STATUS_VARIANT = {
  in_progress: 'warning',
  finished: 'success',
  interrupted: 'danger',
} as {
  [key in CycleStatus]: Styles.Variant
}
const STATUS_LABEL = {
  in_progress: 'Em andamento',
  finished: 'Concluído',
  interrupted: 'Interrompindo',
} as {
  [key in CycleStatus]: string
}

export function History() {
  const { cycles } = useCycles()

  const normalizedCycles = useMemo(() => {
    const getStatus = (cycle: Cycle): CycleStatus => {
      const isInterrupted = !!cycle.interruptedDate
      const isFinished = !!cycle.finishedDate

      if (isInterrupted) return 'interrupted'
      if (isFinished) return 'finished'

      return 'in_progress'
    }

    return cycles.map((cycle) => {
      const formattedStartDate = formatDistanceToNow(
        new Date(cycle.startDate),
        {
          locale: ptBR,
          addSuffix: true,
        },
      )

      const status = getStatus(cycle)

      return {
        ...cycle,
        formattedStartDate,
        status,
      }
    })
  }, [cycles])

  return (
    <S.HistoryContainer>
      <h1>Meu histórico</h1>

      <S.HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {normalizedCycles.map((cycle) => {
              return (
                <tr key={cycle.id}>
                  <td>{cycle.task}</td>
                  <td>{cycle.minutesAmount} minutos</td>
                  <td>{cycle.formattedStartDate}</td>
                  <td>
                    <S.Status variant={STATUS_VARIANT[cycle.status]}>
                      {STATUS_LABEL[cycle.status]}
                    </S.Status>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </S.HistoryList>
    </S.HistoryContainer>
  )
}
