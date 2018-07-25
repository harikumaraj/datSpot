import { Platform, StyleSheet, Dimensions } from 'react-native';

let {height, width}= Dimensions.get("window");

export default StyleSheet.create({
    wrapper:{
        flex:1
    },
    headerIconContainer:{
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    notificationIcon:{
        width:"45%",
        height:"45%"
    },
    notificationCountContainer:{
        position:"absolute",
        right:"20%",
        top:"20%",
        width:16,
        height:16,
        borderRadius:8,
        backgroundColor:"#000",
        zIndex:16,
        alignItems:"center",
        justifyContent:"center"
    },
    container:{
        flex:1,
        backgroundColor:"#000",
        paddingHorizontal:5
    },
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
    },
    middleButtons:{
        flexDirection:"row",
        height:"50%",
        width:"40%",
        borderRadius:100,
        overflow:"hidden",
        backgroundColor:"rgb(223, 35, 125)",
        alignItems:"center",
        justifyContent:"center",
    },
    buttonTextColor:{
        color:"#fff",
        fontSize:14
    },
    floatingOnlineCount:{
        position:"absolute",
        top:"10%",
        right:"27%",
        height:20,
        width:20,
        borderRadius:10,
        alignItems:"center",
        justifyContent:"center",
        zIndex:1,
        backgroundColor:"#fff"
    },
    countText:{
        color:"rgb(223, 35, 125)",
        fontSize:12
    }
});