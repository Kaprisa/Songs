import React from 'react'
import history from '../history'

const Song = (props) => {
	const { song } = props
	return (
		<li className="collection-item">
			<span className="song__title" onClick={() => history.push(`/song/${song.id}`)}>{song.title}</span>
			<i onClick={() => props.handlerDeleteSong(song.id)} className="material-icons">delete</i>
		</li>
	)
}

export default Song