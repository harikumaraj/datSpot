import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';

let {height, width}=Dimensions.get("window");

export default StyleSheet.create({
    container:{
        height:height*0.66,
        width:width*0.8,
        marginHorizontal:width*0.1,
    },
    wrapper1:{
        flex:5,
        alignItems:"center",
        justifyContent:"center",
        paddingBottom:10
    },
    wrapper2:{
        flex:1,
        alignItems:"center",
        justifyContent:"flex-end",
    },
    textContainer:{
        height:50,
        width:"100%",
        alignItems:"center",
        justifyContent:"center"
    },
    imageContainer:{
        flexDirection:"row",
        height:"50%",
        width:"100%",
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
    buttonWrapper:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
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