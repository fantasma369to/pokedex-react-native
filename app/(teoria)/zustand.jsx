import styled from "styled-components/native";
import {useContadorStore} from "../../store/ContadorStore"
import { Button } from "react-native";
export  function Zustand() {
  const {inc,count} = useContadorStore()
  return (
    <Container>
      <Texto>{count}</Texto>
      <Button title="ejecutar" onPress={inc}/>
    </Container>
  );
}
const Container = styled.View`
  flex: 1;
justify-content:center;
align-items:center;
`;
const Texto = styled.Text`
   color:#fff;
   font-size:60px;
`