import styled from 'styled-components'

export const Container = styled.div`
  height: calc(100vh - 10rem);
  max-width: 74rem;
  margin: 5rem auto;

  padding: 2.5rem;

  background-color: ${({ theme }) => theme.colors['gray-800']};
  border-radius: 8px;

  display: flex;
  flex-direction: column;
`
