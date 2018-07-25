import React from 'react';
import { View, Text, Image, ImageBackground, FlatList, Dimensions } from 'react-native';

let {height, width}=Dimensions.get("window");

export default class Shows extends React.Component{

    constructor(){
        super();
        this.state={
            data:[
                {
                    name:"CONCERT",
                    iconBackgroundColor:"#fff",
                    bgImage:require("../../../assets/bday.jpg"),
                    icon:require("../../../assets/redHeart.png"),
                    event:"Concert",
                    eventTime:"Thu 12 Jul, 3:00 pm"
                },
                {
                    name:"COMEDY",
                    iconBackgroundColor:"#000",
                    bgImage:require("../../../assets/bar.jpg"),
                    icon:require("../../../assets/boneca.png"),
                    event:"Festival",
                    eventTime:"Thu 12 Jul, 3:00 pm"
                },
                {
                    name:"LIVE MUSIC",
                    iconBackgroundColor:"rgb(32, 28, 29)",
                    bgImage:require("../../../assets/dj.jpg"),
                    icon:require("../../../assets/m.png"),
                    event:"Live show",
                    eventTime:"Thu 12 Jul, 3:00 pm"
                },
                {
                    name:"PARTY",
                    iconBackgroundColor:"rgb(32, 28, 29)",
                    bgImage:require("../../../assets/dj.jpg"),
                    icon:require("../../../assets/boneca.png"),
                    event:"DJ night",
                    eventTime:"Thu 12 Jul, 3:00 pm"
                },
            ]
        };
    }

    render(){
        return(
            <View style={{flex:1}}>
                <FlatList
                    data={this.state.data}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={()=><View style={{height:10}}/>}
                    ListFooterComponent={()=><View style={{height:30}}/>}
                    ListHeaderComponent={()=><View style={{height:5}}/>}
                    onEndReachedThreshold={0.5}
                    renderItem={({index, item})=>{
                        return(
                            <View style={{height:height*0.3, width:"100%", paddingHorizontal:5}}>
                                <View style={{position:"absolute", top:10, left:0, flexDirection:"row", zIndex:20}}>
                                    <View style={{height:20, width:80, backgroundColor:"rgb(223, 35, 125)", justifyContent:"center", paddingLeft:10}}>
                                        <Text style={{color:"#fff", fontSize:12, fontWeight:"bold"}}>{item.name}</Text>
                                    </View>
                                    <Image style={{height:20, width:30}} resizeMode={"stretch"} source={require("../../../assets/ribbon.png")}/>
                                </View>
                                <ImageBackground
                                    style={{height:height*0.3, width:"100%"}}
                                    source={item.bgImage}
                                >
                                    <View style={{flex:1, backgroundColor:"rgba(0,0,0,0.6)"}}>
                                        <View style={{position:"absolute", right:10, top:10, height:50, width:50, backgroundColor:item.iconBackgroundColor, borderRadius:25, alignItems:"center", justifyContent:"center"}}>
                                            <Image
                                                style={{width:30, height:30, borderRadius:15}}
                                                source={item.icon}
                                                resizeMode={"contain"}
                                            />
                                        </View>
                                        <View style={{position:"absolute", left:15, bottom:10, height:40, width:"70%", justifyContent:"space-around"}}>
                                            <Text numberOfLines={1} style={{fontSize:16, fontWeight:"bold", color:"#fff"}}>{item.event}</Text>
                                            <Text style={{fontSize:12, color:"#ccc"}}>{item.eventTime}</Text>
                                        </View>
                                    </View>
                                </ImageBackground>
                            </View>
                        )
                    }}
                />
            </View>
        );
    }
}