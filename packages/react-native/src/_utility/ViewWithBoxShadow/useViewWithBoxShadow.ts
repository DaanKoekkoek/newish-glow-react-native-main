import { useThemeProviderContext } from "components/index";
import { useMemo } from "react";
import { Platform } from "react-native";
import { shadowStyle } from "react-native-fast-shadow";
import { useStyles } from "react-native-unistyles";

import type {
  ShadowStyle,
  ShadowStylePresets,
} from "./ViewWithBoxShadow.types";

export const useViewWithBoxShadow = (preset: ShadowStylePresets) => {
  const { brand } = useThemeProviderContext();
  const {
    theme: {
      primitives: {
        brands: {
          // @ts-ignore: Temporarily suppressing type errors due to brand-specific shadow definitions.
          // TODO: Refactor to utilize a generic token set for shadows applicable across all brands (odido, ben, simpel).
          [brand]: {
            shadow: { dropShadow },
          },
        },
      },
    },
  } = useStyles();

  const colorOperator = useMemo(() => {
    switch (Platform.OS) {
      case "ios": {
        return dropShadow.color.iOs;
      }
      case "android": {
        return dropShadow.color.android;
      }
      default: {
        return dropShadow.color.web;
      }
    }
  }, [dropShadow.color.android, dropShadow.color.iOs, dropShadow.color.web]);

  const { color, x, y, blur, spread, opacity } = useMemo((): ShadowStyle => {
    switch (preset) {
      case "top": {
        return {
          color: colorOperator,
          x: 0,
          y: -4,
          blur: 12,
          spread: 0,
          opacity: 1,
        };
      }
      case "bottom": {
        return {
          color: colorOperator,
          x: 0,
          y: 4,
          blur: 12,
          spread: 0,
          opacity: 1,
        };
      }
      case "right": {
        return {
          color: colorOperator,
          x: dropShadow.x,
          y: dropShadow.y,
          blur: dropShadow.blur,
          spread: dropShadow.spread,
          opacity: 1,
        };
      }
      default: {
        return {
          color: "#00000029",
          x: 5,
          y: 5,
          blur: 5,
          spread: 5,
          opacity: 1,
        };
      }
    }
  }, [
    colorOperator,
    dropShadow.blur,
    dropShadow.spread,
    dropShadow.x,
    dropShadow.y,
    preset,
  ]);

  return Platform.OS === "web"
    ? {
        boxShadow: `${color} ${x}px ${y}px ${blur}px ${spread}px`,
      }
    : shadowStyle({
        color,
        opacity,
        radius: blur,
        offset: [x, y],
      });
};
