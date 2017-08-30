import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { Link } from 'react-router-dom'
import history from '../history'
import query from '../queries/fetchSongs'
import mutation from '../mutations/addSong'

class SongCreate extends Component {
	state = {
		song: ''
	}
	handleChange = (e) => {
		this.setState({
			song: e.target.value
		})
	}
	handleSubmit = (e) => {
		e.preventDefault()
		this.props.mutate({
			variables: { title: this.state.song },
			refetchQueries: [{ query }]
		}).then(() => history.push('/'))
			.catch(err => console.error(err))
	}
	render() {
		return (
			<div>
				<Link to="/">Back</Link>
				<h3>Create a new song:</h3>
				<form onSubmit={this.handleSubmit}>
					<label>Song title:</label>
					<input type="text" value={this.state.song} onChange={this.handleChange}/>
				</form>
			</div>
		)
	}
}

export default graphql(mutation)(SongCreate)