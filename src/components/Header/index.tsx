import { NavLink } from 'react-router-dom'
import { Scroll, Timer } from 'phosphor-react'

import { Logo } from '../Logo'

import * as S from './styles'

export function Header() {
  return (
    <S.HeaderContainer>
      <Logo />

      <nav>
        <NavLink to="/" title="Timer">
          <Timer size={24} />
        </NavLink>
        <NavLink to="/history" title="Histórico">
          <Scroll size={24} />
        </NavLink>
      </nav>
    </S.HeaderContainer>
  )
}
