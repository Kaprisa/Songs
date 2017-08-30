import { GraphQLObjectType, GraphQLString, GraphQLID } from 'graphql'
import mongoose from 'mongoose'
import SongType from './song_type'
import LyricType from './lyric_type'
const Song = mongoose.model('Song')
const Lyric = mongoose.model('Lyric')

const Mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		addSong: {
			type: SongType,
			args: { title: { type: GraphQLString } },
			resolve(ParentValue, { title }) {
				return (new Song({ title }).save())
			}
		},
		addLyricToSong: {
			type: SongType,
			args: { 
				songId: { type: GraphQLID },
				content: { type: GraphQLString }
			},
			resolve(ParentValue, { songId, content }) {
				return Song.addLyric(songId, content)
			}
		},
		likeLyric: {
			type: LyricType,
			args: { id: { type: GraphQLID } },
			resolve(ParentValue, { id }) {
				return Lyric.findByIdAndUpdate(id, { '$inc': { likes: 1 } }, { new: true })
			}
		},
		deleteSong: {
			type: SongType,
			args: { id: { type: GraphQLID } },
			resolve(ParentValue, { id }) {
				return Song.remove({ _id: id })
			}
		}
	}
})

export default Mutation