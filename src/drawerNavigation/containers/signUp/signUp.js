import React from 'react';
import {View, Text, ImageBackground, Image, TextInput, Dimensions, Keyboard, Platform, TouchableOpacity, Animated, Alert} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';

import { updateProfile } from '../../../actions/profileAction'
import style from './style';

let emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

let {height, width}= Dimensions.get('window');

class SignUp extends React.Component{

    static navigationOptions = {
        drawerLockMode:"locked-closed"
    };

    constructor(props){
        super(props);

        this.state={
            marginBottom:0,
            length: new Animated.Value(height*0.3),
            fullName:this.props.profile.fullName,
            username:this.props.profile.username,
            email:this.props.profile.email,
            password:"",
            passwordConfirm:"",
            loading:false,
            fetchFlag:false
        };
    }

    _keyboardDidShow(){
        console.log("Keyboard is active");
        this.setState({marginBottom:height*0.6});
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

    getRegistration() {

        console.log({
            "name": this.state.fullName,
            "username": this.state.username,
            "password": this.state.password,
            "email": this.state.email,
            "signup": true
        });

        if(this.state.fullName.length===0){
            Alert.alert("Input Error","Full name field cannot be left blank. Please enter your full name");
        }
        else if(this.state.username.length===0){
            Alert.alert("Input Error","Username field cannot be left blank. Please enter your username");
        }
        else if(this.state.email.match(emailPattern)===null||this.state.email.length===0){
            Alert.alert("Input Error","Email id you have entered is invalid. Please enter your valid email id");
        }
        else if(this.state.password.length===0|| this.state.passwordConfirm!==this.state.password){
            Alert.alert("Input Error","Password mismatch. Please enter your passwords again");
        }
        else{

            this.setState({loading: true, fetchFlag: true});
            fetch('https://datspot.com/api/auth/local', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "name": this.state.fullName,
                    "username": this.state.username,
                    "password": this.state.password,
                    "email": this.state.email,
                    "accType": "user",
                    "signup": true
                })
            })
                .then(response => {
                    const statusCode = response.status;
                    const data = response.json();
                    return Promise.all([statusCode, data]);
                })
                .then(([statusCode, data])=>{
                    console.log(data);
                    if(statusCode===200){
                        this.props.updateProfile({
                            fullName:this.state.fullName,
                            email:this.state.email,
                            username:this.state.username,
                            login:true,
                            jwtToken:data.data.token
                        });
                        this.props.navigation.navigate("profileDetailsUpdate");
                    }
                    else {
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
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
                        <View style={style.inputContainer}>
                            <View style={style.iconContainer}>
                                <Image
                                    source={require('../../../assets/user.png')}
                                    resizeMode={"contain"}
                                    style={style.icon}
                                />
                            </View>
                            <View style={style.textInputContainer}>
                                <TextInput
                                    placeholder='Full name'
                                    placeholderTextColor={"rgb(150,150,150)"}
                                    style={style.textInput}
                                    underlineColorAndroid={"rgba(0,0,0,0)"}
                                    textContentType={"name"}
                                    autoCapitalize={"words"}
                                    autoCorrect={false}
                                    value={this.state.fullName}
                                    onChangeText={(data)=>{
                                        this.setState({fullName:data});
                                    }}
                                />
                            </View>
                        </View>
                        <View style={{height:"3%"}}/>
                        <View style={style.inputContainer}>
                            <View style={style.iconContainer}>
                                <Image
                                    source={require('../../../assets/user.png')}
                                    resizeMode={"contain"}
                                    style={style.icon}
                                />
                            </View>
                            <View style={style.textInputContainer}>
                                <TextInput
                                    placeholder='Username'
                                    placeholderTextColor={"rgb(150,150,150)"}
                                    style={style.textInput}
                                    underlineColorAndroid={"rgba(0,0,0,0)"}
                                    textContentType={"username"}
                                    autoCapitalize={"none"}
                                    autoCorrect={false}
                                    value={this.state.username}
                                    onChangeText={(data)=>{
                                        this.setState({username:data});
                                    }}
                                />
                            </View>
                        </View>
                        <View style={{height:"3%"}}/>
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
                                    autoCapitalize={"none"}
                                    keyboardType={"email-address"}
                                    autoCorrect={false}
                                    value={this.state.email}
                                    onChangeText={(data)=>{
                                        this.setState({email:data});
                                    }}
                                />
                            </View>
                        </View>
                        <View style={{height:"3%"}}/>
                        <View style={[style.inputContainer]}>
                            <View style={style.iconContainer}>
                                <Image
                                    source={require('../../../assets/pass.png')}
                                    resizeMode={"contain"}
                                    style={style.icon}
                                />
                            </View>
                            <View style={style.textInputContainer}>
                                <TextInput
                                    placeholder='Create a password'
                                    placeholderTextColor={"rgb(150,150,150)"}
                                    style={style.textInput}
                                    underlineColorAndroid={"rgba(0,0,0,0)"}
                                    secureTextEntry={true}
                                    autoCorrect={false}
                                    onChangeText={(data)=>{
                                        this.setState({password:data});
                                    }}
                                />
                            </View>
                        </View>
                        <View style={{height:"3%"}}/>
                        <View style={[style.inputContainer]}>
                            <View style={style.iconContainer}>
                                <Image
                                    source={require('../../../assets/pass.png')}
                                    resizeMode={"contain"}
                                    style={style.icon}
                                />
                            </View>
                            <View style={style.textInputContainer}>
                                <TextInput
                                    placeholder='Confirm password'
                                    placeholderTextColor={"rgb(150,150,150)"}
                                    style={style.textInput}
                                    underlineColorAndroid={"rgba(0,0,0,0)"}
                                    secureTextEntry={true}
                                    autoCorrect={false}
                                    onChangeText={(data)=>{
                                        this.setState({passwordConfirm:data});
                                    }}
                                />
                            </View>
                        </View>
                        <View style={{height:"3%"}}/>
                        <TouchableOpacity
                            style={style.buttonContainer}
                            onPress={()=>{
                                Keyboard.dismiss();
                                this.getRegistration();
                            }}
                        >
                            <LinearGradient colors={["rgb(255, 65, 168)", "rgb( 255, 184, 71)"]} style={style.button}>
                                <Text style={style.buttonText}>SIGNUP</Text>
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

function mapStateToProps(state) {
    return {
        profile: state.profile
    };
}

export default connect( mapStateToProps, { updateProfile })( SignUp );