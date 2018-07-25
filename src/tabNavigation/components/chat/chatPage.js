import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { GiftedChat, InputToolbar, Bubble } from 'react-native-gifted-chat';

import style from './style'

export default class Messaging extends React.Component{

    state = {
        messages: [],
    };

    constructor() {
        super();
        this.state= {
            messages: [
                {
                    _id: 1,
                    text: 'Hello developer',
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'React Native',
                        avatar: 'https://placeimg.com/140/140/any',
                    },
                },
            ],
        }
    }

    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }))
    }

    renderInputToolbar(props){
        console.log(props);
        return(
            <InputToolbar
                {...props}
                containerStyle={{backgroundColor:"#222"}}
                placeholderTextColor={"#999"}
                textInputStyle={{color:"#fff"}}
                textStyle={{color:"#fff"}}
            >
            </InputToolbar>
        );
    }

    renderBubble(props) {
        return(
            <Bubble
                {...props}
                containerStyle={{backgroundColor:"#777"}}
                wrapperStyle={{
                    left:{
                        backgroundColor: "#fff",
                    },
                    right: {
                        backgroundColor: "rgb(223, 35, 125)",
                    },
                }}
                textStyle={{
                    left:{
                        color: "#000",
                    },
                    right: {
                        color: "#fff",
                    },
                }}
            />
        );
    }

    render(){
        return(
            <View style={{flex:1, backgroundColor:"#000"}}>
                <View style={style.headerContainer}>
                    <TouchableOpacity
                        style={style.backButtonContainer}
                        onPress={()=>{this.props.navigation.navigate("message")}}
                    >
                        <Text style={style.backArrow}>{"<"}  </Text>
                        <Text style={style.backButtonText}>Back</Text>
                    </TouchableOpacity>
                </View>
                <View style={style.header}>
                </View>
                <GiftedChat
                    messages={this.state.messages}
                    renderAvatarOnTop={true}
                    renderInputToolbar={this.renderInputToolbar}
                    renderBubble={this.renderBubble}
                    onSend={messages => this.onSend(messages)}
                    user={{
                        _id: 1,
                    }}
                />
            </View>
        );
    }
}