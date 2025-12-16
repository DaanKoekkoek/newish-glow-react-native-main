import { resolveThemePrimitives } from "_theming/resolveThemePrimitives";
import type { CommonPalette } from "_theming/tokenLoader";
import { createStyleSheet, UnistylesRuntime } from "react-native-unistyles";

const version = "v1";
const versionTextStyles = "v1";

export const TextLinkStyles = createStyleSheet(
  ({
    themes: {
      components: {
        textLink: { [version]: textLink },
        foundations: {
          typography: {
            textStyles: { [versionTextStyles]: textStyles },
          },
        },
      },
    },
  }) => ({
    textLink: {
      overflow: "visible",
    },
    textLinkAsButton: {
      display: "flex",
    },
    textUnderline: (disabled: boolean) => ({
      textDecorationStyle: "solid",
      textDecorationLine: disabled ? "none" : "underline",
      variants: {
        isHovered: {
          true: {
            textDecorationLine: "none",
          },
        },
        isActive: {
          true: {
            textDecorationLine: disabled ? "none" : "underline",
          },
        },
      },
    }),
    invertedTextStyle: (disabled: boolean) => ({
      textDecorationLine: "none",
      textDecorationStyle: "solid",
      variants: {
        isHovered: {
          true: {
            textDecorationLine: disabled ? "none" : "underline",
          },
        },
        isActive: {
          true: {
            textDecorationLine: "none",
          },
        },
      },
    }),
    textSize: {
      variants: {
        size: {
          xs: {
            fontSize: textStyles.paragraph.fontSize.xs,
            lineHeight: textStyles.paragraph.lineHeight.xs,
            letterSpacing: textStyles.paragraph.letterSpacing.xs,
          },
          sm: {
            fontSize: textStyles.paragraph.fontSize.sm,
            lineHeight: textStyles.paragraph.lineHeight.sm,
            letterSpacing: textStyles.paragraph.letterSpacing.sm,
          },
          default: {
            fontSize: textStyles.paragraph.fontSize.default,
            lineHeight: textStyles.paragraph.lineHeight.default,
            letterSpacing: textStyles.paragraph.letterSpacing.default,
          },
          lg: {
            fontSize: textStyles.paragraph.fontSize.lg,
            lineHeight: textStyles.paragraph.lineHeight.lg,
            letterSpacing: textStyles.paragraph.letterSpacing.lg,
          },
        },
      },
    },
    textAndIconContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: textLink.gap.default,
      variants: {
        size: {
          xs: {
            columnGap: textLink.gap.sm,
          },
          sm: {
            columnGap: textLink.gap.default,
          },
          default: {
            columnGap: textLink.gap.default,
          },
          lg: {
            columnGap: textLink.gap.default,
          },
        },
      },
    },
    iconWrapper: {
      justifyContent: "center",
      alignItems: "center",
    },
    iconColor: (palette?: CommonPalette) => {
      return {
        ...resolveThemePrimitives({
          value: textLink.color.icon.default,
          property: "color",
          themeName: UnistylesRuntime.themeName,
          selectedVariant: palette,
        }),
        verticalAlign: "middle",
        display: "flex",
        variants: {
          isVisited: {
            true: {
              ...resolveThemePrimitives({
                value: textLink.color.icon.visited,
                property: "color",
                themeName: UnistylesRuntime.themeName,
              }),
            },
          },
          isHovered: {
            true: {
              ...resolveThemePrimitives({
                value: textLink.color.icon.hover,
                property: "color",
                themeName: UnistylesRuntime.themeName,
              }),
            },
          },
          isActive: {
            true: {
              ...resolveThemePrimitives({
                value: textLink.color.icon.pressed,
                property: "color",
                themeName: UnistylesRuntime.themeName,
              }),
            },
          },
        },
      };
    },
    textColor: (palette?: CommonPalette) => {
      return {
        ...resolveThemePrimitives({
          value: textLink.color.text.default,
          property: "color",
          themeName: UnistylesRuntime.themeName,
          selectedVariant: palette,
        }),
        variants: {
          isVisited: {
            true: {
              ...resolveThemePrimitives({
                value: textLink.color.text.visited,
                property: "color",
                themeName: UnistylesRuntime.themeName,
                selectedVariant: palette,
              }),
            },
          },
          isHovered: {
            true: {
              ...resolveThemePrimitives({
                value: textLink.color.text.hover,
                property: "color",
                themeName: UnistylesRuntime.themeName,
                selectedVariant: palette,
              }),
            },
          },
          isActive: {
            true: {
              ...resolveThemePrimitives({
                value: textLink.color.text.pressed,
                property: "color",
                themeName: UnistylesRuntime.themeName,
                selectedVariant: palette,
              }),
            },
          },
        },
      };
    },
    invertedIconStyles: (state, isHovered, isActive) => {
      if (isHovered) {
        return {
          color: textLink.color.icon.inverted.hover,
        };
      } else if (isActive) {
        return {
          color: textLink.color.icon.inverted.pressed,
        };
      } else if (state === "default") {
        return {
          color: textLink.color.icon.inverted.default,
        };
      } else if (state === "visited") {
        return {
          color: textLink.color.icon.inverted.visited,
        };
      }
      return {};
    },
    invertedTextStyles: (state, isHovered, isActive) => {
      if (isHovered) {
        return {
          color: textLink.color.text.inverted.hover,
        };
      } else if (isActive) {
        return {
          color: textLink.color.text.inverted.pressed,
        };
      } else if (state === "default") {
        return {
          color: textLink.color.text.inverted.default,
        };
      } else if (state === "visited") {
        return {
          color: textLink.color.text.inverted.visited,
        };
      }
      return {};
    },
  }),
);
