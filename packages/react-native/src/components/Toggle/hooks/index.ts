import { useEffect } from "react";
import {
  interpolate,
  withTiming,
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { useStyles } from "react-native-unistyles";

import type { ToggleSize } from "../Toggle.types";

const version = "v1";

export const useToggleAnimation = (
  size: ToggleSize,
  isSelected: boolean,
  isHovered: boolean,
  inactive: boolean,
) => {
  const {
    theme: {
      themes: {
        components: {
          input: {
            toggle: { [version]: toggle },
          },
        },
      },
    },
  } = useStyles();

  const knobPosition = {
    unchecked: 0,
    checked:
      toggle.size.background.width[size] -
      toggle.size.knob[size] -
      toggle.padding[size] * 2,
  };

  const pressedProgress = useSharedValue(
    isSelected ? knobPosition.checked : knobPosition.unchecked,
  );
  const hoverProgress = useSharedValue(
    pressedProgress.value === 1 && isHovered ? 1 : 0,
  );

  useEffect(() => {
    pressedProgress.value = withTiming(
      isSelected ? knobPosition.checked : knobPosition.unchecked,
      { duration: 300 },
    );
  }, [
    isSelected,
    knobPosition.checked,
    knobPosition.unchecked,
    pressedProgress,
  ]);

  useEffect(() => {
    hoverProgress.value = withTiming(isHovered ? 1 : 0, { duration: 300 });
  }, [isHovered, hoverProgress]);

  const gradientHoverAnimation = useAnimatedStyle(() => ({
    opacity: inactive ? 0 : hoverProgress.value,
  }));

  const positionAnimation = useAnimatedStyle(() => ({
    transform: [{ translateX: pressedProgress.value }],
  }));

  const labelOnAnimation = useAnimatedStyle(() => ({
    opacity: interpolate(
      pressedProgress.value,
      [knobPosition.unchecked, knobPosition.checked],
      [0, 1],
    ),
  }));

  const labelOffAnimation = useAnimatedStyle(() => ({
    opacity: interpolate(
      pressedProgress.value,
      [knobPosition.checked, knobPosition.unchecked],
      [0, 1],
    ),
  }));

  return {
    gradientHoverAnimation,
    positionAnimation,
    labelOnAnimation,
    labelOffAnimation,
  };
};
