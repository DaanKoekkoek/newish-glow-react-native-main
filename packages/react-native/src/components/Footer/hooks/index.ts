import type { AnimatedStyle } from "react-native-reanimated";
import {
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
  useReducedMotion,
} from "react-native-reanimated";

export const useFooterAnimation = (
  columnHeight: number,
  isPressed: boolean = false,
  isWeb: boolean,
) => {
  const reduceMotion = useReducedMotion();

  const pressedProgress = useDerivedValue(() => {
    if (reduceMotion) {
      return isPressed ? 1 : 0;
    }
    return withTiming(isPressed ? 1 : 0, { duration: 300 });
  }, [isPressed, reduceMotion]);

  const panelAnimation: AnimatedStyle = useAnimatedStyle(() => {
    const marginBottom = interpolate(pressedProgress.value, [0, 1], [0, 32]); // TODO: Replace '32' with token
    const maxHeight = interpolate(
      pressedProgress.value,
      [0, 1],
      [0, columnHeight],
    );

    if (isWeb) {
      return {
        marginBottom: reduceMotion ? (isPressed ? 32 : 0) : marginBottom,
        maxHeight: reduceMotion ? (isPressed ? columnHeight : 0) : maxHeight,
      };
    }

    return {};
  });

  const chevronPlusAnimation = useAnimatedStyle(() => {
    const rotate = `${interpolate(pressedProgress.value, [0, 1], [0, 180])}deg`;
    const opacity = reduceMotion
      ? isPressed
        ? 0
        : 1
      : interpolate(pressedProgress.value, [0, 1], [1, 0]);

    return {
      transform: [
        {
          rotate: reduceMotion ? (isPressed ? "180deg" : "0deg") : rotate,
        },
      ],
      opacity,
    };
  });

  const chevronMinAnimation = useAnimatedStyle(() => {
    const rotate = `${interpolate(pressedProgress.value, [0, 1], [0, 180])}deg`;
    const opacity = reduceMotion
      ? isPressed
        ? 1
        : 0
      : interpolate(pressedProgress.value, [0, 1], [0, 1]);

    return {
      transform: [
        {
          rotate: reduceMotion ? (isPressed ? "180deg" : "0deg") : rotate,
        },
      ],
      opacity,
    };
  });

  return {
    panelAnimation,
    chevronMinAnimation,
    chevronPlusAnimation,
  };
};
