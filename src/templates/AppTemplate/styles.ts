import styled from 'styled-components'

export const Container = styled.div`
  height: calc(100vh - 10rem);
  min-height: 35rem;
  max-width: 74rem;
  margin: 5rem auto;

  padding: 2.5rem;

  background-color: ${({ theme }) => theme.colors['gray-800']};
  border-radius: ${({ theme }) => theme.borderRadius.default};

  display: flex;
  flex-direction: column;
`
