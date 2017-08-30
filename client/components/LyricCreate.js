import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import mutation from '../mutations/addLyricToSong'

class LyricCreate extends Component {
	state = {
		lyric: ''
	}
	handleChange = (e) => {
		this.setState({
			lyric: e.target.value
		})
	}
	handleSubmit = (e) => {
		e.preventDefault()
		this.props.mutate({
			variables: { songId: this.props.songId, content: this.state.lyric }
		})
		this.setState({
			lyric: ''
		})
	}
	render() {
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<label>Add a lyric:</label>
					<input type="text" value={this.state.lyric} onChange={this.handleChange}/>
				</form>
			</div>
		)
	}
}

export default graphql(mutation)(LyricCreate)