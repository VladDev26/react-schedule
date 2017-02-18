import React from 'react';
import {render} from 'react-dom';
// import createLogger from 'redux-logger';

import { Provider } from 'react-redux';

import App from './containers/App';

import appReducer from './reducers/appReducer';

import 'bootstrap/scss/bootstrap.scss';
import './styles/index.scss';


import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

// const logger = createLogger();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const initialState = {};
const store = configureStore(initialState);


function configureStore(initialState) {
    return createStore(
        combineReducers({
        	appReducer
        }),
        initialState,
        // composeEnhancers(applyMiddleware(thunk, logger))
        composeEnhancers(applyMiddleware(thunk))
    );
}


render(
	<Provider store={store}>
		<App/>
	</Provider>
	, document.getElementById('app')
);