import { resolveThemePrimitives } from "_theming/resolveThemePrimitives";
import { ensureExhaustive, type Breakpoint } from "_utility";
import type { ColorValue } from "react-native";
import { createStyleSheet, UnistylesRuntime } from "react-native-unistyles";

import type {
  DefaultCardProps,
  NonEmphasizedCardVariant,
} from "./DefaultCard.types";

const version = "v1";

export const defaultCardStyles = createStyleSheet(
  ({
    themes: {
      components: {
        card: {
          defaultCard: { [version]: defaultCard },
        },
      },
    },
  }) => ({
    cardContainer: (
      breakpoint: Breakpoint,
      isHovered: boolean,
      variant: DefaultCardProps["variant"],
    ) => {
      return {
        display: "flex",
        alignSelf: "stretch",
        overflow: "hidden",
        borderRadius:
          defaultCard.radius.default[breakpoint] +
          ((isHovered || variant === "outline") && variant !== "emphasized"
            ? defaultCard.borderWidth.default.hover
            : variant === "emphasized"
              ? defaultCard.borderWidth.default.selected * 1.5
              : 0),
      };
    },
    cardContainerRadiusReset: {
      borderTopLeftRadius: defaultCard.radius.none,
    },
    cardContainerGradient: {
      position: "absolute",
      top: 0,
      right: 0,
      left: 0,
      bottom: 0,
      overflow: "hidden",
      borderRadius: defaultCard.radius.default,
    },
    imageWrapper: {
      overflow: "hidden",
    },
    imageWrapperBackground: (palette: DefaultCardProps["palette"]) => {
      return resolveThemePrimitives({
        value: defaultCard.color.background.alternate,
        property: "backgroundColor",
        themeName: UnistylesRuntime.themeName,
        selectedVariant: palette,
      });
    },
    badgeOverImage: {
      position: "absolute",
    },
    badge: {
      top: defaultCard.padding.vertical,
      left: defaultCard.padding.horizontal,
    },
    imageBackground: {
      backgroundColor: resolveThemePrimitives({
        value: defaultCard.color.background.alternate,
        property: "backgroundColor",
        themeName: UnistylesRuntime.themeName,
      })["backgroundColor"] as ColorValue,
    },
    gradientBorder: {
      flex: 1,
      padding: defaultCard.borderWidth.outline.selected,
    },
    innerContentWrapper: {
      flex: 1,
      variants: {
        showHighlight: {
          true: {
            borderTopLeftRadius: 0,
          },
        },
      },
    },
    gradientContentWrapper: {
      flex: 1,
      variants: {
        showHighlight: {
          true: {
            borderTopLeftRadius: 0,
          },
        },
      },
    },
    cardContainerHovered: {
      borderWidth: defaultCard.borderWidth.default.hover,
      borderColor: "transparent",
      variants: {
        isHoveredAndNotEmphasized: {
          true: {
            borderColor: defaultCard.color.border.outline.hover,
          },
        },
        isHovered: {
          true: {
            borderColor: defaultCard.color.border.outline.hover,
          },
          false: {
            borderColor: defaultCard.color.border.outline.default,
          },
        },

        outline: {
          true: {
            borderColor: defaultCard.color.border.outline.default,
            variants: {
              isHovered: {
                false: {
                  borderColor: defaultCard.color.border.outline.default,
                },
              },
            },
          },
        },
      },
    },
    cardBackground: {
      borderRadius: defaultCard.radius.default,
    },
    cardBackgroundColour: (
      variant: DefaultCardProps["variant"],
      breakpoint: Breakpoint,
      palette: DefaultCardProps["palette"] = "default",
    ) => {
      switch (variant) {
        case "alternate":
          return resolveThemePrimitives({
            value: defaultCard.color.background.alternate,
            property: "backgroundColor",
            themeName: UnistylesRuntime.themeName,
            selectedVariant: palette,
          });
        case "outline":
          return { backgroundColor: defaultCard.color.background.outline };
        case "default":
          return { backgroundColor: defaultCard.color.background.default };
        case "emphasized":
          return {
            backgroundColor: defaultCard.color.background.default,
            borderRadius: defaultCard.radius.default[breakpoint],
          };
        default:
          ensureExhaustive(variant as never);
      }
    },
    cardBackgroundTopRadius: (
      breakpoint: Breakpoint,
      variant?: NonEmphasizedCardVariant,
    ) => {
      return {
        borderTopLeftRadius:
          defaultCard.radius.default[breakpoint] -
          defaultCard.borderWidth[variant || "default"].selected,
        borderTopRightRadius:
          defaultCard.radius.default[breakpoint] -
          defaultCard.borderWidth[variant || "default"].selected,
      };
    },
    highlightBorderTopRightRadius: (
      breakpoint: Breakpoint,
      variant?: NonEmphasizedCardVariant,
    ) => {
      return {
        borderTopRightRadius:
          defaultCard.radius.default[breakpoint] -
          defaultCard.borderWidth[variant || "default"].selected * 1.5,
      };
    },
    backgroundSvg: {
      position: "absolute",
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      width: "100%",
      height: "100%",
    },
    contentPadding: {
      paddingHorizontal: defaultCard.padding.horizontal,
      paddingVertical: defaultCard.padding.vertical,
    },
    content: {
      gap: defaultCard.gap.vertical,
      variants: {
        showHighlight: {
          true: {
            paddingTop: defaultCard.padding.vertical,
          },
        },
      },
    },
    badgeTitle: {
      gap: defaultCard.gap.title.vertical,
    },
    contentText: {
      gap: defaultCard.gap.vertical,
    },
  }),
);
