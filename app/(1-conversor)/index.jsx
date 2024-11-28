import { router } from "expo-router";
import styled from "styled-components/native";
export default function Index() {
  return (
    <Container>
      <Icon source="https://i.ibb.co/dK609rM/medida-1.png" />
      <Title>Conversor</Title>
      <SubTitle>(cm) a (m)</SubTitle>
      <StartButton onPress={()=>router.push("/conversor")}>
        <ButtonText>Iniciar</ButtonText>
      </StartButton>
    </Container>
  );
}
const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #f7e7ce;
`;
const Title = styled.Text`
 font-size: 50px;
  font-weight: bold;
  color: #614e3e;
  margin-bottom: 20px;
`;
const SubTitle = styled.Text`
  font-size: 40px;
  color: #614e3e;
  margin-bottom: 40px;
  font-weight:bold;
`;
const StartButton = styled.TouchableOpacity`
background-color: #decf93;
  padding: 15px 30px;
  border-radius: 8px;
`;
const ButtonText = styled.Text`
 font-size: 25px;
  font-weight:bold;
  color: #614e3e;
`;
const Icon = styled.Image`
width: 150px;
  height: 150px;
  margin-bottom: 20px;

`;
