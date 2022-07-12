import styled from 'styled-components'

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  nav {
    display: flex;
    gap: 0.5rem;

    a {
      width: 3rem;
      height: 3rem;

      display: flex;
      align-items: center;
      justify-content: center;

      color: ${({ theme }) => theme.colors['gray-100']};

      border-top: 3px solid transparent;
      border-bottom: 3px solid transparent;

      transition: border-color 0.2s;

      &:hover {
        border-bottom-color: ${({ theme }) => theme.colors['green-500']};
      }

      &.active {
        color: ${({ theme }) => theme.colors['green-500']};
      }
    }
  }
`
