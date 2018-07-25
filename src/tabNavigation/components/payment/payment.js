import React from 'react';
import {View, Text, StyleSheet, ImageBackground, Dimensions, Image, TouchableOpacity} from 'react-native';
import Swiper from 'react-native-deck-swiper';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

import style from './style'

let {height, width}= Dimensions.get("window");

export default class Payment extends React.Component{

    componentDidMount(){
        console.log(this.props);
    }

    constructor(props){
        super();
        this.cardDetails=props.navigation.getParam("cardDetails");
    }

    render(){
        return(
            <View style={style.container}>
                <View style={style.backButtonWrapper}>
                    <View style={style.backButtonContainer}>
                        <Text style={[style.backButtonText,{color:"rgb(255, 65, 168)"}]}>{"< " }</Text>
                        <Text style={style.backButtonText}>Back</Text>
                    </View>
                </View>
                <View style={style.contentContainer}>
                    <View style={style.headingWrapper}>
                        <View style={style.headingContainer}>
                            <Text style={style.heading}>{this.cardDetails.title}</Text>
                            <Text style={{color:"#fff", fontSize:11}}>{this.cardDetails.location}    {this.cardDetails.date}</Text>
                        </View>
                        <View style={style.counterWrapper}>
                            <View style={style.counterContainer}>
                                <TouchableOpacity style={style.counterButtonContainer}>
                                <LinearGradient colors={["rgb(255, 65, 168)", "rgb( 255, 184, 71)"]} style={style.counterButtonWrapper}>
                                </LinearGradient>
                                </TouchableOpacity>
                                <View style={{flex:1}}>
                                </View>
                                <TouchableOpacity style={style.counterButtonContainer}>
                                <LinearGradient colors={["rgb(255, 65, 168)", "rgb( 255, 184, 71)"]} style={style.counterButtonWrapper}>
                                </LinearGradient>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}