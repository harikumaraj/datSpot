import React from 'react';
import {View, Image, TouchableOpacity, FlatList} from 'react-native';
import { Container, Content, List, ListItem, Left, Body, Right, Thumbnail, Text } from 'native-base';
import { GiftedChat } from 'react-native-gifted-chat';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import LinearGradient from 'react-native-linear-gradient';

import style from "./style";



export default class Messaging extends React.Component {

    constructor(){
        super();
        this.state={
            friendsTabFlag:true,
            online:true,
            friendsList:[1,2,3,4]
        };
    }

    onPressLeftButton= ()=> {
        this.props.navigation.toggleDrawer();
    };

    render() {
        return (
            <Container style={{backgroundColor:"#000"}}>
                <View  style= { style.headerContainer }>
                    <TouchableOpacity
                        style = { style.leftContainer }
                        onPress = { this.onPressLeftButton }
                    >
                        <View style={style.headerIconContainer}>
                            <SimpleLineIcons
                                name="menu"
                                size={25}
                                style={{color:"#ffffff"}}
                            />
                        </View>
                    </TouchableOpacity>
                    <View style= { style.middleContainer }>
                        {this.state.online ?
                            <View style={style.floatingOnlineCount}>
                                <Text style={style.countText}>5</Text>
                            </View>
                            : null
                        }
                        <View style={style.middleButtons}>
                            <Text style={style.buttonTextColor}>ONLINE</Text>
                        </View>
                    </View>
                    <TouchableOpacity
                        style = { style.rightContainer }
                        onPress = { this.onPressLeftButton }
                    >
                        <View style={style.headerIconContainer}>
                            <View style={style.notificationCountContainer}>
                                <Text style={{color:"rgb(255,65,168)", fontSize:10}}>3</Text>
                            </View>
                            <Image resizeMode={"contain"} style={style.notificationIcon} source={require("../../../assets/notificationBell.png")}/>
                        </View>
                    </TouchableOpacity>
                </View>
                <Content>
                    <List>
                        <FlatList
                            data={this.state.friendsList}
                            keyExtractor={(item, index) => index}
                            renderItem={()=>{
                                return(
                                    <ListItem avatar onPress={()=>{this.props.navigation.navigate("chat")}}>
                                        <Left>
                                            <Thumbnail source={require("../../../assets/face.jpg")}/>
                                        </Left>
                                        <Body>
                                        <Text style={{color:"#fff", fontSize:14}}>Kumar Pratik</Text>
                                        <Text note style={{fontSize:12}}>Doing what you like will always keep you happy . .</Text>
                                        </Body>
                                        <Right>
                                            <Text note>3:43 pm</Text>
                                        </Right>
                                    </ListItem>
                                );
                            }}
                        />
                    </List>
                </Content>
            </Container>
        );
    }
}