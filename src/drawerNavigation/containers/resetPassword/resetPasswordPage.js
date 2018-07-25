import React from 'react';
import {View, Text, ImageBackground, Image, TextInput, Dimensions, KeyboardAvoidingView, Keyboard, Platform, TouchableOpacity, Animated} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import style from './style';

let {height, width}= Dimensions.get('window');

export default class ResetPassword extends React.Component{

    static navigationOptions = {
        drawerLockMode:"locked-closed"
    };

    constructor(){
        super();

        this.state={
            marginBottom:0,
            length: new Animated.Value(height*0.3),
        };
    }

    _keyboardDidShow(){
        console.log("Keyboard is active");
        this.setState({marginBottom:height*0.4});
        Animated.timing(
            this.state.length,
            {
                toValue: height*0.2,
                duration: 200,
            }
        ).start();
    }

    _keyboardDidHide(){
        console.log("Keyboard is inactive");
        this.setState({marginBottom:0});
        Animated.timing(
            this.state.length,
            {
                toValue: height*0.3,
                duration: 200,
            }
        ).start();
    }

    componentDidMount(){
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', ()=>{this._keyboardDidShow()});
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', ()=>{this._keyboardDidHide()});
    }

    componentWillUnmount(){
        Keyboard.dismiss();
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    render(){
        return(
            <ImageBackground
                source={require('../../../assets/bg.png')}
                style={[style.imageBackground, {paddingBottom:this.state.marginBottom}]}
            >
                <View style={ style.container }>
                    <View style={style.imageWrapper}>
                        <Animated.Image
                            resizeMode={"contain"}
                            source={require('../../../assets/datSpotLogo.png')}
                            style={{height:this.state.length, width:this.state.length}}
                        />
                    </View>
                    <View
                        style={style.formWrapper}
                    >
                        <View style={[style.inputContainer]}>
                            <View style={style.iconContainer}>
                                <MaterialCommunityIcons name={"email-outline"} size={25} color={"#666"}/>
                            </View>
                            <View style={style.textInputContainer}>
                                <TextInput
                                    placeholder='Email'
                                    placeholderTextColor={"rgb(150,150,150)"}
                                    style={style.textInput}
                                    underlineColorAndroid={"rgba(0,0,0,0)"}
                                />
                            </View>
                        </View>
                        <View style={{height:"3%"}}/>
                        <TouchableOpacity style={style.buttonContainer}>
                            <LinearGradient colors={["rgb(255, 65, 168)", "rgb( 255, 184, 71)"]} style={style.button}>
                                <Text style={style.buttonText}>RESET PASSWORD</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        <View style={{flex:1, marginTop:"3%",alignItems:"center", justifyContent:"flex-end"}}>
                            <Text style={{color:"#fff"}}>Already have an account? <Text onPress={()=>{this.props.navigation.navigate("login")}} style={{color:"rgb( 240, 66, 131)"}}>Sign in here.</Text></Text>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        );
    }
}