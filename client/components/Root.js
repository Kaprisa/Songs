import React, { Component } from 'react'
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { Router, Route, Switch } from 'react-router-dom'
import history from '../history'
import Header from './Header'
import SongList from './SongList'
import SongCreate from './SongCreate'
import SongDetails from './SongDetails'
import LoginForm from './LoginForm'
import NotFound from './NotFound'

const networkInterface = createNetworkInterface({
	uri: '/graphql',
	opts: {
		credentials: 'same-origin'
	}
})

const client = new ApolloClient({
	networkInterface,
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
							<Route path="/login" component={LoginForm} />
							<Route path="/signup" component={LoginForm} />
							<Route component={NotFound} />
						</Switch>
					</div>
				</Router>
			</ApolloProvider>
		)
	}
}

export default Root