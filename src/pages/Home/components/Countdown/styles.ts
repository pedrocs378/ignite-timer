import styled from 'styled-components'

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
