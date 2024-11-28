import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { StatusBar } from "expo-status-bar";
import { Platform, View, ActivityIndicator, Text } from "react-native";
import { FlatList } from "react-native";
import styled from "styled-components/native";
import { PokemonCard } from "../../components/2-pokedex-components/PokemonCard";
import { globalStyles } from "../../styles/globalStyles";
export default function Index() {
  const mostrarPokemons = async ({
    pageParam = "https://pokeapi.co/api/v2/pokemon?limit=20",
  }) => {
    const response = await axios.get(pageParam);
    const results = await Promise.all(
      response.data.results.map(async (pokemon) => {
        try {
          const pokemonDetail = await axios.get(pokemon.url);
          return {
            name: pokemon.name,
            stats:pokemonDetail.data.stats[0].base_stat,
            weight:pokemonDetail.data.weight,
            height:pokemonDetail.data.height,
            stardust:pokemonDetail.data.base_experience,
            id: pokemonDetail.data.id,
            types: pokemonDetail.data.types.map((t) => t.type.name),
          };
        } catch (error) {
          console.log("error al consultar datos");
          return {
            id: null,
            types: [],
          };
        }
      })
    );
    return {
      ...response.data,
      results,
    };
  };
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["mostrar pokemons"],
    queryFn: mostrarPokemons,
    getNextPageParam: (p) => p.next || undefined,
  });
  if (isLoading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#43abf5" />
      </View>
    );
  }
  if (isError) {
    return (
      <View>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }
  const allPokemons = data?.pages?.flatMap((page) => page.results) ?? [];

  console.log(allPokemons);

  const renderItem = ({ item }) => {
    return <PokemonCard pokemon={item} />;
  };
  return (
    <Container
      style={globalStyles.container}
    >
      <StatusBar style="light" />
      <Imagefondo source={require("../../assets/images/pokeball.png")} />
      <Header>
        <UserData>
          <ImagenUser source={require("../../assets/images/pokemonraro.png")} />
        </UserData>
        <Title>POKEDEX - React Native</Title>
      </Header>

      <FlatList
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        data={allPokemons}
        renderItem={renderItem}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          if (hasNextPage) fetchNextPage(); // Cargar más datos cuando el usuario llega al final
        }}
        ListFooterComponent={
          isFetchingNextPage ? (
            <ActivityIndicator size="large" color="#12d1f2" />
          ) : null
        }
      />
    </Container>
  );
}
const Container = styled.SafeAreaView`
  flex: 1;
  position: relative;
  background-color: #ffffff;
  padding: 10px;
`;
const Texto = styled.Text``;
const Imagefondo = styled.Image`
  position: absolute;
  width: 300px;
  height: 300px;
  top: 0;
  right: -100px;
  object-fit: contain;
`;
//#region header
const Header = styled.View``;
const UserData = styled.View`
  height: 50px;
  width: 50px;
  border-radius: 8px;
  background-color: #f8dfff;
  padding: 8px;
  position: relative;
  align-self: flex-end;
`;
const ImagenUser = styled.Image`
  width: 100%;
  height: 100%;
`;
const Title = styled.Text`
  color: #505a74;
  font-size: 30px;
  font-weight: bold;
`;
//#endregion
