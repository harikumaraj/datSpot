import { StyleSheet, Dimensions } from 'react-native';

let {height, width}= Dimensions.get('window');

export default StyleSheet.create({
    imageBackground:{
        height,
        width
    },
    container:{
        width:"70%",
        height:"90%",
        marginTop:"10%",
        marginLeft:"15%",

    },
    imageWrapper:{
        flex:1.5,
        alignItems:"center",
        justifyContent:"center",
    },
    formWrapper:{
        flex:2,
    },
    image:{
        width: height*0.3,
        height: height*0.3,
    },
    inputContainer:{
        width: "100%",
        height: height*0.06,
        flexDirection:"row",
        backgroundColor:"#fff",
        borderRadius:200,
        overflow:"hidden"
    },
    iconContainer:{
        flex:2,
        justifyContent:"center",
        alignItems:"center",
    },
    textInputContainer:{
        flex:8,
        justifyContent:"center"
    },
    buttonContainer:{
        width: "100%",
        height: height*0.06,
        borderRadius:200,
        overflow:"hidden",
        backgroundColor:"#fff"
    },
    button:{
        height: height*0.06,
        width:"100%",
        justifyContent:"center",
        alignItems:"center"
    },
    icon:{
        height:"50%",
        width:"50%"
    },
    textInput:{
        color:"#000",
        fontSize:14
    },
    buttonText:{
        fontSize:20,
        color:"#fff"
    },
    forgotPasswordContainer:{
        height:"15%",
        width:"80%",
        marginTop:"7%",
        marginLeft:"10%",
        alignItems:"center",

    },
    forgotPasswordText:{
        color:"rgb( 240, 66, 131)",
        fontSize:16
    },
    loginWithTextContainer:{
        height:"15%",
        width:"80%",
        marginTop:"5%",
        marginLeft:"10%",
        alignItems:"center",
    },
    loginWithText:{
        fontSize:18,
        color:"#fff",
    },
    socialMediaContainer:{
        flexDirection:"row",
        height:"30%",
        width:"80%",
        marginLeft:"10%",
        marginTop:"3%",
        alignItems:"center",
        justifyContent:"space-around"
    },
    socialMediaIconContainer:{
        width:40,
        height:40,
        borderRadius:20,
        alignItems:"center",
        justifyContent:"center"
    },
    socialMediaIcon:{
    },
    registerText:{
        color:"rgb( 240, 66, 131)",
        fontSize:20
    }
})