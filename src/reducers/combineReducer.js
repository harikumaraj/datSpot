import {
    combineReducers,
} from 'redux';
import profileReducer from './profileReducer'

import {
    createNavigationReducer,
} from 'react-navigation-redux-helpers';

import Navigator from '../drawerNavigation/navigator'

const navReducer = createNavigationReducer(Navigator);

const appReducer = combineReducers({
    nav: navReducer,
    profile: profileReducer
});

export default appReducer;