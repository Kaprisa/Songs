import { GraphQLObjectType, GraphQLString, GraphQLID } from 'graphql'
import mongoose from 'mongoose'
import SongType from './song_type'
import LyricType from './lyric_type'
import UserType from './user_type'
const Song = mongoose.model('Song')
const Lyric = mongoose.model('Lyric')
const User = mongoose.model('User')
import { signup, login } from '../services/auth'

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
		},
		signupUser: {
			type: UserType,
			args: { 
				email: { type: GraphQLString },
				password: { type: GraphQLString }
		 	},
		 	resolve(ParentValue, { email, password }, req) {
		 		return signup({ email, password, req })
		 	}
		},
		loginUser: {
			type: UserType,
			args: {
				email: { type: GraphQLString },
				password: { type: GraphQLString }
			},
			resolve(ParentValue, { email, password }, req) {
				return login({ email, password, req })
			}
		},
		logoutUser: {
			type: UserType,
			resolve(ParentValue, args, req) {
				const { user } = req
				req.logout()
				return user
			}
		}
	}
})

export default Mutation