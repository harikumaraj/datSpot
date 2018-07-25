import React from 'react';
import {View, Text, TextInput, Dimensions, Image, TouchableOpacity, ScrollView, StatusBar, Platform, FlatList} from 'react-native';
import CardStack, { Card } from 'react-native-card-stack-swiper';
import style from "../datSpot/style";
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';

let {height, width}= Dimensions.get("window");

export default class PostDetail extends React.Component{

    constructor(){
        super();
        this.state={
            post:[
                {
                    id:"@LauraBrooks13",
                    location:"London",
                    profileImage:require("../../../assets/face.jpg"),
                    comment:"The idiosyncrasy of this town is smoke. It rolls sullenly in slow folds from the great " +
                    "chimneys of the iron-foundries, and settles down in black, slimy pools on the muddy streets."
                },
                {
                    id:"@LauraBrooks13",
                    location:"London",
                    profileImage:require("../../../assets/face.jpg"),
                    comment:"The idiosyncrasy of this town is smoke. It rolls sullenly in slow folds from the great " +
                    "chimneys of the iron-foundries, and settles down in black, slimy pools on the muddy streets."
                },
                {
                    id:"@LauraBrooks13",
                    location:"London",
                    profileImage:require("../../../assets/face.jpg"),
                    comment:"The idiosyncrasy of this town is smoke. It rolls sullenly in slow folds from the great " +
                    "chimneys of the iron-foundries, and settles down in black, slimy pools on the muddy streets."
                },
                {
                    id:"@LauraBrooks13",
                    location:"London",
                    profileImage:require("../../../assets/face.jpg"),
                    comment:"The idiosyncrasy of this town is smoke. It rolls sullenly in slow folds from the great " +
                    "chimneys of the iron-foundries, and settles down in black, slimy pools on the muddy streets."
                },
            ],
            postSelectedIndex:0
        };
    }

    render(){
        return(
            <View style={{flex:1, paddingTop:Platform.OS==="ios"?"5%":0, backgroundColor:"#000", paddingBottom:"3%"}}>
                <StatusBar
                    barStyle="light-content"
                />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{height:height*0.5}}>
                        <TouchableOpacity
                            style={{
                                flexDirection:"row",
                                position:"absolute",
                                top:10,
                                left:0,
                                zIndex:1,
                                height:30,
                                width:80,
                                alignItems:"center",
                                justifyContent:"center"
                            }}
                            onPress={()=>{this.props.navigation.navigate("home")}}
                        >
                            <Text style={{color:"rgb(255, 65, 168)"}}>{"<"} </Text>
                            <Text style={{color:"#fff"}}>Back</Text>
                        </TouchableOpacity>
                        <Image source={require("../../../assets/laura.jpeg")} style={{width:"100%", height:height*0.5}} resizeMode="cover"/>
                    </View>
                    <View style={{width:"100%", height:height*0.1, flexDirection:"row"}}>
                        <View style={{flex:1, alignItems:"center", justifyContent:"center"}}>
                            <Image source={require("../../../assets/face.jpg")} style={{height:height*0.08, width:height*0.08, borderRadius:height*0.04}} resizeMode={"cover"} resizeMethod={"resize"}/>
                            <MaterialCommunityIcons name={"play-circle"} size={20} color={"#fff"} style={{position:"absolute", bottom:width*0.015, right:width*0.015, zIndex:1}}/>
                        </View>
                        <View style={{flex:1.5, paddingLeft:5, justifyContent:"space-around", paddingVertical:width*0.04}}>
                            <Text style={{color:"#fff"}}>@LauraBrooks13</Text>
                            <Text style={{color:"#fff", fontSize:12}}>London</Text>
                        </View>
                        <View style={{flex:2.5, justifyContent:"center", alignItems:"center"}}>
                            <LinearGradient
                                colors={["rgb(255, 65, 168)", "rgb( 255, 184, 71)"]}
                                style={{height:"60%", width:"80%", alignItems:"center", justifyContent:"center", borderRadius:50}}
                            >
                                <Text style={{color:"#fff", fontSize:12}}>Send friend request</Text>
                            </LinearGradient>
                        </View>
                    </View>
                    <Text style={{fontSize:14, color:"#fff", marginHorizontal:"3%", marginVertical:"3%"}}>
                        The idiosyncrasy of this town is smoke. It rolls sullenly in slow folds from the great
                        chimneys of the iron-foundries, and settles down in black, slimy pools on the muddy streets.
                        Smoke on the wharves, smoke on the dingy boats, on the yellow river--clinging in a coating
                        of greasy soot to the house-front, the two faded poplars, the faces of the passers-by.
                    </Text>
                    <View style={{flexDirection:"row", height:height*0.07, width:width, paddingHorizontal:"3%"}}>
                        <View style={{ flex:1, flexDirection:"row"}}>
                            <View style={{flex:1, flexDirection:"row", justifyContent:"space-around", alignItems:"center"}}>
                                <FontAwesome name={"heart-o"} size={25} color={"#fff"}/>
                                <Text style={{color:"#fff"}}>472</Text>
                            </View>
                            <View style={{flex:1, flexDirection:"row", justifyContent:"space-around", alignItems:"center"}}>
                                <FontAwesome name={"comments-o"} size={25} color={"#fff"}/>
                                <Text style={{color:"#fff"}}>62</Text>
                            </View>
                        </View>
                        <View style={{ flex:1.5, flexDirection:"row", justifyContent:"flex-end", alignItems:"center"}}>
                            <View style={{width:"25%", height:"100%", alignItems:"center", justifyContent:"center"}}>
                                <FontAwesome name={"heart-o"} size={25} color={"rgb(255, 65, 168)"}/>
                            </View>
                            <View style={{width:"25%", height:"100%", alignItems:"center", justifyContent:"center"}}>
                                <FontAwesome name={"send-o"} size={25} color={"rgb(255, 65, 168)"}/>
                            </View>
                            <View style={{width:"25%", height:"100%", alignItems:"center", justifyContent:"center"}}>
                                <Entypo name={"share"} size={25} color={"rgb(255, 65, 168)"}/>
                            </View>
                        </View>
                    </View>
                    <View style={{height:height*0.13, width:width, paddingHorizontal:"3%", paddingVertical:"1%", justifyContent:"space-around"}}>
                        <Text style={{color:"#fff"}}>Comments</Text>
                        <View style={{flexDirection:"row", width:"100%", height:"60%", backgroundColor:"red", overflow:"hidden", borderRadius:100}}>
                            <View style={{flex:3, paddingHorizontal:"4%",backgroundColor:"#fff", justifyContent:"center"}}>
                                <TextInput
                                    placeholder='Type your comment'
                                    placeholderTextColor={"rgb(150,150,150)"}
                                    underlineColorAndroid={"rgba(0,0,0,0)"}
                                    autoCapitalize={"sentences"}
                                    onChangeText={(data)=>{
                                        this.setState({postSelectedIndex:data});
                                    }}
                                />
                            </View>
                            <TouchableOpacity style={{flex:1, alignItems:"center", justifyContent:"center", backgroundColor:"rgb(255, 65, 168)"}}>
                                <Text style={{fontSize:14, fontWeight:"900", color:"#fff"}}>SEND</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{height:height*0.13*(this.state.post.length<4?this.state.post.length:4), width:width, paddingHorizontal:"3%"}}>
                        <FlatList
                            data={this.state.post}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({item, index})=>{
                                return(
                                    <View style={{height:height*0.12, width:"100%", flexDirection:"row"}}>
                                        <View style={{flex:1, alignItems:"center", justifyContent:"center"}}>

                                                <Image
                                                    style={{height:height*0.08, width:height*0.08, borderRadius:height*0.04}}
                                                    source={item.profileImage}
                                                    resizeMethod={"resize"}
                                                    resizeMode={"cover"}
                                                />
                                        </View>
                                        <View style={{flex:5, paddingVertical:height*0.012, paddingLeft:5}}>
                                            <View style={{flex:1, flexDirection:"row"}}>
                                                <View style={{flex:2, justifyContent:"center"}}>
                                                <Text style={{color:"#fff"}}>{item.id}</Text>
                                                </View>
                                                <View style={{flex:1, justifyContent:"center"}}>
                                                    <Text style={{color:"#fff", fontSize:12}}>{item.location}</Text>
                                                </View>
                                                <View style={{flex:1.5, alignItems:"flex-end"}}>
                                                    <Text style={{color:"#777", fontSize:10}}>33 mins ago</Text>
                                                </View>
                                            </View>
                                            <View style={{flex:2, justifyContent:"center"}}>
                                                <Text style={{color:"#777", fontSize:12}} numberOfLines={2}>{item.comment}</Text>
                                            </View>
                                        </View>
                                    </View>
                                );
                            }}
                        />
                    </View>
                </ScrollView>
            </View>
        );
    }
}