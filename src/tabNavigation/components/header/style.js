import { Platform, StyleSheet, Dimensions } from 'react-native';

let {height, width}= Dimensions.get("window");

export default StyleSheet.create({
    headerContainer:{
        width:"100%",
        height:height*0.09,
        paddingTop: Platform.OS === 'ios' ? height*0.02 : 0,
        backgroundColor:"#000",
        flexDirection:"row",
    },
    leftContainer:{
        flex:1,
    },
    middleContainer:{
        flex:4,
        justifyContent:"center",
        alignItems:"center",
    },
    middleText:{
        color:"#fff",
        fontSize:22
    },
    rightContainer:{
        flex:1,
    }
});