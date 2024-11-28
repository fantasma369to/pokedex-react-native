import styled from "styled-components/native";
import { UseUsernameStore } from "../../store/UsernameStore";
import { TextInput } from "react-native";
import { useState } from "react";
import { Button } from "react-native";
export function AsyncstorageComponente() {
   const { username, setUsername } = UseUsernameStore();
   const [inputvalue, setInputvalue] = useState(username);

  return (
    <Container>
      <TextInput style={{backgroundColor:"#fff"}} onChangeText={setInputvalue} placeholder="escriba un nombre" /> 
      <Button title="guardar"  onPress={()=>setUsername(inputvalue)}/>
      <Texto>nombre guardado: {username}</Texto> 
    </Container>
  );
}
const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const Texto = styled.Text`
  color: #fff;
`;
