import React from 'react';
import {View, Text, ImageBackground, TouchableOpacity, Dimensions, AsyncStorage, Platform, Alert} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Entypo from 'react-native-vector-icons/Entypo';
import ImagePicker from 'react-native-image-picker';

import style from './style';
import {connect} from "react-redux";
import {updateProfile} from "../../../actions/profileAction";

let {height, width}= Dimensions.get("window");

class UploadProfilePicture extends React.Component{

    componentDidMount(){
    }

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
        console.log({
            "full_name": this.props.profile.fullName,
            "dp": this.props.profile.profileImageObject._id,
            "music": this.props.profile.musicType,
            "relationship": this.props.profile.relationshipStatus,
            "city": this.props.profile.preferredCity,
            "about": this.props.profile.somethingAboutYourself,
            "dob": "1987-02-16"
        });
        fetch('https://datspot.com/api/user', {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization:this.props.profile.jwtToken
            },
            body: JSON.stringify({
                "full_name": this.props.profile.fullName,
                "dp": this.props.profile.profileImageObject._id,
                "music": this.props.profile.musicType,
                "relationship": this.props.profile.relationshipStatus,
                "city": this.props.profile.preferredCity,
                "about": this.props.profile.somethingAboutYourself,
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
                    this.props.navigate("datSpot");
                }
                else{
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render(){
        return(
            <View style={style.container}>
                <View style={style.textContainer}>
                    <Text style={style.text}>Upload your profile picture.</Text>
                </View>
                <View style={style.wrapper}>
                    <TouchableOpacity
                        style={{height:width*0.4, width:width*0.4}}
                        activeOpacity={0.8}
                        onPress={()=> {this.invokeImagePicker();} }
                    >
                        <ImageBackground
                            style={{height:width*0.4, width:width*0.4, borderRadius:width*0.8, overflow:"hidden"}}
                            source={this.props.profile.profileImage}
                            resizeMode={"cover"}
                            resizeMethod={"resize"}
                        />
                        <View
                            style={{
                                position:"absolute",
                                bottom:0,
                                right:0,
                                alignItems:"center",
                                justifyContent:"center",
                                height:50,
                                width:50,
                                borderRadius:25,
                                backgroundColor:"#fff"
                            }}
                        >
                            <Entypo name={"plus"} size={50} color={"rgb(255, 65, 168)"}/>
                        </View>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    style={style.buttonContainer}
                    onPress={()=>{
                        this.updateUserDetails();
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

export default connect( mapStateToProps, { updateProfile })( UploadProfilePicture );