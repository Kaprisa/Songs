import React, { Component } from 'react'
//import { graphql } from 'react-apollo'
//import mutation from '../mutations/likeLyric'

class LyricList extends Component {
	handleLike = () => {

	}
	render() {
		const { lyrics } = this.props
		return (
			<ul className="collection">
				{lyrics.map(lyric => (
					<li key={lyric.id} className="collection-item">
						<span className="song__title">{lyric.content}</span>
						<i onClick={this.handleLike} className="material-icons">thumb_up</i>
					</li>)
				)}
			</ul>
		)
	}
}

export default LyricList

/*export default graphql(query, {
	options: props => { return { variables: { id: props.songId} } }
})(LyricList)*/