import { resolveThemePrimitives } from "_theming/resolveThemePrimitives";
import type { CommonPalette } from "_theming/tokenLoader";
import { Platform } from "react-native";
import { createStyleSheet, UnistylesRuntime } from "react-native-unistyles";

export const version = "v1";

export const BundleCardStyles = createStyleSheet(
  ({
    themes: {
      components: {
        card: {
          bundleCard: { [version]: bundleCard },
        },
      },
    },
  }) => ({
    container: (palette: CommonPalette) => {
      return {
        alignSelf: "baseline",
        flexDirection: "row",
        borderRadius: bundleCard.radius.card.default,
        paddingHorizontal: bundleCard.padding.horizontal,
        paddingVertical: bundleCard.padding.vertical,
        gap: bundleCard.gap.horizontal,
        overflow: "hidden",
        ...resolveThemePrimitives({
          value: bundleCard.color.background.default,
          property: "backgroundColor",
          themeName: UnistylesRuntime.themeName,
          selectedVariant: palette,
        }),
      };
    },
    leftSection: {
      gap: bundleCard.gap.vertical.default,
      alignItems: "flex-start",
      flexShrink: 1,
    },
    labels: {
      gap: bundleCard.gap.vertical.sm,
      alignItems: "flex-start",
      flexShrink: 1,
    },
    product: (palette: CommonPalette) => {
      return {
        ...Platform.select({
          web: {
            overflowWrap: "anywhere",
          },
        }),
        variants: {
          variant: {
            default: {
              ...resolveThemePrimitives({
                value: bundleCard.color.text.emphasised,
                property: "color",
                themeName: UnistylesRuntime.themeName,
                selectedVariant: palette,
              }),
            },
            runningLow: {
              ...resolveThemePrimitives({
                value: bundleCard.color.text.emphasised,
                property: "color",
                themeName: UnistylesRuntime.themeName,
                selectedVariant: palette,
              }),
            },
            empty: {
              color: bundleCard.color.text.default,
            },
          },
        },
      };
    },
  }),
);
