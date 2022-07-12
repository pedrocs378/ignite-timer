import { Play } from 'phosphor-react'

import { Button } from '../../components/Button'

import * as S from './styles'

export function Home() {
  return (
    <S.HomeContainer>
      <form>
        <S.FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <S.TaskInput id="task" placeholder="Dê um nome para o seu projeto" />

          <label htmlFor="minutesAmount">durante</label>
          <S.MinutesAmountInput
            id="minutesAmount"
            type="number"
            placeholder="00"
          />

          <span>minutos.</span>
        </S.FormContainer>

        <S.CountdownContainer>
          <span>0</span>
          <span>0</span>
          <S.Separator>:</S.Separator>
          <span>0</span>
          <span>0</span>
        </S.CountdownContainer>

        <Button type="submit">
          <Play size={24} />
          Começar
        </Button>
      </form>
    </S.HomeContainer>
  )
}
