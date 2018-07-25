import React from 'react';
import {View, Text, StyleSheet, ImageBackground, Dimensions, Image, TouchableOpacity} from 'react-native';
import Swiper from 'react-native-deck-swiper';
import style from "../datSpot/style";
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';


import Header from '../../components/header/header';

let {height, width}= Dimensions.get("window");

export default class Discover extends React.Component{

    constructor(){
        super();
        this.state={
            selectedIndex:0,
        };
        this.cards=[
            {
                color:"red",
                location:"Coridon, " +
                "London",
                date:"13 Feb 2018",
                title:"The great Australian brunch",
                ticketsAvailable:5, category:["POP","JAZZ"],
                bgImage:require("../../../assets/party.jpg")
            },
            {
                color:"blue",
                location:"Coridon, " +
                "London", date:"13 Feb 2018",
                title:"The great Australian brunch",
                ticketsAvailable:5,
                category:["POP","JAZZ"],
                bgImage:require("../../../assets/party.jpg")
            },
            {
                color:"green",
                location:"Coridon, London",
                date:"13 Feb 2018",
                title:"The great Australian brunch",
                ticketsAvailable:5,
                category:["POP","JAZZ"],
                bgImage:require("../../../assets/party.jpg")
            },
            {
                color:"yellow",
                location:"Coridon, London",
                date:"13 Feb 2018",
                title:"The great Australian brunch",
                ticketsAvailable:5,
                category:["POP","JAZZ"],
                bgImage:require("../../../assets/party.jpg")
            },
            {
                color:"black",
                location:"Coridon, London",
                date:"13 Feb 2018",
                title:"The great Australian brunch",
                ticketsAvailable:5,
                category:["POP","JAZZ"],
                bgImage:require("../../../assets/party.jpg")
            },
        ];
    }

    drawerToggle= ()=> {
        this.props.navigation.toggleDrawer();
    };

    render(){
        return(
            <View style={{flex:1, backgroundColor:"#000"}}>
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
                <View style={{flex:0.7, flexDirection:"row", paddingHorizontal:"5%"}}>
                    <View style={{flex:9, justifyContent:"center"}}>
                        <Text style={{color:"#fff"}}>Event happening in your locality</Text>
                    </View>
                    <View style={{flex:1, justifyContent:"center"}}>
                        <MaterialCommunityIcons name={"google-maps"} size={25} color={"#fff"}/>
                    </View>
                </View>
                <View style={{flex:8, alignItems:"center", justifyContent:"center"}}>
                    <View style={{height:"100%", width:"96%", alignItems:"center", justifyContent:"center"}}>
                        <Swiper
                            backgroundColor={'#000'}
                            cardVerticalMargin={0}
                            cardHorizontalMargin={0}
                            cards={this.cards}
                            ref={swiper => {
                                this.swiper = swiper
                            }}
                            onSwiped={(index)=>{this.setState({selectedIndex:index+1});}}
                            onSwipedRight={(index) =>{}}
                            onSwipedLeft={(index) =>{}}
                            stackSize= {3}
                            onTapCard={(item, index)=>{
                                console.log(item);
                                this.props.navigation.navigate("eventDetails",{
                                    index:index,
                                    discoverPage:true
                                });
                            }}
                            renderCard={(item, index)=>{
                                return(
                                    <View key={index} style={styles.card}>
                                        <View style={{position:"absolute", top:10, left:0, flexDirection:"row", zIndex:20}}>
                                            <View style={{height:20, width:90, backgroundColor:"rgb(223, 35, 125)", justifyContent:"center", paddingLeft:10}}>
                                                <Text style={{color:"#fff", fontSize:12, fontWeight:"bold"}}>POPULAR</Text>
                                            </View>
                                            <Image style={{height:20, width:30, marginLeft:-15}} resizeMode={"stretch"} source={require("../../../assets/ribbon.png")}/>
                                        </View>
                                        <View style={{flex:1, paddingHorizontal:5}}>
                                            <ImageBackground style={{flex:1, justifyContent:"flex-end", borderRadius:5}} source={item.bgImage} resizeMode={"cover"}>
                                                <View style={{height:"20%", width:"100%"}}>
                                                    <LinearGradient
                                                        style={{flex:1, paddingHorizontal:10, justifyContent:"center"}}
                                                        colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.7)', 'rgba(0,0,0,0.8)']}
                                                    >
                                                        <View style={{flexDirection:"row", height:"60%", width:"100%"}}>
                                                            <View style={{flex:2, justifyContent:"space-around"}}>
                                                                <Text style={styles.label}>{item.title}</Text>
                                                                <Text style={{fontSize:12, color:"#fff"}}>{item.location}    {item.date}</Text>
                                                            </View>
                                                            <View style={{flex:1}}>
                                                                <View style={{flex:1, flexDirection:"row", justifyContent:"space-around", alignItems:"center"}}>
                                                                    <View
                                                                        style={{backgroundColor:"rgb(223, 35, 125)", borderRadius:15, height:20, width:40, alignItems:"center", justifyContent:"center"}}
                                                                    >
                                                                        <Text style={{fontSize:10, fontWeight:"bold", color:"#fff"}}>{item.category[0]}</Text>
                                                                    </View>
                                                                    <View
                                                                        style={{backgroundColor:"rgb(223, 35, 125)", borderRadius:15, height:20, width:40, alignItems:"center", justifyContent:"center"}}
                                                                    >
                                                                        <Text style={{fontSize:10, fontWeight:"bold", color:"#fff"}}>{item.category[1]}</Text>
                                                                    </View>
                                                                </View>
                                                                <View style={{flex:1, flexDirection:"row", alignItems:"center"}}>
                                                                    <Entypo name={"ticket"} color={"#fff"} size={15}/>
                                                                    <Text style={{fontSize:10, color:"#fff"}}> {item.ticketsAvailable} tickets available</Text>
                                                                </View>
                                                            </View>
                                                        </View>
                                                    </LinearGradient>
                                                </View>
                                            </ImageBackground>
                                        </View>
                                    </View>
                                )
                            }}
                        >
                            <Text style={{color:"#fff", fontSize:14}}>No more cards to display!</Text>
                        </Swiper>
                    </View>
                </View>
                <View style={{flex:0.5, flexDirection:"row", justifyContent:"space-around", marginBottom:30}}>
                    <TouchableOpacity
                        style={styles.buttonContainerLinearGradient}
                        onPress={()=>{
                            this.props.navigation.navigate("payment",{
                                cardDetails:this.cards[this.state.selectedIndex]
                            });
                        }}
                    >
                        <LinearGradient colors={["rgb(255, 65, 168)", "rgb( 255, 184, 71)"]} style={styles.buttonLinearGradient}>
                            <Text style={styles.buttonText}>BUY TICKET</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.buttonContainerLinearGradient}
                        onPress={()=>{
                        }}
                    >
                        <LinearGradient colors={["rgb(255, 65, 168)", "rgb( 255, 184, 71)"]} style={styles.buttonLinearGradient}>
                            <Text style={styles.buttonText}>JOIN EVENT</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    content:{
        flex: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    card:{
        width:width*0.96,
        height:height*0.65

    },
    label: {
        fontSize: 16,
        fontWeight: "700",
        color: '#ffffff',
    },
    footer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    buttonContainer:{
        width:220,
        flexDirection:'row',
        justifyContent: 'space-between',
    },
    button:{
        shadowColor: 'rgba(0,0,0,0.3)',
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity:0.5,
        backgroundColor:'#fff',
        alignItems:'center',
        justifyContent:'center',
        zIndex: 0,
    },
    buttonContainerLinearGradient:{
        width: "35%",
        height: height*0.05,
        borderRadius:200,
        overflow:"hidden",
    },
    buttonLinearGradient:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    },
    buttonText:{
        fontSize:14,
        fontWeight:"bold",
        color:"#fff",
    },
});