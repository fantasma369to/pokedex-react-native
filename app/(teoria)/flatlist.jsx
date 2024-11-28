import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";

export function FlatListComponent() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const llamardata = (page) => {
    return Array.from({ length: 20 }, (_, i) => `Item ${page * 20 + i + 1}`);
  };
  const cargardata = () => {
    if (loading) return;
    setLoading(true);
    setTimeout(() => {
      const newData = llamardata(page);
      setData([...data, ...newData]);
      setPage(page + 1);
      setLoading(false);
    }, 1500);
  };

  useEffect(() => {
    cargardata();
  }, []);
  const renderItem = ({ item }) => {
    return (
      <ContainerItem>
        <Producto>{item}</Producto>
      </ContainerItem>
    );
  };

  return (
    <Container>
      <Title>FlatList</Title>
      <ListaFlat
        keyExtractor={(item) => item.producto}
        data={data}
        renderItem={renderItem}
        onEndReached={cargardata}
        onEndReachedThreshold={0.5}
        ListFooterComponent={() =>
          loading ? <ActivityIndicator size="large" color="#0000ff" /> : null
        }
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
//estilos para el renderitem del FlatList
const ListaFlat = styled.FlatList``;
const ContainerItem = styled.View`
  flex-direction: row;
  gap: 20px;
`;
const Producto = styled.Text`
  color: #fff;
`;
