import { router, useLocalSearchParams } from "expo-router";
import { Image } from "react-native";
import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
import tinycolor from "tinycolor2";
import { MaterialIcons } from "@expo/vector-icons";
import { globalStyles } from "../../styles/globalStyles";
import { TouchableOpacity } from "react-native";
import { usePokemonStore } from "../../store/PokemonStore";
export default function Details() {
  const { selectedPokemon: pokemon } = usePokemonStore();
  const { type, emoji, backgroundcolor } = usePokemonStore(
    (state) => state.pokemonDetails
  );
  const rgbacolor = tinycolor(backgroundcolor).setAlpha(0.5).toRgbString();
  const pokemonGif = `https://play.pokemonshowdown.com/sprites/xyani/${pokemon.name}.gif`;
  return (
    <Container>
      <LinearGradientContent
        style={globalStyles.container}
        colors={[rgbacolor, backgroundcolor]}
      >
        <Header>
          <TouchableOpacity onPress={() => router.back()}>
            <MaterialIcons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>

          <MaterialIcons name="star-border" size={24} color="white" />
        </Header>
        <Content>
          <ContentImagen>
            <ImagenFondoPokemon
              resizeMode="contain"
              source={require("../../assets/images/pokeball.png")}
            />
            <PokemonImage source={{ uri: pokemonGif }} />
          </ContentImagen>
          <PokemonName>
            {emoji} {pokemon.name}
          </PokemonName>
          <InfoContainer>
            <Stat>
              <StatValue>{pokemon.weight} KG</StatValue>
              <StatLabel>WEIGHT</StatLabel>
            </Stat>
            <Stat>
              <StatValue>{type}</StatValue>
              <StatLabel>TYPE</StatLabel>
            </Stat>
            <Stat>
              <StatValue>{pokemon.height}</StatValue>
              <StatLabel>HEIGHT</StatLabel>
            </Stat>
          </InfoContainer>
          <InfoContainer>
            <Stat>
              <StatValue>{pokemon.stardust}</StatValue>
              <StatLabel>STARTDUST</StatLabel>
            </Stat>
            <Stat>
              <StatValue>{pokemon.stats}</StatValue>
              <StatLabel>CANDY</StatLabel>
            </Stat>
          </InfoContainer>

          <ImagenPokemonLetras
            resizeMode="contain"
            source={require("../../assets/images/pokemonletras.png")}
          />
        </Content>
      </LinearGradientContent>
    </Container>
  );
}
const ImagenPokemonLetras = styled.Image`
  width: 60%;
  height: 200px;
`;
//#region InfoContainer
const InfoContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.1);
  padding: 10px 0;
  border-radius: 10px;
  margin: 10px;
`;
const Stat = styled.View`
  align-items: center;
`;
const StatValue = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;
const StatLabel = styled.Text`
  color: #fcfcfc;
  font-size: 12px;
  font-weight: bold;
`;
//#endregion
const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
const LinearGradientContent = styled(LinearGradient)`
  flex: 1;
  padding: 20px;
  width: 100%;
`;
const Content = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const ContentImagen = styled.View`
  position: relative;
  width: 100%;
  justify-content: center;
  align-items: center;
`;
const PokemonImage = styled.Image`
  width: 200px;
  height: 200px;
  object-fit: contain;
`;
const ImagenFondoPokemon = styled.Image`
  position: absolute;
  height: 300px;
  width: 300px;
  top: -110px;
  opacity: 0.5;
  object-fit: contain;
`;
const PokemonName = styled.Text`
  color: white;
  font-size: 28px;
  font-weight: bold;
  margin-top: 10px;
  padding: 5px 20px 8px 20px;
`;
