import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {connect} from 'react-redux';

import style from './style'
import {updateProfile} from "../../../actions/profileAction";

class RelationshipStatus extends React.Component{

    constructor(){
        super();
        this.state={
            activeButton:0,
            relationShipArray:["single", "Maybe", "Taken"]
        }
    }

    render(){
        return(
            <View style={style.container}>
                <View style={style.wrapper1}>
                    <View style={style.textContainer}>
                        <Text style={style.text}>What is your relationship status?</Text>
                    </View>
                    <View style={style.imageContainer}>
                        <TouchableOpacity
                            style={style.buttonWrapper}
                            onPress={()=>{
                                this.setState({activeButton:1});
                            }}
                        >
                            <Image
                                resizeMode={"contain"}
                                source={require("../../../assets/greenButton.png")}
                                style={[style.image, {opacity:(this.state.activeButton===1)?1:0.5}]}
                            />
                            <Text style={style.imageButtonText}>Single</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={style.buttonWrapper}
                            onPress={()=>{
                                this.setState({activeButton:2});
                            }}
                        >
                            <Image
                                resizeMode={"contain"}
                                source={require("../../../assets/yellowButton.png")}
                                style={[style.image, {opacity:(this.state.activeButton===2)?1:0.5}]}
                            />
                            <Text style={style.imageButtonText}>Maybe</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={style.buttonWrapper}
                            onPress={()=>{
                                this.setState({activeButton:3});
                            }}
                        >
                            <Image
                                resizeMode={"contain"}
                                source={require("../../../assets/redButton.png")}
                                style={[style.image, {opacity:(this.state.activeButton===3)?1:0.5}]}
                            />
                            <Text style={style.imageButtonText}>Taken</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={style.wrapper2}>
                    <TouchableOpacity
                        style={style.buttonContainer}
                        onPress={()=>{
                            this.props.updateProfile({relationshipStatus:this.state.relationShipArray[this.state.activeButton-1]});
                            this.props.scrollToIndex(1);
                        }}
                    >
                        <LinearGradient colors={["rgb(255, 65, 168)", "rgb( 255, 184, 71)"]} style={style.button}>
                            <Text style={style.buttonText}>PROCEED</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        profile: state.profile
    };
}

export default connect( mapStateToProps, { updateProfile })( RelationshipStatus );