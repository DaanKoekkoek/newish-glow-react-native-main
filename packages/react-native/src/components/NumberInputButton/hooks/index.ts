import { resolveThemePrimitives } from "_theming/resolveThemePrimitives";
import { Platform } from "react-native";
import type { AnimatedStyle } from "react-native-reanimated";
import {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";
import { UnistylesRuntime } from "react-native-unistyles";

import type { ButtonState, ButtonTheme } from "../Button.types";

const safeInterpolateColor = (
  progress: number,
  startColor: string,
  endColor: string,
) => {
  /* This method is used within a workletized hook, but the Reanimated Babel plugin doesn't automatically convert
   * functions like these to a worklet-type function. This causes strange behavior (e.g. button causing crashes on Android).
   * For further reference:
   * https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/glossary/#worklet
   */
  "worklet";
  startColor = startColor || "#fff";
  endColor = endColor || "#fff";
  return interpolateColor(progress, [0, 1], [startColor, endColor]);
};

export const useButtonAnimation = (
  button: ButtonTheme,
  isHovered: boolean,
  isPressed: boolean,
  state?: ButtonState,
) => {
  const themeName = UnistylesRuntime.themeName;

  // Resolve all colors outside of worklet
  const resolvedColors = {
    background: {
      default: resolveThemePrimitives({
        value: button.numberInputButton.v1.color.background.default,
        property: "color",
        themeName,
      }).color.toString(),
      hover: resolveThemePrimitives({
        value: button.numberInputButton.v1.color.background.hover,
        property: "color",
        themeName,
      }).color.toString(),
      pressed: resolveThemePrimitives({
        value: button.numberInputButton.v1.color.background.pressed,
        property: "color",
        themeName,
      }).color.toString(),
    },
    icon: {
      default: resolveThemePrimitives({
        value: button.numberInputButton.v1.color.icon.default,
        property: "color",
        themeName,
      }).color.toString(),
      hover: resolveThemePrimitives({
        value: button.numberInputButton.v1.color.icon.hover,
        property: "color",
        themeName,
      }).color.toString(),
      pressed: resolveThemePrimitives({
        value: button.numberInputButton.v1.color.icon.pressed,
        property: "color",
        themeName,
      }).color.toString(),
    },
  };

  const hoverProgress = useDerivedValue(
    () => withTiming(isHovered ? 1 : 0, { duration: 150 }),
    [isHovered],
  );
  const pressedProgress = useDerivedValue(
    () => withTiming(isPressed ? 1 : 0, { duration: 150 }),
    [isPressed],
  );

  const backgroundAnimation: AnimatedStyle = useAnimatedStyle(() => {
    const bgColor = resolvedColors.background.default;
    const bgHoverColor = resolvedColors.background.hover;
    const bgPressedColor = resolvedColors.background.pressed;

    let backgroundColor = safeInterpolateColor(
      hoverProgress.value,
      bgColor,
      bgHoverColor,
    );

    if (isPressed) {
      if (Platform.OS === "web") {
        backgroundColor = safeInterpolateColor(
          pressedProgress.value,
          hoverProgress.value === 1 ? bgHoverColor : bgColor,
          bgPressedColor,
        );
      } else {
        backgroundColor = safeInterpolateColor(
          pressedProgress.value,
          bgColor,
          bgPressedColor,
        );
      }
    }
    return { backgroundColor };
  });

  const iconAnimation: AnimatedStyle = useAnimatedStyle(() => {
    const iconColor = resolvedColors.icon.default;
    const iconHoverColor = resolvedColors.icon.hover;
    const iconPressedColor = resolvedColors.icon.pressed;

    let iconTransition = safeInterpolateColor(
      hoverProgress.value,
      iconColor,
      iconHoverColor,
    );

    if (isPressed) {
      if (Platform.OS === "web") {
        iconTransition = safeInterpolateColor(
          pressedProgress.value,
          hoverProgress.value === 1 ? iconHoverColor : iconColor,
          iconPressedColor,
        );
      } else {
        iconTransition = safeInterpolateColor(
          pressedProgress.value,
          iconColor,
          iconPressedColor,
        );
      }
    }
    return { color: iconTransition };
  });

  return { backgroundAnimation, iconAnimation };
};
