import mongoose from 'mongoose'

const lyricSchema = new mongoose.Schema({
	content: {
		type: String,
		trim: true
	},
	likes: {
		type: Number,
		default: 0
	},
	song: {
		type: mongoose.Schema.ObjectId,
		ref: 'Song'
	}
})
 

export default mongoose.model('Lyric', lyricSchema)