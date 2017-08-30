import { GraphQLObjectType, GraphQLList, GraphQLString, GraphQLID } from 'graphql'
import mongoose from 'mongoose'
import LyricType from './song_type'
const Song = mongoose.model('Song')

const SongType = new GraphQLObjectType({
	name: 'SongType',
	fields: () => ({
		id: { type: GraphQLID },
		title: { type: GraphQLString },
		lyrics: {
			type: new GraphQLList(LyricType),
			resolve(ParentValue) {
				return Song.findLyrics(ParentValue.id)
			}
		}
	})
})

export default SongType