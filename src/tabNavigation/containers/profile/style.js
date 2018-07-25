import {Dimensions, StyleSheet} from 'react-native';

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
        paddingHorizontal:10,
    },
    profileWrapper:{
        height:height*0.3,
        width:"100%",
    },
    profileImageContainer:{
        flex:2,
        alignItems:"center",
        justifyContent:"center",
    },
    profileNameAndAddPhotoButton:{
        flex:1,
        paddingTop:10
    },
    profileDescription:{
        color:"#fff",
        textAlign:"center",
        paddingHorizontal:"5%",
        paddingVertical:10,
        fontSize:12
    },
    imagesContainer:{
        paddingTop:10,
        paddingBottom:30
    },
    profileImage:{
        height: width*0.3,
        width: width*0.3,
        borderRadius:width*0.15
    },
    name:{
        fontSize:18,
        color:"#fff"
    }
});