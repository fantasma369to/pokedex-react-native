import { Tabs } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
export default function TabLayout (){
    return(
        <Tabs screenOptions={{headerShown:false,tabBarActiveTintColor:"#da1515"}}>
            <Tabs.Screen name="index" options={{title:"Home",tabBarIcon:()=>(<MaterialIcons color={"#202ae5"} size={20} name="access-time-filled"/>)}}/>
            <Tabs.Screen name="about"/>
        </Tabs>
    )
}