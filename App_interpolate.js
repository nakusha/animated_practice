import React, { useState, useRef } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  Pressable,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
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
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
export default function App() {
  const POSITION = useRef(
    new Animated.ValueXY({
      x: -SCREEN_WIDTH / 2 + 100,
      y: -SCREEN_HEIGHT / 2 + 100,
    })
  ).current;
  const topLeft = Animated.timing(POSITION, {
    toValue: {
      x: -SCREEN_WIDTH / 2 + 100,
      y: -SCREEN_HEIGHT / 2 + 100,
    },
    useNativeDriver: true,
  });

  const bottomLeft = Animated.timing(POSITION, {
    toValue: {
      x: -SCREEN_WIDTH / 2 + 100,
      y: SCREEN_HEIGHT / 2 - 100,
    },
    useNativeDriver: true,
  });

  const bottomRight = Animated.timing(POSITION, {
    toValue: {
      x: SCREEN_WIDTH / 2 - 100,
      y: SCREEN_HEIGHT / 2 - 100,
    },
    useNativeDriver: true,
  });

  const topRight = Animated.timing(POSITION, {
    toValue: {
      x: SCREEN_WIDTH / 2 - 100,
      y: -SCREEN_HEIGHT / 2 + 100,
    },
    useNativeDriver: true,
  });
  // const bgColor = position.y.interpolate({
  //   inputRange: [-300, 300],
  //   outputRange: ["rgb(255,99,71)", "rgb(71,166,255)"],
  // });

  const moveUp = () => {
    Animated.loop(
      Animated.sequence([topLeft, bottomLeft, bottomRight, topRight, topLeft])
    ).start();
  };

  return (
    <Container>
      <Pressable onPress={moveUp}>
        <AnimatedBox
          style={{
            transform: [...POSITION.getTranslateTransform()],
          }}
        />
      </Pressable>
    </Container>
  );
}
