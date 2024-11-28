
import { useRouter,useLocalSearchParams } from "expo-router";
import { View, Text, Button } from "react-native";

export  function Screen2() {
  const router = useRouter();
  const data = useLocalSearchParams()

  return (
    <View>
      <Text style={{color:"#fff"}}>hola desde screen 2 {data.nombre}</Text>
      <Text style={{color:"#fff"}}>curso: {data.curso}</Text>
      <Button
        title="Ir a pantalla 1"
        onPress={() => router.back()}
      ></Button>
    </View>
  );
}
