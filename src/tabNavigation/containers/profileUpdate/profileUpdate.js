import React from 'react';
import {
    View,
    Text,
    Image,
    FlatList,
    Dimensions,
    TouchableOpacity,
    ScrollView,
    ImageBackground,
    TextInput,
    Platform,
    Alert
} from 'react-native';
import { connect } from 'react-redux';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import LinearGradient from 'react-native-linear-gradient'

import Header from '../../components/header/header';
import style from "./style";

import {updateProfile} from '../../../actions/profileAction'
import ImagePicker from "react-native-image-picker";

let {height, width}= Dimensions.get("window");

class ProfileUpdate extends React.Component{

    constructor(props){
        super(props);
        this.state={
            fullName:props.profile.fullName,
            aboutYourself:props.profile.somethingAboutYourself
        };
    }

    componentDidMount(){
    }

    drawerToggle= ()=> {
        this.props.navigation.toggleDrawer();
    };

    invokeImagePicker(){
        let options = {
            title: 'Select Avatar',
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: response.uri };
                let pattern= "\/Documents";
                let position=response.uri.search(pattern);
                let localStorageUri= Platform.OS === 'ios' ?"~".concat(response.uri.substr(position)) :response.path;
                console.log(localStorageUri);
                this.props.updateProfile({
                    profileImage: {uri:response.uri}
                });
                this.uploadPhoto(response.uri);
            }
        });
    }

    async upload(url, data) {

        let options = {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: this.props.profile.jwtToken
            },
            method: 'POST'
        };

        options.body = new FormData();
        for (let key in data) {
            options.body.append(key, data[key]);
        }

        return fetch(url, options);
    }

    uploadPhoto(localStorageUri){

        this.upload('https://datspot.com/api/files', {
            docs: {
                uri: localStorageUri,
                type: 'image/jpeg',
                name: 'profilePicture.jpg',
            }
        })
            .then(response => {
                const statusCode = response.status;
                const data = response.json();
                return Promise.all([statusCode, data]);
            })
            .then(([statusCode, data])=>{
                console.log(statusCode, data);
                if (statusCode === 200) {
                    this.props.updateProfile({
                        profileImage:{uri:`https://datspot.com/public/${data.data.files.filename}`},
                        profileImageObject:data.data.files
                    });
                }
                else{
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    updateUserDetails(){
        this.props.updateProfile({fullName:this.state.fullName, somethingAboutYourself:this.state.aboutYourself});
        fetch('https://datspot.com/api/user', {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization:this.props.profile.jwtToken
            },
            body: JSON.stringify({
                "full_name": this.state.fullName,
                "dp": this.props.profile.profileImageObject._id,
                "music": this.props.profile.musicSelectedList,
                "relationship": this.props.profile.relationshipStatus,
                "city": this.props.profile.preferredCity,
                "about": this.state.aboutYourself,
                "dob": "1987-02-16"
            }),
        })
            .then(response => {
                const statusCode = response.status;
                const data = response.json();
                return Promise.all([statusCode, data]);
            })
            .then(([statusCode, data])=>{
                console.log(statusCode, data);
                this.setState({ loading: false, fetchFlag: false });
                if (statusCode === 200) {
                    this.getUserDetails();
                }
                else{
                }
            })
            .catch((error) => {
                console.log(error);
            });
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
                }
                else {
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render(){
        return(
            <View style={style.wrapper}>
                <Header
                    onPressLeftButton={ this.drawerToggle }
                    leftIcon={ () => <View style={style.headerIconContainer}>
                        <SimpleLineIcons
                            name="menu"
                            size={25}
                            style={{color:"#ffffff"}}
                        />
                    </View>}
                    middleText={ "PROFILE" }
                    onPressRightButton={ this.drawerToggle }
                    rightIcon={ () => <View style={style.headerIconContainer}>
                        <View style={style.notificationCountContainer}>
                            <Text style={{color:"rgb(255,65,168)", fontSize:10}}>3</Text>
                        </View>
                        <Image resizeMode={"contain"} style={style.notificationIcon} source={require("../../../assets/notificationBell.png")}/>
                    </View> }
                />
                <View style={style.container}>
                    <ScrollView>
                        <View style={style.profileWrapper}>
                            <View style={style.profileImageContainer}>
                                <Image source={this.props.profile.profileImage} resizeMode={"cover"} style={style.profileImage}/>
                            </View>
                        </View>
                        <View style={{height:height*0.1, width:"100%", alignItems:"center", justifyContent:"center", paddingBottom:height*0.03}}>
                            <TouchableOpacity
                                style={{width:"70%", height:"80%", borderRadius:100}}
                                onPress={()=> {this.invokeImagePicker();} }
                            >
                                <LinearGradient
                                    colors={["rgb(255, 65, 168)", "rgb( 255, 184, 71)"]}
                                    style={{width:"100%", height:"100%", alignItems:"center", justifyContent:"center", borderRadius:100}}
                                >
                                    <Text style={{color:"#fff", fontSize:14}}>CHANGE PROFILE PICTURE</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                        <View style={{height:height*0.07, width:"100%", alignItems:"center", justifyContent:"center"}}>
                            <View style={{height:"90%", width:"100%", paddingHorizontal:"5%", justifyContent:"center", backgroundColor:"#fff", borderRadius:100}}>
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
                        <View style={{height:height*0.25, width:"100%", alignItems:"center", justifyContent:"center"}}>
                            <View style={{height:"90%", width:"100%", backgroundColor:"#fff", borderRadius:10, paddingHorizontal:"5%", paddingVertical:"3%"}}>
                                <TextInput
                                    placeholder='Let others know about your likes and dislikes.'
                                    placeholderTextColor={"rgb(150,150,150)"}
                                    style={style.textInput}
                                    underlineColorAndroid={"rgba(0,0,0,0)"}
                                    autoCapitalize={"sentences"}
                                    autoCorrect={true}
                                    multiline={true}
                                    numberOfLines={50}
                                    value={this.state.aboutYourself}
                                    onChangeText={(data)=>{
                                        this.setState({aboutYourself:data});
                                    }}
                                />
                            </View>
                        </View>
                        <View
                            style={{
                                flexDirection:"row",
                                height:height*0.1,
                                width:"100%",
                                justifyContent:"space-around",
                                alignItems:"center"
                            }}
                        >
                            <TouchableOpacity
                                style={{height:"60%", width:"45%", borderRadius:100}}
                                onPress={()=>{
                                    this.props.navigation.navigate("profile");
                                }}
                            >
                                <LinearGradient
                                    colors={["rgb(255, 65, 168)", "rgb( 255, 184, 71)"]}
                                    style={{height:"100%", width:"100%", borderRadius:100, alignItems:"center", justifyContent:"center"}}
                                >
                                    <View style={{height:"97%", width:"98%", alignItems:"center", justifyContent:"center", backgroundColor:"#000", borderRadius:100}}>
                                        <Text style={{color:"#fff", fontSize:14}}>CANCEL</Text>
                                    </View>
                                </LinearGradient>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{height:"60%", width:"45%", borderRadius:100}}
                                onPress={()=>{
                                    this.updateUserDetails();
                                }}
                            >
                                <LinearGradient
                                    colors={["rgb(255, 65, 168)", "rgb( 255, 184, 71)"]}
                                    style={{height:"100%", width:"100%", backgroundColor:"blue", borderRadius:100, alignItems:"center", justifyContent:"center"}}
                                >
                                    <Text style={{color:"#fff", fontSize:14}}>SAVE</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </View>
        );
    }
}

function mapStateToProps(state){
    return {
        profile:state.profile
    }
}

export default connect(mapStateToProps,{updateProfile})(ProfileUpdate);