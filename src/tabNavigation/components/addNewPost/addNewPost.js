import React from 'react';
import { View, Text, Switch } from 'react-native';

import style from './style'

export default class AddNewPost extends React.Component{

    componentDidMount(){
        console.log("popup success");
    }

    render(){
     return(
         <View style={style.wrapper}>
             <Switch/>
         </View>
     );
    }
}