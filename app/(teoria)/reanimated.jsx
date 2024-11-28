import styled from "styled-components/native";
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import { Button, View } from "react-native";
export function Reanimated() {
  const width = useSharedValue(100);
  const rotation = useSharedValue(0)
const animatedStyle = useAnimatedStyle(()=>{
  return {
    transform:[
      {
        rotate:`${rotation.value}deg`
      }
    ]
  }
})
const startRotation = ()=>{
  rotation.value= withRepeat(
    withTiming(360,{duration:2000}),-1,false
  )
}


  const handlePress = () => {
    width.value = width.value + 50;
  };
  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
    <Animated.View
      style={[{
        width,
        height: 100,
        backgroundColor: 'violet'
      },animatedStyle]}
    />
    <Button onPress={handlePress} title="Click me" />
    <Button onPress={startRotation} title="Rotar" />
  </View>
  );
}
const Container = styled.View`
  flex: 1;
justify-content:center;
align-items:center;
`;
const Texto = styled.Text`
   color:#fff;
`