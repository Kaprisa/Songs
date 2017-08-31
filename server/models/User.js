import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcrypt-nodejs'
import crypto from 'crypto'

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		unique: true,
		trim: true,
		required: true,
		lowercase: true,
		validate: [validator.isEmail, 'Email is invalid']
	},
	password: {
		type: String,
		required: true
	}
})

userSchema.pre('save', function save(next) {
	const user = this
	if (!user.isModified('password')) return next()
		bcrypt.genSalt(10, (err, salt) => {
			if (err) return next(err)
			bcrypt.hash(user.password, salt, null, (err, hash) => {
				if (err) return next(err)
				user.password = hash
				next()
			})
		})
})

userSchema.methods.comparePassword = function(password, cb) {
	bcrypt.compare(password, this.password, (err, isMatch) => {
		cb(err, isMatch)
	})
}

export default mongoose.model('User', userSchema)