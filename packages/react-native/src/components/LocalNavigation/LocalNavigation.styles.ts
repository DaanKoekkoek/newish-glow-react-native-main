import { resolveThemePrimitives } from "_theming/resolveThemePrimitives";
import type { CommonPalette } from "_theming/tokenLoader";
import { createStyleSheet, UnistylesRuntime } from "react-native-unistyles";

import type { Prominence, TitleSize } from "./LocalNavigation.types";

const version = "v1";

export const LocalNavigationStyles = createStyleSheet(
  ({
    themes: {
      components: {
        navigation: {
          localNavigation: { [version]: localNavigation },
        },
      },
    },
  }) => ({
    background: { alignSelf: "auto" },
    compoundStyleWithPalette: (
      prominence: Prominence,
      palette: CommonPalette,
    ) => {
      return resolveThemePrimitives({
        value: localNavigation.color.background[prominence],
        property: "backgroundColor",
        themeName: UnistylesRuntime.themeName,
        selectedVariant: palette,
      });
    },
    containerDefault: {
      paddingHorizontal: localNavigation.padding.horizontal,
      paddingTop: localNavigation.padding.default.top,
      paddingBottom: localNavigation.padding.default.bottom,
      rowGap: localNavigation.gap.vertical.container,
    },
    containerCompact: {
      paddingHorizontal: localNavigation.padding.horizontal,
      paddingTop: localNavigation.padding.compact.top.default,
      paddingBottom: localNavigation.padding.compact.bottom.default,
    },
    textContainer: {
      rowGap: localNavigation.gap.vertical.text,
    },
    actions: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    actionsDefault: (prominence: Prominence) => {
      return {
        minHeight: localNavigation.size.actions.minHeight.default,
        paddingTop:
          prominence === "default" || prominence === "subtle"
            ? localNavigation.padding.actions.default.top.default
            : localNavigation.padding.actions.default.top.button,
      };
    },
    action: {
      variants: {
        position: {
          left: { alignItems: "flex-start" },
          right: { alignItems: "flex-end" },
        },
      },
    },
    actionCompactTextLink: {
      minHeight: localNavigation.size.actions.minHeight.compact,
      maxWidth: localNavigation.size.textLink.maxWidth,
      paddingTop: localNavigation.padding.actions.compact.top.default.default,
    },
    actionCompactButton: {
      minHeight: localNavigation.size.actions.minHeight.compact,
      paddingTop: localNavigation.padding.actions.compact.top.button.default,
    },
    compactTitle: (variant: Prominence) => {
      return {
        textAlign: "center",
        color:
          variant === "emphasised"
            ? localNavigation.color.text.title.emphasised
            : localNavigation.color.text.title.default,
        position: "absolute",
        left: 0,
        right: 0,
      };
    },
    title: (variant: Prominence) => {
      if (variant === "emphasised") {
        return {
          color: localNavigation.color.text.title.emphasised,
        };
      }

      return {
        color: localNavigation.color.text.title.default,
      };
    },
    compactTitleFont: (size: TitleSize) => {
      return {
        fontSize: localNavigation.typography.compact.title[size].fontSize,
        lineHeight: localNavigation.typography.compact.title[size].lineHeight,
        letterSpacing:
          localNavigation.typography.compact.title[size].letterSpacing,
        paddingTop: localNavigation.padding.title.compact.top[size],
      };
    },
  }),
);
