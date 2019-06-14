import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk/es';
import logger from 'redux-logger';

import reducers from './appRedux/reducers';

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, applyMiddleware(thunk));

export default store;
