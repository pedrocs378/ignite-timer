import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import { Router } from './Router'

import { defaultTheme } from './styles/themes/default'

import { GlobalStyle } from './styles/global'
import { CyclesProvider } from './contexts/CyclesContext'

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CyclesProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </CyclesProvider>

      <GlobalStyle />
    </ThemeProvider>
  )
}

export { App }
