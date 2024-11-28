import styled from "styled-components/native";
import { LinearGradient } from 'expo-linear-gradient';
import { Text } from "react-native";
export function Gradientes() {
  return (
    <Container>
       <LinearGradient
        start={[x=0,y=0]}
        end={[x=1,y=1]}
        colors={['#1ee210', '#1520e9','#e4317b','#e94615']}
       >
        <Card ></Card>
      </LinearGradient>
    </Container>
  );
}
const Card = styled.View`
    width:300px;
    height:300px;
`
const Container = styled.View`
  flex: 1;
justify-content:center;
align-items:center;
`;
const Texto = styled.Text`
   
`