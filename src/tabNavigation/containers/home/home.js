import React from 'react';
import {View, Text, Image, FlatList, Dimensions, TouchableOpacity, Alert} from 'react-native';
import { connect } from 'react-redux';
import {persistor, store} from "../../../store";
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import {updateProfile} from "../../../actions/profileAction";
import Header from '../../components/header/header';
import style from "./style";

let {height, width}= Dimensions.get("window");

class Home extends React.Component{

    constructor() {
        super();
        this.state = {
            posts: [
                {
                    username: "@LauraBrooks13",
                    likesCount: 203,
                    commentCount: 8,
                    postedTime: "15mins ago",
                    imageUrl: require("../../../assets/laura.jpeg"),
                },
                {
                    username: "@LauraBrooks13",
                    likesCount: 203,
                    commentCount: 8,
                    postedTime: "15mins ago",
                    imageUrl: require("../../../assets/laura.jpeg"),
                }
            ],
        };
    }

    componentDidMount(){
        this.subscribe=persistor.subscribe(()=>{
            if(store.getState().profile.login===false)
                this.props.navigation.navigate("login");
        });
    }

    componentWillUnmount(){
        this.subscribe();
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
                    middleText={ "HOME" }
                    onPressRightButton={ this.drawerToggle }
                    rightIcon={ () => <View style={style.headerIconContainer}>
                        <View style={style.notificationCountContainer}>
                            <Text style={{color:"rgb(255,65,168)", fontSize:10}}>3</Text>
                        </View>
                        <Image resizeMode={"contain"} style={style.notificationIcon} source={require("../../../assets/notificationBell.png")}/>
                    </View> }
                />
                <View style={style.container}>
                    <FlatList
                        style={{flex:1}}
                        data={this.state.posts}
                        ListFooterComponent={()=><View style={{width:"100%", height:height*0.05}}/>}
                        ItemSeparatorComponent={()=><View style={{width:"100%", height:5}}/>}
                        initialNumToRender={2}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item, index})=>{
                            return(
                                <View key={index} style={{height:height*0.7}}>
                                    <TouchableOpacity
                                        style={{flex:1, flexDirection:"row", backgroundColor:"#111", alignItems:"center",paddingLeft:"5%"}}
                                        activeOpacity={0.8}
                                        onPress={()=>{

                                        }}
                                    >
                                        <Image style={{height:30, width:30, borderRadius:15}} source={item.imageUrl} resizeMode={"cover"}/>
                                        <View style={{height:"100%", paddingLeft:"5%", justifyContent:"center"}}>
                                            <Text style={{color:"#fff", fontWeight:"500"}}>{item.username}</Text>
                                            <Text style={{color:"#ccc", fontSize:12}}>{item.postedTime}</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={{flex:8}}
                                        activeOpacity={0.8}
                                        onPress={()=>{
                                            this.props.navigation.navigate("postDetails");
                                        }}
                                    >
                                        <Image style={{height:"100%", width:"100%"}} source={require("../../../assets/laura.jpeg")} resizeMode={"cover"}/>
                                    </TouchableOpacity>
                                    <View style={{flex:0.9, flexDirection:"row", backgroundColor:"#111"}}>
                                        <View style={{width:"30%", height:"100%", justifyContent:"center", alignItems:"center"}}>
                                            <Text style={{color:"#fff", fontSize:14}}>{item.likesCount} Likes</Text>
                                        </View>
                                        <View style={{width:"35%", height:"100%", justifyContent:"center"}}>
                                            <Text style={{color:"#fff", fontSize:14}}>{item.commentCount} Comments</Text>
                                        </View>
                                        <View style={{flexDirection:"row", width:"35%", height:"100%", justifyContent:"space-around", alignItems:"center"}}>
                                            <TouchableOpacity onPress={()=>{

                                            }}>
                                                <Image
                                                    style={{height:25, width:25}}
                                                    source={require("../../../assets/heart.png")}
                                                    resizeMode={"contain"}
                                                />
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={()=>{}}>
                                                <Image
                                                    style={{height:25, width:25}}
                                                    source={require("../../../assets/comment.png")}
                                                    resizeMode={"contain"}

                                                />
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={()=>{}}>
                                                <Image
                                                    style={{height:25, width:25}}
                                                    source={require("../../../assets/invite.png")}
                                                    resizeMode={"contain"}
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            )
                        }}
                    />
                </View>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        profile: state.profile
    };
}

export default connect( mapStateToProps, { updateProfile })( Home );