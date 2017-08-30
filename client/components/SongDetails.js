import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import query from '../queries/fetchSong'
import Loader from './Loader'
import { Link } from 'react-router-dom'
import LyricCreate from './LyricCreate'
import LyricList from './LyricList'

class SongDetails extends Component {
	render() {
		const { song } = this.props.data
		if (!song) return <Loader />
		return (
			<div className="">
				<Link to="/">Back</Link>
				<h4>{song.title}</h4>
				<LyricCreate songId={this.props.match.params.id}/>
				<LyricList lyrics={song.lyrics}/>
			</div>
		)
	}
}

export default graphql(query, {
	options: props => { return { variables: { id: props.match.params.id } } }
})(SongDetails)