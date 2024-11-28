import styled from "styled-components/native";
import * as ImagePicker from "expo-image-picker";
import { useRef, useState } from "react";
import { Button, Image, View, StyleSheet, Alert, Text } from "react-native";
import { Video, AVPlaybackStatus } from "expo-av";
export function Camara() {
  const [image, setImage] = useState(null);
  const [image2, setImage2] = useState(null);
  const videoref = useRef(null);
  const [videourl, setvideourl] = useState(null);
  const [status, setStatus] = useState({});
  const openCamaraVideo = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "permisos denegados",
        "Se requieren permisos para usar la cámara."
      );
      return;
    }
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: false,
      quality: 1,
    });
    if (!result.canceled && result.assets?.length > 0) {
      const videoUri = result.assets[0].uri;
      setvideourl(videoUri);
    }
  };
  const openCamara = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "permisos denegados",
        "Se requieren permisos para usar la cámara."
      );
      return;
    }
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [16, 3],
      quality: 1,
    });
    if (!result.canceled && result.assets?.length > 0) {
      const imageUri = result.assets[0].uri;
      setImage(imageUri);
    }
  };
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage2(result.assets[0].uri);
    }
  };
  return (
    <Container>
      <View style={styles.container}>
        <Text style={{ color: "#fff" }}>Camara Video</Text>
        <Button title="Grabar video" onPress={openCamaraVideo} />
        {videourl && (
          <Video style={{width:300,height:300}}
            ref={videoref}
            source={{ uri: videourl }}
            useNativeControls
            resizeMode="contain"
            isLooping
            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
          />
        )}
        <Button onPress={()=>status.isPlaying?videoref.current.pauseAsync():videoref.current.playAsync()} title={status.isPlaying?"pausar":"reproducir"}></Button>
      </View>
      <View style={styles.container}>
        <Text style={{ color: "#fff" }}>Camara</Text>
        <Button title="Abrir Cámara" onPress={openCamara} />
        {image && (
          <Image
            resizeMode="contain"
            source={{ uri: image }}
            style={styles.image}
          />
        )}
      </View>
      <View style={styles.container}>
        <Text style={{ color: "#fff" }}>Galeria</Text>
        <Button title="Pick an image from camera roll" onPress={pickImage} />
        {image2 && <Image source={{ uri: image2 }} style={styles.image} />}
      </View>
    </Container>
  );
}
const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const Texto = styled.Text``;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
  },
});
