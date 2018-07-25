import React from 'react';
import {View, Text, TouchableOpacity, FlatList, Dimensions, Image} from 'react-native';
import { connect } from 'react-redux';

import RelationshipStatus from '../relationshipStatus/relationshipStatus';
import SelectMusicType from '../selectMusicTypes/selectMusicType';
import SelectPreferredCity from '../selectPreferedCity/selectPreferedCity';
import TellUsSomethingAboutYourSelf from '../tellUsSomethingAboutYourself/tellUsSomethingAboutYourself';
import UploadProfilePicture from '../UploadProfilePicture/uploadProfilePicture'
import { updateProfile } from '../../../actions/profileAction';
import style from './style';

let {height, width}= Dimensions.get("window");

class ProfileDetailsUpdate extends React.Component{

    static navigationOptions = {
        drawerLockMode:"locked-closed"
    };

    constructor(props){
        super(props);
        this.state={
            EndOfFlatList:false
        };
        this.pages=[
            <RelationshipStatus scrollToIndex={this.scrollToIndex}/>,
            <SelectPreferredCity scrollToIndex={this.scrollToIndex}/>,
            <SelectMusicType scrollToIndex={this.scrollToIndex}/>,
            <TellUsSomethingAboutYourSelf scrollToIndex={this.scrollToIndex}/>,
            <UploadProfilePicture scrollToIndex={this.scrollToIndex} navigate={props.navigation.navigate}/>
        ];
    }

    getItemLayout = (data, index) => {
        return(
            {length: width * 5, offset: width * index, index}
        )
    };

    scrollToIndex = ((index) => {
        this.flatListImageRef.scrollToIndex({animated: true, index: index});
    }).bind(this);

    render(){
        return(
            <View
                style={{flex:1, backgroundColor:"#000"}}
            >
                <View style={{flex:1, alignItems:"center", justifyContent:"center"}}>
                    <Image
                        resizeMode={"contain"}
                        source={require("../../../assets/datSpotLogo.png")}
                        style={{height:height*0.2, width:height*0.2}}
                    />
                    <TouchableOpacity
                        style={style.skipButton}
                        onPress={() => {
                            this.props.navigation.navigate("home");
                        }}
                    >
                        <Text style={style.skipButtonText}>Skip</Text>
                        <Text style={{color:"rgb( 251,86,136)", fontSize:15}}> {">"}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flex:2.5}}>
                <FlatList
                    style={{flex:1}}
                    data={this.pages}
                    pagingEnabled={true}
                    keyExtractor={(item, index) => index.toString()}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    getItemLayout={this.getItemLayout}
                    ref={(ref) => { this.flatListImageRef = ref; }}
                    onEndReached={()=>{this.setState({EndOfFlatList:true});}}
                    onEndReachedThreshold={0.5}
                    renderItem={({item})=>{
                        return item;
                    }}
                />
                </View>
            </View>
        )
    }
}

function mapStateToProps(state){
    return {
        profile:state.profile,
    };
}

export default connect( mapStateToProps, { updateProfile })( ProfileDetailsUpdate );