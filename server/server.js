import express from 'express'
import expressGraphQL from 'express-graphql'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import './models/Song'
import './models/Lyric'
import schema from './schema/schema'

const app = express()

const MONGO_URI = 'mongodb://kaprisa:kaprisa@ds111754.mlab.com:11754/lyricaldb'
if (!MONGO_URI) {
	throw new Error('You must provide a MongoLab URI')
}

mongoose.Promise = global.Promise
mongoose.connect(MONGO_URI)
mongoose.connection
	.once('open', () => console.log('Connected to MongoLab instance.'))
	.on('error', error => console.log('Error connecting to MongoLab:', error))

app.use(bodyParser.json());
app.use('/graphql', expressGraphQL({
	schema,
	graphiql: true
}))

import webpackMiddleware from 'webpack-dev-middleware'
import webpack from 'webpack'
import webpackConfig from '../webpack.config'
app.use(webpackMiddleware(webpack(webpackConfig)))

export default app
