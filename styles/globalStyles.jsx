import { Platform,StyleSheet } from "react-native";
export const globalStyles = StyleSheet.create({
    container :{
        paddingTop:Platform.OS==="android" && 50
    }
})