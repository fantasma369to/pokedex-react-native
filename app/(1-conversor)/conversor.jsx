import { router } from "expo-router";
import { useState } from "react";
import styled from "styled-components/native";
import { Alert } from "react-native";
export default function Conversor() {
  const [centimeters, setCentimeters] = useState('');
  const [result, setResult] = useState(null);
const convertirdecmaMetros= ()=>{
   if(!centimeters){
    Alert.alert('Error', 'Por favor, ingresa un valor en centímetros.'); // Mostrar alerta si el campo está vacío
    return;
   }
   const metros = parseFloat(centimeters)/100
   setResult(metros)
}

  return (
    <Container>
      <Input placeholder="centimetros (cm)" keyboardType="numeric" onChangeText={setCentimeters}/>
      <CalculateButton onPress={convertirdecmaMetros}>
        <ButtonText>Calcular</ButtonText>
      </CalculateButton>
      <ResultText>Resultado: {result !==null?`${result} m`:"-"}</ResultText>
      <BackButton onPress={()=>router.back()}>
        <BackButtonText>VOLVER</BackButtonText>
      </BackButton>
    </Container>
  );
}
const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #f7e7ce;
`;
const Input = styled.TextInput`
 width: 80%;
  padding: 10px;
  margin-bottom: 20px;
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid #ccc;
  text-align: center;
  border: none;
  font-size:20px;
`;
const CalculateButton = styled.TouchableOpacity`
 background-color: #ffffff;
  padding: 15px 30px;
  border-radius: 8px;
  margin-bottom: 20px;
`;
const ButtonText = styled.Text`
font-size: 18px;
color: #614e3e;
font-weight:bold;
`;
const ResultText = styled.Text`
 font-size: 30px;
  color: #614e3e;
  margin-bottom: 40px;
  font-weight:bold;
`;
const BackButton = styled.TouchableOpacity`
 background-color: #decf93;
  padding: 10px 20px;
  border-radius: 8px;

`;
const BackButtonText = styled.Text`
 font-size: 16px;
  color: #614e3e;
  font-weight:bold;
`;
