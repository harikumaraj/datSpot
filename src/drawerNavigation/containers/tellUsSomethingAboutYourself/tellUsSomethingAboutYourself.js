import React from 'react';
import {View, Text, Image, TouchableOpacity, FlatList, Dimensions, TextInput} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

let {height, width}= Dimensions.get("window");

import style from './style';
import {connect} from "react-redux";
import {updateProfile} from "../../../actions/profileAction";

class TellUsSomethingAboutYourself extends React.Component{

    constructor(){
        super();
        this.state={
            aboutYourself:""
        };
    }

    render(){
        return(
            <View style={style.container}>
                <View style={style.textContainer}>
                    <Text style={style.text}>Tell us something about yourself.</Text>
                </View>
                <View style={style.wrapper}>
                    <View style={{height:"80%",width:"100%",borderRadius:25, backgroundColor:"#fff",padding:"5%"}}>
                        <TextInput
                            placeholder='Let others know about your likes and dislikes.'
                            placeholderTextColor={"rgb(150,150,150)"}
                            style={style.textInput}
                            underlineColorAndroid={"rgba(0,0,0,0)"}
                            autoCapitalize={"sentences"}
                            autoCorrect={true}
                            multiline={true}
                            numberOfLines={50}
                            onChangeText={(data)=>{
                                this.setState({aboutYourself:data});
                            }}
                        />
                    </View>
                </View>
                <TouchableOpacity
                    style={style.buttonContainer}
                    onPress={()=>{
                        this.props.updateProfile({somethingAboutYourself:this.state.aboutYourself});
                        this.props.scrollToIndex(4);
                    }}
                >
                    <LinearGradient colors={["rgb(255, 65, 168)", "rgb( 255, 184, 71)"]} style={style.button}>
                        <Text style={style.buttonText}>PROCEED</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        profile: state.profile
    };
}

export default connect( mapStateToProps, { updateProfile })( TellUsSomethingAboutYourself );