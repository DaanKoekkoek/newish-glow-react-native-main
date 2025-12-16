import { resolveThemePrimitives } from "_theming/index";
import type { CommonPalette, BreakpointKeys } from "_theming/index";
import { ensureExhaustive } from "_utility";
import { useThemeProviderContext } from "components/ThemeProvider";
import { GlowGradient } from "foundations/GlowGradient";
import { useSectionContext } from "foundations/Section/SectionContext";
import React from "react";
import { View } from "react-native";
import {
  useStyles,
  createStyleSheet,
  UnistylesRuntime,
} from "react-native-unistyles";

import type { BoxProps } from "./Box.types";

const version = "v1";

export const Box = ({
  prominence = "default",
  gradient = "Glow1",
  children,
  grow = true,
  size = "default",
  style,
  palette,
  testID = "box",
}: BoxProps) => {
  const { styles } = useStyles(stylesheet, {
    prominence: prominence === "default" ? undefined : prominence,
    size: size === "default" ? undefined : size,
    grow,
  });

  const { sectionPalette } = useSectionContext();
  const { brand } = useThemeProviderContext();

  const breakpoint = UnistylesRuntime.breakpoint as BreakpointKeys;

  return (
    <View
      testID={testID}
      style={[
        styles.box,
        prominence === "outline" && styles.outlinePadding(breakpoint, size),
        prominence === "color" &&
          styles.compoundStyleWithPalette(palette || sectionPalette),
        style,
      ]}
    >
      {prominence === "emphasised" ? (
        <>
          {brand === "switch" ? (
            <View style={styles.background(palette)} />
          ) : (
            <GlowGradient
              type={gradient}
              zIndex={0}
              style={styles.glowGradient}
            />
          )}
          {children}
        </>
      ) : (
        children
      )}
    </View>
  );
};

const stylesheet = createStyleSheet(
  ({
    themes: {
      components: {
        box: { [version]: box },
      },
    },
  }) => ({
    glowGradient: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    background: (palette?: CommonPalette) => {
      return {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        ...resolveThemePrimitives({
          value: box.color.background.emphasised,
          property: "backgroundColor",
          themeName: UnistylesRuntime.themeName,
          selectedVariant: palette,
        }),
      };
    },
    box: {
      borderStyle: "solid",
      position: "relative",
      overflow: "hidden",
      flexShrink: 1,
      variants: {
        grow: {
          true: {
            flexGrow: 1,
          },
        },
        prominence: {
          default: {
            backgroundColor: box.color.background.default,
            borderColor: box.color.border.default,
            borderWidth: box.borderWidth.default,
          },
          color: {
            borderColor: box.color.border.color,
            borderWidth: box.borderWidth.color,
          },
          outline: {
            backgroundColor: box.color.background.outline,
            borderColor: box.color.border.outline,
            borderWidth: box.borderWidth.outline,
          },
          emphasised: {
            backgroundColor: box.color.background.emphasised,
            borderColor: box.color.border.emphasised,
            borderWidth: box.borderWidth.emphasised,
          },
        },
        size: {
          default: {
            borderRadius: box.radius.default,
            padding: box.padding.default,
          },
          sm: {
            borderRadius: box.radius.sm,
            padding: box.padding.sm,
          },
        },
      },
    },
    outlinePadding: (breakpoint: BreakpointKeys, size: BoxProps["size"]) => {
      if (size) {
        switch (size) {
          case "default":
            return {
              padding:
                box.padding.default[breakpoint] - box.borderWidth.outline,
            };
          case "sm":
            return {
              padding: box.padding.sm - box.borderWidth.outline,
            };
          default: {
            ensureExhaustive(size);
          }
        }
      }

      return {};
    },
    compoundStyleWithPalette: (palette: BoxProps["palette"]) => {
      return resolveThemePrimitives({
        value: box.color.background.color,
        property: "backgroundColor",
        themeName: UnistylesRuntime.themeName,
        selectedVariant: palette,
      });
    },
  }),
);
