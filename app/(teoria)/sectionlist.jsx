import { SectionList } from "react-native";
import styled from "styled-components/native";

export  function SectionListComponent() {
 
  const dataSectionList = [
    {
      descripcion: "c",
      data: [
        {
          producto: "caja bombones",
          precio: "$ 1",
        },
        {
          producto: "cerveza",
          precio: "$ 2",
        },
      ],
    },

    {
      descripcion: "a",
      data: [
        {
          producto: "agua mineral",
          precio: "$ 1",
        },
      ],
    },
  ];
  const renderItem = ({ item }) => {
    return (
      <ContainerItem>
        <Producto>{item.producto}</Producto>
        <Producto>{item.precio}</Producto>
      </ContainerItem>
    );
  };

  const renderHeader = ({ section }) => {
    return <HeaderText>{section.descripcion}</HeaderText>;
  };
  const footerList = () => {
    return <Producto>Pie de pagina</Producto>;
  };
  return (
    <Container>
     
      <Title>SectionList</Title>
      <SectionList
        renderSectionFooter={footerList}
        renderSectionHeader={renderHeader}
        sections={dataSectionList}
        renderItem={renderItem}
      />
    </Container>
  );
}

const Title = styled.Text`
  color: #f1f2f0;
  font-size: 50px;
`;
const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;

`;

const ContainerItem = styled.View`
  flex-direction: row;
  gap: 20px;
`;
const Producto = styled.Text`
  color: #fff;
`;
//estilos para el sectionlist
const HeaderText = styled.Text`
  color: #fff;
  font-weight: bold;
`;
