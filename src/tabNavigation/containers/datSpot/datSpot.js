import React from 'react';
import {View, Text, Image, FlatList, Dimensions, TouchableOpacity, Alert, Platform} from 'react-native';
import { connect } from 'react-redux';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import LinearGradient from 'react-native-linear-gradient';


import Header from '../../components/header/header';
import style from "./style";
import ClubOrBar from "../../components/clubOrBar/clubOrBar";
import Shows from "../../components/shows/shows";
import Food from "../../components/food/food";
import Other from "../../components/other/other";

let {height, width}= Dimensions.get("window");

class DatSpot extends React.Component{

    constructor() {
        super();
        this.state = {
            selectedTab:0
        };
    }

    displayTab(){
        if(this.state.selectedTab===0)
            return <ClubOrBar {...this.props}/>;
        else if(this.state.selectedTab===1)
            return <Shows {...this.props}/>;
        else if(this.state.selectedTab===2)
            return <Food {...this.props}/>;
        else if(this.state.selectedTab===3)
            return <Other {...this.props}/>;
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
                    middleText={ "DATSPOT" }
                    onPressRightButton={ this.drawerToggle }
                    rightIcon={ () => <View style={style.headerIconContainer}>
                        <View style={style.notificationCountContainer}>
                            <Text style={{color:"rgb(255,65,168)", fontSize:10}}>3</Text>
                        </View>
                        <Image resizeMode={"contain"} style={style.notificationIcon} source={require("../../../assets/notificationBell.png")}/>
                    </View> }
                />
                <View style={style.container}>
                    <LinearGradient
                        colors={['rgba(0, 0, 0, 0)', 'rgba(223, 35, 125, 0.5)', 'rgba(0, 0, 0, 0)']}
                        style={{height:30, width:"100%", flexDirection:"row", alignItems:"center"}}
                        start={Platform.OS==="android"?{x: 0, y: 1}:{x: 0, y: 0.5}}
                        end={Platform.OS==="android"?{x: 1, y: 0}:{x: 1, y: 0.5}}
                    >
                        <TouchableOpacity
                            style={{flex:1, height:"100%"}}
                            onPress={()=>{
                                this.setState({selectedTab:0});
                            }}
                        >
                            <View style={{flex:1, alignItems:"center", justifyContent:"center", backgroundColor:this.state.selectedTab===0?"rgb(223, 35, 125)":"rgba(0,0,0,0)"}}>
                                <Text style={{color:"#fff", fontSize:12}}>CLUB/BAR</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={{height:"80%", width:1, backgroundColor:"rgba(255, 255, 255, 0.3)"}}/>
                        <TouchableOpacity
                            style={{flex:1, height:"100%"}}
                            onPress={()=>{
                                this.setState({selectedTab:1});
                            }}
                        >
                            <View style={{flex:1, alignItems:"center", justifyContent:"center", backgroundColor:this.state.selectedTab===1?"rgb(223, 35, 125)":"rgba(0,0,0,0)"}}>
                                <Text style={{color:"#fff", fontSize:12}}>SHOWS</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={{height:"80%", width:1, backgroundColor:"rgba(255, 255, 255, 0.3)"}}/>
                        <TouchableOpacity
                            style={{flex:1, height:"100%"}}
                            onPress={()=>{
                                this.setState({selectedTab:2});
                            }}
                        >
                            <View style={{flex:1, alignItems:"center", justifyContent:"center", backgroundColor:this.state.selectedTab===2?"rgb(223, 35, 125)":"rgba(0,0,0,0)"}}>
                                <Text style={{color:"#fff", fontSize:12}}>FOOD</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={{height:"80%", width:1, backgroundColor:"rgba(255, 255, 255, 0.3)"}}/>
                        <TouchableOpacity
                            style={{flex:1, height:"100%"}}
                            onPress={()=>{
                                this.setState({selectedTab:3});
                            }}
                        >
                            <View style={{flex:1, alignItems:"center", justifyContent:"center", backgroundColor:this.state.selectedTab===3?"rgb(223, 35, 125)":"rgba(0,0,0,0)"}}>
                                <Text style={{color:"#fff", fontSize:12}}>OTHER</Text>
                            </View>
                        </TouchableOpacity>
                    </LinearGradient>
                    <View style={{flex:1}}>
                        {this.displayTab()}
                    </View>
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

export default connect( mapStateToProps, {  })( DatSpot );