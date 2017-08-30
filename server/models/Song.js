import mongoose from 'mongoose'

const songSchema = new mongoose.Schema({
	title: {
		type: String,
		trim: true,
		required: true
	},
	/*user: {
		type: mongoose.ObjectId,
		ref: 'User'
	},*/
	lyrics: [{
		type: mongoose.Schema.ObjectId,
		ref: 'Lyric'
	}]
})

/*songSchema.statics.addLyric = async function(id, content) {
	const Lyric = mongoose.model('Lyric')
	const lyric = await (new Lyric({ content, song: id }))
	console.log(lyric)
	const song = await this.findByIdAndUpdate(id, { $addToSet: { lyrics: lyric.id } }, { new: true })
	return song
}*/

songSchema.statics.addLyric = function(id, content) {
	const Lyric = mongoose.model('Lyric');
	return this.findById(id)
		.then(song => {
			const lyric = new Lyric({ content, song })
			song.lyrics.push(lyric)
			return Promise.all([lyric.save(), song.save()])
				.then(([lyric, song]) => song);
		});
}

/*songSchema.statics.findLyrics = function(id) {
	return this.findById(id).populate('lyrics').then(song => song.lyrics)
}*/

songSchema.statics.findLyrics = function(id) {
  return this.findById(id)
    .populate('lyrics')
    .then(song => song.lyrics);
}

 
export default mongoose.model('Song', songSchema)