import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import style from './style';

export default class Header extends Component{

    render(){
        const { onPressLeftButton, leftIcon, middleText, onPressRightButton, rightIcon } = this.props;

        return(
            <View  style= { style.headerContainer }>
                <TouchableOpacity
                    style = { style.leftContainer }
                    onPress = { onPressLeftButton }
                >
                    { leftIcon() }
                </TouchableOpacity>
                <View style= { style.middleContainer }>
                    <Text style={style.middleText}>{ middleText }</Text>
                </View>
                <TouchableOpacity
                    style = { style.rightContainer }
                    onPress = { onPressRightButton }
                >
                    { rightIcon() }
                </TouchableOpacity>
            </View>
        )
    }
}