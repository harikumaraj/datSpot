import React from 'react';
import { Provider } from 'react-redux';

import { AppWithNavigationState, store } from "./store";

export default class Index extends React.Component{

    render(){
        return(
            <Provider store={store}>
                <AppWithNavigationState />
            </Provider>
        )
    }
}