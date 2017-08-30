import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => {
	return (
		<header className="header">
			<nav className="header__navigation nav">
				<NavLink className="nav__link" activeClassName="nav__link_active" to="/">Songs</NavLink>
				<NavLink className="nav__link" activeClassName="nav__link_active" to="/song/new">Create Song</NavLink>
			</nav>
		</header>
	)
}

export default Header