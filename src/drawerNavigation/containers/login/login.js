import React from 'react';
import {
    View,
    Text,
    ImageBackground,
    Image,
    TextInput,
    Dimensions,
    KeyboardAvoidingView,
    Keyboard,
    Platform,
    TouchableOpacity,
    Animated,
    Alert
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import { LoginManager, AccessToken } from 'react-native-fbsdk';

import style from './style';
import {connect} from "react-redux";
import {updateProfile} from "../../../actions/profileAction";

let {height, width}= Dimensions.get('window');

class Login extends React.Component{

    static navigationOptions = {
        drawerLockMode:"locked-closed"
    };

    constructor(){
        super();

        this.state={
            marginBottom:0,
            length: new Animated.Value(height*0.3),
            password:"",
            username:""

        };
    }

    _keyboardDidShow(){
        console.log("Keyboard is active");
        this.setState({marginBottom:height*0.3});
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

    login() {

        if(this.state.username.length===0){
            Alert.alert("Input Error","Username field cannot be left blank. Please enter your username");
        }
        else if(this.state.password.length===0){
            Alert.alert("Input Error","Username field cannot be left blank. Please enter the password");
        }
        else{

            console.log(this.state);
            fetch('https://datspot.com/api/auth/local', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "username": this.state.username,
                    "password": this.state.password
                })
            })
                .then(response => {
                    const statusCode = response.status;
                    const data = response.json();
                    return Promise.all([statusCode, data]);
                })
                .then(([statusCode, data])=>{
                    console.log(statusCode,data);
                    if(statusCode===200){
                        this.props.updateProfile({
                            login:true,
                            jwtToken:data.data.token
                        });
                        this.getUserDetails();
                    }
                    else {
                    }
                })
                .catch((error) => {
                    console.log(error);
                });

        }
    }

    getUserDetails(){
        console.log({
            'Content-Type': 'application/json',
            'Authorization': this.props.profile.jwtToken
        });
        fetch('https://datspot.com/api/auth', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.props.profile.jwtToken
            }
        })
            .then(response => {
                const statusCode = response.status;
                const data = response.json();
                return Promise.all([statusCode, data]);
            })
            .then(([statusCode, data])=>{
                console.log(statusCode,data);
                if(statusCode===200){
                    this.props.updateProfile({
                        fullName:data.data.user.user.full_name,
                        email:data.data.user.email,
                        username:data.data.user.username,
                        somethingAboutYourself:data.data.user.user.about,
                        relationshipStatus:data.data.user.user.relationship,
                        musicSelectedList:data.data.user.user.music,
                        preferredCity:data.data.user.user.city,
                        dob:data.data.user.user.dob
                    });
                    if(data.data.user.user.dp!==null){
                        this.props.updateProfile({
                            profileImageObject:data.data.user.user.dp,
                            profileImage:{uri:`https://datspot.com/public/${data.data.user.user.dp.filename}`}
                        })
                    }
                    this.props.navigation.navigate("home");
                }
                else {
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    facebookLogin(){
        LoginManager.logInWithReadPermissions(['email']).then(
            function(result) {
                console.log(result);
                if (result.isCancelled) {
                    alert('Login was cancelled');
                } else {
                    // alert('Login was successful with permissions: '
                    //     + result.grantedPermissions.toString());
                    AccessToken.getCurrentAccessToken().then(
                        (data) => {
                            alert(`access token: ${data.accessToken.toString()}`);
                            console.log(data);
                        }
                    );
                }
            },
            function(error) {
                alert('Login failed with error: ' + error);
            }
        );
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
                                    placeholder='Username'
                                    placeholderTextColor={"rgb(150,150,150)"}
                                    style={style.textInput}
                                    underlineColorAndroid={"rgba(0,0,0,0)"}
                                    textContentType={"username"}
                                    autoCapitalize={"none"}
                                    autoCorrect={false}
                                    onChangeText={(data)=>{
                                        this.setState({username:data});
                                    }}
                                />
                            </View>
                        </View>
                        <View style={{height:"5%"}}/>
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
                                    placeholder='password'
                                    placeholderTextColor={"rgb(150,150,150)"}
                                    secureTextEntry={true}
                                    autoCorrect={false}
                                    style={style.textInput}
                                    underlineColorAndroid={"rgba(0,0,0,0)"}
                                    onChangeText={(data)=>{
                                        this.setState({password:data});
                                    }}
                                />
                            </View>
                        </View>
                        <View style={{height:"5%"}}/>
                        <TouchableOpacity
                            style={style.buttonContainer}
                            onPress={()=>{
                                this.login()
                            }}
                        >
                            <LinearGradient colors={["rgb(255, 65, 168)", "rgb( 255, 184, 71)"]} style={style.button}>
                                <Text style={style.buttonText}>LOGIN</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                    <View style={style.loginWithWrapper}>
                        <TouchableOpacity
                            style={style.forgotPasswordContainer}
                            onPress={()=>{this.props.navigation.navigate("resetPassword")}}
                        >
                            <Text style={style.forgotPasswordText}>
                                FORGOT PASSWORD?
                            </Text>
                        </TouchableOpacity>
                        <View style={style.loginWithTextContainer}>
                            <Text style={style.loginWithText}>
                                LOGIN WITH
                            </Text>
                        </View>
                        <View style={style.socialMediaContainer}>
                            <TouchableOpacity
                                style={[style.socialMediaIconContainer,{backgroundColor:"rgb(54, 85, 157)"}]}
                                onPress={()=>{
                                    this.facebookLogin();
                                }}
                            >
                                <FontAwesome name={"facebook"} size={25} color={"#fff"}/>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[style.socialMediaIconContainer,{backgroundColor:"rgb(26, 178, 232)"}]}
                                onPress={()=>{
                                    // this.twitterAuth();
                                }}
                            >
                                <FontAwesome name={"twitter"} size={25} color={"#fff"}/>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[style.socialMediaIconContainer,{backgroundColor:"rgb(58, 55, 55)"}]}
                                onPress={()=>{
                                    // this.twitterAuth();
                                }}
                            >
                                <Entypo name={"google-"} size={25} color={"#fff"}/>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                            style={style.loginWithTextContainer}
                            onPress={()=>{
                                this.props.navigation.navigate("signUp")
                            }}
                        >
                            <Text style={style.registerText}>
                                REGISTER
                            </Text>
                        </TouchableOpacity>
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

export default connect( mapStateToProps, { updateProfile })( Login );