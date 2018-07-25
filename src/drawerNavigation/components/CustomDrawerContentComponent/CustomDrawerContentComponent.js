import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions, Image } from 'react-native'
import { DrawerItems, SafeAreaView } from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import style from './style';
import {updateProfile} from "../../../actions/profileAction";
import {connect} from "react-redux";

let {height, width} = Dimensions.get('window');

class CustomDrawerContentComponent extends React.Component{

    componentDidMount(){
    }

    render(){
        return(
            <ScrollView>
                <SafeAreaView style={{height:height}} forceInset={{ top: 'always', horizontal: 'never' }}>
                    <LinearGradient
                        start={{x: 0, y: 0.5}}
                        end={{x: 1, y: 0.5}}
                        colors={["rgb( 255, 184, 71)", "rgb(255, 65, 168)"]}
                        style={{flex:1, paddingTop:10}}
                    >
                        <View style={{width:"100%", height:height*0.1, flexDirection:"row"}}>
                            <TouchableOpacity
                                style={{flex:3, flexDirection:"row"}}
                                onPress={()=>{
                                    this.props.updateProfile({login:false});
                                    this.props.navigation.navigate("login");
                                }}
                            >
                                <View style={{flex:1, alignItems:"center", justifyContent:"center"}}>
                                    <Image source={require("../../../assets/face.jpg")} style={{height:height*0.08, width:height*0.08, borderRadius:height*0.04}} resizeMode={"cover"} resizeMethod={"resize"}/>
                                    <MaterialCommunityIcons name={"play-circle"} size={20} color={"#fff"} style={{position:"absolute", bottom:width*0.015, right:width*0.015, zIndex:1}}/>
                                </View>
                                <View style={{flex:2, paddingLeft:5, justifyContent:"space-around", paddingVertical:width*0.04}}>
                                    <Text style={{color:"#fff"}}>@LauraBrooks13</Text>
                                    <Text style={{color:"#fff", fontSize:12}}>logout</Text>
                                </View>
                            </TouchableOpacity>
                            <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
                                <View style={style.notificationCountContainer}>
                                    <Text style={{color:"#fff", fontSize:10}}>3</Text>
                                </View>
                                <Image resizeMode={"contain"} style={style.notificationIcon} source={require("../../../assets/whiteNotificationBell.png")}/>
                            </View>
                        </View>
                        <View style={{marginTop:30, paddingHorizontal:"5%"}}>
                            <Text style={{color:"#000", fontWeight:"bold", fontSize:14, marginBottom:10}}>MENU</Text>
                            <TouchableOpacity
                                style={{height:height*0.05, paddingHorizontal:"5%", justifyContent:"center"}}
                                onPress={()=>{
                                    this.props.navigation.navigate("profile")
                                }}
                            >
                                <Text style={{color:"#fff", fontSize:12}}>My profile</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{height:height*0.05, paddingHorizontal:"5%", justifyContent:"center"}}>
                                <Text style={{color:"#fff", fontSize:12}}>My Tickets</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{height:height*0.05, paddingHorizontal:"5%", justifyContent:"center"}}>
                                <Text style={{color:"#fff", fontSize:12}}>My Vouchers</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{height:height*0.05, paddingHorizontal:"5%", justifyContent:"center"}}>
                                <Text style={{color:"#fff", fontSize:12}}>My Friends</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{height:height*0.05, paddingHorizontal:"5%", justifyContent:"center"}}>
                                <Text style={{color:"#fff", fontSize:12}}>Find friends</Text>
                            </TouchableOpacity>
                        </View>
                    </LinearGradient>
                </SafeAreaView>
            </ScrollView>
        )
    }
}

function mapStateToProps(state) {
    return {
        profile: state.profile
    };
}

export default connect( mapStateToProps, { updateProfile })( CustomDrawerContentComponent );