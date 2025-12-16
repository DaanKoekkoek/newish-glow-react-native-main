import { resolveThemePrimitives } from "_theming/resolveThemePrimitives";
import type { CommonPalette } from "_theming/tokenLoader";
import { Platform } from "react-native";
import type { AnimatedStyle } from "react-native-reanimated";
import {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";
import { UnistylesRuntime, useStyles } from "react-native-unistyles";

import type {
  ButtonProminence,
  ButtonState,
  ButtonColorProfile,
} from "../Button.types";

const version = "v2";

function safeInterpolateColor(
  progress: number,
  startColor: string,
  endColor: string,
) {
  "worklet";
  startColor = startColor || "#fff";
  endColor = endColor || "#fff";
  return interpolateColor(progress, [0, 1], [startColor, endColor]);
}

// TODO - Needs a cleanup, e.g. use an exhaustive switch case.
export const useButtonAnimation = (
  isHovered: boolean,
  isPressed: boolean,
  prominence: ButtonProminence,
  inverted: boolean,
  state?: ButtonState,
  palette?: CommonPalette,
) => {
  const {
    theme: {
      themes: {
        components: {
          button: {
            button: { [version]: button },
          },
        },
      },
    },
  } = useStyles();
  const hoverProgress = useDerivedValue(
    () => withTiming(isHovered ? 1 : 0, { duration: 150 }),
    [isHovered],
  );
  const pressedProgress = useDerivedValue(
    () => withTiming(isPressed ? 1 : 0, { duration: 150 }),
    [isPressed],
  );

  function getColor(
    type: keyof ButtonColorProfile,
    variation: "default" | "hover" | "pressed",
    paletteVariant: CommonPalette = "default",
  ): string {
    "worklet";
    const colorProfile = button.color[type][prominence];

    let colorVariant = colorProfile[variation];

    if (state === "disabled") {
      const inactiveColorProfile = button.color[type].inactive;

      colorVariant = inverted
        ? inactiveColorProfile.inverted
        : inactiveColorProfile.default;
    } else if (state === "loading" && "loading" in colorProfile) {
      colorVariant = colorProfile.loading;
    }

    if (inverted && prominence !== "emphasised") {
      if ("inverted" in colorProfile) {
        colorVariant = colorProfile.inverted[variation];
      }
    }

    const resolvedProperty = resolveThemePrimitives({
      value: colorVariant,
      property: "backgroundColor",
      selectedVariant: paletteVariant,
      themeName: UnistylesRuntime.themeName,
    });

    return resolvedProperty.backgroundColor.toString();
  }

  const currentPlatform = Platform.OS;

  const bgColor = getColor("background", "default", palette);
  const bgHoverColor = getColor("background", "hover", palette);
  const bgPressedColor = getColor("background", "pressed", palette);

  const backgroundAnimation: AnimatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: safeInterpolateColor(
        isPressed ? pressedProgress.value : hoverProgress.value,
        currentPlatform === "web" && isPressed && hoverProgress.value === 1
          ? bgHoverColor
          : bgColor,
        isPressed ? bgPressedColor : bgHoverColor,
      ),
    };
  });

  const color = getColor("border", "default", palette);
  const hoverColor = getColor("border", "hover", palette);
  const pressedColor = getColor("border", "pressed", palette);

  const borderAnimation: AnimatedStyle = useAnimatedStyle(() => {
    return {
      borderColor: safeInterpolateColor(
        isPressed ? pressedProgress.value : hoverProgress.value,
        currentPlatform === "web" && isPressed && hoverProgress.value === 1
          ? hoverColor
          : color,
        isPressed ? pressedColor : hoverColor,
      ),
    };
  });

  const textColor = getColor("text", "default", palette);
  const textHoverColor = getColor("text", "hover", palette);
  const textPressedColor = getColor("text", "pressed", palette);

  const textAnimation: AnimatedStyle = useAnimatedStyle(() => {
    return {
      color: safeInterpolateColor(
        isPressed ? pressedProgress.value : hoverProgress.value,
        currentPlatform === "web" && isPressed && hoverProgress.value === 1
          ? textHoverColor
          : textColor,
        isPressed ? textPressedColor : textHoverColor,
      ),
    };
  });

  return { backgroundAnimation, borderAnimation, textAnimation };
};
