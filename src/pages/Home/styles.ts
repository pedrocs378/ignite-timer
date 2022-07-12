import styled from 'styled-components'

export const HomeContainer = styled.main`
  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.5rem;
  }
`

export const FormContainer = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.5rem;

  color: ${({ theme }) => theme.colors['gray-100']};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`

const BaseInput = styled.input`
  height: 2.5rem;
  padding: 0 0.5rem;

  background-color: transparent;
  border: 0;
  border-bottom: 2px solid ${({ theme }) => theme.colors['gray-500']};

  color: ${({ theme }) => theme.colors['gray-100']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: ${({ theme }) => theme.fontSizes.lg};

  &:focus {
    box-shadow: none;
    border-color: ${({ theme }) => theme.colors['green-500']};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors['gray-500']};
  }
`

export const TaskInput = styled(BaseInput)`
  flex: 1;
`

export const MinutesAmountInput = styled(BaseInput)`
  width: 4rem;
`

export const CountdownContainer = styled.div`
  font-family: 'Roboto Mono', monospace;
  font-size: 10rem;
  line-height: 8rem;
  color: ${({ theme }) => theme.colors['gray-100']};

  display: flex;
  gap: 1rem;

  span {
    background-color: ${({ theme }) => theme.colors['gray-700']};
    padding: 2rem 1rem;
    border-radius: ${({ theme }) => theme.borderRadius.default};
  }
`

export const Separator = styled.div`
  width: 4rem;
  padding: 2rem 0;

  color: ${({ theme }) => theme.colors['green-500']};
  overflow: hidden;

  display: flex;
  justify-content: center;
`
