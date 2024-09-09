import { HeaderContainer } from './styles'
import { Scroll, Timer } from 'phosphor-react'
import { NavLink } from 'react-router-dom'

import LogoIgnite from '../../assets/LogoIgnite.svg'

export function Header() {
  return (
    <HeaderContainer>
      <img src={LogoIgnite} />
      <nav>
        <NavLink to="/" title="Timer">
          <Timer size={24} />
        </NavLink>
        <NavLink to="/history" title="Historíco">
          <Scroll size={24} />
        </NavLink>
      </nav>
    </HeaderContainer>
  )
}
