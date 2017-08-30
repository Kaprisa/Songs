import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import Song from './Song'
import Loader from './Loader'
import query from '../queries/fetchSongs'
import mutation from '../mutations/deleteSong'

class SongList extends Component {
	handlerDeleteSong = (id) => {
		this.props.mutate({
			variables: { id }
		}).then(() => this.props.data.refetch())
	}
	render() {
		const { songs } = this.props.data
		if (!songs || songs.loading || !songs.length) return <Loader />
		return (
			<ul className="collection">
				{songs.map(song => <Song handlerDeleteSong={this.handlerDeleteSong} key={song.id} song={song}/>)}
			</ul>
		)
	}
}

export default graphql(mutation)(graphql(query)(SongList))