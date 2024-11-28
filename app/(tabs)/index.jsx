import styled from "styled-components/native";
export default function Index() {
  return (
    <Container>
      <Texto>Componente index</Texto>
    </Container>
  );
}
const Container = styled.View`
  flex: 1;
justify-content:center;
align-items:center;
`;
const Texto = styled.Text`
   
`