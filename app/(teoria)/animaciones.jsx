import styled from "styled-components/native";
import React, { useRef } from "react";
import {
  Animated,
  Text,
  View,
  StyleSheet,
  Button,
  SafeAreaView,
  PanResponder,
} from "react-native";

export function Animaciones() {
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event(
      [
        null,
        {
          dx: pan.x,
          dy: pan.y,
        },
      ],
      { useNativeDriver: false } // Cambiar a false para evitar conflictos con propiedades no soportadas
    ),
    onPanResponderRelease: () => {
      Animated.spring(pan, {
        toValue: { x: 0, y: 0 },
        useNativeDriver: false, // Cambiar a false para que funcione correctamente
      }).start();
    },
  });

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Container>
      <SafeAreaView style={styles.container}>
        <Animated.View
          style={[
            {
              transform: [{ translateX: pan.x }, { translateY: pan.y }], // Cambia `left` y `top` a `transform`
            },
            styles.box,
          ]}
          {...panResponder.panHandlers}
        />
      </SafeAreaView>
    </Container>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: "#61dafb",
    width: 80,
    height: 80,
    borderRadius: 4,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  fadingContainer: {
    padding: 20,
    backgroundColor: "powderblue",
  },
  fadingText: {
    fontSize: 28,
  },
  buttonRow: {
    flexBasis: 100,
    justifyContent: "space-evenly",
    marginVertical: 16,
  },
});

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Texto = styled.Text`
  color: #fff;
`;
