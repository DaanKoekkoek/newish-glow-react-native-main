import { resolveThemePrimitives } from "_theming/resolveThemePrimitives";
import { ensureExhaustive } from "_utility";
import { Platform } from "react-native";
import { createStyleSheet, UnistylesRuntime } from "react-native-unistyles";

import type {
  FeatureCardContentType,
  FeatureCardProps,
  FeatureCardStyle,
  FeatureCardVariant,
} from "./FeatureCard.types";

const version = "v1";

export const FeatureCardStyles = createStyleSheet(
  ({
    screenSizes,
    themes: {
      components: {
        card: {
          featureCard: { [version]: featureCard },
        },
      },
    },
  }) => ({
    card: {
      overflow: "hidden",
      borderRadius: featureCard.radius.default,
      variants: {
        variant: {
          compact: {
            maxWidth: featureCard.size.maxWidth.compact,
            minWidth: featureCard.size.minWidth.compact,
          },
          default: {
            maxWidth: featureCard.size.maxWidth.default,
            minWidth: featureCard.size.minWidth.default,
          },
        },
      },
    },
    // In this case we would have a compound variant and we follow the unistyles
    // (v2) pattern as suggested
    // https://reactnativeunistyles.vercel.app/reference/compound-variants/
    compoundStyleWithPalette: (
      style: FeatureCardStyle,
      palette: FeatureCardProps["palette"],
    ) => {
      switch (style) {
        case "default":
          return resolveThemePrimitives({
            value: featureCard.color.background.default,
            property: "backgroundColor",
            themeName: UnistylesRuntime.themeName,
            selectedVariant: palette,
          });

        case "alternate":
          return resolveThemePrimitives({
            value: featureCard.color.background.alternate,
            property: "backgroundColor",
            themeName: UnistylesRuntime.themeName,
            selectedVariant: palette,
          });

        default:
          ensureExhaustive(style);
      }
    },
    contentContainer: (
      variant: FeatureCardVariant,
      type: FeatureCardContentType,
    ) => {
      const sizeStyles = {
        minHeight: featureCard.size.minHeight[type][variant],
      };

      return {
        justifyContent: "space-between",
        ...Platform.select({
          web: {
            height: "100%",
          },
        }),
        // TODO: @jwfwessels: this is using the wrong gap, refer to figma. note that background & image cards have a different content layout to text cards
        gap: screenSizes.responsive.gap.default,
        variants: {
          variant: {
            compact: {
              paddingVertical: featureCard.padding.vertical.sm,
              paddingHorizontal: featureCard.padding.horizontal.sm,
            },
            default: {
              paddingVertical: featureCard.padding.vertical.default,
              paddingHorizontal: featureCard.padding.horizontal.default,
            },
          },
        },
        ...sizeStyles,
      };
    },
    titleContainer: {
      display: "flex",
      justifyContent: "center",
      variants: {
        variant: {
          compact: {
            minHeight: featureCard.size.minHeight.text.title.compact,
          },
          default: {
            minHeight: featureCard.size.minHeight.text.title.default,
          },
        },
      },
    },
    frontImage: {
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
    },
    backgroundImage: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
    },
    backgroundGradient: {
      width: "100%",
      ...Platform.select({
        web: {
          height: "100%",
        },
      }),
    },
    backgroundGlow: {
      position: "absolute",
      flex: 1,
      width: "100%",
      height: "100%",
    },
    backgroundColorWithGlow: {
      backgroundColor: "none",
    },
    glowContent: {
      zIndex: 3,
      ...Platform.select({
        web: {
          height: "100%",
        },
        default: {},
      }),
    },
    body: {
      justifyContent: "space-between",
      variants: {
        variant: {
          compact: {
            flexDirection: "column",
            gap: featureCard.gap.content.sm,
          },
          default: {
            flexDirection: "row",
            gap: featureCard.gap.content.default,
          },
        },
      },
    },
    copyBody: {
      justifyContent: "flex-end",
      variants: {
        variant: {
          compact: {
            rowGap: featureCard.gap.copy.sm,
            paddingBottom: featureCard.padding.copy.bottom.sm,
          },
          default: {
            flex: 1,
            rowGap: featureCard.gap.copy.default,
            paddingBottom: featureCard.padding.copy.bottom.default,
          },
        },
      },
    },
    buttonBody: {
      alignSelf: "flex-end",
    },
    copyColorWithBackground: {
      variants: {
        style: {
          default: {
            color: featureCard.color.text.backgroundImage.default,
          },
          alternate: {
            color: featureCard.color.text.backgroundImage.alternate,
          },
        },
      },
    },
    copyColor: {
      variants: {
        style: {
          default: {
            color: featureCard.color.text.visual.default,
          },
          alternate: {
            color: featureCard.color.text.visual.alternate,
          },
        },
      },
    },
  }),
);
