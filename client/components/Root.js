import React, { Component } from 'react'
import ApolloClient from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { Router, Route, Switch } from 'react-router-dom'
import history from '../history'
import Header from './Header'
import SongList from './SongList'
import SongCreate from './SongCreate'
import SongDetails from './SongDetails'

const client = new ApolloClient({
	dataIdFromObject: o => o.id
})

class Root extends Component {
	render() {
		return (
			<ApolloProvider client={client}>
				<Router history={history}>
					<div>
						<Header />
						<Switch>
							<Route path="/" exact component={SongList} />
							<Route path="/song/new" component={SongCreate} />
							<Route path="/song/:id" component={SongDetails} />
						</Switch>
					</div>
				</Router>
			</ApolloProvider>
		)
	}
}

export default Root