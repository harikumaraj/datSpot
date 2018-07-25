import React from 'react';
import {View, Text, Image, TouchableOpacity, FlatList, Dimensions, ImageBackground, Alert} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {connect} from "react-redux";

import style from './style'
import {updateProfile} from "../../../actions/profileAction";

let {height, width}=Dimensions.get("window");

class SelectPreferredCity extends React.Component{

    constructor(){
        super();
        this.state={
            activeButton:0,
            EndOfFlatList:false,
            preferredCity:"",
        };
    }

    componentDidMount(){
        this.getCityList();
    }

    getCityList(){
        fetch('https://datspot.com/api/city', {
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
                    let cityList=[];
                    let cityListElement=[];
                    data.data.citys.map((item, index)=>{
                        if(index%2===0){
                            cityListElement.push(item);
                        }
                        else{
                            cityListElement.push(item);
                            cityList.push(cityListElement);
                            cityListElement=[];
                        }

                    });
                    this.props.updateProfile({cityList:cityList});
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
                    <Text style={style.text}>Select your preferred city.</Text>
                </View>
                <View style={style.wrapper1}>
                    <FlatList
                        data={this.props.profile.cityList}
                        keyExtractor={(item, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                        onEndReached={()=>{this.setState({EndOfFlatList:true});}}
                        onEndReachedThreshold={0.5}
                        renderItem={({index, item})=>{
                            if(item.length===2) {
                                return (
                                    <View style={{width: width * 0.6, height: width * 0.3, flexDirection: "row"}}>
                                        <TouchableOpacity
                                            style={{flex: 1, padding: "2%"}}
                                            onPress={() => {
                                                this.setState({preferredCity: item[0].cityValue});
                                            }}
                                        >
                                            <LinearGradient colors={["rgb(255, 65, 168)", "rgb( 255, 184, 71)"]}
                                                            style={{
                                                                flex: 1,
                                                                padding: "1.5%",
                                                                borderRadius: 5,
                                                                opacity: (item[0].cityValue === this.state.preferredCity) ? 1 : 0.5
                                                            }}>
                                                <View style={{flex: 1, borderRadius: 5, overflow: "hidden"}}>
                                                    <ImageBackground source={{uri:`https://datspot.com${item[0].image.permalink}`}} style={{
                                                        flex: 1,
                                                        justifyContent: "flex-end",
                                                        paddingBottom: "5%",
                                                        alignItems: "center"
                                                    }}>
                                                        <Text
                                                            style={{color: "#fff", fontSize: 14}}>{item[0].cityName}</Text>
                                                    </ImageBackground>
                                                </View>
                                            </LinearGradient>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={{flex: 1, padding: "2%"}}
                                            onPress={() => {
                                                this.setState({preferredCity: item[1].cityValue});
                                            }}
                                        >
                                            <LinearGradient colors={["rgb(255, 65, 168)", "rgb( 255, 184, 71)"]}
                                                            style={{
                                                                flex: 1,
                                                                padding: "1.5%",
                                                                borderRadius: 5,
                                                                opacity: (item[1].cityValue === this.state.preferredCity) ? 1 : 0.5
                                                            }}>
                                                <View style={{flex: 1, borderRadius: 5, overflow: "hidden"}}>
                                                    <ImageBackground source={{uri:`https://datspot.com${item[1].image.permalink}`}} style={{
                                                        flex: 1,
                                                        justifyContent: "flex-end",
                                                        paddingBottom: "5%",
                                                        alignItems: "center"
                                                    }}>
                                                        <Text
                                                            style={{color: "#fff", fontSize: 14}}>{item[1].cityName}</Text>
                                                    </ImageBackground>
                                                </View>
                                            </LinearGradient>
                                        </TouchableOpacity>
                                    </View>
                                )
                            }
                            else{
                                return (
                                    <View style={{width: width * 0.6, height: width * 0.3, flexDirection: "row"}}>
                                        <TouchableOpacity
                                            style={{flex: 1, padding: "2%"}}
                                            onPress={() => {
                                                this.setState({preferredCity: item[0].cityValue});
                                            }}
                                        >
                                            <LinearGradient colors={["rgb(255, 65, 168)", "rgb( 255, 184, 71)"]}
                                                            style={{
                                                                flex: 1,
                                                                padding: "1.5%",
                                                                borderRadius: 5,
                                                                opacity: (item[0].cityValue === this.state.preferredCity) ? 1 : 0.5
                                                            }}>
                                                <View style={{flex: 1, borderRadius: 5, overflow: "hidden"}}>
                                                    <ImageBackground source={{uri:`https://datspot.com${item[1].image.permalink}`}} style={{
                                                        flex: 1,
                                                        justifyContent: "flex-end",
                                                        paddingBottom: "5%",
                                                        alignItems: "center"
                                                    }}>
                                                        <Text
                                                            style={{color: "#fff", fontSize: 14}}>{item[0].cityName}</Text>
                                                    </ImageBackground>
                                                </View>
                                            </LinearGradient>
                                        </TouchableOpacity>
                                        <View style={{flex: 1, padding: "2%"}}/>
                                    </View>
                                )
                            }
                        }}
                    />
                </View>
                <TouchableOpacity
                    style={style.buttonContainer}
                    onPress={()=>{
                        this.props.updateProfile({preferredCity:this.state.preferredCity});
                        this.props.scrollToIndex(2);
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

export default connect( mapStateToProps, { updateProfile })( SelectPreferredCity );