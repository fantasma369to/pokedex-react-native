import { useState } from "react";
import styled from "styled-components/native";
import  {FlatListComponent}  from "./flatlist";
import { SectionListComponent } from "./sectionlist";
import { Platform, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import {Gradientes} from "./gradientes"
import { LinearGradient } from "expo-linear-gradient";
import {Fetch} from "./fetch"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {Zustand} from "./zustand"
import { useContadorStore } from "@/store/ContadorStore";
import {Uielements} from "./uielements"
import {Uipaper} from "./uipaper"
import {Animaciones} from "./animaciones"
import {Reanimated} from "./reanimated"
import {AsyncstorageComponente} from "./asyncstorage"
import {Sqlite} from "./sqlite"
import {Camara} from "./camara"
export default function Index() {
  const {count} = useContadorStore()
  const datacategorias = [
    {
      id: 1,
      name: "SectionList",
      component: <SectionListComponent />,
    },
    {
      id: 2,
      name: "FlatList",
      component: <FlatListComponent />,
    },

    
    {
      id: 3,
      name: "Gradientes",
      component: <Gradientes />,
    },
    {
      id: 4,
      name: "Fetch-axios",
      component: <Fetch />,
    },
    {
      id: 5,
      name: "zustand",
      component: <Zustand />,
    },
    {
      id: 6,
      name: "ui paper",
      component: <Uipaper />,
    },
    {
      id: 7,
      name: "ui elements",
      component: <Uielements />,
    },
    {
      id: 8,
      name: "animaciones api animated",
      component: <Animaciones />,
    },
    {
      id: 9,
      name: "animaciones con Reanimated",
      component: <Reanimated />,
    },
    {
      id: 10,
      name: "asyncStorage",
      component: <AsyncstorageComponente />,
    },
    {
      id: 11,
      name: "SQLite",
      component: <Sqlite />,
    },
    {
      id: 12,
      name: "Camara",
      component: <Camara />,
    },
    
    
  ];
  const [selectedCategory, setSelectedCategory] = useState(datacategorias[0]);

  return (
  
    <Container style={{ paddingTop: Platform.OS === "ios" ? 0 : 50 }}>
        
      <GradientBackground/>
      <StatusBar style="light" />
      <Title>Seleccione una categoria </Title>
      <CategoriasSection>
        {datacategorias.map((item) => {
          return (
            <CategoryContainer
              key={item.id}
              selected={selectedCategory.id === item.id}
              onPress={() => setSelectedCategory(item)}
            >
              <CategoryName selected={selectedCategory.id === item.id}>
                {item.name}
              </CategoryName>
            </CategoryContainer>
          );
        })}
      </CategoriasSection>
      <ContentComponent>{selectedCategory.component}</ContentComponent>
     
    </Container>
  );
}

const Title = styled.Text`
  color: #f1f2f0;
  font-size: 32px;
`;
const Container = styled.View`
  flex: 1;
  background-color: #000;
  align-items: center;
  position: relative;
  padding:10px;
`;
const CategoriasSection = styled.View`
  flex-wrap: wrap;
  flex-direction: row;
  margin-top: 10px;
  gap:10px;
`;
//item de categoria
const CategoryContainer = styled.TouchableOpacity`

  background-color: ${(props) => (props.selected ? "#173F25" : "rgba(0,0,0,0.2)")};
  border: ${(props) => (props.selected ? "2px solid #22C55E" : "none")};
  padding: 5px;
  border-radius: 5px;
`;
const CategoryName = styled.Text`
  font-size: 20px;
  color: ${(props) => (props.selected ? "#22C55E" : "#fff")};
`;
//componentes content
const ContentComponent = styled.View`
  flex: 1;
  width: 100%;
  margin-top: 20px;
 
`;

const GradientBackground =styled(LinearGradient).attrs({
  colors:['#1db954',"transparent"],
  start:{x:0,y:0},
  end:{x:0,y:0.5}
})`
  width:100%;
  height:50%;
  position:absolute;
`
