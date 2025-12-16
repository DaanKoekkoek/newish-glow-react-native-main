import type { SubscriptionHeroInfoType } from "components/SubscriptionHero/SubscriptionHero.types";
import { Platform } from "react-native";
import { createStyleSheet, UnistylesRuntime } from "react-native-unistyles";

import type { TopNavigationProps } from "./TopNavigation.types";
import { resolveThemePrimitives } from "../../_theming/resolveThemePrimitives";

const version = "v1";

export const topNavigationStyles = createStyleSheet(
  ({
    themes: {
      components: {
        section,
        hero: {
          subscriptionHero: { [version]: subscriptionHero },
        },
      },
    },
  }) => ({
    navigationContainer: (height: number) => {
      return {
        zIndex: 2,
        justifyContent: "center",
        height: height || undefined,
      };
    },
    navigationButtonWrapper: {
      pointerEvents: "box-none",
    },
    navigationMinWidth: (minWidth: number) => {
      return {
        minWidth,
      };
    },
    contentColumn: {
      flexDirection: "row",
      alignItems: "center",
      variants: {
        hasActions: {
          true: {
            justifyContent: "space-between",
          },
          false: {
            justifyContent: "center",
          },
        },
      },
    },
    contentHeading: {
      flexShrink: 1,
    },
    contentHeadingContainer: {
      flexDirection: "row",
      paddingVertical: 9,
      flexShrink: 1,
      paddingHorizontal: 64,
    },
    contentAlignment: {
      justifyContent: "center",
      alignItems: "center",
      marginHorizontal: "auto",
      variants: {
        hasActions: {
          false: {
            width: "100%",
          },
        },
      },
    },
    shadow: {
      zIndex: -1,
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
    },
    shadowTopOffset: (headingHeight: number) => {
      return {
        ...Platform.select({
          web: {
            top: 0,
          },
          default: {
            top: headingHeight,
          },
        }),
      };
    },
    backgroundColor: {
      variants: {
        sectionVariant: {
          default: {
            backgroundColor: section.atoms.color.background.default,
          },
          subtle: {},
          image: {
            backgroundColor: section.atoms.color.background.image,
          },
          emphasised: {
            backgroundColor: section.atoms.color.background.emphasised,
          },
        },
      },
    },
    dynamicPaletteBackground: (
      topNavigationPalette: TopNavigationProps["palette"],
      paletteType?: SubscriptionHeroInfoType | undefined,
    ) => {
      return resolveThemePrimitives({
        value: paletteType
          ? subscriptionHero.color.background.default
          : section.atoms.color.background.subtle,
        property: "backgroundColor",
        themeName: UnistylesRuntime.themeName,
        selectedVariant: topNavigationPalette,
      });
    },
  }),
);
