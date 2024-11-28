
import styled from "styled-components/native";
import { Link,router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity,FlatList,Platform } from "react-native";
import { StatusBar } from "expo-status-bar";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {usePokemonStore} from "../store/PokemonStore"
export default function Index() {
  const datarutas = [
    { name: "1-conversor", href: "/(1-conversor)" },
    {
      name: "teoria",
      href: "/(teoria)",
    },
    {
      name: "tabs",
      href: "/(tabs)",
    },
    {
      name: "2-pokedex",
      href: "/(2-pokedex)",
    },
    {
      name: "mapas",
      href: "/(mapas)",
    },
   
   
  ];

  const renderItem = ({ item }) => {
    
    return (
      <TouchableOpacity onPress={()=>router.push(item.href)}>
        <LinkButton >
          <IconContainer>
            <MaterialIcons name="insert-drive-file" size={24} color="#fff" />
            <Name>{item.name}</Name>
          </IconContainer>

          <Arrow name="chevron-right" />
        </LinkButton>
       
      </TouchableOpacity>
    );
  };

  return (
    <Container style={{paddingTop:Platform.OS==="ios"?0:50}}>
      <StatusBar style="light"/>
      <Title>MENÚ </Title>
      <List
        keyExtractor={(item) => item.name}
        data={datarutas}
        renderItem={renderItem}
      />

    </Container>
  );
}
const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #000;

`;
const Title = styled.Text`
  color: #fff;
  margin-bottom: 10px;
  font-size: 20px;
  font-weight: bold;
`;

//estilos para el render item
const LinkButton = styled.View`
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 20px;
  flex-direction: row;
  align-items: center;
  border: 2px solid #333;
  justify-content: space-between;
  width: 100%;
`;
const Name = styled.Text`
  color: #fff;
  font-size: 20px;
`;
const Arrow = styled(MaterialIcons)`
  color: #fff;
  font-size: 30px;
`;
const IconContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 5px;
`;
const List = styled(FlatList)`
  width: 100%;
  padding: 10px;
`;
