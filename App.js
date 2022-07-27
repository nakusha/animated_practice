import React, { useState, useRef } from "react";
import { Animated, Easing, Pressable, TouchableOpacity } from "react-native";
import styled from "styled-components";

const Container = styled.View`
  flex: 1;

  justify-content: center;
  align-items: center;
`;
const Box = styled.View`
  background-color: tomato;
  width: 200px;
  height: 200px;
`;

const AnimatedBox = Animated.createAnimatedComponent(Box);

export default function App() {
  const [up, setUp] = useState(false);
  const Y_POSITION = useRef(new Animated.Value(200)).current;
  const toggleUp = () => setUp((prev) => !prev);
  const moveUp = () => {
    Animated.timing(Y_POSITION, {
      toValue: up ? 300 : -300,
      useNativeDriver: true,
      duration: 2000,
    }).start(toggleUp);
  };
  const opacityValue = Y_POSITION.interpolate({
    inputRange: [-300, 0, 300],
    outputRange: [1, 0, 1],
  });

  return (
    <Container>
      <Pressable onPress={moveUp}>
        <AnimatedBox
          style={{
            opacity: opacityValue,
            transform: [{ translateY: Y_POSITION }],
          }}
        />
      </Pressable>
    </Container>
  );
}
