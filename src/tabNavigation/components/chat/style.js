import { StyleSheet, Dimensions } from 'react-native';

let {height, width}= Dimensions.get("window");

export default StyleSheet.create({
    headerContainer:{
        width:"100%",
        height:height*0.05,
        paddingHorizontal:"5%"
    },
    backButtonContainer:{
        width:"20%",
        height:"100%",
        alignItems:"center",
        justifyContent:"flex-start",
        flexDirection:"row",
    },
    backButtonText:{
        color:"#fff",
        fontSize:12
    },
    backArrow:{
        color:"rgb(223, 35, 125)",
        fontSize:16
    }
});