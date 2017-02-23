import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom'
import thunkMiddleware from 'redux-thunk'
import { Provider } from 'react-redux'
import { Route, Router, browserHistory } from 'react-router';
import Main from './routes/Main'

import { createStore, applyMiddleware } from 'redux'
import reducer from './reducers'

let store = createStore(
	reducer,
	applyMiddleware(thunkMiddleware)
)

desktop()
function desktop(){
	render(
		<Provider store={store}>
			<Router history={browserHistory}>
				<Route path='/' component={Main} />
			</Router>
		</Provider>,
		document.getElementById('app')
	)
}