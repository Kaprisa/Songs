import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import mutation from '../mutations/likeLyric'

class LyricList extends Component {
	handleLike = (id, likes) => {
		this.props.mutate({
			variables: { id },
			optimisticResponse: {
				__typename:'Mutation',
				likeLyric: {
					id,
					__typename: 'LyricType',
					likes: likes + 1
				}
			}
		})
	}
	/*handlerDeleteLyric = (id) => {
		this.props
	}*/
	render() {
		const { lyrics } = this.props
		return (
			<ul className="collection">
				{lyrics.map(lyric => (
					<li key={lyric.id} className="collection-item">
						<span className="song__title">{lyric.content}</span>
						<i onClick={() => this.handleLike(lyric.id, lyric.likes)} className="material-icons">thumb_up</i>
						{ lyric.likes > 0 && <span className="likes-count">{lyric.likes}</span>}
					</li>)
				)}
			</ul>
		)
	}
}//<i onClick={() => this.handlerDeleteLyric(lyric.id)} className="material-icons">delete</i>

export default graphql(mutation)(LyricList)