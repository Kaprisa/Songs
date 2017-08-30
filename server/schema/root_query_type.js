import mongoose from 'mongoose'
import { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } from 'graphql'
import SongType from './song_type'
import LyricType from './lyric_type'
const Song = mongoose.model('Song')
const Lyric = mongoose.model('Lyric')

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: () => ({
		songs: {
			type: new GraphQLList(SongType),
			resolve() {
				return Song.find()
			}
		},
		song: {
			type: SongType,
			args: { id: { type: new GraphQLNonNull(GraphQLID) } },
			resolve(ParentValue, { id }) {
				return Song.findById(id)
			}
		},
		lyric: {
			type: LyricType,
			args: { id: { type: new GraphQLNonNull(GraphQLID) } },
			resolve(ParentValue, { id }) {
				return Lyric.findById(id)
			}
		}
	})
})

export default RootQuery
