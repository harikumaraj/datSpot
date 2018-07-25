import React from 'react';
import {View, Text, Image, TouchableOpacity, FlatList, Dimensions, ImageBackground, Alert} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

let {height, width}= Dimensions.get("window");

import style from './style';
import {connect} from "react-redux";
import {updateProfile} from "../../../actions/profileAction";

class SelectMusicTypes extends React.Component{

    constructor(){
        super();
        this.state={
            musicType:[
                [{musicType:"POP", selected:false},{musicType:"HOUSE", selected:false},{musicType:"R'N'B", selected:false}],
                [{musicType:"HPI HOP", selected:false},{musicType:"ROCK", selected:false},{musicType:"DANCE", selected:false}],
                [{musicType:"INDIE", selected:false},{musicType:"SOUL", selected:false},{musicType:"FOLK", selected:false}],
                [{musicType:"OTHER", selected:false}],
            ],
        };
    }

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
                    let musicsList=[];
                    let musicsListElement=[];
                    data.data.musics.map((item, index)=>{
                        console.log(item, index);
                        if(index%3===0){
                            musicsListElement.push(item);
                        }
                        else if(index%3===1){
                            musicsListElement.push(item);
                        }
                        else{
                            musicsListElement.push(item);
                            musicsList.push(musicsListElement);
                            musicsListElement=[];
                        }

                    });
                    console.log(musicsList);
                    this.setState({cityList:musicsList});
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
                        data={this.state.musicType}
                        keyExtractor={(item, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                        onEndReached={()=>{this.setState({EndOfFlatList:true});}}
                        onEndReachedThreshold={0.5}
                        renderItem={({index, item})=>{
                            if(index!==3)
                                return(
                                    <View style={{width:width*0.8, height:width*0.266667, flexDirection:"row"}}>
                                        <TouchableOpacity
                                            style={{flex:1, padding:"3%"}}
                                            onPress={()=>{
                                                let tempStateMusicType=this.state.musicType;
                                                tempStateMusicType[index][0].selected=!tempStateMusicType[index][0].selected;
                                                this.setState({musicType:tempStateMusicType})
                                            }}
                                        >
                                            <ImageBackground
                                                resizeMode={"contain"}
                                                source={require("../../../assets/bigPinkButton.png")}
                                                style={{flex:1, alignItems:"center", justifyContent:"center", opacity:(item[0].selected===true)?1:0.5}}
                                            >
                                                <Text style={{color:"#fff", fontSize:14, fontWeight:"bold"}}>{item[0].musicType}</Text>
                                            </ImageBackground>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={{flex:1, padding:"3%"}}
                                            onPress={()=>{
                                                let tempStateMusicType=this.state.musicType;
                                                tempStateMusicType[index][1].selected=!tempStateMusicType[index][1].selected;
                                                this.setState({musicType:tempStateMusicType})
                                            }}
                                        >
                                            <ImageBackground
                                                resizeMode={"contain"}
                                                source={require("../../../assets/bigPinkButton.png")}
                                                style={{flex:1, alignItems:"center", justifyContent:"center", opacity:(item[1].selected===true)?1:0.5}}
                                            >
                                                <Text style={{color:"#fff", fontSize:14, fontWeight:"bold"}}>{item[1].musicType}</Text>
                                            </ImageBackground>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={{flex:1, padding:"3%"}}
                                            onPress={()=>{
                                                let tempStateMusicType=this.state.musicType;
                                                tempStateMusicType[index][2].selected=!tempStateMusicType[index][2].selected;
                                                this.setState({musicType:tempStateMusicType})
                                            }}
                                        >
                                            <ImageBackground
                                                resizeMode={"contain"}
                                                source={require("../../../assets/bigPinkButton.png")}
                                                style={{flex:1, alignItems:"center", justifyContent:"center", opacity:(item[2].selected===true)?1:0.5}}
                                            >
                                                <Text style={{color:"#fff", fontSize:14, fontWeight:"bold"}}>{item[2].musicType}</Text>
                                            </ImageBackground>
                                        </TouchableOpacity>
                                    </View>
                                );
                            else
                                return(
                                    <View style={{width:width*0.8, height:width*0.266667, flexDirection:"row"}}>
                                        <View style={{flex:1, padding:"3%"}}/>
                                        <TouchableOpacity
                                            style={{flex:1, padding:"3%"}}
                                            onPress={()=>{
                                                let tempStateMusicType=this.state.musicType;
                                                tempStateMusicType[index][0].selected=!tempStateMusicType[index][0].selected;
                                                this.setState({musicType:tempStateMusicType})
                                            }}
                                        >
                                            <ImageBackground
                                                resizeMode={"contain"}
                                                source={require("../../../assets/bigPinkButton.png")}
                                                style={{flex:1, alignItems:"center", justifyContent:"center", opacity:(item[0].selected===true)?1:0.5}}
                                            >
                                                <Text style={{color:"#fff", fontSize:14, fontWeight:"bold"}}>{item[0].musicType}</Text>
                                            </ImageBackground>
                                        </TouchableOpacity>
                                        <View style={{flex:1, padding:"3%"}}/>
                                    </View>

                                )
                        }}
                    />
                </View>
                <TouchableOpacity
                    style={style.buttonContainer}
                    onPress={()=>{
                        let selectedMusicList=[];
                        this.state.musicType.map((item, index)=>{
                            item.map((item, index)=>{
                                console.log(item, index);
                                if(item.selected===true)
                                    selectedMusicList.push(item.musicType);
                            })
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