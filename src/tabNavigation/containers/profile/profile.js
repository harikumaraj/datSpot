import React from 'react';
import {View, Text, Image, FlatList, Dimensions, TouchableOpacity, ScrollView, ImageBackground} from 'react-native';
import { connect } from 'react-redux';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Header from '../../components/header/header';
import style from "./style";

let {height, width}= Dimensions.get("window");

class Profile extends React.Component{

    constructor(){
        super();
        this.state={
            images:[
                {url:require("../../../assets/profileImage1.jpg")},
                {url:require("../../../assets/profileImage2.jpg")},
                {url:require("../../../assets/profileImage3.jpg")},
                {url:require("../../../assets/profileImage4.jpg")},
                {url:require("../../../assets/profileImage5.jpg")},
                {url:require("../../../assets/profileImage6.jpg")},
                {url:require("../../../assets/profileImage6.jpg")},
            ]
        }
    }

    componentDidMount(){
    }

    drawerToggle= ()=> {
        this.props.navigation.toggleDrawer();
    };

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
                            <View style={style.profileNameAndAddPhotoButton}>
                                <View style={{flex:1, alignItems:"center", justifyContent:"center", flexDirection:"row"}}>
                                    <Text style={style.name}>{this.props.profile.username}  </Text>
                                    <FontAwesome
                                        name="edit"
                                        size={20}
                                        style={{color:"rgb(255, 65, 168)"}}
                                        onPress={()=>{
                                            this.props.navigation.navigate("updateProfile");
                                        }}
                                    />
                                </View>
                                <View style={{flex:1, alignItems:"center", justifyContent:"center", flexDirection:"row"}}>
                                    <TouchableOpacity
                                        style={{height:26, alignItems:"center", justifyContent:"center", width:"40%", backgroundColor:"rgb(255, 65, 168)", borderRadius:13}}
                                    >
                                        <Text style={{color:"#fff", fontSize:12}}>Add more images</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        {
                            this.props.profile.somethingAboutYourself.length===0
                                ?<View style={{height:40, width:"100%", alignItems:"center", justifyContent:"center"}}>
                            <Text style={style.profileDescription}>No description available! Get going now!</Text>
                                </View>
                            :<Text style={style.profileDescription}>{this.props.profile.somethingAboutYourself}</Text>
                        }
                        <View style={style.imagesContainer}>
                            <FlatList
                                data={this.state.images}
                                style={{marginLeft:-10}}
                                keyExtractor={(item, index) => index.toString()}
                                showsVerticalScrollIndicator={false}
                                ItemSeparatorComponent={()=><View style={{height:10}}/>}
                                onEndReachedThreshold={0.5}
                                numColumns={3}
                                renderItem={({index, item})=>{
                                    return(
                                        <View style={{width:"33.333%", height:width*0.3, flexDirection:"row"}}>
                                            <View style={{width:10}}/>
                                            <View style={{flex:1, flexDirection:"row"}}>
                                                <Image source={item.url} style={{height:width*0.3, width:"100%"}} resizeMode={"cover"} resizeMethod={"resize"}/>
                                            </View>
                                        </View>
                                    );
                                }}
                            />
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

export default connect(mapStateToProps,{})(Profile);