import React from 'react';
import {
    compose,
    createStore,
    applyMiddleware,
} from 'redux';
import {
    reduxifyNavigator,
    createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';
import { connect } from 'react-redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import reduxReset from 'redux-reset'

import appReducer from './reducers/combineReducer';
import Navigator from './drawerNavigation/navigator'

const middleware = createReactNavigationReduxMiddleware(
    "root",
    state => state.nav,
);

const App = reduxifyNavigator(Navigator, "root");
const mapStateToProps = (state) => ({
    state: state.nav,
});
const AppWithNavigationState = connect(mapStateToProps)(App);

const persistConfig = {
    key: 'root',
    storage: storage,
    blacklist: ['nav']
};

const persistedReducer = persistReducer(persistConfig, appReducer);

const enhanceCreateStore = compose(
    applyMiddleware( middleware, logger, thunk ),
    reduxReset()
)(createStore);

const store = enhanceCreateStore(persistedReducer);

let persistor = persistStore(store);

export { AppWithNavigationState, persistor, store };