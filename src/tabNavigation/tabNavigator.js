import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';

import CustomTabNavigationBar from './components/customizedTabTabNavigator/customizedTabTabNavigator'
import Home from './containers/home/home';
import Discover from './containers/discover/discover';
import Messaging from './containers/messaging/messaging';
import Profile from './containers/profile/profile';
import DatSpot from './containers/datSpot/datSpot';
import PostDetail from './containers/postDetail/postDetail';
import ProfileUpdate from './containers/profileUpdate/profileUpdate';
import EventDetails from "./containers/eventDetails/eventDetails";
import Payment from "./components/payment/payment";
import ChatPage from './components/chat/chatPage'

export default createBottomTabNavigator(
    {
        home: Home,
        discover: Discover,
        datSpot: DatSpot,
        message: Messaging,
        profile: Profile,
        postDetails: PostDetail,
        updateProfile:ProfileUpdate,
        eventDetails: EventDetails,
        payment: Payment,
        chat:ChatPage
    },
    {
        initialRouteName:"home",
        tabBarOptions: {
            activeTintColor: 'rgb(255, 195, 43)',
            inactiveTintColor: 'gray',
        },
        tabBarComponent: CustomTabNavigationBar
    },
);