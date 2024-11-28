import React, { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, View, Image, Alert } from "react-native";
import MapViewDirections from "react-native-maps-directions";
import * as Location from "expo-location";
const carImage = require("../../assets/images/car.png");
//-12.057585, -77.051007   -12.086754, -77.024356
export default function Index() {
  const [origen, setOrigen] = useState({
    latitude: -12.057585,
    longitude: -77.051007,
  });
  const [destination, setDestination] = useState({
    latitude: -12.086754,
    longitude: -77.024356,
  });
  useEffect(()=>{
    getLocationPermission()
  },[])
  async function getLocationPermission() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permisos denegados");
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    const current = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
    setOrigen(current);
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: origen.latitude,
          longitude: origen.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          draggable
          onDragEnd={(p) => setOrigen(p.nativeEvent.coordinate)}
          coordinate={origen}
          title="origen"
          description="esta es una descripcion"
        >
          <Image
            source={carImage}
            style={{ width: 40, height: 40, resizeMode: "contain" }}
          />
        </Marker>
        {/* <Marker
          draggable
          onDragEnd={(p) => setDestination(p.nativeEvent.coordinate)}
          coordinate={destination}
          title="destino"
        /> */}
        {/* <MapViewDirections
          origin={origen}
          destination={destination}
          apikey={"AIzaSyD51x0T5rnEeEVBUr19HqryZb1tAK-6QwQ"}
          strokeWidth={5}
          strokeColor="#0F53FF"
        /> */}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
