import { useEffect } from "react";
import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  Easing,
  cancelAnimation,
  useReducedMotion,
} from "react-native-reanimated";

export const useLoadingAnimation = () => {
  const rotation = useSharedValue(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) {
      return;
    }

    rotation.value = withRepeat(
      withTiming(360, {
        duration: 1200,
        easing: Easing.linear,
      }),
      -1, // Infinite repeat
      false, // Do not reverse the animation
    );

    return () => {
      cancelAnimation(rotation);
    };
  }, [reduceMotion, rotation]);

  const rotationAnimation = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: `${rotation.value}deg`,
        },
      ],
    };
  });

  return { rotationAnimation };
};
