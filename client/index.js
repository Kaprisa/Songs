/*import React from 'react'
import { render } from 'react-dom'
import Root from './components/Root'

render(<Root />, document.getElementById('root'))*/

import React from 'react'
import { render } from 'react-dom'
import Root from './components/Root'
import { AppContainer } from 'react-hot-loader'
import './styles/styles.sass'

const renderApp = Component => {
	render(
		<AppContainer>
			<Component />
		</AppContainer>,
		document.getElementById('root')
	)
}

renderApp(Root)

if(module.hot) {
	module.hot.accept('./components/Root', () => { renderApp(Root) })
}