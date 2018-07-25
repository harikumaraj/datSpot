import React from 'react';
import {View, Text, Image, TouchableOpacity, FlatList, Dimensions, ImageBackground, Alert} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import style from './style';
import {connect} from "react-redux";
import {updateProfile} from "../../../actions/profileAction";

let {height, width}= Dimensions.get("window");

class SelectMusicTypes extends React.Component{

    componentDidMount(){
        this.getMusicList()
    }

    getMusicList(){
        fetch('https://datspot.com/api/music', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                const statusCode = response.status;
                const data = response.json();
                return Promise.all([statusCode, data]);
            })
            .then(([statusCode, data])=>{
                console.log(statusCode,data);
                if(statusCode===200){
                    this.props.updateProfile({musicList:data.data.musics});
                }
                else {
                    Alert.alert("API response", data.message);
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
                    <Text style={style.text}>Which type of music you like?</Text>
                </View>
                <View style={style.wrapper1}>
                    <FlatList
                        data={this.props.profile.musicList}
                        keyExtractor={(item, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                        onEndReached={()=>{this.setState({EndOfFlatList:true});}}
                        onEndReachedThreshold={0.5}
                        numColumns={3}
                        renderItem={({index, item})=> {
                            return (
                                <View style={{width: width * 0.25, height: width * 0.25, flexDirection: "row", padding:5}}>
                                    <TouchableOpacity
                                        style={{flex: 1, padding: "3%"}}
                                        onPress={() => {
                                            let tempStateMusicType = this.props.profile.musicList;
                                            tempStateMusicType[index].selected = !tempStateMusicType[index].selected;
                                            this.setState({musicType: tempStateMusicType});
                                        }}
                                    >
                                        <ImageBackground
                                            resizeMode={"contain"}
                                            source={require("../../../assets/bigPinkButton.png")}
                                            style={{
                                                flex: 1,
                                                alignItems: "center",
                                                justifyContent: "center",
                                                opacity: (item.selected === true) ? 1 : 0.5
                                            }}
                                        >
                                            <Text style={{
                                                color: "#fff",
                                                fontSize: 14,
                                                fontWeight: "bold"
                                            }}>{item.genre}</Text>
                                        </ImageBackground>
                                    </TouchableOpacity>
                                </View>
                            );
                        }}
                    />
                </View>
                <TouchableOpacity
                    style={style.buttonContainer}
                    onPress={()=>{
                        let selectedMusicList=[];
                        this.props.profile.musicList.map((item, index)=>{
                                if(item.selected===true)
                                    selectedMusicList.push(item.genValue);
                        });
                        this.props.updateProfile({musicType:selectedMusicList});
                        this.props.scrollToIndex(3);
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

export default connect( mapStateToProps, { updateProfile })( SelectMusicTypes );