import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :focus {
    outline: 0;
    box-shadow: 0 0 2px 2px ${({ theme }) => theme.colors['green-500']};
  }

  body {
    background-color: ${({ theme }) => theme.colors['gray-900']};
    color: ${({ theme }) => theme.colors['gray-300']};
    -webkit-font-smoothing: antialiased;
    padding: 0 0.5rem;
  }

  body, button, input, textarea {
    font-family: 'Roboto', sans-serif;
    font-weight: ${({ theme }) => theme.fontWeights.regular};
    font-size: ${({ theme }) => theme.fontSizes.md};
  }
`
