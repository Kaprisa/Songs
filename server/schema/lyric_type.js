import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID } from 'graphql'
import mongoose from 'mongoose'
import SongType from './song_type'
//const Song = mongoose.model('Song')
const Lyric = mongoose.model('Lyric')

const LyricType = new GraphQLObjectType({
	name: 'LyricType',
	fields: () => ({
		id: { type: GraphQLID },
		likes: { type: GraphQLInt },
		content: { type: GraphQLString },
		song: { 
			type: SongType,
			//args: { id: { type: new GraphQLNonNull(GraphQLID) } }
			resolve(ParentValue/*, { id }*/) {
				return Lyric.findById(ParentValue.id).populate('song')
					.then(lyric => lyric.song)
				//return Song.findById(id)
			}
		}
	})
})

export default LyricType