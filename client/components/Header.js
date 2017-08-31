import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { graphql } from 'react-apollo'
import query from '../queries/fetchUser'
import mutation from '../mutations/logout'
import Loader from './Loader'
import history from '../history'

class Header extends Component {	
	handleLogout = () => {
		this.props.mutate({ refetchQueries: [{ query }] }).then(() => history.replace('/'))
	}
	getButtons() {
		const { user, loading } = this.props.data
		if (loading) return <Loader />
		if (user) return <div className="waves-effect waves-light btn" onClick={this.handleLogout}>Logout</div>
		return (
			<div className="button-group">
				<NavLink className="waves-effect waves-light btn" to="/login">Login</NavLink>
				<NavLink className="waves-effect waves-light btn" to="/signup">Signup</NavLink>
			</div>
		)
	}
	render() {
		return (
			<header className="header">
				<nav className="nav">
					<NavLink exact className="nav__link" activeClassName="nav__link_active" to="/">Songs</NavLink>
					<NavLink className="nav__link" activeClassName="nav__link_active" to="/song/new">Create Song</NavLink>
					<div className="nav__buttons">
						{this.getButtons()}		
					</div>
				</nav>
			</header>
		)
	}
}

export default graphql(mutation)(graphql(query)(Header))