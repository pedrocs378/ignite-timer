import styled from 'styled-components'

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

  &:disabled {
    opacity: 0.75;
    cursor: not-allowed;
  }
`

export const TaskInput = styled(BaseInput)`
  flex: 1;

  &::-webkit-calendar-picker-indicator {
    display: none !important;
  }
`

export const MinutesAmountInput = styled(BaseInput)`
  width: 4rem;
`
