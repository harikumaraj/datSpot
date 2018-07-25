import React from 'react';
import { Dimensions } from 'react-native';
import { createDrawerNavigator } from 'react-navigation';

import Login from './containers/login/login';
import SignUp from './containers/signUp/signUp';
import ResetPassword from './containers/resetPassword/resetPasswordPage';
import ProfileDetailsUpdate from './containers/profileDetailsUpdate/profileDetailsUpdate';
import TabNavigator from '../tabNavigation/tabNavigator';
import CustomDrawerContentComponent from './components/CustomDrawerContentComponent/CustomDrawerContentComponent';

let {height, width}= Dimensions.get("window");

export default createDrawerNavigator(
    {
        login: Login,
        signUp: SignUp,
        resetPassword: ResetPassword,
        profileDetailsUpdate:ProfileDetailsUpdate,
        tabNavigator: TabNavigator,
    },
    {
        initialRouteName:"tabNavigator",
        contentOptions: {
            activeTintColor: 'rgb( 240, 66, 131)',
            inactiveTintColor: 'gray',
        },
        contentComponent: CustomDrawerContentComponent,
        drawerWidth: width*0.8
    },
);