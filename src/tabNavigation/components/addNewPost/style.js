import {Dimensions, StyleSheet} from 'react-native';

let {height, width}= Dimensions.get("window");

export default StyleSheet.create({
    wrapper:{
        position:"absolute",
        height:height,
        width:width,
        top:0,
        left:0,
        backgroundColor:"red",
        zIndex:100
    },
    container:{

    }
});