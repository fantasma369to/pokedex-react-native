import { router } from "expo-router";
import styled from "styled-components/native";
import {usePokemonStore} from "../../store/PokemonStore"
export function PokemonCard({ pokemon }) {
  const {setSelectedPokemon,setPokemonDetails} = usePokemonStore()
  const typeColors = {
    grass: "#00C648",
    fire: "#F08030",
    water: "#6890F0",
    bug: "#A8B820",
    normal: "#A8A878",
    poison: "#A040A0",
    electric: "#F8D030",
    ground: "#E0C068",
    fairy: "#EE99AC",
    fighting: "#C03028",
    psychic: "#F85888",
    rock: "#B8A038",
    ghost: "#705898",
    ice: "#98D8D8",
    dragon: "#7038F8",
    dark: "#705848",
    steel: "#B8B8D0",
    flying: "#A890F0",
  };
  const typeEmojis = {
    grass: "🌿",
    fire: "🔥",
    water: "💧",
    bug: "🐛",
    normal: "😺",
    poison: "☠️",
    electric: "⚡",
    ground: "🌍",
    fairy: "✨",
    fighting: "🥊",
    psychic: "🔮",
    rock: "🪨",
    ghost: "👻",
    ice: "❄️",
    dragon: "🐉",
    dark: "🌑",
    steel: "⚙️",
    flying: "🕊️",
  };
 
  const primaryType = pokemon.types[0];
  const typeEmoji = typeEmojis[primaryType]|| "❓";
 
  const backgroundColor = typeColors[primaryType] || "#A8A878";
  const urlpokemongo = "https://www.serebii.net/pokemongo/pokemon/";
  return (
    <Container
      backgroundColor={backgroundColor}
      onPress={() => {
        setSelectedPokemon(pokemon)
        setPokemonDetails({
          type:primaryType,
          emoji:typeEmoji,
          backgroundcolor:backgroundColor,
          imagen:`${urlpokemongo}${`${pokemon.id}`.padStart(3, 0)}.png`
        })
        router.push("/details")
      }}
    >
 {/* type:primaryType,
          emoji: typeEmoji,
          backgroundcolor:backgroundColor,
          item:JSON.stringify(pokemon),
          imagen:`${urlpokemongo}${`${pokemon.id}`.padStart(3, 0)}.png` */}

      <PokemonImage
        source={{ uri: `${urlpokemongo}${`${pokemon.id}`.padStart(3, 0)}.png` }}
      />
      <PokemonId>#{`${pokemon.id}`.padStart(3, 0)}</PokemonId>
      <PokemonName>{typeEmoji} {pokemon.name}</PokemonName>
    </Container>
  );
}
const Container = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background-color: ${(props) => props.backgroundColor};
  padding: 15px;
  align-items: center;
  flex: 1;
  margin: 10px;
  height: 250px;
  justify-content: center;
  position: relative;
  margin-top: 40px;
`;
const PokemonName = styled.Text`
  color: #ffffff;
  font-size: 16px;
  font-weight: bold;
  background-color: rgba(45, 45, 45, 0.1);
  border-radius: 30px;
  padding: 10px;
  position: absolute;
  bottom: 10px;
`;
const PokemonImage = styled.Image`
  width: 150px;
  height: 150px;
  position: absolute;
  top: -30px;
  object-fit: contain;
`;
const PokemonId = styled.Text`
  color: #fff;
  font-size: 35px;
  margin-top: 5px;
  position: absolute;
  bottom: 80px;
  opacity: 0.4;
  font-weight: bold;
`;
