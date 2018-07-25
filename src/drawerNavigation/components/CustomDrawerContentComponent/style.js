import {Dimensions, StyleSheet} from 'react-native';

let {height, width}= Dimensions.get("window");

export default StyleSheet.create({
    wrapper:{
        flex:1
    },
    headerIconContainer:{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    notificationIcon:{
        height:width*0.07,
        width:width*0.07,
    },
    notificationCountContainer:{
        position:"absolute",
        right:"25%",
        top:"20%",
        width:16,
        height:16,
        borderRadius:8,
        backgroundColor:"#000",
        zIndex:16,
        alignItems:"center",
        justifyContent:"center",
    },
    container:{
        flex:1,
        backgroundColor:"#000",
        paddingHorizontal:5
    }
});