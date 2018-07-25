import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';

let { height, width }=Dimensions.get("window");

export default StyleSheet.create({
    container:{
        height:height*0.66,
        width:width*0.8,
        marginHorizontal:width*0.1,
    },
    wrapper:{
        flex:5,
        paddingBottom:10,
        alignItems:"center",
        justifyContent:"center",
    },
    textContainer:{
        height:50,
        width:"100%",
        alignItems:"center",
        justifyContent:"center"
    },
    text:{
        fontSize:15,
        color:"#fff"
    },
    buttonContainer:{
        width: "100%",
        height: height*0.06,
        borderRadius:200,
        overflow:"hidden",
    },
    button:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    },
    buttonText:{
        fontSize:16,
        fontWeight:"bold",
        color:"#fff",
    },
});